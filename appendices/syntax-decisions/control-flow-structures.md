---
layout: 'default'
title: 'Control flow structures'
nav_order: 101
parent: 'Syntax Decisions'
# No children
grand_parent: 'Appendices'
---

# Control-Flow structures

The control flow of _Jacy_ is mostly inspired by Rust.

We've got <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">if</span></span>/<span class="inline-code highlight-jc hljs"><span class="hljs-keyword">if</span> <span class="hljs-keyword">let</span></span> as an expression, <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">loop</span></span> as an expression, <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">while</span></span>/<span class="inline-code highlight-jc hljs"><span class="hljs-keyword">while</span> <span class="hljs-keyword">let</span></span> and <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">for</span></span>.

<span class="inline-code highlight-jc hljs"><span class="hljs-keyword">while</span></span>/<span class="inline-code highlight-jc hljs"><span class="hljs-keyword">while</span> <span class="hljs-keyword">let</span></span> and <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">for</span></span> are statements, because:

* Why we need to use them as expressions if they return <span class="inline-code highlight-jc hljs">()</span> (unit)
* I'm trying to solve the problem above, and it will be solved they'll become expression which returns an any-type value
* If I made them expressions then it would break backward compatibility:
  * You could put them in expression place, but they returned <span class="inline-code highlight-jc hljs">()</span>, and in the new version, they started returning some
    non-<span class="inline-code highlight-jc hljs">()</span> value

## <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">if</span></span>/<span class="inline-code highlight-jc hljs"><span class="hljs-keyword">if</span> <span class="hljs-keyword">let</span></span>

<span class="inline-code highlight-jc hljs"><span class="hljs-keyword">if</span></span> is an expression, works the same as in other languages, here's nothing to say about except that I need to note that
_Jacy_ does not support implicit <span class="inline-code highlight-jc hljs"><span class="hljs-type">bool</span></span> conversion even through operator overloading like C++ does.

### <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">if</span> <span class="hljs-keyword">let</span></span>

<span class="inline-code highlight-jc hljs"><span class="hljs-keyword">if</span> <span class="hljs-keyword">let</span></span> is a way to check if some value matches a specific pattern. Also, as this is a pattern matching we able to
destruct our value.

Syntax is following.

<span class="inline-code highlight-jc hljs"></span><span class="inline-code highlight-jc hljs">antlr4
ifLetExpression: <span class="hljs-symbol">&#x27;if</span> <span class="hljs-keyword">let</span>&#x27; pattern <span class="hljs-string">&#x27;=&#x27;</span> expr block
</span><span class="inline-code highlight-jc hljs"></span>

## <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">while</span></span>/<span class="inline-code highlight-jc hljs"><span class="hljs-keyword">while</span> <span class="hljs-keyword">let</span></span>

<span class="inline-code highlight-jc hljs"><span class="hljs-keyword">while</span></span> is a statement that works the same as <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">while</span></span> in other c-like languages

<span class="inline-code highlight-jc hljs"><span class="hljs-keyword">while</span> <span class="hljs-keyword">let</span></span> is the same as <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">while</span></span> except that its condition behaves like <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">if</span> <span class="hljs-keyword">let</span></span>.

### <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">while</span></span>/<span class="inline-code highlight-jc hljs"><span class="hljs-keyword">while</span> <span class="hljs-keyword">let</span></span> are expressions

Here are some thoughts about possible solutions.

<div class="code-fence highlight-jc hljs">
            <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">while</span> myval {</div><div class="line-num" data-line-num="2">2</div><div class="line">    <span class="hljs-comment">// Do something if <span class="inline-code highlight-jc hljs">myval</span> is true</span></div><div class="line-num" data-line-num="3">3</div><div class="line">} <span class="hljs-keyword">else</span> {</div><div class="line-num" data-line-num="4">4</div><div class="line">    <span class="hljs-comment">// Do something if <span class="inline-code highlight-jc hljs">myval</span> is false (at first)</span></div><div class="line-num" data-line-num="5">5</div><div class="line">}</div>
        </div>

It is an obvious solution, but has some problems:

* As far as <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">while</span></span> can return some value it must explicitly <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">break</span></span> with value. We cannot just use the last statement
  of the <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">while</span></span> block as the result value, because <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">while</span></span> is possibly multiple-times iterable.

* If we don't <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">break</span></span> with value, then what would be the result? - It cannot be simply written in asm-like code with
  jumps, because we don't know when our <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">while</span></span> "does not break".

