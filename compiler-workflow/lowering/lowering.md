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

### Nodes lowered to function trim() { [native code] }

In the HIR there is nothing like `for` or `while` loops -- they are replaced with `loop` expression.

#### `for` loop lowering

At first, we need to establish what `for` loop can do in _Jacy_. No C-like `for` loop exists and the only one construction is using iterator. C-like loops iterating over integer values are covered with iteration over ranges.

<div class="code-fence highlight-jc hljs">
            <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">for</span> <span class="hljs-variable">i</span> <span class="hljs-keyword">in</span> <span class="hljs-number">0</span><span class="hljs-operator">..</span><span class="hljs-number">100</span> {</div><div class="line-num" data-line-num="2">2</div><div class="line">    <span class="hljs-title function_ invoke__">print</span>(i);</div><div class="line-num" data-line-num="3">3</div><div class="line">}</div>
        </div>

Let's disassemble this loop into instructions that are done implicitly.
`for` loop accepts expression of type that implements the `Iterator` trait. In this case it is a integer range from `0` to `100` exclusively. So, at first we need to get an iterator of `0..100`.

<div class="code-fence highlight-jc hljs">
            <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">let</span> <span class="hljs-keyword">mut </span><span class="hljs-variable">iter</span> <span class="hljs-operator">=</span> (<span class="hljs-number">0</span><span class="hljs-operator">..</span><span class="hljs-number">100</span>)<span class="hljs-operator">.</span><span class="hljs-title function_ invoke__">intoIter</span>();</div>
        </div>

Here, compiler uses `intoIter` because `0..100` is moved into the `for` loop, not borrowed.

Then we need to go through all values:

<div class="code-fence highlight-jc hljs">
            <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">let</span> <span class="hljs-keyword">mut </span><span class="hljs-variable">iter</span> <span class="hljs-operator">=</span> (<span class="hljs-number">0</span><span class="hljs-operator">..</span><span class="hljs-number">100</span>)<span class="hljs-operator">.</span><span class="hljs-title function_ invoke__">intoIter</span>();</div><div class="line-num" data-line-num="2">2</div><div class="line"></div><div class="line-num" data-line-num="3">3</div><div class="line"><span class="hljs-comment">// Added</span></div><div class="line-num" data-line-num="4">4</div><div class="line"><span class="hljs-keyword">while</span> <span class="hljs-keyword">let</span> <span class="hljs-variable">Some</span>(i) <span class="hljs-operator">=</span> iter<span class="hljs-operator">.</span><span class="hljs-title function_ invoke__">next</span>() {</div><div class="line-num" data-line-num="5">5</div><div class="line">    <span class="hljs-title function_ invoke__">print</span>(i);</div><div class="line-num" data-line-num="6">6</div><div class="line">}</div>
        </div>

Here we use `while let` which is a high level syntactic sugar that is in fact "while pattern on the left side matches the value on the right side do ...". `while let` loop is also lowered, read further for more information.
`iter.next` (`Iterator::next`) method returns `T?` (in this particular case `T` is `int`), that is an optional next value if some exists.

The body of the `while let` is the same as for the initial `for` loop.

In next chapters we will discuss `while let` lowering where this example will be lowered completely.

#### `while` loop lowering
<div class="nav-btn-block">
    <button class="nav-btn left">
    <a class="link" href="/Jacy-Dev-Book/compiler-workflow/lowering/hir.html">< Hir</a>
</button>

    
</div>
