---
layout: 'default'
title: 'Compile time evaluation'
nav_order: 103
# No parent
has_children: true
# No grandparent
---

# Compile-Time Evaluation

One thing I appreciate much is the ability of compile-time evaluation (CTE - compile-time evaluated(-ion) further)
Unlike Zig, there's no hardly separate syntax like <span class="inline-code highlight-jc hljs">comptime</span>, etc., as far as we don't base something else (like type
parameters in Zig) on CTE, we only use it for computations.

There are some terms we need to establish:

* <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">const</span></span> keyword in the context of CTE
* CTE contexts
* CTE functions
* CTE expressions
<div class="nav-btn-block">
    
    <button class="nav-btn right">
    <a class="link" href="/dev-book/compile-time-evaluation/const-keyword">Const keyword ></a>
</button>

</div>
