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
            <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-comment">// Operator type declaration</span></div><div class="line-num" data-line-num="2">2</div><div class="line">operat<span class="hljs-operator">or</span> <span class="hljs-keyword">type</span> <span class="hljs-title class_">Assignment</span> {</div><div class="line-num" data-line-num="3">3</div><div class="line">    higherThan: Pipe</div><div class="line-num" data-line-num="4">4</div><div class="line">    lowerThan: Additive</div><div class="line-num" data-line-num="5">5</div><div class="line">    associativity: left</div><div class="line-num" data-line-num="6">6</div><div class="line">}</div><div class="line-num" data-line-num="7">7</div><div class="line"></div><div class="line-num" data-line-num="8">8</div><div class="line"><span class="hljs-comment">// Operator declaration</span></div><div class="line-num" data-line-num="9">9</div><div class="line">infix operat<span class="hljs-operator">or</span> <span class="inline-code highlight-jc hljs">×<span class="hljs-operator">&lt;</span>span class<span class="hljs-operator">=</span><span class="hljs-string">&quot;hljs-operator&quot;</span><span class="hljs-operator">&gt;</span><span class="hljs-operator">=</span><span class="hljs-operator">&lt;</span><span class="hljs-operator">/</span>span<span class="hljs-operator">&gt;</span>`: Assignment;<span class="hljs-operator">&lt;</span><span class="hljs-operator">/</span>div<span class="hljs-operator">&gt;</span><span class="hljs-operator">&lt;</span>div class<span class="hljs-operator">=</span><span class="hljs-string">&quot;line-num&quot;</span> data<span class="hljs-operator">-</span>line<span class="hljs-operator">-</span>num<span class="hljs-operator">=</span><span class="hljs-string">&quot;10&quot;</span><span class="hljs-operator">&gt;</span><span class="hljs-number">10</span><span class="hljs-operator">&lt;</span><span class="hljs-operator">/</span>div<span class="hljs-operator">&gt;</span><span class="hljs-operator">&lt;</span>div class<span class="hljs-operator">=</span><span class="hljs-string">&quot;line&quot;</span><span class="hljs-operator">&gt;</span><span class="hljs-operator">&lt;</span><span class="hljs-operator">/</span>div<span class="hljs-operator">&gt;</span><span class="hljs-operator">&lt;</span>div class<span class="hljs-operator">=</span><span class="hljs-string">&quot;line-num&quot;</span> data<span class="hljs-operator">-</span>line<span class="hljs-operator">-</span>num<span class="hljs-operator">=</span><span class="hljs-string">&quot;11&quot;</span><span class="hljs-operator">&gt;</span><span class="hljs-number">11</span><span class="hljs-operator">&lt;</span><span class="hljs-operator">/</span>div<span class="hljs-operator">&gt;</span><span class="hljs-operator">&lt;</span>div class<span class="hljs-operator">=</span><span class="hljs-string">&quot;line&quot;</span><span class="hljs-operator">&gt;</span><span class="hljs-operator">&lt;</span>span class<span class="hljs-operator">=</span><span class="hljs-string">&quot;hljs-keyword&quot;</span><span class="hljs-operator">&gt;</span><span class="hljs-keyword">struct</span><span class="hljs-operator">&lt;</span><span class="hljs-operator">/</span>span<span class="hljs-operator">&gt;</span> <span class="hljs-operator">&lt;</span>span class<span class="hljs-operator">=</span><span class="hljs-string">&quot;hljs-title class_&quot;</span><span class="hljs-operator">&gt;</span>S<span class="hljs-operator">&lt;</span><span class="hljs-operator">/</span>span<span class="hljs-operator">&gt;</span> {<span class="hljs-operator">&lt;</span><span class="hljs-operator">/</span>div<span class="hljs-operator">&gt;</span><span class="hljs-operator">&lt;</span>div class<span class="hljs-operator">=</span><span class="hljs-string">&quot;line-num&quot;</span> data<span class="hljs-operator">-</span>line<span class="hljs-operator">-</span>num<span class="hljs-operator">=</span><span class="hljs-string">&quot;12&quot;</span><span class="hljs-operator">&gt;</span><span class="hljs-number">12</span><span class="hljs-operator">&lt;</span><span class="hljs-operator">/</span>div<span class="hljs-operator">&gt;</span><span class="hljs-operator">&lt;</span>div class<span class="hljs-operator">=</span><span class="hljs-string">&quot;line&quot;</span><span class="hljs-operator">&gt;</span>    field: <span class="hljs-operator">&lt;</span>span class<span class="hljs-operator">=</span><span class="hljs-string">&quot;hljs-type&quot;</span><span class="hljs-operator">&gt;</span><span class="hljs-type">int</span><span class="hljs-operator">&lt;</span><span class="hljs-operator">/</span>span<span class="hljs-operator">&gt;</span><span class="hljs-operator">&lt;</span><span class="hljs-operator">/</span>div<span class="hljs-operator">&gt;</span><span class="hljs-operator">&lt;</span>div class<span class="hljs-operator">=</span><span class="hljs-string">&quot;line-num&quot;</span> data<span class="hljs-operator">-</span>line<span class="hljs-operator">-</span>num<span class="hljs-operator">=</span><span class="hljs-string">&quot;13&quot;</span><span class="hljs-operator">&gt;</span><span class="hljs-number">13</span><span class="hljs-operator">&lt;</span><span class="hljs-operator">/</span>div<span class="hljs-operator">&gt;</span><span class="hljs-operator">&lt;</span>div class<span class="hljs-operator">=</span><span class="hljs-string">&quot;line&quot;</span><span class="hljs-operator">&gt;</span><span class="hljs-operator">&lt;</span><span class="hljs-operator">/</span>div<span class="hljs-operator">&gt;</span><span class="hljs-operator">&lt;</span>div class<span class="hljs-operator">=</span><span class="hljs-string">&quot;line-num&quot;</span> data<span class="hljs-operator">-</span>line<span class="hljs-operator">-</span>num<span class="hljs-operator">=</span><span class="hljs-string">&quot;14&quot;</span><span class="hljs-operator">&gt;</span><span class="hljs-number">14</span><span class="hljs-operator">&lt;</span><span class="hljs-operator">/</span>div<span class="hljs-operator">&gt;</span><span class="hljs-operator">&lt;</span>div class<span class="hljs-operator">=</span><span class="hljs-string">&quot;line&quot;</span><span class="hljs-operator">&gt;</span>    <span class="hljs-operator">&lt;</span>span class<span class="hljs-operator">=</span><span class="hljs-string">&quot;hljs-keyword&quot;</span><span class="hljs-operator">&gt;</span><span class="hljs-keyword">mut</span><span class="hljs-operator">&lt;</span><span class="hljs-operator">/</span>span<span class="hljs-operator">&gt;</span> <span class="hljs-operator">&lt;</span>span class<span class="hljs-operator">=</span><span class="hljs-string">&quot;hljs-keyword&quot;</span><span class="hljs-operator">&gt;</span><span class="hljs-keyword">func</span><span class="hljs-operator">&lt;</span><span class="hljs-operator">/</span>span<span class="hljs-operator">&gt;</span> `×<span class="hljs-operator">&lt;</span>span class<span class="hljs-operator">=</span><span class="hljs-string">&quot;hljs-operator&quot;</span><span class="hljs-operator">&gt;</span><span class="hljs-operator">=</span><span class="hljs-operator">&lt;</span><span class="hljs-operator">/</span>span<span class="hljs-operator">&gt;</span></span>(rhs: <span class="hljs-operator">&amp;</span><span class="hljs-keyword">Self</span>): <span class="hljs-operator">&amp;</span><span class="hljs-keyword">mut</span> <span class="hljs-keyword">self</span> {</div><div class="line-num" data-line-num="15">15</div><div class="line">        <span class="hljs-keyword">self</span><span class="hljs-operator">.</span>field <span class="hljs-operator">*=</span> rhs<span class="hljs-operator">.</span>field</div><div class="line-num" data-line-num="16">16</div><div class="line">        <span class="hljs-keyword">return</span> <span class="hljs-keyword">self</span></div><div class="line-num" data-line-num="17">17</div><div class="line">    }</div><div class="line-num" data-line-num="18">18</div><div class="line">}</div>
        </div>