Problem example.

<div class="code-fence highlight-jc hljs">
            <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">let</span> <span class="hljs-variable">a</span> = <span class="hljs-keyword">while</span> myval {</div><div class="line-num" data-line-num="2">2</div><div class="line">    <span class="hljs-keyword">if</span> somethingElse <span class="hljs-operator">=&gt;</span> <span class="hljs-keyword">break</span> <span class="hljs-literal">true</span></div><div class="line-num" data-line-num="3">3</div><div class="line">} <span class="hljs-keyword">else</span> {</div><div class="line-num" data-line-num="4">4</div><div class="line">    <span class="hljs-literal">false</span></div><div class="line-num" data-line-num="5">5</div><div class="line">}</div>
        </div>

* What is the type of this <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">while</span></span> expression? - <span class="inline-code highlight-jc hljs"><span class="hljs-type">bool</span> | ()</span>, but we don't support inferred union types.

For now, I cannot come up with any good solution, so <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">while</span></span> is a statement. Anyway, let's try something:

**IDEA \#1** This one requires static-analysis (maybe complex).

<div class="code-fence highlight-jc hljs">
            <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">let</span> <span class="hljs-variable">a</span> = <span class="hljs-keyword">while</span> myval {</div><div class="line-num" data-line-num="2">2</div><div class="line">    <span class="hljs-keyword">if</span> somethingElse <span class="hljs-operator">=&gt;</span> <span class="hljs-keyword">break</span> <span class="hljs-literal">true</span></div><div class="line-num" data-line-num="3">3</div><div class="line">    <span class="hljs-keyword">break</span> <span class="hljs-literal">false</span></div><div class="line-num" data-line-num="4">4</div><div class="line">} <span class="hljs-keyword">else</span> {</div><div class="line-num" data-line-num="5">5</div><div class="line">    <span class="hljs-literal">false</span></div><div class="line-num" data-line-num="6">6</div><div class="line">}</div>
        </div>

We can analyze this code and say that each <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">break</span></span>-value is <span class="inline-code highlight-jc hljs"><span class="hljs-type">bool</span></span>, so we allow this.

What about this?.

<div class="code-fence highlight-jc hljs">
            <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">let</span> <span class="hljs-variable">a</span> = <span class="hljs-keyword">while</span> myval {</div><div class="line-num" data-line-num="2">2</div><div class="line">    <span class="hljs-keyword">if</span> somethingElse <span class="hljs-operator">=&gt;</span> <span class="hljs-keyword">break</span> <span class="hljs-literal">true</span></div><div class="line-num" data-line-num="3">3</div><div class="line">} <span class="hljs-keyword">else</span> {</div><div class="line-num" data-line-num="4">4</div><div class="line">    <span class="hljs-literal">false</span></div><div class="line-num" data-line-num="5">5</div><div class="line">}</div>
        </div>

Each <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">break</span></span>-value is of type <span class="inline-code highlight-jc hljs"><span class="hljs-type">bool</span></span>, so we allow it because the alternative workflow is an infinite loop.

We required some static-analysis on <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">while</span></span>, which is, as I see, is not really complex and not differs much from the
<span class="inline-code highlight-jc hljs"><span class="hljs-keyword">if</span></span> expression value inference. The only problem is that the use cases of <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">while</span>-<span class="hljs-keyword">else</span></span> are not common, especially when
we cover only this use case.

<div class="code-fence highlight-jc hljs">
            <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">let</span> <span class="hljs-variable">a</span> = <span class="hljs-keyword">if</span> myval {</div><div class="line-num" data-line-num="2">2</div><div class="line">    <span class="hljs-keyword">let</span> <span class="hljs-keyword">mut </span><span class="hljs-variable">result</span> = <span class="hljs-literal">false</span></div><div class="line-num" data-line-num="3">3</div><div class="line">    <span class="hljs-keyword">while</span> myval {</div><div class="line-num" data-line-num="4">4</div><div class="line">        <span class="hljs-comment">// ...</span></div><div class="line-num" data-line-num="5">5</div><div class="line">        <span class="hljs-keyword">if</span> somethingElse {</div><div class="line-num" data-line-num="6">6</div><div class="line">            result = <span class="hljs-literal">true</span></div><div class="line-num" data-line-num="7">7</div><div class="line">            <span class="hljs-keyword">break</span></div><div class="line-num" data-line-num="8">8</div><div class="line">        }</div><div class="line-num" data-line-num="9">9</div><div class="line">    }</div><div class="line-num" data-line-num="10">10</div><div class="line">    <span class="hljs-keyword">return</span> result</div><div class="line-num" data-line-num="11">11</div><div class="line">} <span class="hljs-keyword">else</span> {</div><div class="line-num" data-line-num="12">12</div><div class="line">    <span class="hljs-literal">false</span></div><div class="line-num" data-line-num="13">13</div><div class="line">}</div>
        </div>

