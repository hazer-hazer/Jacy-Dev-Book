---
layout: 'default'
title: 'Cte functions'
nav_order: 103
parent: 'Compile time evaluation'
# No children
# No grandparent
---

# CTE Functions

A function is CTE if:

* It is marked with <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">const</span></span> modifier
* It is possible to infer that function can be CTE

We mark a function as CTE so.

<div class="code-fence highlight-jc hljs">
            <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">const</span> <span class="hljs-keyword">func</span> <span class="hljs-title function_">foo</span>() {}</div>
        </div>

Then the compiler will check that all computations performed inside this function <span class="inline-code highlight-jc hljs"><span class="hljs-symbol">&#x27;foo</span>&#x27;</span> are CTE, if not, it gives an
error.

In another way, the result of the function won't be inlined in usage places, but it is possible to use a function that
wasn't qualified as <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">const</span></span> in a CTE context. More about that below.

## const inference

Another approach is more complex for the compiler but simple for the user: If we declare a function and use it in CTE
context when compiler goes to this function and checks that it's CTE function. Anyway, if we use this function in a
run-time context it won't be inlined and evaluated at compile-time. Example.

<div class="code-fence highlight-jc hljs">
            <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-comment">// Just a simple function that returns <span class="inline-code highlight-jc hljs"><span class="hljs-number">1</span></span></span></div><div class="line-num" data-line-num="2">2</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-title function_">foo</span> <span class="hljs-operator">=</span> <span class="hljs-number">1</span></div><div class="line-num" data-line-num="3">3</div><div class="line"></div><div class="line-num" data-line-num="4">4</div><div class="line"><span class="hljs-keyword">const</span> <span class="hljs-keyword">func</span> <span class="hljs-title function_">myConstFunc</span> {</div><div class="line-num" data-line-num="5">5</div><div class="line">    <span class="hljs-keyword">const</span> a <span class="hljs-operator">=</span> <span class="hljs-title function_ invoke__">foo</span>()</div><div class="line-num" data-line-num="6">6</div><div class="line">}</div><div class="line-num" data-line-num="7">7</div><div class="line"></div><div class="line-num" data-line-num="8">8</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-title function_">myRawFunc</span> {</div><div class="line-num" data-line-num="9">9</div><div class="line">    <span class="hljs-keyword">let</span> <span class="hljs-variable">a</span> <span class="hljs-operator">=</span> <span class="hljs-title function_ invoke__">foo</span>()</div><div class="line-num" data-line-num="10">10</div><div class="line">}</div>
        </div>

After <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">const</span></span> expansion this code will look (structurally) like that.

<div class="code-fence highlight-jc hljs">
            <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-title function_">foo</span>() <span class="hljs-operator">=</span> <span class="hljs-number">1</span></div><div class="line-num" data-line-num="2">2</div><div class="line"></div><div class="line-num" data-line-num="3">3</div><div class="line"><span class="hljs-keyword">const</span> <span class="hljs-keyword">func</span> <span class="hljs-title function_">myConstFunc</span>() {</div><div class="line-num" data-line-num="4">4</div><div class="line">    <span class="hljs-keyword">const</span> a <span class="hljs-operator">=</span> <span class="hljs-number">1</span></div><div class="line-num" data-line-num="5">5</div><div class="line">}</div><div class="line-num" data-line-num="6">6</div><div class="line"></div><div class="line-num" data-line-num="7">7</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-title function_">myRawFunc</span>() {</div><div class="line-num" data-line-num="8">8</div><div class="line">    <span class="hljs-keyword">let</span> <span class="hljs-variable">a</span> <span class="hljs-operator">=</span> <span class="hljs-title function_ invoke__">foo</span>()</div><div class="line-num" data-line-num="9">9</div><div class="line">}</div>
        </div>

As you can see in <span class="inline-code highlight-jc hljs">myRawFunc` `foo` is still a function call, because `foo` used <span class="hljs-keyword">in</span> a non<span class="hljs-operator">-</span>`<span class="hljs-keyword">const</span></span> context. Whereas in
<span class="inline-code highlight-jc hljs">myConstFunc` value returned by `foo` was inlined <span class="hljs-keyword">as</span> we declared `a` <span class="hljs-keyword">as</span> `<span class="hljs-keyword">const</span>`<span class="hljs-operator">.</span> `<span class="hljs-keyword">const</span></span> qualifier does not mean that
everything inside it will be inlined, you still can declare <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">let</span>` <span class="hljs-operator">or</span> <span class="hljs-keyword">use</span> `<span class="hljs-keyword">if</span>` inside of it<span class="hljs-operator">.</span> `<span class="hljs-keyword">const</span></span> just means the
compiler will check function for constness and tell you if it's not.
<div class="nav-btn-block">
    <button class="nav-btn left">
    <a class="link" href="/Jacy-Dev-Book/compile-time-evaluation/cte-expressions.html">< Cte expressions</a>
</button>

    
</div>
