---
layout: 'default'
title: 'Lowering'
nav_order: 101
parent: 'Lowering & HIR'
# No children
grand_parent: 'Compiler Workflow'
---

# Lowering

Lowering, i.e. IR simplifying is the process when we take one IR, remove useless information, and generalize similar units to common structures, producing the second, lowered IR.
A common example of lowering is AST to HIR lowering, which is done right after parsing and name resolution stages are complete. There are also other lowering modifications but they are atomic and done during more complex stages, whereas AST lowering is a separate stage.

## Transformations

During AST lowering bunch of AST nodes are removed completely and replaced with more common ones.

### Nodes lowered to <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">loop</span></span>

In the HIR there is nothing like <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">for</span></span> or <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">while</span></span> loops -- they are replaced with <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">loop</span></span> expression.

#### <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">for</span></span> loop lowering

At first, we need to establish what the <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">for</span></span> loop can do in _Jacy_. No C-like <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">for</span></span> loop exists and the only one construction is using iterator. C-like loops iterating over integer values are covered with iteration over ranges.

<div class="code-fence">
            <div class="copy"><i class="far fa-copy"></i></div>
            <div class="code line-numbers highlight-jc hljs">
                <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">for</span> <span class="hljs-variable">i</span> <span class="hljs-keyword">in</span> <span class="hljs-number">0</span>..<span class="hljs-number">100</span> {</div><div class="line-num" data-line-num="2">2</div><div class="line">    <span class="hljs-title function_ invoke__">print</span>(i);</div><div class="line-num" data-line-num="3">3</div><div class="line">}</div>
            </div>
        </div>

Let's disassemble this loop into instructions that are done implicitly.
<span class="inline-code highlight-jc hljs"><span class="hljs-keyword">for</span></span> loop accepts the expression of a type that implements the <span class="inline-code highlight-jc hljs">Iterator</span> trait. In this case, it is an integer range from <span class="inline-code highlight-jc hljs"><span class="hljs-number">0</span></span> to <span class="inline-code highlight-jc hljs"><span class="hljs-number">100</span></span> exclusively. So, at first, we need to get an iterator of <span class="inline-code highlight-jc hljs"><span class="hljs-number">0</span>..<span class="hljs-number">100</span></span>.

<div class="code-fence">
            <div class="copy"><i class="far fa-copy"></i></div>
            <div class="code line-numbers highlight-jc hljs">
                <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">let</span> <span class="hljs-keyword">mut </span><span class="hljs-variable">iter</span> = (<span class="hljs-number">0</span>..<span class="hljs-number">100</span>).<span class="hljs-title function_ invoke__">intoIter</span>();</div>
            </div>
        </div>

Here, the compiler uses <span class="inline-code highlight-jc hljs">intoIter</span> because <span class="inline-code highlight-jc hljs"><span class="hljs-number">0</span>..<span class="hljs-number">100</span></span> is moved into the <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">for</span></span> loop, not borrowed.

Then we need to go through all values:

<div class="code-fence">
            <div class="copy"><i class="far fa-copy"></i></div>
            <div class="code line-numbers highlight-jc hljs">
                <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">let</span> <span class="hljs-keyword">mut </span><span class="hljs-variable">iter</span> = (<span class="hljs-number">0</span>..<span class="hljs-number">100</span>).<span class="hljs-title function_ invoke__">intoIter</span>();</div><div class="line-num" data-line-num="2">2</div><div class="line"></div><div class="line-num" data-line-num="3">3</div><div class="line"><span class="hljs-comment">// Added</span></div><div class="line-num" data-line-num="4">4</div><div class="line"><span class="hljs-keyword">while</span> <span class="hljs-keyword">let</span> <span class="hljs-variable">Some</span>(i) = iter.<span class="hljs-title function_ invoke__">next</span>() {</div><div class="line-num" data-line-num="5">5</div><div class="line">    <span class="hljs-title function_ invoke__">print</span>(i);</div><div class="line-num" data-line-num="6">6</div><div class="line">}</div>
            </div>
        </div>

Here we use <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">while</span> <span class="hljs-keyword">let</span></span> which is a high-level syntactic sugar that is in fact "while the pattern on the left side matches the value on the right side do ...". <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">while</span> <span class="hljs-keyword">let</span></span> loop is also lowered, read further for more information.
<span class="inline-code highlight-jc hljs">iter.next</span> (<span class="inline-code highlight-jc hljs">Iterator::next</span>) method returns <span class="inline-code highlight-jc hljs">T?</span> (in this particular case <span class="inline-code highlight-jc hljs">T</span> is <span class="inline-code highlight-jc hljs"><span class="hljs-type">int</span></span>), that is an optional next value if some exists.

The body of the <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">while</span> <span class="hljs-keyword">let</span></span> is the same as for the initial <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">for</span></span> loop.

In the next chapters, we will discuss <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">while</span> <span class="hljs-keyword">let</span></span> lowering where this example will be lowered completely.

#### <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">while</span></span> loop lowering
<div class="nav-btn-block">
    <button class="nav-btn left">
    <a class="link" href="/Jacy-Dev-Book/compiler-workflow/lowering/hir.html">< Hir</a>
</button>

    
</div>