<span class="inline-code highlight-jc hljs">operat<span class="hljs-operator">or</span> <span class="hljs-keyword">type</span>` pair is used to reduce the count of keyw<span class="hljs-operator">or</span>ds against Swift solution with `precedencegroup</span>.
<span class="inline-code highlight-jc hljs">operat<span class="hljs-operator">or</span></span> might be a soft keyword in the future, anyway as all of the keywords, for now, it gonna be a hard keyword.

### Reserved operators (non-overloadable)

Some operators are inexpressible with code as they require more complex internal transformations.
E.g. <span class="inline-code highlight-jc hljs"><span class="hljs-operator">|</span><span class="hljs-operator">&gt;</span>` operat<span class="hljs-operator">or</span> passes lhs to <span class="hljs-title function_ invoke__">rhs</span> (function) <span class="hljs-operator">-</span><span class="hljs-operator">-</span> we can someway implement this behavi<span class="hljs-operator">or</span> but it won<span class="hljs-symbol">&#x27;t</span> be extensible <span class="hljs-keyword">as</span> <span class="hljs-keyword">if</span> we would like to add placeholders like `a <span class="hljs-operator">|</span><span class="hljs-operator">&gt;</span> <span class="hljs-title function_ invoke__">b</span>(_, <span class="hljs-number">123</span>)` <span class="hljs-keyword">where</span> `a` is passed instead of `_</span>.

