---
layout: 'default'
title: 'Std annotations'
nav_order: 111
parent: 'Particles [β RFCs]'
# No children
# No grandparent
---

# `std` annotations

## Analysis helpers

Converter marker:

<div class="code-fence highlight-jc hljs">
            <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">impl</span> <span class="hljs-title class_">String</span> {</div><div class="line-num" data-line-num="2">2</div><div class="line">    <span class="hljs-operator">@</span><span class="hljs-title function_ invoke__">apiMarker</span>(kind: <span class="hljs-string">&quot;converter&quot;</span>)</div><div class="line-num" data-line-num="3">3</div><div class="line">    <span class="hljs-keyword">func</span> <span class="hljs-title function_">toInt</span>() <span class="hljs-operator">=</span> <span class="hljs-title function_ invoke__">parseInt</span>(<span class="hljs-keyword">self</span>);</div><div class="line-num" data-line-num="4">4</div><div class="line">}</div><div class="line-num" data-line-num="5">5</div><div class="line"></div><div class="line-num" data-line-num="6">6</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-title function_">main</span> {</div><div class="line-num" data-line-num="7">7</div><div class="line">    <span class="hljs-keyword">let</span> <span class="hljs-variable">s</span>: <span class="hljs-type">String</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;123&quot;</span>;</div><div class="line-num" data-line-num="8">8</div><div class="line">    <span class="hljs-keyword">let</span> <span class="hljs-variable">a</span>: <span class="hljs-type">int</span> <span class="hljs-operator">=</span> s;</div><div class="line-num" data-line-num="9">9</div><div class="line">}</div>
        </div>

And this code will produce an error like:

```plaintext
Invalid type String for int
Note: try call s.toInt()
```
<div class="nav-btn-block">
    <button class="nav-btn left">
    <a class="link" href="/Jacy-Dev-Book/particles/soft-keywords.html">< Soft keywords</a>
</button>

    <button class="nav-btn right">
    <a class="link" href="/Jacy-Dev-Book/particles/strings.html">Strings ></a>
</button>

</div>
