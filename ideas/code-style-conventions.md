---
layout: 'default'
title: 'Code style conventions'
nav_order: 101
parent: 'Ideas'
# No children
# No grandparent
---

# Code Style Conventions

As far as *Jacy* is VERY WIP, I won't describe serious conventions, thus it's gonna be here -- in ideas.

## Namings

Okay, I respect Rust, but snake_case is not kind of what most of people use I think, even not considering things like
"most people do ...", does not matter, I can describe everything from my view.

### To be (snake) or not to be

Actually, it does not matter for me. The only thing I won't accept is usage of, so called, PascalCase for functions,
variables, etc. except types, names.

### Intro and common rules

List of all writing styles referenced in convention:

- __camelCase__ - starts with lowercase letter, each next word starts with uppercase
- __PascalCase__ - starts with uppercase letter, each next word starts with uppercase
- __snake_case__ - each word starts with lowercase letter, words separated with <span class="inline-code highlight-jc hljs">_</span>
- __SCREAMING_SNAKE_CASE__ - all letters in uppercase, words separated with <span class="inline-code highlight-jc hljs">_</span>

All other variations MUST NOT be used in code.

Further in this text I will use "MUST" and "SHOULD", "MAY" (mostly for alternatives to things that "SHOULD BE..."), so
that gonna be clean what is my view.

"__Different code-styles MUST not be mixed__" is the most important rule here, I think. It means, that if somewhere here
is written that something "SHOULD BE ..." but "MAY BE ..." and you've chosen a described alternative -- use it
everywhere in your code.

### Variables and functions

Variables and functions SHOULD be named in __camelCase__: <span class="inline-code highlight-jc hljs">somethingSomewhere</span>, <span class="inline-code highlight-jc hljs">myFunction</span>, <span class="inline-code highlight-jc hljs">foo</span>, <span class="inline-code highlight-jc hljs">barBazFuzz</span>

Variables and functions MAY be named in __snake_case__: <span class="inline-code highlight-jc hljs">something_somewhere</span>, <span class="inline-code highlight-jc hljs">my_function</span>, <span class="inline-code highlight-jc hljs">foo</span>, <span class="inline-code highlight-jc hljs">bar_baz_fuzz</span>

If one of style is chosen it MUST be followed in the whole code.

### Constants

Talking about constants, I mean constants declared with <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">const</span></span>. Actually <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">let</span></span> without <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">mut</span></span> is a constant, but <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">let</span></span>
is under rule above

<span class="inline-code highlight-jc hljs"><span class="hljs-keyword">const</span></span> SHOULD BE named in __SCREAMING_SNAKE_CASE__: <span class="inline-code highlight-jc hljs">UNCHANGEABLE_VALUE</span>

Scientific constants like PI number MUST BE named in __SCREAMING_SNAKE_CASE__: <span class="inline-code highlight-jc hljs">PI</span>, <span class="inline-code highlight-jc hljs">G</span>

<span class="inline-code highlight-jc hljs"><span class="hljs-keyword">const</span></span> MAY BE named in __camelCase__: <span class="inline-code highlight-jc hljs">myImportantValue</span>

### Type names

Type names include names for:

- <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">struct</span></span>
- <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">trait</span></span>
- <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">enum</span></span>
- <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">type</span></span>
- type parameters (read further)

All types MUST be in __PascalCase__: <span class="inline-code highlight-jc hljs">MyType</span>, <span class="inline-code highlight-jc hljs">SomeStructure</span>, <span class="inline-code highlight-jc hljs">EnumWithEverythingINeed</span>

