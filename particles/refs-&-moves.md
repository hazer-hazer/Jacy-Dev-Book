---
layout: default
title: Particles
nav_order: 2
has_children: true
---

# References and move semantics

This particle among the magnitude of other is about memory management in _Jacy_.
Here I want to discuss the one of the hardest questions I have about _Jacy_ -- "Why references?"

I want to have a language which I can use to develop high-level stuff as far as low-level, mix them and doing it as easy as possible.
When these two words meet, many questions arise: working with memory directly requires opening memory management mechanisms to user whereas high-level programming often hides it.
This is why so many languages exist: some aimed to general low-level programming, some to general high-level programming, even some aimed to work with very specific domain like smart contracts.
_Jacy_ is general purpose programming language, and I have to say that it is a low-level PL.
Anyway, I don't want to miss any approach that would make _Jacy_ more high-level and convenient to use.

## Move semantics bring references?

Maybe it would sound weirdly but I want to logically describe one dilemma.
I almost agreed with myself to make _Jacy_ more similar to Swift than Rust in the sense of memory management.
Swift is ref/copy by default while Rust is move by default.
What I want is move by default! And it is impossible to have both, default is one.

In my opinion low-level programming with references as option is better than low-level with references by default. Reference is appendix mechanism even it is often used as base of MM in many PLs.
Also, when you have option to use references or not, you have more control on what are you actually doing.

## Simplify unless code dies

Rust is too explicit in my opinion, being well-designed PL, it keeps you in shackles even when you're just trying to do something a little bit simpler than required. What am I talking about? Explicitness is good when we are talking about safety, etc. but it is not required when we're talking about code writing, however respectful.

Some things can be liberalized while saving all the safety rules in Rust.
For example: passing by reference. We have function signature, we know that function accepts reference (possibly) mutable, that is, we don't lose safety if not requiring user to explicitly borrow value.

Example:
```rust
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
  - In function `foo` user knows that `S` is reference
  - user cannot pass non-reference type to `foo` thus needs to explicitly borrow it
- User needs to explicitly borrow value, so code becomes more noisy
- If function has to look like it accepts any value (`print` for example) -- user needs to write a macro which prepends `&` for each argument

_Jacy_ version:
- Comprehension is linear: Code reader have to look for function `foo` to know if it accepts reference, and cannot always see what actually is going in the code.
- User does not need to always add `&` to borrow value
- Functions like `print` can be easy made without troubles with passing non-reference types while borrowing them

At first, I need to say that I like explicitness of Rust, anyway I need to explain why I've chosen implicit version.
When you're writing a code, most of the moves you make are about "working with values" and "passing values to functions which are already implemented" (exaggerated).
When you're implementing a function -- you think what values it needs to accept and what to with these values.
But when you're implementing a function which uses already implemented one -- you almost never need to think if you're passing your values by reference or by value.

Let me describe what am talking about:
```rust
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