> __Reserved operators cannot be overloaded or used as function name__

Reserved operators:

- <span class="inline-code highlight-jc hljs"><span class="hljs-operator">=</span></span> - Raw assignment is always per-byte copy operation
- <span class="inline-code highlight-jc hljs"><span class="hljs-operator">|</span><span class="hljs-operator">&gt;</span></span> - Transforms AST, that is it is a syntax sugar
- <span class="inline-code highlight-jc hljs"><span class="hljs-operator">or</span>`<span class="hljs-operator">/</span>`<span class="hljs-operator">and</span></span> - These logic operators are short circuit, thus cannot be overloaded without lazy evaluation (no lazy in _Jacy_ so far)
- <span class="inline-code highlight-jc hljs"><span class="hljs-operator">..</span><span class="hljs-operator">.</span></span> - Spread operator is not a real operator (maybe it will be changed in the future), it is mostly a punctuation sign with different behavior depending on context.

Reserved operators also include special cases described in [Lexing] part below, these are:

- <span class="inline-code highlight-jc hljs"><span class="hljs-operator">&lt;</span></span> (as prefix)
- <span class="inline-code highlight-jc hljs"><span class="hljs-operator">&gt;</span></span> (as postfix)
- <span class="inline-code highlight-jc hljs"><span class="hljs-operator">&amp;</span>` <span class="hljs-operator">and</span> `<span class="hljs-operator">*</span></span> (as prefix)
- <span class="inline-code highlight-jc hljs">?</span> (as prefix, infix and postfix)
- and punctuations <span class="inline-code highlight-jc hljs"><span class="hljs-comment">//`, `/*`/`*/</span></span> for comments, etc.

> Punctuations are recognized on lexing level, thus a user won't get an operator at all.
> For example, if code is such as <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">func</span> <span class="hljs-comment">/**/</span>()` the err<span class="hljs-operator">or</span> would be like `Expected function name</span>
> rather than <span class="inline-code highlight-jc hljs">Can<span class="hljs-operator">not</span> <span class="hljs-keyword">use</span> <span class="hljs-comment">/**/</span> <span class="hljs-keyword">as</span> custom operat<span class="hljs-operator">or</span></span> as comments are processed before and ignored.

### Trait-operators

Trait operators are overloadable operators with syntax inexpressible as prefix, infix or postfix operators, e.g. <span class="inline-code highlight-jc hljs">()` <span class="hljs-keyword">for</span> <span class="hljs-title class_">invocations</span><span class="hljs-operator">.</span> Of course, we would allow writing something like `<span class="hljs-title function_ invoke__">func</span> ()() {}`, but we<span class="hljs-symbol">&#x27;ve</span> got a rule: <span class="hljs-string">&quot;All operators that are written as identifiers (such as in `func +` where `+` is an ident-like) -- are customized if not reserved&quot;</span>, thus there<span class="hljs-symbol">&#x27;re</span> no special case: you can overload `<span class="hljs-title function_ invoke__">func</span> ()()` but can<span class="hljs-operator">not</span> define `postfix <span class="hljs-title function_ invoke__">operator</span> ()</span>.

