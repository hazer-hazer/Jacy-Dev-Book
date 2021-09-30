---
layout: 'default'
title: 'Why affine types'
nav_order: 102
parent: 'Concept'
# No children
# No grandparent
---

# Why affine types

Affine types are a version of linear types that do allow only single use of an object as linear types but allow discarding value, i.e. not using it.

_Jacy_ supports affine types, not linear, however, linearity logic is controlled with warnings, i.e. the compiler will give a warning if you didn't use the value.

<div class="code-fence highlight-jc hljs">
            <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-title function_">foo</span>() {</div><div class="line-num" data-line-num="2">2</div><div class="line">    <span class="hljs-keyword">let</span> <span class="hljs-variable">r</span> = <span class="hljs-title function_ invoke__">Rc</span>(<span class="hljs-number">0</span>);</div><div class="line-num" data-line-num="3">3</div><div class="line">    <span class="hljs-keyword">let</span> <span class="hljs-variable">r1</span> = Rc::<span class="hljs-title function_ invoke__">clone</span>(r);</div><div class="line-num" data-line-num="4">4</div><div class="line">}</div>
        </div>

At the code generation stage, we need to create a so-called "destruction scope", where we will drop the values owned by the scope we exit.
The RC <span class="inline-code highlight-jc hljs">r</span> and <span class="inline-code highlight-jc hljs">r1</span> will be dropped when the body of the function <span class="inline-code highlight-jc hljs">foo</span> ends. <span class="inline-code highlight-jc hljs">Rc</span> implements <span class="inline-code highlight-jc hljs">Drop::drop</span> method which accepts <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">self</span></span> by-move, thus you cannot <span class="inline-code highlight-jc hljs">drop</span> the value twice.

<div class="code-fence highlight-jc hljs">
            <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-title function_">foo</span>() {</div><div class="line-num" data-line-num="2">2</div><div class="line">    <span class="hljs-keyword">let</span> <span class="hljs-variable">r</span> = <span class="hljs-title function_ invoke__">Rc</span>(<span class="hljs-number">0</span>);</div><div class="line-num" data-line-num="3">3</div><div class="line">    <span class="hljs-keyword">let</span> <span class="hljs-variable">r1</span> = Rc::<span class="hljs-title function_ invoke__">clone</span>(r);</div><div class="line-num" data-line-num="4">4</div><div class="line">}</div><div class="line-num" data-line-num="5">5</div><div class="line"><span class="hljs-comment">// Drop scope of the function <span class="inline-code highlight-jc hljs">foo</span></span></div><div class="line-num" data-line-num="6">6</div><div class="line">{</div><div class="line-num" data-line-num="7">7</div><div class="line">    Drop::<span class="hljs-title function_ invoke__">drop</span>(r1);</div><div class="line-num" data-line-num="8">8</div><div class="line">    Drop::<span class="hljs-title function_ invoke__">drop</span>(r);</div><div class="line-num" data-line-num="9">9</div><div class="line">}</div>
        </div>

In this code, if we hadn't affine types, we could drop value <span class="inline-code highlight-jc hljs">r1</span> or value <span class="inline-code highlight-jc hljs">r</span> twice, and some of them couldn't be dropped correctly.

This example is the reason why affine types are cool, it just presents their main advantage -- data flow control. We know where data goes, from where, and that we lose access to it as it is moved.

Of course, there is the borrowing concept that allows us not to copy or move the data, but alias it with a new object.

Affine types solve many problems while making code stricter and safe from occasional user mistakes.
<div class="nav-btn-block">
    <button class="nav-btn left">
    <a class="link" href="/Jacy-Dev-Book/concept/the-idea.html">< The idea</a>
</button>

    
</div>
