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

#### *Jacy* is safe

- *Jacy* follows Rust' borrowing rules

#### References

<pre class="code-fence highlight-jc hljs">
            <table class="code-table"><tr><td class="line-num-col"><div class="line-num" data-line-num="1"></div></td><td class="line-col"><div class="line-content"><span class="hljs-keyword">let</span> <span class="hljs-variable">a</span> = <span class="hljs-number">123</span>;</div></td></tr><tr><td class="line-num-col"><div class="line-num" data-line-num="2"></div></td><td class="line-col"><div class="line-content"><span class="hljs-keyword">let</span> <span class="hljs-variable">b</span> = &amp;a; <span class="hljs-comment">// Borrow `a`</span></div></td></tr><tr><td class="line-num-col"><div class="line-num" data-line-num="3"></div></td><td class="line-col"><div class="line-content"></div></td></tr><tr><td class="line-num-col"><div class="line-num" data-line-num="4"></div></td><td class="line-col"><div class="line-content"><span class="hljs-keyword">let</span> <span class="hljs-keyword">mut </span><span class="hljs-variable">value</span> = <span class="hljs-number">0</span>;</div></td></tr><tr><td class="line-num-col"><div class="line-num" data-line-num="5"></div></td><td class="line-col"><div class="line-content"><span class="hljs-keyword">let</span> <span class="hljs-variable">bor</span> = &amp;<span class="hljs-keyword">mut</span> value;</div></td></tr><tr><td class="line-num-col"><div class="line-num" data-line-num="6"></div></td><td class="line-col"><div class="line-content">*bor = <span class="hljs-number">1000</span>;</div></td></tr><tr><td class="line-num-col"><div class="line-num" data-line-num="7"></div></td><td class="line-col"><div class="line-content"><span class="hljs-title function_ invoke__">print</span>(value); <span class="hljs-comment">// Prints `1000`</span></div></td></tr></table>
        </pre>

#### Non-Copy types are passed by reference

#### *Jacy* supports structural sub-typing with tuples

<pre class="code-fence highlight-jc hljs">
            <table class="code-table"><tr><td class="line-num-col"><div class="line-num" data-line-num="1"></div></td><td class="line-col"><div class="line-content"><span class="hljs-keyword">let</span> <span class="hljs-variable">t</span> = (<span class="hljs-string">&quot;abcdef&quot;</span>, <span class="hljs-number">2.0</span>, <span class="hljs-number">123</span>);</div></td></tr><tr><td class="line-num-col"><div class="line-num" data-line-num="2"></div></td><td class="line-col"><div class="line-content"></div></td></tr><tr><td class="line-num-col"><div class="line-num" data-line-num="3"></div></td><td class="line-col"><div class="line-content"><span class="hljs-keyword">func</span> <span class="hljs-title function_">foo</span>(tup: (<span class="hljs-type">str</span>, float, <span class="hljs-type">int</span>));</div></td></tr></table>
        </pre>

### *Jacy* is functional

#### Pattern matching