Trait operators are pretty the same as those defined in Rust in <span class="inline-code highlight-jc hljs">std::ops</span> module, but some Rust standard operators became custom operators.

Available Trait operators:

- <span class="inline-code highlight-jc hljs">Deref` <span class="hljs-operator">and</span> `DerefMut` f<span class="hljs-operator">or</span> `<span class="hljs-operator">*</span>a</span> prefix operator.
- <span class="inline-code highlight-jc hljs">Drop` <span class="hljs-operator">-</span> <span class="hljs-operator">not</span> a real operat<span class="hljs-operator">or</span>, anyway it is included <span class="hljs-keyword">in</span> `std::ops</span> module.
- <span class="inline-code highlight-jc hljs">Fn`<span class="hljs-operator">-</span>like <span class="hljs-title function_ invoke__">traits</span> (<span class="hljs-operator">not</span> sure <span class="hljs-keyword">if</span> there would be many like `Fn`, `FnMut` <span class="hljs-operator">and</span> `FnOnce` <span class="hljs-keyword">as</span> <span class="hljs-keyword">in</span> Rust) f<span class="hljs-operator">or</span> `<span class="hljs-title function_ invoke__">a</span>(<span class="hljs-operator">..</span><span class="hljs-operator">.</span>)</span> invocation operations.
- <span class="inline-code highlight-jc hljs">Index` <span class="hljs-operator">and</span> `IndexMut` st<span class="hljs-operator">and</span> f<span class="hljs-operator">or</span> `a[<span class="hljs-operator">..</span><span class="hljs-operator">.</span>]` <span class="hljs-operator">and</span> `a[<span class="hljs-operator">..</span><span class="hljs-operator">.</span>] <span class="hljs-operator">=</span> <span class="hljs-operator">..</span><span class="hljs-operator">.</span></span> operations.
- <span class="inline-code highlight-jc hljs">Unwrap` st<span class="hljs-operator">and</span>s f<span class="hljs-operator">or</span> `a!</span> operation, it is a trait operator as it would likely have complex code transformations which are inexpressible in code.
- <span class="inline-code highlight-jc hljs">Try` st<span class="hljs-operator">and</span>s f<span class="hljs-operator">or</span> `a?` operation <span class="hljs-operator">and</span> the reason being a <span class="hljs-keyword">trait</span> <span class="hljs-title class_">operator</span> is the same <span class="hljs-keyword">as</span> f<span class="hljs-operator">or</span> `a!</span>

#### Nullable-operators

> Disclaimer: _Jacy_ does not have <span class="inline-code highlight-jc hljs">null` <span class="hljs-operator">and</span> by it, I mean `<span class="hljs-type">Option</span></span> type constructor.

This dilemma I came up with is about functionality that Rust has /vs/ functionality of more common nullable-operators.
In Swift, <span class="inline-code highlight-jc hljs">a?<span class="hljs-operator">.</span>b` means `<span class="hljs-keyword">if</span> a is <span class="hljs-operator">not</span> null then get property b of a, otherwise end up with nil</span>.
On the other side, in Rust, operation <span class="inline-code highlight-jc hljs">a?<span class="hljs-operator">.</span>b` means `<span class="hljs-keyword">if</span> a is <span class="hljs-operator">not</span> Option::<span class="hljs-literal">None</span><span class="hljs-operator">/</span>Result::<span class="hljs-literal">Err</span><span class="hljs-operator">or</span> then get property b of unwrapped value a, otherwise RETURN <span class="hljs-literal">None</span><span class="hljs-operator">/</span><span class="hljs-literal">Err</span></span>.

I don't want to discuss the generality of the Rust <span class="inline-code highlight-jc hljs">?</span> operator, instead I want to bring up the subject of having both functionalities.

Questions I have:

