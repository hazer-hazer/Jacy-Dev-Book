---
layout: 'default'
title: 'Goal'
nav_order: 100
parent: 'Concept'
# No children
# No grandparent
---

# Goal

This is a list of features and examples I wish would be possible in *Jacy*.

## Main features

### *Jacy* is safe

- *Jacy* follows Rust' borrowing rules

### References

<div class="code-fence">
            <div class="copy">copy</div>
            <div class="code line-numbers highlight-jc hljs">
                <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">let</span> <span class="hljs-variable">a</span> = <span class="hljs-number">123</span>;</div><div class="line-num" data-line-num="2">2</div><div class="line"><span class="hljs-keyword">let</span> <span class="hljs-variable">b</span> = &amp;a; <span class="hljs-comment">// Borrow <span class="inline-code highlight-jc hljs">a</span></span></div><div class="line-num" data-line-num="3">3</div><div class="line"></div><div class="line-num" data-line-num="4">4</div><div class="line"><span class="hljs-keyword">let</span> <span class="hljs-keyword">mut </span><span class="hljs-variable">value</span> = <span class="hljs-number">0</span>;</div><div class="line-num" data-line-num="5">5</div><div class="line"><span class="hljs-keyword">let</span> <span class="hljs-variable">bor</span> = &amp;<span class="hljs-keyword">mut</span> value;</div><div class="line-num" data-line-num="6">6</div><div class="line">*bor = <span class="hljs-number">1000</span>;</div><div class="line-num" data-line-num="7">7</div><div class="line"><span class="hljs-title function_ invoke__">print</span>(value); <span class="hljs-comment">// Prints <span class="inline-code highlight-jc hljs"><span class="hljs-number">1000</span></span></span></div>
            </div>
        </div>

### Non-Copy types are passed by reference

### *Jacy* supports structural sub-typing with tuples

<div class="code-fence">
            <div class="copy">copy</div>
            <div class="code line-numbers highlight-jc hljs">
                <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">let</span> <span class="hljs-variable">t</span> = (<span class="hljs-string">&quot;abcdef&quot;</span>, <span class="hljs-number">2.0</span>, <span class="hljs-number">123</span>);</div><div class="line-num" data-line-num="2">2</div><div class="line"></div><div class="line-num" data-line-num="3">3</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-title function_">foo</span>(tup: (<span class="hljs-type">str</span>, float, <span class="hljs-type">int</span>));</div>
            </div>
        </div>

## *Jacy* is functional

### Pattern matching

<div class="code-fence">
            <div class="copy">copy</div>
            <div class="code line-numbers highlight-jc hljs">
                <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">let</span> <span class="hljs-variable">a</span> = (<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>);</div><div class="line-num" data-line-num="2">2</div><div class="line"><span class="hljs-keyword">let</span> (f, s, t) = a;</div><div class="line-num" data-line-num="3">3</div><div class="line"></div><div class="line-num" data-line-num="4">4</div><div class="line"><span class="hljs-keyword">match</span> a {</div><div class="line-num" data-line-num="5">5</div><div class="line">    (f, s, t) <span class="hljs-operator">=&gt;</span> <span class="hljs-comment">// Do something with <span class="inline-code highlight-jc hljs">f</span>, <span class="inline-code highlight-jc hljs">s</span> and <span class="inline-code highlight-jc hljs">t</span></span></div><div class="line-num" data-line-num="6">6</div><div class="line">}</div>
            </div>
        </div>

#### It is possible to ignore non-important fields

<div class="code-fence">
            <div class="copy">copy</div>
            <div class="code line-numbers highlight-jc hljs">
                <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">match</span> a {</div><div class="line-num" data-line-num="2">2</div><div class="line">    (f, ...) <span class="hljs-operator">=&gt;</span> <span class="hljs-comment">// Do something with <span class="inline-code highlight-jc hljs">f</span> only</span></div><div class="line-num" data-line-num="3">3</div><div class="line">}</div>
            </div>
        </div>

#### Matched expression can be borrowed

<div class="code-fence">
            <div class="copy">copy</div>
            <div class="code line-numbers highlight-jc hljs">
                <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">match</span> a {</div><div class="line-num" data-line-num="2">2</div><div class="line">    (<span class="hljs-keyword">ref</span> f, ...) <span class="hljs-operator">=&gt;</span> <span class="hljs-comment">// Do something with <span class="inline-code highlight-jc hljs">f</span> as reference to <span class="inline-code highlight-jc hljs">a.<span class="hljs-number">0</span></span></span></div><div class="line-num" data-line-num="3">3</div><div class="line">}</div>
            </div>
        </div>

### Lambdas (closures)

<div class="code-fence">
            <div class="copy">copy</div>
            <div class="code line-numbers highlight-jc hljs">
                <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">let</span> <span class="hljs-variable">l</span> = x <span class="hljs-operator">-&gt;</span> x * <span class="hljs-number">2</span>;</div><div class="line-num" data-line-num="2">2</div><div class="line"><span class="hljs-title function_ invoke__">print</span>(<span class="hljs-title function_ invoke__">l</span>(<span class="hljs-number">2</span>)); <span class="hljs-comment">// 4</span></div>
            </div>
        </div>

### Pipeline operator

