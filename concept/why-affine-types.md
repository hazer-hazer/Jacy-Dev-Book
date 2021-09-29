---
layout: 'default'
title: 'Why affine types'
nav_order: 102
parent: 'Concept'
# No children
# No grandparent
---

# Why affine types

Affine types are a version of linear types that do allow only single use of an object as linear types but allows discarding value, i.e. not using it.

_Jacy_ supports affine types, not linear, however, linearity logic is controlled with warnings, i.e. the compiler will give a warning if you didn't use the value.

<div class="code-fence highlight-jc hljs">
            <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-title function_">foo</span>() {</div><div class="line-num" data-line-num="2">2</div><div class="line">    <span class="hljs-keyword">let</span> <span class="hljs-variable">r</span> = <span class="hljs-title function_ invoke__">Rc</span>(<span class="hljs-number">0</span>);</div><div class="line-num" data-line-num="3">3</div><div class="line">    <span class="hljs-keyword">let</span> <span class="hljs-variable">r1</span> = Rc::<span class="hljs-title function_ invoke__">clone</span>(r);</div><div class="line-num" data-line-num="4">4</div><div class="line">}</div>
        </div>
<div class="nav-btn-block">
    <button class="nav-btn left">
    <a class="link" href="/Jacy-Dev-Book/concept/the-idea.html">< The idea</a>
</button>

    
</div>
