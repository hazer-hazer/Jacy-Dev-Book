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

* It is marked with `const` modifier
* It is possible to infer that function can be CTE

We mark a function as CTE so.

<div class="code-fence highlight-jc hljs">
            <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">const</span> <span class="hljs-keyword">func</span> <span class="hljs-title function_">foo</span>() {}</div>
        </div>

Then the compiler will check that all computations performed inside this function `'foo'` are CTE, if not, it gives an
error.

In another way, the result of the function won't be inlined in usage places, but it is possible to use a function that
wasn't qualified as `const` in a CTE context. More about that below.

## const inference

Another approach is more complex for the compiler but simple for the user: If we declare a function and use it in CTE
context when compiler goes to this function and checks that it's CTE function. Anyway, if we use this function in a
run-time context it won't be inlined and evaluated at compile-time. Example.

<div class="code-fence highlight-jc hljs">
            <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-comment">// Just a simple function that returns `1`</span></div><div class="line-num" data-line-num="2">2</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-title function_">foo</span> = <span class="hljs-number">1</span></div><div class="line-num" data-line-num="3">3</div><div class="line"></div><div class="line-num" data-line-num="4">4</div><div class="line"><span class="hljs-keyword">const</span> <span class="hljs-keyword">func</span> <span class="hljs-title function_">myConstFunc</span> {</div><div class="line-num" data-line-num="5">5</div><div class="line">    <span class="hljs-keyword">const</span> a = <span class="hljs-title function_ invoke__">foo</span>()</div><div class="line-num" data-line-num="6">6</div><div class="line">}</div><div class="line-num" data-line-num="7">7</div><div class="line"></div><div class="line-num" data-line-num="8">8</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-title function_">myRawFunc</span> {</div><div class="line-num" data-line-num="9">9</div><div class="line">    <span class="hljs-keyword">let</span> <span class="hljs-variable">a</span> = <span class="hljs-title function_ invoke__">foo</span>()</div><div class="line-num" data-line-num="10">10</div><div class="line">}</div>
        </div>

After `const` expansion this code will look (structurally) like that.

<div class="code-fence highlight-jc hljs">
            <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-title function_">foo</span>() = <span class="hljs-number">1</span></div><div class="line-num" data-line-num="2">2</div><div class="line"></div><div class="line-num" data-line-num="3">3</div><div class="line"><span class="hljs-keyword">const</span> <span class="hljs-keyword">func</span> <span class="hljs-title function_">myConstFunc</span>() {</div><div class="line-num" data-line-num="4">4</div><div class="line">    <span class="hljs-keyword">const</span> a = <span class="hljs-number">1</span></div><div class="line-num" data-line-num="5">5</div><div class="line">}</div><div class="line-num" data-line-num="6">6</div><div class="line"></div><div class="line-num" data-line-num="7">7</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-title function_">myRawFunc</span>() {</div><div class="line-num" data-line-num="8">8</div><div class="line">    <span class="hljs-keyword">let</span> <span class="hljs-variable">a</span> = <span class="hljs-title function_ invoke__">foo</span>()</div><div class="line-num" data-line-num="9">9</div><div class="line">}</div>
        </div>

As you can see in `myRawFunc` `foo` is still a function call, because `foo` used in a non-`const` context. Whereas in
`myConstFunc` value returned by `foo` was inlined as we declared `a` as `const`. `const` qualifier does not mean that
everything inside it will be inlined, you still can declare `let` or use `if` inside of it. `const` just means the
compiler will check function for constness and tell you if it's not.
<div class="nav-btn-block">
    <button class="nav-btn left">
    <a class="link" href="/Jacy-Dev-Book/compile-time-evaluation/cte-expressions.html">< Cte expressions</a>
</button>

    
</div>