1. Do we need the Rust-like error-propagation operator? - Answer is yes, otherwise there wouldn't be any questions.
2. What is better for <span class="inline-code highlight-jc hljs">?</span> operator - error-propagation or optional-chaining?
3. What operator to use for error-propagation or optional-chaining if some of them would use <span class="inline-code highlight-jc hljs">?</span> operator?

__Question 2.__

Operator <span class="inline-code highlight-jc hljs">?` is pretty common <span class="hljs-keyword">in</span> many <span class="hljs-title function_ invoke__">languages</span> (JavaScript with its `?<span class="hljs-operator">.</span>`, Swift with `?</span>, etc.), and the behavior with returning an error on fail is pretty uncommon and specific to Rust.
Keeping this in mind I would say that <span class="inline-code highlight-jc hljs">?</span> should mean optional chaining.

> SOLUTION: <span class="inline-code highlight-jc hljs">?</span> stands for "optional-chaining"

__Question 3.__

In question 2. I said that would like to see <span class="inline-code highlight-jc hljs">?</span> as an optional chaining operator, so now I need to choose an operator for the error propagation. It must be a non-conflicting postfix operator with obvious meaning.

<span class="inline-code highlight-jc hljs">??`, `!!` <span class="hljs-operator">or</span> `?!`, <span class="hljs-operator">and</span> other combinations of `?` <span class="hljs-operator">and</span> `!</span> are conflicting as meaning is hard to comprehend if we unwrap

### Lexing

Lexing can be hard with custom operators.
Let's at first describe what symbols can operators contain, start/end with, as these rules are required to avoid breaking the entire language syntax.

These symbols are considered white-spaces (in sense of operator lexing):

- <span class="inline-code highlight-jc hljs">(`<span class="hljs-operator">/</span>`)`, `[`<span class="hljs-operator">/</span>`]`, `{`<span class="hljs-operator">/</span>`}`, `,`, `:`, `;</span>

I would start with punctuation symbols/sequences which are disallowed in operators at all:

- Reserved sequences: <span class="inline-code highlight-jc hljs"><span class="hljs-comment">//`, `/*`/`*/`, `=</span></span>
- Prefix operators: <span class="inline-code highlight-jc hljs"><span class="hljs-operator">&lt;</span>` (used <span class="hljs-keyword">for</span> <span class="hljs-title class_">generics</span>), `<span class="hljs-operator">&amp;</span>` (used <span class="hljs-keyword">for</span> <span class="hljs-title class_">borrowing</span>), `<span class="hljs-operator">*</span>` (used <span class="hljs-keyword">for</span> <span class="hljs-title class_">dereferencing</span>), `?</span> (reserved for some use)
- Postfix operators: <span class="inline-code highlight-jc hljs"><span class="hljs-operator">&gt;</span>` (used <span class="hljs-keyword">for</span> <span class="hljs-title class_">generics</span>), `?</span> (for short-circuit optional chaining)
- Infix operators: <span class="inline-code highlight-jc hljs">?</span> (reserved for some use)

> Operator <span class="inline-code highlight-jc hljs"><span class="hljs-operator">*</span></span> is reserved for dereferencing use as it is context-dependent.
> Depending on context mutability where <span class="inline-code highlight-jc hljs"><span class="hljs-operator">*</span>` appears <span class="hljs-operator">-</span> different <span class="hljs-keyword">trait</span> <span class="hljs-title class_">method</span> <span class="hljs-title function_ invoke__">called</span> (`Deref` <span class="hljs-keyword">for</span> <span class="hljs-title class_">immutable</span> dereferencing like `<span class="hljs-operator">*</span>a` <span class="hljs-operator">or</span> `DerefMut` <span class="hljs-keyword">for</span> <span class="hljs-title class_">mutable</span> dereferencing like `<span class="hljs-operator">*</span>a <span class="hljs-operator">=</span> <span class="hljs-operator">..</span><span class="hljs-operator">.</span></span>)

