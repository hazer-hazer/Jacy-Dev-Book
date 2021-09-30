---
layout: 'default'
title: 'Cte contexts'
nav_order: 101
parent: 'Compile time evaluation'
# No children
# No grandparent
---

# CTE Contexts

In some places, we cannot put run-time computed expressions, e.g. when we declare a fixed-sized array <span class="inline-code highlight-jc hljs">[T; <span class="hljs-title function_ invoke__">getSize</span>()]</span>,
<span class="inline-code highlight-jc hljs"><span class="hljs-title function_ invoke__">getSize</span>()</span> function must be CTE.

Here's the list of all (I hope) this kind of places (<span class="inline-code highlight-jc hljs">N</span> and <span class="inline-code highlight-jc hljs">M</span> are <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">const</span></span> expressions):

* Array types <span class="inline-code highlight-jc hljs">[T; N]</span>
* Fill-array generator <span class="inline-code highlight-jc hljs">[<span class="hljs-number">0</span>; N]</span> (generate an array of <span class="inline-code highlight-jc hljs">N</span> zeros)
* When we set default value for <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">const</span></span> parameter like <span class="inline-code highlight-jc hljs">&lt;<span class="hljs-keyword">const</span> N: usize = M&gt;</span>
* Enum discriminant <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">enum</span> <span class="hljs-title class_">MyEnum</span> { Kind = N }</span>
* <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">static</span></span> items initializers
<div class="nav-btn-block">
    <button class="nav-btn left">
    <a class="link" href="/Jacy-Dev-Book/compile-time-evaluation/const-keyword.html">< Const keyword</a>
</button>

    <button class="nav-btn right">
    <a class="link" href="/Jacy-Dev-Book/compile-time-evaluation/cte-expressions.html">Cte expressions ></a>
</button>

</div>