__Exception__ is built-in primitive types: <span class="inline-code highlight-jc hljs"><span class="hljs-type">i8</span></span>, <span class="inline-code highlight-jc hljs"><span class="hljs-type">i16</span></span>, <span class="inline-code highlight-jc hljs"><span class="hljs-type">i32</span></span>, <span class="inline-code highlight-jc hljs"><span class="hljs-type">int</span></span>, <span class="inline-code highlight-jc hljs"><span class="hljs-type">i64</span></span>, <span class="inline-code highlight-jc hljs"><span class="hljs-type">i128</span></span>, <span class="inline-code highlight-jc hljs"><span class="hljs-type">u8</span></span>, <span class="inline-code highlight-jc hljs"><span class="hljs-type">u16</span></span>, <span class="inline-code highlight-jc hljs"><span class="hljs-type">u32</span></span>, <span class="inline-code highlight-jc hljs"><span class="hljs-type">uint</span></span>, <span class="inline-code highlight-jc hljs"><span class="hljs-type">u64</span></span>,
<span class="inline-code highlight-jc hljs"><span class="hljs-type">u128</span></span>, <span class="inline-code highlight-jc hljs">isize</span>, <span class="inline-code highlight-jc hljs">usize</span>, <span class="inline-code highlight-jc hljs"><span class="hljs-type">f32</span></span>, <span class="inline-code highlight-jc hljs"><span class="hljs-type">f64</span></span>, <span class="inline-code highlight-jc hljs">double</span>, <span class="inline-code highlight-jc hljs"><span class="hljs-type">bool</span></span>, <span class="inline-code highlight-jc hljs"><span class="hljs-type">char</span></span>, <span class="inline-code highlight-jc hljs"><span class="hljs-type">str</span></span>

Nothing else CANNOT BE named in __PascalCase__ except user-defined types!

### Type parameters

Actually, type parameters are under rule above ("Type names"), anyway, they are styled a little bit different.

Type parameters MUST BE named in __PascalCase__: <span class="inline-code highlight-jc hljs">T</span>, <span class="inline-code highlight-jc hljs">U</span>, <span class="inline-code highlight-jc hljs">V</span> and SHOULD BE 1 character long.

As you can see, 1 uppercase character is used for type parameters, but which to use when there're more than one or usage
is specific? Here's the table of common cases:

|   Case   |   Names   |
| :------: | :-------- |
| Single "any" type | <span class="inline-code highlight-jc hljs">T</span> |
| Key-value types | <span class="inline-code highlight-jc hljs">K</span> for key and <span class="inline-code highlight-jc hljs">V</span> for value. Often used in mapping structures |
| Multiple types | First - <span class="inline-code highlight-jc hljs">T</span>, Second - <span class="inline-code highlight-jc hljs">S</span>, Third - <span class="inline-code highlight-jc hljs">U</span>, Fourth - <span class="inline-code highlight-jc hljs">V</span> |
| Meaningful types | <span class="inline-code highlight-jc hljs">TSize</span>, <span class="inline-code highlight-jc hljs">TInput</span>, <span class="inline-code highlight-jc hljs">TOutput</span> |
| A lot of "any" types | <span class="inline-code highlight-jc hljs">T0</span>, <span class="inline-code highlight-jc hljs">T1</span>, <span class="inline-code highlight-jc hljs">T2</span>, ..., <span class="inline-code highlight-jc hljs">TN</span>. Rarely needed, but can occur in, for example, tuple type implementations |

> "any" type imply cases when it is not important to refer to this type, and it just needed to be annotated.

### Modules (<span class="inline-code highlight-jc hljs"><span class="hljs-keyword">mod</span></span>)

<span class="inline-code highlight-jc hljs"><span class="hljs-keyword">mod</span></span> MUST BE named in __snake_case__: <span class="inline-code highlight-jc hljs">std</span>, <span class="inline-code highlight-jc hljs">my_lib</span>, <span class="inline-code highlight-jc hljs">some_module</span>
<div class="nav-btn-block">
    <button class="nav-btn left">
    <a class="link" href="/Jacy-Dev-Book/ideas/alg-effects">< Alg effects</a>
</button>

    <button class="nav-btn right">
    <a class="link" href="/Jacy-Dev-Book/ideas/extended-tools">Extensions & External tools ></a>
</button>

</div>