<div class="code-fence">
            <div class="copy">copy</div>
            <div class="code line-numbers highlight-jc hljs">
                <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-number">2</span> |&gt; l |&gt; print; <span class="hljs-comment">// 4</span></div>
            </div>
        </div>

### *Jacy* is Object-Oriented

Claiming that OOP means that PL has structures containing data and methods -- *Jacy* is OOP language.

<div class="code-fence">
            <div class="copy">copy</div>
            <div class="code line-numbers highlight-jc hljs">
                <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">struct</span> <span class="hljs-title class_">A</span> {</div><div class="line-num" data-line-num="2">2</div><div class="line">    field: <span class="hljs-type">i32</span>,</div><div class="line-num" data-line-num="3">3</div><div class="line">}</div><div class="line-num" data-line-num="4">4</div><div class="line"></div><div class="line-num" data-line-num="5">5</div><div class="line"><span class="hljs-keyword">impl</span> <span class="hljs-title class_">A</span> {</div><div class="line-num" data-line-num="6">6</div><div class="line">    <span class="hljs-keyword">func</span> <span class="hljs-title function_">foo</span> {</div><div class="line-num" data-line-num="7">7</div><div class="line">        <span class="hljs-title function_ invoke__">print</span>(<span class="hljs-keyword">self</span>.field);</div><div class="line-num" data-line-num="8">8</div><div class="line">    }</div><div class="line-num" data-line-num="9">9</div><div class="line">}</div>
            </div>
        </div>

#### *Jacy* respects composition over inheritance

#### Struct implementations can be extended

<div class="code-fence">
            <div class="copy">copy</div>
            <div class="code line-numbers highlight-jc hljs">
                <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">struct</span> <span class="hljs-title class_">A</span> {</div><div class="line-num" data-line-num="2">2</div><div class="line">    field: <span class="hljs-type">i32</span>,</div><div class="line-num" data-line-num="3">3</div><div class="line">}</div><div class="line-num" data-line-num="4">4</div><div class="line"></div><div class="line-num" data-line-num="5">5</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-title function_">A</span>::foo {</div><div class="line-num" data-line-num="6">6</div><div class="line">    <span class="hljs-title function_ invoke__">print</span>(<span class="hljs-keyword">self</span>.field);</div><div class="line-num" data-line-num="7">7</div><div class="line">}</div>
            </div>
        </div>

### No GC

Jacy doesn't have Garbage Collector, as far as it is statically sets <span class="inline-code highlight-jc hljs">free</span> points.

### *Jacy* respects Compile-Time Evaluation

<div class="code-fence">
            <div class="copy">copy</div>
            <div class="code line-numbers highlight-jc hljs">
                <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">const</span> a = <span class="hljs-number">123</span>;</div><div class="line-num" data-line-num="2">2</div><div class="line"></div><div class="line-num" data-line-num="3">3</div><div class="line"><span class="hljs-keyword">const</span> <span class="hljs-keyword">func</span> <span class="hljs-title function_">fib</span>(n: <span class="hljs-type">i32</span>): <span class="hljs-type">u64</span> = <span class="hljs-keyword">match</span> n {</div><div class="line-num" data-line-num="4">4</div><div class="line">    i32::MIN..=<span class="hljs-number">0</span> <span class="hljs-operator">=&gt;</span> <span class="hljs-title function_ invoke__">panic</span>(<span class="hljs-string">&quot;<span class="inline-code highlight-jc hljs">n</span> is negative or zero&quot;</span>),</div><div class="line-num" data-line-num="5">5</div><div class="line">    <span class="hljs-number">1</span> | <span class="hljs-number">2</span> <span class="hljs-operator">=&gt;</span> <span class="hljs-number">1</span>,</div><div class="line-num" data-line-num="6">6</div><div class="line">    <span class="hljs-number">3</span> <span class="hljs-operator">=&gt;</span> <span class="hljs-number">2</span>,</div><div class="line-num" data-line-num="7">7</div><div class="line">    _ <span class="hljs-operator">=&gt;</span> <span class="hljs-title function_ invoke__">fib</span>(n - <span class="hljs-number">1</span>) + <span class="hljs-title function_ invoke__">fib</span>(n - <span class="hljs-number">2</span>),</div><div class="line-num" data-line-num="8">8</div><div class="line">}</div><div class="line-num" data-line-num="9">9</div><div class="line"></div><div class="line-num" data-line-num="10">10</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-title function_">main</span> {</div><div class="line-num" data-line-num="11">11</div><div class="line">    <span class="hljs-keyword">const</span> fib100 = <span class="hljs-title function_ invoke__">fib</span>(<span class="hljs-number">100</span>); <span class="hljs-comment">// 100 fibonacci number computed at compile-time</span></div><div class="line-num" data-line-num="12">12</div><div class="line">    <span class="hljs-title function_ invoke__">print</span>(fib100);</div><div class="line-num" data-line-num="13">13</div><div class="line">}</div>
            </div>
        </div>
<div class="nav-btn-block">
    <button class="nav-btn left">
    <a class="link" href="/Jacy-Dev-Book/concept/index.html">< Concept</a>
</button>

    <button class="nav-btn right">
    <a class="link" href="/Jacy-Dev-Book/concept/the-idea.html">The idea ></a>
</button>

</div>
