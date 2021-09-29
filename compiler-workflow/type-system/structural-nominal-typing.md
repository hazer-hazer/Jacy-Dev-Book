---
layout: 'default'
title: 'Structural nominal typing'
nav_order: 100
parent: 'Type System'
# No children
grand_parent: 'Compiler Workflow'
---

# Structural/Nominal typing

I wanna both:

* Structurally typed records (aka `record` or named-tuple)
* Nominally typed records (aka `struct`)
* Structurally typed tuples (raw tuples)
* Nominally typed tuples (aka rustish tuple-structs)

## Problems

### Structurally typed records

I consider using `()` for tuples and `{}` for structs. Anyway, there are some problems, as far as we've got
block-expression. `{}` can be either a block-expression, either struct literal. This is why struct-literal is always
nominal: `path::to::Struct {...}`.

Why not use `()` and use named-tuples for structurally typed records? - I want to change syntax of lambda functions
(which now use `|params...| expression` syntax) to `(params...) -> expression`. As far as lambda parameters can have
type annotation we cannot disambiguate named-tuple and lambda parameters, because in named-tuple we have `name:
expression` but in lambda parameters `name: type`.

#### Solutions

##### \#1 I don't like this one anyway

* Use `|params...| expression` syntax for lambda functions
* Use `(name: expression)` syntax for named-tuples

##### #2

* Use `record {name: expression}`

Why this is a bad solution:

* We reserve new keyword for mostly

##### #3

This is the most complex way, but it likely will allow us to save all preferred syntaxes. We improve parsing of
expressions enclosed into `()` and save everything inside `()` into some stack. Then if we see that there's a `->` after
`)` -- it is a lambda, otherwise -- it is a named-tuple. As knowing that, we can parse tokens inside `()` considering
`something` in `(name: something)` to be either an expression either type.

Example.

<div class="code-fence highlight-jc hljs">
            <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">let</span> <span class="hljs-variable">a</span> <span class="hljs-operator">=</span> (name: <span class="hljs-number">123</span>)</div><div class="line-num" data-line-num="2">2</div><div class="line"><span class="hljs-keyword">let</span> <span class="hljs-variable">b</span> <span class="hljs-operator">=</span> (param: <span class="hljs-type">i32</span>) <span class="hljs-operator">-</span><span class="hljs-operator">&gt;</span> param <span class="hljs-operator">+</span> <span class="hljs-number">1</span></div>
        </div>

When we parse `a`'s and `b`'s assigned expressions we see `(`, then collect all tokens until we find `)` and if we found
`->` after `)` -- we parse these tokens as lambda parameters (`b` case), if there isn't `->` after `)` -- we parse
tokens as named-tuple (`a` case).

###### #4

* Do not have structurally typed records at all

> I think this solution wins, why?
>
> * We won't have additional confusing syntax
> * We don't implement something we would rarely use (tuples are more
>
>   convenient than named-tuples in most cases)
>
> * Structurally typed records are not really useful (we cannot add
>
>   implementations for them, so in every complex case we would prefer
>
>   `struct`)
<div class="nav-btn-block">
    <button class="nav-btn left">
    <a class="link" href="/Jacy-Dev-Book/compiler-workflow/type-system/index.html">< Type System</a>
</button>

    
</div>
