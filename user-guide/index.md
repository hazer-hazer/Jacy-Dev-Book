---
layout: 'default'
title: 'User Guide'
nav_order: 45
# No parent
# No children
# No grandparent
---

# User Guide

**This is a WIP quick overview of _Jacy_**
__You're unable to run any code present here. Please, think of this as an image from my mind 🥺__

## What is _Jacy_?

_Jacy_ is a small project, the reason I'm creating it is to learn compiler development and perhaps create an alternative to C++.

## Lexical structure

You can skip [Lexical structure] part and just move to [Intro](#intro).

_Jacy_ might be easy to read for users familiar with C-like syntax. Its syntax is influenced by Rust, Swift, and C++.
Anyway, some things might be uncommon especially for users not coming from Rust, and I'll try to explain everything as clean as I can.

This part is about Lexical structure, that is further, talking about syntax I will refer to particular syntax units, e.g. Identifiers.

### Comments

Comments are syntax units that are ignored and do not affect program compilation.
You can use them for any additional info and documentation for your code.
_Jacy_ has C-style comments, <span class="inline-code highlight-jc hljs"><span class="hljs-comment">//` for one-line and `/**/</span></span> for multiline.
Documentation comments start with <span class="inline-code highlight-jc hljs"><span class="hljs-comment">///` for one-line and `/**` for multiline (with closing `*/</span></span>)

### Identifiers

Identifiers in _Jacy_ start with an English letter or <span class="inline-code highlight-jc hljs">_` (undersc<span class="hljs-operator">or</span>e) followed by `_</span>, letters or digits.
Identifiers are used as names and cannot be the same as reserved words (keywords), which are listed below.

__Anyway, in _Jacy_ <span class="inline-code highlight-jc hljs">_</span> is a reserved keyword__

Examples of valid identifiers: <span class="inline-code highlight-jc hljs">text`, `_123`, `__someStrangeName`, `snake_style_name</span>

### Keywords

This words are keywords, thus cannot be used as identifiers: <span class="inline-code highlight-jc hljs"><span class="hljs-operator">and</span>`, `<span class="hljs-keyword">as</span>`, `async`, `await`, `<span class="hljs-keyword">break</span>`, `<span class="hljs-keyword">const</span>`, `<span class="hljs-keyword">continue</span>`, `elif`, `<span class="hljs-keyword">else</span>`, `<span class="hljs-keyword">enum</span>`, `<span class="hljs-literal">false</span>`, `f<span class="hljs-operator">or</span>`, `<span class="hljs-keyword">func</span>`, `<span class="hljs-keyword">if</span>`, `<span class="hljs-keyword">impl</span>`, `<span class="hljs-keyword">in</span>`, `infix`, `init`, `<span class="hljs-keyword">loop</span>`, `<span class="hljs-keyword">match</span>`, `<span class="hljs-keyword">mod</span>`, `<span class="hljs-keyword">move</span>`, `<span class="hljs-keyword">mut</span>`, `<span class="hljs-operator">not</span>`, `of`, `<span class="hljs-operator">or</span>`, `<span class="hljs-keyword">return</span>`, `<span class="hljs-keyword">party</span>`, `<span class="hljs-keyword">pub</span>`, `<span class="hljs-keyword">ref</span>`, `<span class="hljs-keyword">self</span>`, `<span class="hljs-keyword">static</span>`, `<span class="hljs-keyword">struct</span>`, `<span class="hljs-keyword">super</span>`, `<span class="hljs-keyword">trait</span>`, `<span class="hljs-literal">true</span>`, `<span class="hljs-keyword">type</span>`, `<span class="hljs-keyword">use</span>`, `<span class="hljs-keyword">let</span>`, `<span class="hljs-keyword">where</span>`, `<span class="hljs-keyword">while</span></span>.

There're also reserved keywords that are not in use: <span class="inline-code highlight-jc hljs">do`, `imp<span class="hljs-operator">or</span>t`, `macro`, `of</span>.

### Operators

Operators are special symbols that you use to work with values.
There're three kinds of operators: prefix (unary), infix (binary), and postfix (unary).
Prefix, infix, and postfix are about where an operator is placed: before, between, or after expression(s).

Infix operators have some properties: precedence and associativity.

Precedence is a strength of operator, for example, we all know that <span class="inline-code highlight-jc hljs">a <span class="hljs-operator">+</span> b <span class="hljs-operator">*</span> c` is the same <span class="hljs-keyword">as</span> `a <span class="hljs-operator">+</span> (b <span class="hljs-operator">*</span> c)`, <span class="hljs-keyword">as</span> `<span class="hljs-operator">*</span>` operat<span class="hljs-operator">or</span> <span class="hljs-keyword">in</span> math is stronger than `<span class="hljs-operator">+</span></span> operator.

Associativity is about how operators with the same precedence are grouped, that is, if <span class="inline-code highlight-jc hljs"><span class="hljs-operator">+</span>` operat<span class="hljs-operator">or</span> is left<span class="hljs-operator">-</span>associative, then `a <span class="hljs-operator">+</span> b <span class="hljs-operator">+</span> c` is `(a <span class="hljs-operator">+</span> b) <span class="hljs-operator">+</span> c` <span class="hljs-operator">and</span> <span class="hljs-keyword">if</span> it is right<span class="hljs-operator">-</span>associative then `a <span class="hljs-operator">+</span> (b <span class="hljs-operator">+</span> c)</span>.
Most infix operators are left-associative.

Prefix and postfix operators in _Jacy_ all have one precedence by groups: postfix is stronger than prefix operator.

<div class="fold-block">
    <input id="input-3ad0ccaa1ad20ba05887f200ac0b923a" type="checkbox">
    <label class="clicker" for="input-3ad0ccaa1ad20ba05887f200ac0b923a">> Custom operators [future feature]</label>
    <blockquote class="content">Is is planned to add custom operators in the future, likely it will be similar to how Swift does it.
Anyway, the first versions won't allow customizing operators.
</blockquote>
</div>

#### Operator precedence table

This table shows which operators are stronger than others, associativity is marked as "left to right" for left-associative operators and "right to left" for right-associative operators.
This table also includes expressions that are not operator expressions, anyway, it might be helpful to know that they are parsed assuming this figurative precedence.

> Precedence index is placed just for some help, sometimes you need to know the order.

The table is from high to low precedence ordered -- the operators in the first row have the strongest precedence.

| Precedence index | Operator groups / expressions | Associativity |
|  | Paths (<span class="inline-code highlight-jc hljs"><span class="hljs-operator">::</span></span>) | N/A |
|  | Field expression (aka member access - <span class="inline-code highlight-jc hljs">a<span class="hljs-operator">.</span>b</span>) | left to right |
|  | Invocations (aka calls - <span class="inline-code highlight-jc hljs"><span class="hljs-title function_ invoke__">a</span>(<span class="hljs-operator">..</span><span class="hljs-operator">.</span>)`), array <span class="hljs-title function_ invoke__">access</span> (aka indexing <span class="hljs-operator">-</span> `a[<span class="hljs-operator">..</span><span class="hljs-operator">.</span>]</span>) | N/A |
|  | [Postfix operators] <span class="inline-code highlight-jc hljs">?</span> | N/A |
|  | [Prefix operators] <span class="inline-code highlight-jc hljs">!`, `<span class="hljs-operator">&amp;</span>`, `<span class="hljs-operator">&amp;</span><span class="hljs-keyword">mut</span>`, `<span class="hljs-operator">-</span>`, `<span class="hljs-operator">*</span></span> | N/A |
|  | <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">as</span></span> | left |
|  | <span class="inline-code highlight-jc hljs"><span class="hljs-operator">*</span>` `<span class="hljs-operator">/</span>` `<span class="hljs-operator">%</span></span> | left |
|  | <span class="inline-code highlight-jc hljs"><span class="hljs-operator">+</span>` `<span class="hljs-operator">-</span></span> | left |
|  | <span class="inline-code highlight-jc hljs"><span class="hljs-operator">..</span>` `<span class="hljs-operator">..</span><span class="hljs-operator">=</span></span> | Non-associative |
|  | <span class="inline-code highlight-jc hljs"><span class="hljs-operator">&lt;&lt;</span>` `<span class="hljs-operator">&gt;&gt;</span></span> | left |
|  | <span class="inline-code highlight-jc hljs"><span class="hljs-operator">&amp;</span></span> (infix) | left |
|  | <span class="inline-code highlight-jc hljs"><span class="hljs-operator">^</span></span> | left |
|  | <span class="inline-code highlight-jc hljs"><span class="hljs-operator">|</span></span> | left |
|  | <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">in</span></span> | Non-associative |
|  | <span class="inline-code highlight-jc hljs"><span class="hljs-operator">&lt;</span><span class="hljs-operator">=</span><span class="hljs-operator">&gt;</span></span> | Non-associative |
|  | <span class="inline-code highlight-jc hljs"><span class="hljs-operator">&lt;</span>` `<span class="hljs-operator">&gt;</span>` `<span class="hljs-operator">&lt;</span><span class="hljs-operator">=</span>` `<span class="hljs-operator">=</span><span class="hljs-operator">&gt;</span></span> | Non-associative |
|  | <span class="inline-code highlight-jc hljs"><span class="hljs-operator">=</span><span class="hljs-operator">=</span>` `<span class="hljs-operator">!=</span></span> | Non-associative |
|  | <span class="inline-code highlight-jc hljs"><span class="hljs-operator">and</span></span> | left |
|  | <span class="inline-code highlight-jc hljs"><span class="hljs-operator">or</span></span> | left |
|  | <span class="inline-code highlight-jc hljs"><span class="hljs-operator">=</span>` `<span class="hljs-operator">+=</span>` `<span class="hljs-operator">-=</span>` `<span class="hljs-operator">*=</span>` `<span class="hljs-operator">/=</span>` `<span class="hljs-operator">%=</span>` `<span class="hljs-operator">&amp;=</span>` `<span class="hljs-operator">|=</span>` `<span class="hljs-operator">^=</span>` `<span class="hljs-operator">&lt;&lt;=</span>` `<span class="hljs-operator">&gt;&gt;=</span></span> | left |

Prefix operators: <span class="inline-code highlight-jc hljs"><span class="hljs-operator">not</span>`, `<span class="hljs-operator">&amp;</span>` (b<span class="hljs-operator">or</span>row), `<span class="hljs-operator">&amp;</span><span class="hljs-keyword">mut</span>` (b<span class="hljs-operator">or</span>row <span class="hljs-keyword">as</span> mutable, `<span class="hljs-operator">&amp;</span>` <span class="hljs-operator">and</span> `<span class="hljs-keyword">mut</span>` can have whitespace between), `<span class="hljs-operator">-</span>` (negation), `<span class="hljs-operator">*</span></span> (dereference).

Postfix operators: <span class="inline-code highlight-jc hljs">?` (optional chaining), `!</span> (unwrap).

<div class="fold-block">
    <input id="input-e32e9b2c342496858232e24fee30cd46" type="checkbox">
    <label class="clicker" for="input-e32e9b2c342496858232e24fee30cd46">> Range operators precedence [why?]</label>
    <blockquote class="content">Range operators have this kind of precedence as we want to write <span class="inline-code highlight-jc hljs"a<span class="hljs-operator"..</spanb<span class="hljs-operator"+</span<span class="hljs-number"1</span` which means `a<span class="hljs-operator"..</span(b<span class="hljs-operator"+</span<span class="hljs-number"1</span)</spanas far as writing <span class="inline-code highlight-jc hljs"a<span class="hljs-operator"..</spanb <span class="hljs-operator"=</span<span class="hljs-operator"=</spanc<span class="hljs-operator"..</spand` which means `(a<span class="hljs-operator"..</spanb) <span class="hljs-operator"=</span<span class="hljs-operator"=</span(c<span class="hljs-operator"..</spand)</span</blockquote>
</div>

#### <span class="inline-code highlight-jc hljs"><span class="hljs-operator">not</span></span> prefix

_Jacy_ has a special feature -- you can put <span class="inline-code highlight-jc hljs"><span class="hljs-operator">not</span></span> operator before infix operator to negate boolean operation.
Example: <span class="inline-code highlight-jc hljs">a <span class="hljs-operator">not</span> <span class="hljs-keyword">in</span> b` is the same <span class="hljs-keyword">as</span> `<span class="hljs-operator">not</span> (a <span class="hljs-keyword">in</span> b)</span>.
This is useful for operators like <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">in</span>`, by the way, it is possible to write something like `a <span class="hljs-operator">not</span> <span class="hljs-operator">and</span> b` that would be the same <span class="hljs-keyword">as</span> `<span class="hljs-operator">not</span> (a <span class="hljs-operator">and</span> b)</span>, but code like this is hard to read.

Of course, when you write <span class="inline-code highlight-jc hljs">a <span class="hljs-operator">not</span> OP b` you got `<span class="hljs-operator">not</span> (a OP b)` thus keep <span class="hljs-keyword">in</span> mind that `OP</span> must be a logical operator, otherwise you'll have a type error.

### Punctuation

Some symbols are reserved punctuations, punctuations differ from operators in the sense that operators, obviously, perform some operations, whereas punctuations are used as syntax units: delimiters, disambiguators, etc.

Also, some symbols depend on the context, sometimes they can be operators, sometimes punctuations. E.g. <span class="inline-code highlight-jc hljs"><span class="hljs-operator">=</span>` is an assignment operat<span class="hljs-operator">or</span>, but only <span class="hljs-keyword">in</span> expressions, <span class="hljs-keyword">for</span> <span class="hljs-title class_">function</span> definition, we <span class="hljs-keyword">use</span> `<span class="hljs-operator">=</span></span> as body beginning (in expression-body case).

Symbols considered punctuations: <span class="inline-code highlight-jc hljs">(`, `)`, `[`, `]`, `{`, `}`, `,`, `;`, `:`, `<span class="hljs-operator">&lt;</span>`, `<span class="hljs-operator">&gt;</span></span> (in generics, not "less/greater than" operators).

## Intro

Let's begin with the cliché -- "Hello, world" in _Jacy_:

<div class="code-fence highlight-jc hljs">
            <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-title function_">main</span> {</div><div class="line-num" data-line-num="2">2</div><div class="line">    <span class="hljs-title function_ invoke__">print</span>(<span class="hljs-string">&quot;Hello, world&quot;</span>);</div><div class="line-num" data-line-num="3">3</div><div class="line">}</div>
        </div>

Here you can see:

- Functions in _Jacy_ are defined with <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">func</span></span> keyword.
- Parentheses are omitted -- if a function expects 0 parameters you're able not to write parentheses.
- _Jacy_ requires semicolons as a statement terminator.
- There's a <span class="inline-code highlight-jc hljs">main</span> function, that is, the entry point of the program, as in many other compiled programming languages.

<div class="fold-block">
    <input id="input-ef70f1ee0370354bbdf31bdcfc3e8f21" type="checkbox">
    <label class="clicker" for="input-ef70f1ee0370354bbdf31bdcfc3e8f21">> Optional semicolons</label>
    <blockquote class="content">You may notice that in _Jacy_ semicolon is a required terminator for statements.
In the first version, it would be so, anyway semicolon inference would be one of the first updates in future versions though.
</blockquote>
</div>

As we already started with a function, let's talk about them right after the introduction to literals.

### Primitive types & Literals

Primitive types in _Jacy_:

- boolean type: <span class="inline-code highlight-jc hljs"><span class="hljs-type">bool</span></span>.
- character type <span class="inline-code highlight-jc hljs"><span class="hljs-type">char</span></span>.
- signed integer types: <span class="inline-code highlight-jc hljs"><span class="hljs-type">i8</span>`, `<span class="hljs-type">i16</span>`, `<span class="hljs-type">i32</span>`, `<span class="hljs-type">i64</span>` <span class="hljs-operator">and</span> `<span class="hljs-type">int</span></span>.
- unsigned integer types: <span class="inline-code highlight-jc hljs"><span class="hljs-type">u8</span>`, `<span class="hljs-type">u16</span>`, `<span class="hljs-type">u32</span>`, `<span class="hljs-type">u64</span>` <span class="hljs-operator">and</span> `<span class="hljs-type">uint</span></span>.
- floating-point number types: <span class="inline-code highlight-jc hljs"><span class="hljs-type">f32</span>` <span class="hljs-operator">and</span> `<span class="hljs-type">f64</span></span>.
- slice type: <span class="inline-code highlight-jc hljs">[T]</span>.
- string slice type: <span class="inline-code highlight-jc hljs"><span class="hljs-type">str</span></span>.
- tuple type: <span class="inline-code highlight-jc hljs">(T1, T2, T3, <span class="hljs-operator">..</span><span class="hljs-operator">.</span>)</span>
- array type: <span class="inline-code highlight-jc hljs">[T; N]</span>

<div class="fold-block">
    <input id="input-c55c668b1bbd4234fcc7dd122826ebe0" type="checkbox">
    <label class="clicker" for="input-c55c668b1bbd4234fcc7dd122826ebe0">> Type naming</label>
    <blockquote class="content">Despite the names of primitive type, in _Jacy_, by convention, type names must begin with an upper-case letter.
Primitive type names are exceptions, you must use PascalCase (capitalized camelCase) for type names.
</blockquote>
</div>

#### Boolean

The boolean type can hold one of two values: <span class="inline-code highlight-jc hljs"><span class="hljs-literal">true</span>` <span class="hljs-operator">or</span> `<span class="hljs-literal">false</span></span>.

#### Character

In _Jacy_ characters are always valid, utf8 encoded Unicode points, thus the size of one character is 4 bytes.
In contrast to Rust, C, C++, and other languages that have character literal, in _Jacy_, you character literal is written in the same way as a string literal (as in Swift).

So, <span class="inline-code highlight-jc hljs"><span class="hljs-string">&quot;a&quot;</span>` can be a character, but `<span class="hljs-string">&quot;abcde&quot;</span></span> cannot, because it holds multiple characters (it is a string).
The question that you may come with is "How do I say that it is a character" -- you need to annotate the type of expression, depending on the context.
For variables, you need to write <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">let</span> <span class="hljs-variable">a</span>: <span class="hljs-type">char</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;a&quot;</span>`, but <span class="hljs-keyword">for</span> <span class="hljs-title class_">function</span>, you can just pass character without any an<span class="hljs-operator">not</span>ation `<span class="hljs-title function_ invoke__">foo</span>(<span class="hljs-string">&quot;a&quot;</span>)` <span class="hljs-keyword">if</span> function expects `<span class="hljs-type">char</span></span> as the first argument.

#### Integer types

Integer types in _Jacy_ exist in 4 static sizes: 8, 16, 32, and 64-bit size, and two kinds - signed and unsigned.
The types <span class="inline-code highlight-jc hljs"><span class="hljs-type">int</span>` <span class="hljs-operator">and</span> `<span class="hljs-type">uint</span>` are platf<span class="hljs-operator">or</span>m<span class="hljs-operator">-</span>dependent types, <span class="hljs-keyword">in</span> Rust, they are the same <span class="hljs-keyword">as</span> `isize` <span class="hljs-operator">and</span> `usize</span> respectively.

By default, integer literal is of type <span class="inline-code highlight-jc hljs"><span class="hljs-type">int</span></span>.
To create an integer literal of a specific type, you can use a type suffix same as a type name, e.g. for <span class="inline-code highlight-jc hljs"><span class="hljs-type">u8</span>` typed integer `<span class="hljs-number">123</span>` you write `<span class="hljs-number">123u8</span></span>.

<div class="fold-block">
    <input id="input-388c3f4d31bac5234d3887b82bd07a59" type="checkbox">
    <label class="clicker" for="input-388c3f4d31bac5234d3887b82bd07a59">> <span class="inline-code highlight-jc hljs"><span class="hljs-type">i128</span>` <span class="hljs-operator">and</span> `<span class="hljs-type">u128</span></span></label>
    <blockquote class="content">As you can see, there is no 128-bit sized integer type in _Jacy_ for now, by the way, they are in the future plan.
</blockquote>
</div>

#### Floating point types

For floating-point numbers, there're two types: <span class="inline-code highlight-jc hljs"><span class="hljs-type">f32</span>` <span class="hljs-operator">and</span> `<span class="hljs-type">f64</span></span> - 32-bit sized and 64-bit sized respectively.

Float literals support suffixes too as int's: <span class="inline-code highlight-jc hljs"><span class="hljs-number">1.6783f32</span>` <span class="hljs-operator">or</span> `<span class="hljs-number">55f64</span></span>.

<div class="fold-block">
    <input id="input-271f27446786dd8206194602f78ec97c" type="checkbox">
    <label class="clicker" for="input-271f27446786dd8206194602f78ec97c">> <span class="inline-code highlight-jc hljs">f128</span></label>
    <blockquote class="content">As 128-bit integers, <span class="inline-code highlight-jc hljs"f128</spanis in the future plan.
</blockquote>
</div>

#### Slice type

If you have no experience with Rust, slice type might be hard to comprehend. Slice is a kind of "view" into memory where data is placed, it is statically sized but the size is not unknown at compile-time.
In C, a slice would be the same as pointer + size, like <span class="inline-code highlight-jc hljs"><span class="hljs-type">char</span> <span class="hljs-operator">*</span> arr; <span class="hljs-type">int</span> size</span>. While in C you can access any address you want and you pass a size everywhere to know how many elements you have access to. In _Jacy_ it is impossible (without hack-like code) to access invalid memory locations.

Don't confuse "slice" in _Jacy_ with a slice of the list, etc. in other programming languages, while concepts are pretty relative.

Slice type is a type enclosed into brackets - <span class="inline-code highlight-jc hljs">[T]`, e<span class="hljs-operator">.</span>g<span class="hljs-operator">.</span> `[<span class="hljs-type">int</span>]</span> is an "int slice".

#### <span class="inline-code highlight-jc hljs"><span class="hljs-type">str</span></span> / String Slice type

There's one specific kind of slice that is used so often thus got his own type -- <span class="inline-code highlight-jc hljs"><span class="hljs-type">str</span></span>.
It is simply a string slice, pretty same as <span class="inline-code highlight-jc hljs">[<span class="hljs-type">char</span>]</span>.

#### Tuple type

Tuple is a heterogeneous collection, i.e. collection of different types. Tuple elements do not have names and can be accessed by index, e.g. <span class="inline-code highlight-jc hljs">(<span class="hljs-number">123</span>, <span class="hljs-number">666</span>)<span class="hljs-operator">.</span><span class="hljs-number">0</span>` will be `<span class="hljs-number">123</span></span>.

##### Unit type

Unit type is an empty tuple - <span class="inline-code highlight-jc hljs">()`, its purpose is the same <span class="hljs-keyword">as</span> of `void</span> in some programming languages.
By default, if type omitted - functions return <span class="inline-code highlight-jc hljs">()</span>.

#### Array type

Array is a homogeneous collection, i.e. all elements are of the same type. Arrays have static compile-time-known size, so you cannot resize it.

Array type looks like slice type but with size, ascription after <span class="inline-code highlight-jc hljs">;` <span class="hljs-operator">-</span> `[T; N]`, e<span class="hljs-operator">.</span>g<span class="hljs-operator">.</span> `[<span class="hljs-type">int</span>; <span class="hljs-number">100</span>]` is an array of `<span class="hljs-number">100</span></span> ints.

### Functions

You can declare a function with <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">func</span></span> keyword followed by its name, parameters, and body (there're also some more particles but we'll review them further).

Let's disassemble a simple function:

<div class="code-fence highlight-jc hljs">
            <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-title function_">add</span>(a: <span class="hljs-type">int</span>, b: <span class="hljs-type">int</span>): <span class="hljs-type">int</span> {</div><div class="line-num" data-line-num="2">2</div><div class="line">    <span class="hljs-keyword">return</span> a <span class="hljs-operator">+</span> b;</div><div class="line-num" data-line-num="3">3</div><div class="line">}</div>
        </div>

- <span class="inline-code highlight-jc hljs">(a: <span class="hljs-type">int</span>, b: <span class="hljs-type">int</span>)` is a parameter list <span class="hljs-keyword">where</span> `a` <span class="hljs-operator">and</span> `b` are names of parameters <span class="hljs-operator">and</span> `<span class="hljs-type">int</span></span>'s are types for each of them.
- After the parameter list goes return type, it is annotated with the same punctuation - <span class="inline-code highlight-jc hljs">:</span>
- Function body is enclosed into <span class="inline-code highlight-jc hljs">{}</span> (curly brackets, also I'll probably call them "braces" further)

To invoke <span class="inline-code highlight-jc hljs">add` we need to pass two integers <span class="hljs-keyword">in</span> it <span class="hljs-operator">-</span><span class="hljs-operator">-</span> `<span class="hljs-title function_ invoke__">add</span>(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>)`, this expression will result <span class="hljs-keyword">in</span> integer `<span class="hljs-number">3</span></span>.

#### Invocations with labels

_Jacy_ supports labeled arguments, it is a way to call a function without writing arguments in the same order as parameters are declared.

Let's call <span class="inline-code highlight-jc hljs">add</span> function from example above with named arguments:

<div class="code-fence highlight-jc hljs">
            <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-title function_ invoke__">add</span>(a: <span class="hljs-number">6</span>, b: <span class="hljs-number">13</span>); <span class="hljs-comment">// 19</span></div><div class="line-num" data-line-num="2">2</div><div class="line"><span class="hljs-title function_ invoke__">add</span>(b: <span class="hljs-number">13</span>, a: <span class="hljs-number">6</span>); <span class="hljs-comment">// 19. Order does not matter</span></div>
        </div>

#### Function overloading

_Jacy_ does not support type function overloading, but you can overload function with different parameter labels.

Example:

<div class="code-fence highlight-jc hljs">
            <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-title function_">add</span>(intA: <span class="hljs-type">int</span>, intB: <span class="hljs-type">int</span>): <span class="hljs-type">int</span> {</div><div class="line-num" data-line-num="2">2</div><div class="line">    <span class="hljs-keyword">return</span> intA <span class="hljs-operator">+</span> intB;</div><div class="line-num" data-line-num="3">3</div><div class="line">}</div><div class="line-num" data-line-num="4">4</div><div class="line"></div><div class="line-num" data-line-num="5">5</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-title function_">add</span>(floatA: <span class="hljs-type">f64</span>, floatB: <span class="hljs-type">f64</span>): <span class="hljs-type">f64</span> {</div><div class="line-num" data-line-num="6">6</div><div class="line">    <span class="hljs-keyword">return</span> floatA <span class="hljs-operator">+</span> floatB;</div><div class="line-num" data-line-num="7">7</div><div class="line">}</div>
        </div>

### Structures

Structures in _Jacy_ are declared the same way as in Rust:

<div class="code-fence highlight-jc hljs">
            <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">struct</span> <span class="hljs-title class_">MyStruct</span> {</div><div class="line-num" data-line-num="2">2</div><div class="line">    field: <span class="hljs-type">i32</span>,</div><div class="line-num" data-line-num="3">3</div><div class="line">}</div>
        </div>

### Traits

Traits are also similar to Rust:

<div class="code-fence highlight-jc hljs">
            <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">trait</span> <span class="hljs-title class_">DoesSmth</span> {</div><div class="line-num" data-line-num="2">2</div><div class="line">    <span class="hljs-keyword">func</span> <span class="hljs-title function_">doSmth</span>();</div><div class="line-num" data-line-num="3">3</div><div class="line">}</div>
        </div>
<div class="nav-btn-block">
    
    
</div>
