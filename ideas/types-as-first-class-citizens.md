---
layout: 'default'
title: 'Types as first class citizens'
nav_order: 104
parent: 'Ideas'
# No children
# No grandparent
---

# Types as first-class citizens

The idea is growing from powerfulness of compile-time evaluation. All types must be known at compile-time, and as far as
I am going to implement comprehensive CTE system, "types as first-class citizens" sounds really fittable in this
picture.

## Type declarations

At first, I thought it would be nice if we could use <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">type</span></span> for declaring not only aliases to types but also use them in
the way as type variables. Types are items, all items are forwardly declared, that is, if some type is declared in a
scope, it can be used before it actually appears in the code. Example.

<div class="code-fence">
            <div class="copy"><i class="far fa-copy"></i></div>
            <div class="code line-numbers highlight-jc hljs">
                <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-title function_">foo</span> {</div><div class="line-num" data-line-num="2">2</div><div class="line">    <span class="hljs-keyword">let</span> <span class="hljs-variable">a</span>: MyType = <span class="hljs-number">123</span>;</div><div class="line-num" data-line-num="3">3</div><div class="line"></div><div class="line-num" data-line-num="4">4</div><div class="line">    <span class="hljs-keyword">type</span> <span class="hljs-title class_">MyType</span> = <span class="hljs-type">i32</span>;</div><div class="line-num" data-line-num="5">5</div><div class="line">}</div>
            </div>
        </div>

For me, it looks problematic as the control flow with types would be either impossible or weird.

<div class="code-fence">
            <div class="copy"><i class="far fa-copy"></i></div>
            <div class="code line-numbers highlight-jc hljs">
                <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-title function_">foo</span> {</div><div class="line-num" data-line-num="2">2</div><div class="line">    <span class="hljs-keyword">if</span> a {</div><div class="line-num" data-line-num="3">3</div><div class="line">        a = <span class="hljs-type">i64</span>;</div><div class="line-num" data-line-num="4">4</div><div class="line">    }</div><div class="line-num" data-line-num="5">5</div><div class="line"></div><div class="line-num" data-line-num="6">6</div><div class="line">    <span class="hljs-keyword">type</span> <span class="hljs-title class_">a</span> = <span class="hljs-type">i32</span>;</div><div class="line-num" data-line-num="7">7</div><div class="line">}</div>
            </div>
        </div>

Hmm... WTF???

Actually, control-flow for types is useless in the way of using declared aliases. Aliases are not dynamic, thus if we
declared one -- we already know what type it is. But what if we don't know what type we receive? E.g. in generics, we
get type parameter which is unknown, and what if it would be possible to check this type as a value?

### Dynamic type checks

Example.

<div class="code-fence">
            <div class="copy"><i class="far fa-copy"></i></div>
            <div class="code line-numbers highlight-jc hljs">
                <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-title function_">foo</span>&lt;T&gt;(arg: T) {</div><div class="line-num" data-line-num="2">2</div><div class="line">    <span class="hljs-keyword">if</span> T == <span class="hljs-type">bool</span> {</div><div class="line-num" data-line-num="3">3</div><div class="line">        <span class="hljs-title function_ invoke__">print</span>(<span class="hljs-string">&quot;We&#x27;ve got &#x27;bool&#x27;&quot;</span>);</div><div class="line-num" data-line-num="4">4</div><div class="line">    } <span class="hljs-keyword">else</span> {</div><div class="line-num" data-line-num="5">5</div><div class="line">        <span class="hljs-title function_ invoke__">print</span>(<span class="hljs-string">&quot;We&#x27;ve got not a &#x27;bool&#x27;&quot;</span>);</div><div class="line-num" data-line-num="6">6</div><div class="line">    }</div><div class="line-num" data-line-num="7">7</div><div class="line">}</div>
            </div>
        </div>

Looks useful, but... not, actually. I cannot come up with a case when this cannot be described with generics and
constraints.

### Returning types
<div class="nav-btn-block">
    <button class="nav-btn left">
    <a class="link" href="/Jacy-Dev-Book/ideas/named-arg-alias.md">< Named arg alias</a>
</button>

    
</div>