## <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">for</span></span> loop

<span class="inline-code highlight-jc hljs"><span class="hljs-keyword">for</span></span>-loop is a statement, not an expression, here, problems with making it an expression are the same as for <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">while</span></span>
(read above) but even more complex. <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">for</span></span>-loop in _Jacy_ has only one syntax (<span class="inline-code highlight-jc hljs"><span class="hljs-keyword">for</span> ... <span class="hljs-keyword">in</span> ...</span>) same as Rust, which
covers all usages (almost) of <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">for</span></span>-loop from C++.

The syntax is the following.

<span class="inline-code highlight-jc hljs"></span><span class="inline-code highlight-jc hljs">antlr4
forLoop: <span class="hljs-symbol">&#x27;for</span>&#x27; pattern <span class="hljs-symbol">&#x27;in</span>&#x27; expression block
</span><span class="inline-code highlight-jc hljs"></span>

Examples.

<span class="inline-code highlight-jc hljs"></span><span class="inline-code highlight-jc hljs">c++
<span class="hljs-comment">// In C++ we write</span>
<span class="hljs-title function_ invoke__">for</span> (<span class="hljs-type">int</span> i = <span class="hljs-number">0</span>; i &lt; something; i++) {
    <span class="hljs-comment">// ...</span>
}

&lt;div class=<span class="hljs-string">&quot;code-fence highlight-jc hljs&quot;</span>&gt;
            &lt;div class=<span class="hljs-string">&quot;line-num&quot;</span> data-line-num=<span class="hljs-string">&quot;1&quot;</span>&gt;<span class="hljs-number">1</span>&lt;/div&gt;&lt;div class=<span class="hljs-string">&quot;line&quot;</span>&gt;&lt;span class=<span class="hljs-string">&quot;hljs-comment&quot;</span>&gt;<span class="hljs-comment">// In Jacy:&lt;/span&gt;&lt;/div&gt;&lt;div class=&quot;line-num&quot; data-line-num=&quot;2&quot;&gt;2&lt;/div&gt;&lt;div class=&quot;line&quot;&gt;&lt;span class=&quot;hljs-keyword&quot;&gt;for&lt;/span&gt; &lt;span class=&quot;hljs-variable&quot;&gt;i&lt;/span&gt; &lt;span class=&quot;hljs-keyword&quot;&gt;in&lt;/span&gt; &lt;span class=&quot;hljs-number&quot;&gt;0&lt;/span&gt;..=something {&lt;/div&gt;&lt;div class=&quot;line-num&quot; data-line-num=&quot;3&quot;&gt;3&lt;/div&gt;&lt;div class=&quot;line&quot;&gt;    &lt;span class=&quot;hljs-comment&quot;&gt;// ...&lt;/span&gt;&lt;/div&gt;&lt;div class=&quot;line-num&quot; data-line-num=&quot;4&quot;&gt;4&lt;/div&gt;&lt;div class=&quot;line&quot;&gt;}&lt;/div&gt;</span>
        &lt;/div&gt;

</span><span class="inline-code highlight-jc hljs"></span>c++
// In C++
for (const auto & x : vec) {
    // ...
}
<span class="inline-code highlight-jc hljs"></span>`

<div class="code-fence highlight-jc hljs">
            <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-comment">// In Jacy</span></div><div class="line-num" data-line-num="2">2</div><div class="line"><span class="hljs-keyword">for</span> <span class="hljs-variable">x</span> <span class="hljs-keyword">in</span> &amp;vec {</div><div class="line-num" data-line-num="3">3</div><div class="line">    <span class="hljs-comment">// ...</span></div><div class="line-num" data-line-num="4">4</div><div class="line">}</div>
        </div>
<div class="nav-btn-block">
    <button class="nav-btn left">
    <a class="link" href="/Jacy-Dev-Book/appendices/syntax-decisions/blocks.html">< Blocks</a>
</button>

    <button class="nav-btn right">
    <a class="link" href="/Jacy-Dev-Book/appendices/syntax-decisions/lambdas.html">Lambdas ></a>
</button>

</div>
