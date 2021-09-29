---
layout: 'default'
title: 'Const keyword'
nav_order: 100
parent: 'Compile time evaluation'
# No children
# No grandparent
---

# `const` keyword

In CTE `const` used to declare, obviously, a constant which will be evaluated at compile-time and which usages will be
inlined.

I wanna note that `const` is a synonym for compile-time evaluable expression, so further I'll use it in this context.

`const` must be immediately assigned when declared. Syntax.

```antlr4
'const' IDENT '=' expr
```

After `'='` goes an expression which MUST also be CTE, but not exactly another `const`.

The difference between `let` and `const` is that `const` is an item, whereas `let` is a statement. As being an item
`const` can be placed mostly on any level, including top-level.

<div class="code-fence highlight-jc hljs">
            <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">const</span> a <span class="hljs-operator">=</span> <span class="hljs-number">10</span></div><div class="line-num" data-line-num="2">2</div><div class="line"></div><div class="line-num" data-line-num="3">3</div><div class="line"><span class="hljs-keyword">trait</span> <span class="hljs-title class_">MyTrait</span> {</div><div class="line-num" data-line-num="4">4</div><div class="line">    <span class="hljs-keyword">const</span> traitConst <span class="hljs-operator">=</span> <span class="hljs-number">1010</span></div><div class="line-num" data-line-num="5">5</div><div class="line">}</div><div class="line-num" data-line-num="6">6</div><div class="line"></div><div class="line-num" data-line-num="7">7</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-title function_">main</span>() {</div><div class="line-num" data-line-num="8">8</div><div class="line">    <span class="hljs-keyword">const</span> b <span class="hljs-operator">=</span> <span class="hljs-number">123</span></div><div class="line-num" data-line-num="9">9</div><div class="line">}</div>
        </div>
<div class="nav-btn-block">
    <button class="nav-btn left">
    <a class="link" href="/Jacy-Dev-Book/compile-time-evaluation/index.html">< Compile time evaluation</a>
</button>

    <button class="nav-btn right">
    <a class="link" href="/Jacy-Dev-Book/compile-time-evaluation/cte-contexts.html">Cte contexts ></a>
</button>

</div>
