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

In the HIR there is nothing like <span class="inline-code highlight-jc hljs">f<span class="hljs-operator">or</span>` <span class="hljs-operator">or</span> `<span class="hljs-keyword">while</span>` loops <span class="hljs-operator">-</span><span class="hljs-operator">-</span> they are replaced with `<span class="hljs-keyword">loop</span></span> expression.

#### <span class="inline-code highlight-jc hljs">f<span class="hljs-operator">or</span></span> loop lowering

At first, we need to establish what <span class="inline-code highlight-jc hljs">f<span class="hljs-operator">or</span>` <span class="hljs-keyword">loop</span> can do <span class="hljs-keyword">in</span> _Jacy_<span class="hljs-operator">.</span> No C<span class="hljs-operator">-</span>like `f<span class="hljs-operator">or</span></span> loop exists and the only one construction is using iterator. C-like loops iterating over integer values are covered with iteration over ranges.

<div class="code-fence highlight-jc hljs">
            <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">for</span> <span class="hljs-variable">i</span> <span class="hljs-keyword">in</span> <span class="hljs-number">0</span><span class="hljs-operator">..</span><span class="hljs-number">100</span> {</div><div class="line-num" data-line-num="2">2</div><div class="line">    <span class="hljs-title function_ invoke__">print</span>(i);</div><div class="line-num" data-line-num="3">3</div><div class="line">}</div>
        </div>

Let's disassemble this loop into instructions that are done implicitly.
<span class="inline-code highlight-jc hljs">f<span class="hljs-operator">or</span>` <span class="hljs-keyword">loop</span> accepts expression of <span class="hljs-keyword">type</span> <span class="hljs-title class_">that</span> implements the `Iterat<span class="hljs-operator">or</span>` <span class="hljs-keyword">trait</span><span class="hljs-operator">.</span> In this case it is a integer range from `<span class="hljs-number">0</span>` to `<span class="hljs-number">100</span>` exclusively<span class="hljs-operator">.</span> So, at first we need to get an iterat<span class="hljs-operator">or</span> of `<span class="hljs-number">0</span><span class="hljs-operator">..</span><span class="hljs-number">100</span></span>.

<div class="code-fence highlight-jc hljs">
            <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">let</span> <span class="hljs-keyword">mut </span><span class="hljs-variable">iter</span> <span class="hljs-operator">=</span> (<span class="hljs-number">0</span><span class="hljs-operator">..</span><span class="hljs-number">100</span>)<span class="hljs-operator">.</span><span class="hljs-title function_ invoke__">intoIter</span>();</div>
        </div>

Here, compiler uses <span class="inline-code highlight-jc hljs">intoIter` because `<span class="hljs-number">0</span><span class="hljs-operator">..</span><span class="hljs-number">100</span>` is moved into the `f<span class="hljs-operator">or</span></span> loop, not borrowed.

Then we need to go through all values:

<div class="code-fence highlight-jc hljs">
            <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">let</span> <span class="hljs-keyword">mut </span><span class="hljs-variable">iter</span> <span class="hljs-operator">=</span> (<span class="hljs-number">0</span><span class="hljs-operator">..</span><span class="hljs-number">100</span>)<span class="hljs-operator">.</span><span class="hljs-title function_ invoke__">intoIter</span>();</div><div class="line-num" data-line-num="2">2</div><div class="line"></div><div class="line-num" data-line-num="3">3</div><div class="line"><span class="hljs-comment">// Added</span></div><div class="line-num" data-line-num="4">4</div><div class="line"><span class="hljs-keyword">while</span> <span class="hljs-keyword">let</span> <span class="hljs-variable">Some</span>(i) <span class="hljs-operator">=</span> iter<span class="hljs-operator">.</span><span class="hljs-title function_ invoke__">next</span>() {</div><div class="line-num" data-line-num="5">5</div><div class="line">    <span class="hljs-title function_ invoke__">print</span>(i);</div><div class="line-num" data-line-num="6">6</div><div class="line">}</div>
        </div>

Here we use <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">while</span> <span class="hljs-keyword">let</span>` which is a high level syntactic sugar that is <span class="hljs-keyword">in</span> fact <span class="hljs-string">&quot;while pattern on the left side matches the value on the right side do ...&quot;</span><span class="hljs-operator">.</span> `<span class="hljs-keyword">while</span> <span class="hljs-keyword">let</span></span> loop is also lowered, read further for more information.
<span class="inline-code highlight-jc hljs">iter<span class="hljs-operator">.</span>next` (`Iterator::next`) method returns `T?` (<span class="hljs-keyword">in</span> this particular case `T` is `<span class="hljs-type">int</span></span>), that is an optional next value if some exists.

The body of the <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">while</span> <span class="hljs-keyword">let</span>` is the same <span class="hljs-keyword">as</span> <span class="hljs-keyword">for</span> <span class="hljs-variable">the</span> <span class="hljs-keyword">in</span>itial `f<span class="hljs-operator">or</span></span> loop.

In next chapters we will discuss <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">while</span> <span class="hljs-keyword">let</span></span> lowering where this example will be lowered completely.

#### <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">while</span></span> loop lowering
<div class="nav-btn-block">
    <button class="nav-btn left">
    <a class="link" href="/Jacy-Dev-Book/compiler-workflow/lowering/hir.html">< Hir</a>
</button>

    
</div>