Operators can begin with: <span class="inline-code highlight-jc hljs"><span class="hljs-operator">=</span>`, `<span class="hljs-operator">+</span>`, `<span class="hljs-operator">-</span>`, `<span class="hljs-operator">*</span>`, `<span class="hljs-operator">/</span>`, `<span class="hljs-operator">%</span>`, `<span class="hljs-operator">&lt;</span>`, `<span class="hljs-operator">&gt;</span>`, `<span class="hljs-operator">&amp;</span>`, `<span class="hljs-operator">|</span>`, `<span class="hljs-operator">^</span>`, `?`, `<span class="hljs-operator">~</span></span>.

Even though operators cannot contain <span class="inline-code highlight-jc hljs">:`, there<span class="hljs-symbol">&#x27;s</span> one special case <span class="hljs-operator">-</span><span class="hljs-operator">-</span> `:<span class="hljs-operator">=</span></span> operator which is overloadable.

Custom operators containing dot must begin with a dot to be full operator, so if an operator begins with <span class="inline-code highlight-jc hljs"><span class="hljs-operator">.</span></span> then it can contain more dots after, if not then it is split into two/more operators:

- <span class="inline-code highlight-jc hljs"><span class="hljs-operator">%</span><span class="hljs-operator">.</span><span class="hljs-operator">%</span>` is a `<span class="hljs-operator">%</span>` followed by `<span class="hljs-operator">.</span><span class="hljs-operator">%</span></span> operator
- <span class="inline-code highlight-jc hljs"><span class="hljs-operator">.</span><span class="hljs-operator">%</span><span class="hljs-operator">.</span>` is a full operat<span class="hljs-operator">or</span> `<span class="hljs-operator">.</span><span class="hljs-operator">%</span><span class="hljs-operator">.</span></span>
- <span class="inline-code highlight-jc hljs"><span class="hljs-operator">..</span>` <span class="hljs-operator">and</span> `<span class="hljs-operator">..</span><span class="hljs-operator">=</span></span> (natively "range operators") are full operators too

Symbols that might be used as part of custom operators (maybe only in the middle or beginning/end):

- <span class="inline-code highlight-jc hljs"><span class="hljs-operator">$</span></span> (often used in functional languages but in _Jacy_ proposed for macros and maybe lambdas)

#### Problems to solve

##### Generic params problem

When an operator ends with <span class="inline-code highlight-jc hljs"><span class="hljs-operator">&lt;</span></span> here comes a problem:

<div class="code-fence highlight-jc hljs">
            <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-operator">&lt;&lt;</span><span class="hljs-operator">&lt;</span>T<span class="hljs-operator">&gt;</span>(other: T) {</div><div class="line-num" data-line-num="2">2</div><div class="line">    <span class="hljs-comment">// ...</span></div><div class="line-num" data-line-num="3">3</div><div class="line">}</div>
        </div>

Anyway, I already proposed a syntax where function generics are written after <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">func</span></span> keyword (like in Kotlin) instead of after identifier.
So, this would be parsed successfully:

<div class="code-fence highlight-jc hljs">
            <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">func</span><span class="hljs-operator">&lt;</span>T<span class="hljs-operator">&gt;</span> <span class="hljs-operator">&lt;&lt;</span>(other: T) {}</div>
        </div>

##### Function overloading

One more problem I found is that some desired functionality requires function overloading.
For example, in _Jacy_ as in Rust I would like to be able to use <span class="inline-code highlight-jc hljs"><span class="hljs-operator">..</span>` <span class="hljs-operator">and</span> `<span class="hljs-operator">..</span><span class="hljs-operator">=</span>` range operat<span class="hljs-operator">or</span>s <span class="hljs-operator">not</span> only <span class="hljs-keyword">as</span> infix operat<span class="hljs-operator">or</span>s but also <span class="hljs-keyword">as</span> prefix <span class="hljs-operator">and</span> postfix like `a<span class="hljs-operator">..</span>`, `<span class="hljs-operator">..</span>b` <span class="hljs-operator">and</span> `<span class="hljs-operator">..</span><span class="hljs-operator">=</span>b` (`a<span class="hljs-operator">..</span><span class="hljs-operator">=</span>` does <span class="hljs-operator">not</span> exists, <span class="hljs-keyword">as</span> obviously `Infinity <span class="hljs-operator">+</span> <span class="hljs-number">1</span>` is `Infinity</span>).

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
