# References and move semantics

This particle among the magnitude of others is about memory management in _Jacy_.
Here I want to discuss one of the hardest questions I have about _Jacy_ -- "Why references?"

I want to have a language that I can use to develop high-level stuff as far as low level, mix them, and doing it as easily as possible.
When these two worlds meet, many questions arise: working with memory directly requires opening memory management mechanisms to the user whereas high-level programming often hides it.
This is why so many languages exist: some aimed at general low-level programming, some to general high-level programming, even some aimed to work with a very specific domain like smart contracts.
_Jacy_ is a general-purpose programming language, and I have to say that it is a low-level PL.
Anyway, I don't want to miss an approach that would make _Jacy_ more high-level and convenient to use.

## Move semantics bring references?

Maybe it would sound weird but I want to logically describe one dilemma.
I almost agreed with myself to make _Jacy_ more similar to Swift than Rust in the sense of memory management.
Swift is ref/copy by default while Rust is move-by-default.
What I want is move-by-default! And it is impossible to have both, default is one.

In my opinion, low-level programming with references as an option is better than low-level with references by default. Reference is an appendix mechanism even it is often used as the base of MM in many PLs.
Also, when you have the option to use references or not, you have more control over what are you doing.

## Simplify unless code dies

Rust is too explicit in my opinion, being well-designed PL, keeps you in shackles even when you're just trying to do something a little bit simpler than required. What am I talking about? Explicitness is good when we are talking about safety, etc. but it is not required when we're talking about code writing, however respectful.

Some things can be liberalized while saving all the safety rules in Rust.
For example: passing by reference. We have function signature, we know that function accepts reference (possibly) mutable, that is, we don't lose safety if not requiring the user to explicitly borrow value.

Example:

```jc
// Some non-copy type
struct S {
    field: int,
}

func foo(instance: &S) {
    print(instance.field)
}

func main {
    let s = S {field: 123};
    
    // This is how to do it in Rust
    foo(&s);

    // This is how to do it in Jacy
    foo(s);
}
```

Rust version:

- Comprehension is bipolar
  - In function `foo` user knows that `S` is a reference
  - user cannot pass non-reference type to `foo` thus needs to explicitly borrow it
- User needs to explicitly borrow value, so code becomes noisier
- If a function has to look like it accepts any value (`print` for example) -- the user needs to write a macro that prepends `&` for each argument

_Jacy_ version:

- Comprehension is linear: Code readers have to look for function `foo` to know if it accepts reference, and cannot always see what is going in the code.
- User does not need to always add `&` to borrow value
- Functions like `print` can be easily made without troubles with passing non-reference types while borrowing them

At first, I need to say that I like the explicitness of Rust, anyway, I need to explain why I've chosen the implicit version.
When you're writing a code, most of the moves you make are about "working with values" and "passing values to functions which are already implemented" (exaggerated).
When you're implementing a function -- you think about what values it needs to accept and what to with these values.
But when you're implementing a function that uses already implemented one -- you rarely need to think if you're passing your values by reference or by value.

Let me describe what am talking about:

```jc
struct S {
    field: int,
}

func byRef(instance: &S) {
    // Do something with reference
}

func byVal(instance: S) {
    // Do something with value
}

func byMutRef(instance: &mut S) {
    // Do some mutating stuff
}

func example1 {
    let s = S {field: 123};

    byRef(s);
    byRef(s);
    byMutRef(s);
    byRef(s);

    byVal(s);

    // Oops... `s` is moved in call to `byVal`
    // byRef();
}

func example2 {
    let s = S {field: 123};

    // 
    byRef(s);
}
```

What I want to show is that we don't lose the safety as we still have move semantics and borrowing rules. The only change is that now passing by reference is implicit for callee that is, as I think, not bad.

That all sounds good, but...

## PROBLEM

Yes, we don't lose the safety and Rustish semantics of reference passing, anyway, I missed something.
Unlike C++, in Rust (and in _Jacy_) `&T` has different, more specific, semantics, that is, C++ operates on types and when you pass this type by reference it is not required to be pointer-like (as Rust does). C++ specification does not tell must implementation always use pointers to implement references, that is internal behavior is implementation-relative. This is why C++ does not specify an operator for creating a reference -- you cannot make a reference manually because the compiler could decide not to wrap reference to a pointer.
In _Jacy_, as in Rust, reference is a "pointer with constraint" that are:

- References are always pointers, that is `T` and `&T`, and can be thought of as `T` and `ReferenceOf<T>`
- Reference always points to valid data
  - It cannot be null
  - It cannot be a dangling pointer
- References are strong - there's nothing like `void&` respectively to `void*`

Keeping this in mind some problems arise, like, `impl &T`.

Example:

```jc
struct S {}

impl SomeTrait for S {
    func kek {}
}

impl SomeTrait for &S {
    func kek {}
}

func foo<T: SomeTrait>(st: T) {
    st.kek();
}

func main {
    let s = S {};

    foo(s); // ???
}
```

We passed `s` to `foo` which expects something implementing `SomeTrait`, but `SomeTrait` is implemented for both `S` and `&S`, do we need to implicitly pass `s` by reference?

I would answer "No", as moving `s` is nearly what the signature of function `foo` specifies -- there is no `&` for type `T`, it is moved. Thus user needs to explicitly pass by reference.

So, this code will call `SomeTrait::kek(S)` (without `&`).

User has to explicitly say that he wants to pass by reference (implicit pass does not exclude the existence of Rustish `&` borrowing operator):

```jc
func main {
    let s = S {};

    foo(&s);
}
```

Okay, the problem is solved? Actually, no. Let's look at a more difficult example:

```jc
struct S {}

impl SomeTrait for &S {
    func kek {}
}

mod module {
    impl SomeTrait for S {
        func kek {}
    }

    pub func foo<T: SomeTrait>(s: T) {}
}

func main {
    let s = S {};

    module::foo(s);
}
```

What is `T` in `module::foo`? `&T` or `T`? The answer is the same as in the example above -- the best fit for this call is `T` (without reference). Anyway, here, I want to show how difficult-to-read implicit pass-by-reference can be structured.

## CONCLUSION

__STATUS__ - IDEA IS DENIED.

__REVISIONS__ - ALLOWED