<pre class="code-fence highlight-jc hljs">
            <table class="code-table"><tr><td class="line-num-col"><div class="line-num" data-line-num="1"></div></td><td class="line-col"><div class="line-content"><span class="hljs-keyword">let</span> <span class="hljs-variable">a</span> = (<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>);</div></td></tr><tr><td class="line-num-col"><div class="line-num" data-line-num="2"></div></td><td class="line-col"><div class="line-content"><span class="hljs-keyword">let</span> (f, s, t) = a;</div></td></tr><tr><td class="line-num-col"><div class="line-num" data-line-num="3"></div></td><td class="line-col"><div class="line-content"></div></td></tr><tr><td class="line-num-col"><div class="line-num" data-line-num="4"></div></td><td class="line-col"><div class="line-content"><span class="hljs-keyword">match</span> a {</div></td></tr><tr><td class="line-num-col"><div class="line-num" data-line-num="5"></div></td><td class="line-col"><div class="line-content">    (f, s, t) =&gt; <span class="hljs-comment">// Do something with `f`, `s` and `t`</span></div></td></tr><tr><td class="line-num-col"><div class="line-num" data-line-num="6"></div></td><td class="line-col"><div class="line-content">}</div></td></tr></table>
        </pre>

##### It is possible to ignore non-important fields

<pre class="code-fence highlight-jc hljs">
            <table class="code-table"><tr><td class="line-num-col"><div class="line-num" data-line-num="1"></div></td><td class="line-col"><div class="line-content"><span class="hljs-keyword">match</span> a {</div></td></tr><tr><td class="line-num-col"><div class="line-num" data-line-num="2"></div></td><td class="line-col"><div class="line-content">    (f, ...) =&gt; <span class="hljs-comment">// Do something with `f` only</span></div></td></tr><tr><td class="line-num-col"><div class="line-num" data-line-num="3"></div></td><td class="line-col"><div class="line-content">}</div></td></tr></table>
        </pre>

##### Matched expression can be borrowed

<pre class="code-fence highlight-jc hljs">
            <table class="code-table"><tr><td class="line-num-col"><div class="line-num" data-line-num="1"></div></td><td class="line-col"><div class="line-content"><span class="hljs-keyword">match</span> a {</div></td></tr><tr><td class="line-num-col"><div class="line-num" data-line-num="2"></div></td><td class="line-col"><div class="line-content">    (<span class="hljs-keyword">ref</span> f, ...) =&gt; <span class="hljs-comment">// Do something with `f` as reference to `a.0`</span></div></td></tr><tr><td class="line-num-col"><div class="line-num" data-line-num="3"></div></td><td class="line-col"><div class="line-content">}</div></td></tr></table>
        </pre>

##### Lambdas (closures)

<pre class="code-fence highlight-jc hljs">
            <table class="code-table"><tr><td class="line-num-col"><div class="line-num" data-line-num="1"></div></td><td class="line-col"><div class="line-content"><span class="hljs-keyword">let</span> <span class="hljs-variable">l</span> = x <span class="hljs-punctuation">-&gt;</span> x * <span class="hljs-number">2</span>;</div></td></tr><tr><td class="line-num-col"><div class="line-num" data-line-num="2"></div></td><td class="line-col"><div class="line-content"><span class="hljs-title function_ invoke__">print</span>(<span class="hljs-title function_ invoke__">l</span>(<span class="hljs-number">2</span>)); <span class="hljs-comment">// 4</span></div></td></tr></table>
        </pre>

##### Pipeline operator

<pre class="code-fence highlight-jc hljs">
            <table class="code-table"><tr><td class="line-num-col"><div class="line-num" data-line-num="1"></div></td><td class="line-col"><div class="line-content"><span class="hljs-number">2</span> |&gt; l |&gt; print; <span class="hljs-comment">// 4</span></div></td></tr></table>
        </pre>

### *Jacy* is Object-Oriented

Claiming that OOP means that PL has structures containing data and methods -- *Jacy* is OOP language.

<pre class="code-fence highlight-jc hljs">
            <table class="code-table"><tr><td class="line-num-col"><div class="line-num" data-line-num="1"></div></td><td class="line-col"><div class="line-content"><span class="hljs-keyword">struct</span> <span class="hljs-title class_">A</span> {</div></td></tr><tr><td class="line-num-col"><div class="line-num" data-line-num="2"></div></td><td class="line-col"><div class="line-content">    field: <span class="hljs-type">i32</span>,</div></td></tr><tr><td class="line-num-col"><div class="line-num" data-line-num="3"></div></td><td class="line-col"><div class="line-content">}</div></td></tr><tr><td class="line-num-col"><div class="line-num" data-line-num="4"></div></td><td class="line-col"><div class="line-content"></div></td></tr><tr><td class="line-num-col"><div class="line-num" data-line-num="5"></div></td><td class="line-col"><div class="line-content"><span class="hljs-keyword">impl</span> <span class="hljs-title class_">A</span> {</div></td></tr><tr><td class="line-num-col"><div class="line-num" data-line-num="6"></div></td><td class="line-col"><div class="line-content">    <span class="hljs-keyword">func</span> <span class="hljs-title function_">foo</span> {</div></td></tr><tr><td class="line-num-col"><div class="line-num" data-line-num="7"></div></td><td class="line-col"><div class="line-content">        <span class="hljs-title function_ invoke__">print</span>(<span class="hljs-keyword">self</span>.field);</div></td></tr><tr><td class="line-num-col"><div class="line-num" data-line-num="8"></div></td><td class="line-col"><div class="line-content">    }</div></td></tr><tr><td class="line-num-col"><div class="line-num" data-line-num="9"></div></td><td class="line-col"><div class="line-content">}</div></td></tr></table>
        </pre>

#### *Jacy* respects composition over inheritance

#### Struct implementations can be extended

<pre class="code-fence highlight-jc hljs">
            <table class="code-table"><tr><td class="line-num-col"><div class="line-num" data-line-num="1"></div></td><td class="line-col"><div class="line-content"><span class="hljs-keyword">struct</span> <span class="hljs-title class_">A</span> {</div></td></tr><tr><td class="line-num-col"><div class="line-num" data-line-num="2"></div></td><td class="line-col"><div class="line-content">    field: <span class="hljs-type">i32</span>,</div></td></tr><tr><td class="line-num-col"><div class="line-num" data-line-num="3"></div></td><td class="line-col"><div class="line-content">}</div></td></tr><tr><td class="line-num-col"><div class="line-num" data-line-num="4"></div></td><td class="line-col"><div class="line-content"></div></td></tr><tr><td class="line-num-col"><div class="line-num" data-line-num="5"></div></td><td class="line-col"><div class="line-content"><span class="hljs-keyword">func</span> <span class="hljs-title function_">A</span>::foo {</div></td></tr><tr><td class="line-num-col"><div class="line-num" data-line-num="6"></div></td><td class="line-col"><div class="line-content">    <span class="hljs-title function_ invoke__">print</span>(<span class="hljs-keyword">self</span>.field);</div></td></tr><tr><td class="line-num-col"><div class="line-num" data-line-num="7"></div></td><td class="line-col"><div class="line-content">}</div></td></tr></table>
        </pre>

### No GC

Jacy doesn't have Garbage Collector, as far as it is statically sets `free` points.

### *Jacy* respects Compile-Time Evaluation

<pre class="code-fence highlight-jc hljs">
            <table class="code-table"><tr><td class="line-num-col"><div class="line-num" data-line-num="1"></div></td><td class="line-col"><div class="line-content"><span class="hljs-keyword">const</span> a = <span class="hljs-number">123</span>;</div></td></tr><tr><td class="line-num-col"><div class="line-num" data-line-num="2"></div></td><td class="line-col"><div class="line-content"></div></td></tr><tr><td class="line-num-col"><div class="line-num" data-line-num="3"></div></td><td class="line-col"><div class="line-content"><span class="hljs-keyword">const</span> <span class="hljs-keyword">func</span> <span class="hljs-title function_">fib</span>(n: <span class="hljs-type">i32</span>): <span class="hljs-type">u64</span> = <span class="hljs-keyword">match</span> n {</div></td></tr><tr><td class="line-num-col"><div class="line-num" data-line-num="4"></div></td><td class="line-col"><div class="line-content">    i32::MIN..=<span class="hljs-number">0</span> =&gt; <span class="hljs-title function_ invoke__">panic</span>(<span class="hljs-string">&quot;`n` is negative or zero&quot;</span>),</div></td></tr><tr><td class="line-num-col"><div class="line-num" data-line-num="5"></div></td><td class="line-col"><div class="line-content">    <span class="hljs-number">1</span> | <span class="hljs-number">2</span> =&gt; <span class="hljs-number">1</span>,</div></td></tr><tr><td class="line-num-col"><div class="line-num" data-line-num="6"></div></td><td class="line-col"><div class="line-content">    <span class="hljs-number">3</span> =&gt; <span class="hljs-number">2</span>,</div></td></tr><tr><td class="line-num-col"><div class="line-num" data-line-num="7"></div></td><td class="line-col"><div class="line-content">    _ =&gt; <span class="hljs-title function_ invoke__">fib</span>(n - <span class="hljs-number">1</span>) + <span class="hljs-title function_ invoke__">fib</span>(n - <span class="hljs-number">2</span>),</div></td></tr><tr><td class="line-num-col"><div class="line-num" data-line-num="8"></div></td><td class="line-col"><div class="line-content">}</div></td></tr><tr><td class="line-num-col"><div class="line-num" data-line-num="9"></div></td><td class="line-col"><div class="line-content"></div></td></tr><tr><td class="line-num-col"><div class="line-num" data-line-num="10"></div></td><td class="line-col"><div class="line-content"><span class="hljs-keyword">func</span> <span class="hljs-title function_">main</span> {</div></td></tr><tr><td class="line-num-col"><div class="line-num" data-line-num="11"></div></td><td class="line-col"><div class="line-content">    <span class="hljs-keyword">const</span> fib100 = <span class="hljs-title function_ invoke__">fib</span>(<span class="hljs-number">100</span>); <span class="hljs-comment">// 100 fibonacci number computed at compile-time</span></div></td></tr><tr><td class="line-num-col"><div class="line-num" data-line-num="12"></div></td><td class="line-col"><div class="line-content">    <span class="hljs-title function_ invoke__">print</span>(fib100);</div></td></tr><tr><td class="line-num-col"><div class="line-num" data-line-num="13"></div></td><td class="line-col"><div class="line-content">}</div></td></tr></table>
        </pre>
<div class="nav-btn-block">
    <button class="nav-btn left">
    <a class="link" href="/Jacy-Dev-Book/concept/index.html">< Concept</a>
</button>

    <button class="nav-btn right">
    <a class="link" href="/Jacy-Dev-Book/concept/the-idea.html">The idea ></a>
</button>

</div>
