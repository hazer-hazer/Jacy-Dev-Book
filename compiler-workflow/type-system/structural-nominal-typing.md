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

* Structurally typed records (aka <span class="inline-code highlight-jc hljs">record</span> or named-tuple)
* Nominally typed records (aka <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">struct</span></span>)
* Structurally typed tuples (raw tuples)
* Nominally typed tuples (aka rustish tuple-structs)

## Problems

### Structurally typed records

I consider using <span class="inline-code highlight-jc hljs">()</span> for tuples and <span class="inline-code highlight-jc hljs">{}</span> for structs. Anyway, there are some problems, as far as we've got
block-expression. <span class="inline-code highlight-jc hljs">{}</span> can be either a block-expression, either struct literal. This is why struct-literal is always
nominal: <span class="inline-code highlight-jc hljs">path::to::Struct {...}</span>.

Why not use <span class="inline-code highlight-jc hljs">()</span> and use named-tuples for structurally typed records? - I want to change syntax of lambda functions
(which now use <span class="inline-code highlight-jc hljs">|params...| expression</span> syntax) to <span class="inline-code highlight-jc hljs">(params...) <span class="hljs-operator">-&gt;</span> expression</span>. As far as lambda parameters can have
type annotation we cannot disambiguate named-tuple and lambda parameters, because in named-tuple we have `name:
expression<span class="inline-code highlight-jc hljs"> but <span class="hljs-keyword">in</span> lambda parameters </span>name: type`.

#### Solutions

##### \#1 I don't like this one anyway

* Use <span class="inline-code highlight-jc hljs">|params...| expression</span> syntax for lambda functions
* Use <span class="inline-code highlight-jc hljs">(name: expression)</span> syntax for named-tuples

##### #2

* Use <span class="inline-code highlight-jc hljs">record {name: expression}</span>

Why this is a bad solution:

* We reserve new keyword for mostly

##### #3

This is the most complex way, but it likely will allow us to save all preferred syntaxes. We improve parsing of
expressions enclosed into <span class="inline-code highlight-jc hljs">()</span> and save everything inside <span class="inline-code highlight-jc hljs">()</span> into some stack. Then if we see that there's a <span class="inline-code highlight-jc hljs"><span class="hljs-operator">-&gt;</span></span> after
<span class="inline-code highlight-jc hljs">)</span> -- it is a lambda, otherwise -- it is a named-tuple. As knowing that, we can parse tokens inside <span class="inline-code highlight-jc hljs">()</span> considering
<span class="inline-code highlight-jc hljs">something</span> in <span class="inline-code highlight-jc hljs">(name: something)</span> to be either an expression either type.

Example.

<div class="code-fence line-numbers highlight-jc hljs">
            <div class="copy">copy</div>
            <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">let</span> <span class="hljs-variable">a</span> = (name: <span class="hljs-number">123</span>)</div><div class="line-num" data-line-num="2">2</div><div class="line"><span class="hljs-keyword">let</span> <span class="hljs-variable">b</span> = (param: <span class="hljs-type">i32</span>) <span class="hljs-operator">-&gt;</span> param + <span class="hljs-number">1</span></div>
        </div>

When we parse <span class="inline-code highlight-jc hljs">a</span>'s and <span class="inline-code highlight-jc hljs">b</span>'s assigned expressions we see <span class="inline-code highlight-jc hljs">(</span>, then collect all tokens until we find <span class="inline-code highlight-jc hljs">)</span> and if we found
<span class="inline-code highlight-jc hljs"><span class="hljs-operator">-&gt;</span></span> after <span class="inline-code highlight-jc hljs">)</span> -- we parse these tokens as lambda parameters (<span class="inline-code highlight-jc hljs">b</span> case), if there isn't <span class="inline-code highlight-jc hljs"><span class="hljs-operator">-&gt;</span></span> after <span class="inline-code highlight-jc hljs">)</span> -- we parse
tokens as named-tuple (<span class="inline-code highlight-jc hljs">a</span> case).

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
>   <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">struct</span></span>)
<div class="nav-btn-block">
    <button class="nav-btn left">
    <a class="link" href="/Jacy-Dev-Book/compiler-workflow/type-system/index.html">< Type System</a>
</button>

    
</div>
