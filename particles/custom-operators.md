---
layout: 'default'
title: 'Custom operators'
nav_order: 103
parent: 'Particles [β RFCs]'
# No children
# No grandparent
---

# Custom Operators

There are three ways I see:

1. Do nothing 😐
2. Fully customizable operators such as what Swift does
3. Operator sets

Skipping the first option let's talk about 1. and 2.

## Full customization

Pros:

- User can define any operator (s)he wants (nice for math)

Cons:

- Highly increases lexing and parsing
- Possibly makes parsing context-dependent (I don't respect it)
- Or, instead of context-dependent parsing we need AST transformations
- Requires special

## Operators sets

This conception might be not popular, as I've never seen an idea like that. Anyway, for me, it sounds not really weird.

The idea is not to allow creating custom operators, but instead allow to use one of predefined. This, predefined operators are not common and should not be used in std, instead, the user is free to use them in a library.

Pros:

- No additional complexity in parsing
- More specific practices of usage
- Don't need DSL

Cons:

- Static precedence (predefined operators cannot change precedence)
- Worse for "primary" _Jacy_

## Specs

This is the specification proposed for the second way -- fully customizable operators. Operator sets do not need any specification as they just use the common way with traits and implementations.

### What do we need?

To prepare the compiler for custom operators we need to establish some things required for it.

From the view of syntax we need:

- Literal tokens or a solution to tokenize operators
- Syntax for operator information description

From the view of working with AST:

- AST transformations to unflatten operators

#### AST transformations

I see two ways to solve the problem of lack of information about operators at the parsing stage:

1. Require user to write operator declarations before usage and make parsing context-dependent
2. Make operator declarations items and transform AST right after parsing

Why not 1. way? - I don't want to make new C or C++, requiring the user to declare everything before use to disambiguate parsing, etc.
Operator declarations must be the same as function, struct, ... declarations -- in _Jacy_ they called "items".
Before name resolution, all items are declared, it allows the compiler to resolve items that haven't appear in code so far.
I consider making operator declarations items as a good solution.

#### Syntax

For now, I propose this syntax:

<div class="code-fence highlight-jc hljs">
            <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-comment">// Operator type declaration</span></div><div class="line-num" data-line-num="2">2</div><div class="line">operator <span class="hljs-keyword">type</span> <span class="hljs-title class_">Assignment</span> {</div><div class="line-num" data-line-num="3">3</div><div class="line">    higherThan: Pipe</div><div class="line-num" data-line-num="4">4</div><div class="line">    lowerThan: Additive</div><div class="line-num" data-line-num="5">5</div><div class="line">    associativity: left</div><div class="line-num" data-line-num="6">6</div><div class="line">}</div><div class="line-num" data-line-num="7">7</div><div class="line"></div><div class="line-num" data-line-num="8">8</div><div class="line"><span class="hljs-comment">// Operator declaration</span></div><div class="line-num" data-line-num="9">9</div><div class="line">infix operator `×=`: Assignment;</div><div class="line-num" data-line-num="10">10</div><div class="line"></div><div class="line-num" data-line-num="11">11</div><div class="line"><span class="hljs-keyword">struct</span> <span class="hljs-title class_">S</span> {</div><div class="line-num" data-line-num="12">12</div><div class="line">    field: <span class="hljs-type">int</span></div><div class="line-num" data-line-num="13">13</div><div class="line"></div><div class="line-num" data-line-num="14">14</div><div class="line">    <span class="hljs-keyword">mut</span> <span class="hljs-keyword">func</span> `×=`(rhs: &amp;<span class="hljs-keyword">Self</span>): &amp;<span class="hljs-keyword">mut</span> <span class="hljs-keyword">self</span> {</div><div class="line-num" data-line-num="15">15</div><div class="line">        <span class="hljs-keyword">self</span>.field *= rhs.field</div><div class="line-num" data-line-num="16">16</div><div class="line">        <span class="hljs-keyword">return</span> <span class="hljs-keyword">self</span></div><div class="line-num" data-line-num="17">17</div><div class="line">    }</div><div class="line-num" data-line-num="18">18</div><div class="line">}</div>
        </div>

`operator type` pair is used to reduce the count of keywords against Swift solution with `precedencegroup`.
`operator` might be a soft keyword in the future, anyway as all of the keywords, for now, it gonna be a hard keyword.

### Reserved operators (non-overloadable)

Some operators are inexpressible with code as they require more complex internal transformations.
E.g. `|>` operator passes lhs to rhs (function) -- we can someway implement this behavior but it won't be extensible as if we would like to add placeholders like `a |> b(_, 123)` where `a` is passed instead of `_`.

> __Reserved operators cannot be overloaded or used as function name__

Reserved operators:

- `=` - Raw assignment is always per-byte copy operation
- `|>` - Transforms AST, that is it is a syntax sugar
- `or`/`and` - These logic operators are short circuit, thus cannot be overloaded without lazy evaluation (no lazy in _Jacy_ so far)
- `...` - Spread operator is not a real operator (maybe it will be changed in the future), it is mostly a punctuation sign with different behavior depending on context.

Reserved operators also include special cases described in [Lexing] part below, these are:

- `<` (as prefix)
- `>` (as postfix)
- `&` and `*` (as prefix)
- `?` (as prefix, infix and postfix)
- and punctuations `//`, `/*`/`*/` for comments, etc.

> Punctuations are recognized on lexing level, thus a user won't get an operator at all.
> For example, if code is such as `func /**/()` the error would be like `Expected function name`
> rather than `Cannot use /**/ as custom operator` as comments are processed before and ignored.

### Trait-operators

Trait operators are overloadable operators with syntax inexpressible as prefix, infix or postfix operators, e.g. `()` for invocations. Of course, we would allow writing something like `func ()() {}`, but we've got a rule: "All operators that are written as identifiers (such as in `func +` where `+` is an ident-like) -- are customized if not reserved", thus there're no special case: you can overload `func ()()` but cannot define `postfix operator ()`.

Trait operators are pretty the same as those defined in Rust in `std::ops` module, but some Rust standard operators became custom operators.

Available Trait operators:

- `Deref` and `DerefMut` for `*a` prefix operator.
- `Drop` - not a real operator, anyway it is included in `std::ops` module.
- `Fn`-like traits (not sure if there would be many like `Fn`, `FnMut` and `FnOnce` as in Rust) for `a(...)` invocation operations.
- `Index` and `IndexMut` stand for `a[...]` and `a[...] = ...` operations.
- `Unwrap` stands for `a!` operation, it is a trait operator as it would likely have complex code transformations which are inexpressible in code.
- `Try` stands for `a?` operation and the reason being a trait operator is the same as for `a!`

#### Nullable-operators

> Disclaimer: _Jacy_ does not have `null` and by it, I mean `Option` type constructor.

This dilemma I came up with is about functionality that Rust has /vs/ functionality of more common nullable-operators.
In Swift, `a?.b` means `if a is not null then get property b of a, otherwise end up with nil`.
On the other side, in Rust, operation `a?.b` means `if a is not Option::None/Result::Error then get property b of unwrapped value a, otherwise RETURN None/Err`.

I don't want to discuss the generality of the Rust `?` operator, instead I want to bring up the subject of having both functionalities.

Questions I have:

1. Do we need the Rust-like error-propagation operator? - Answer is yes, otherwise there wouldn't be any questions.
2. What is better for `?` operator - error-propagation or optional-chaining?
3. What operator to use for error-propagation or optional-chaining if some of them would use `?` operator?

__Question 2.__

Operator `?` is pretty common in many languages (JavaScript with its `?.`, Swift with `?`, etc.), and the behavior with returning an error on fail is pretty uncommon and specific to Rust.
Keeping this in mind I would say that `?` should mean optional chaining.

> SOLUTION: `?` stands for "optional-chaining"

__Question 3.__

In question 2. I said that would like to see `?` as an optional chaining operator, so now I need to choose an operator for the error propagation. It must be a non-conflicting postfix operator with obvious meaning.

`??`, `!!` or `?!`, and other combinations of `?` and `!` are conflicting as meaning is hard to comprehend if we unwrap

### Lexing

Lexing can be hard with custom operators.
Let's at first describe what symbols can operators contain, start/end with, as these rules are required to avoid breaking the entire language syntax.

These symbols are considered white-spaces (in sense of operator lexing):

- `(`/`)`, `[`/`]`, `{`/`}`, `,`, `:`, `;`

I would start with punctuation symbols/sequences which are disallowed in operators at all:

- Reserved sequences: `//`, `/*`/`*/`, `=`
- Prefix operators: `<` (used for generics), `&` (used for borrowing), `*` (used for dereferencing), `?` (reserved for some use)
- Postfix operators: `>` (used for generics), `?` (for short-circuit optional chaining)
- Infix operators: `?` (reserved for some use)

> Operator `*` is reserved for dereferencing use as it is context-dependent.
> Depending on context mutability where `*` appears - different trait method called (`Deref` for immutable dereferencing like `*a` or `DerefMut` for mutable dereferencing like `*a = ...`)

Operators can begin with: `=`, `+`, `-`, `*`, `/`, `%`, `<`, `>`, `&`, `|`, `^`, `?`, `~`.

Even though operators cannot contain `:`, there's one special case -- `:=` operator which is overloadable.

Custom operators containing dot must begin with a dot to be full operator, so if an operator begins with `.` then it can contain more dots after, if not then it is split into two/more operators:

- `%.%` is a `%` followed by `.%` operator
- `.%.` is a full operator `.%.`
- `..` and `..=` (natively "range operators") are full operators too

Symbols that might be used as part of custom operators (maybe only in the middle or beginning/end):

- `$` (often used in functional languages but in _Jacy_ proposed for macros and maybe lambdas)

#### Problems to solve

##### Generic params problem

When an operator ends with `<` here comes a problem:

<div class="code-fence highlight-jc hljs">
            <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">func</span> &lt;&lt;&lt;T&gt;(other: T) {</div><div class="line-num" data-line-num="2">2</div><div class="line">    <span class="hljs-comment">// ...</span></div><div class="line-num" data-line-num="3">3</div><div class="line">}</div>
        </div>

Anyway, I already proposed a syntax where function generics are written after `func` keyword (like in Kotlin) instead of after identifier.
So, this would be parsed successfully:

<div class="code-fence highlight-jc hljs">
            <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">func</span>&lt;T&gt; &lt;&lt;(other: T) {}</div>
        </div>

##### Function overloading

One more problem I found is that some desired functionality requires function overloading.
For example, in _Jacy_ as in Rust I would like to be able to use `..` and `..=` range operators not only as infix operators but also as prefix and postfix like `a..`, `..b` and `..=b` (`a..=` does not exists, as obviously `Infinity + 1` is `Infinity`).

There're three solutions I see:

1. Disallow one-sided range operators until operator overloading will be implemented.
2. Make range operators trait-operators only, thus disallow to customize them.

The 1. solution sounds better for me as I assumed to implement function overloading in the future.
If one day I'll 100% establish that _Jacy_ would never have function overloading -- 2. variant will be used.
<div class="nav-btn-block">
    <button class="nav-btn left">
    <a class="link" href="/Jacy-Dev-Book/particles/custom-allocators.html">< Custom allocators</a>
</button>

    <button class="nav-btn right">
    <a class="link" href="/Jacy-Dev-Book/particles/function-type-&-names.html">Function type & names ></a>
</button>

</div>
