---
layout: 'default'
title: 'Alg effects'
nav_order: 100
parent: 'Ideas'
# No children
# No grandparent
---

# Algebraic Effects

Ooh, that's gonna be cool.

I'm still not really in Algebraic Effects (algeff or AE further), same for the programming world mainstream.
Anyway, here I want to discuss the ability to add ae to the language similar to Rust.

## Little Glossary

To simplify reading this idea, I'll describe the words used here.
The better explanation for algebraic effects I see is from the view of <span class="inline-code highlight-jc hljs">try/catch</span> as these are pretty similar concepts.

To _perform_ an effect is like <span class="inline-code highlight-jc hljs">throw</span> for exceptions -- we pause function execution and waiting for the handler.
To _handle_ an effect means "doing something with the data __performer__ passed.

## Syntax

At first, what do we need to know is what effects does particular function perform.
Effects should not be inferred for raw functions (<span class="inline-code highlight-jc hljs"><span class="hljs-keyword">func</span></span>), for closures it's okay.

From the view of syntax we need to express effects handling, typing and performing.

The keywords I think pretty to use for ae:

- <span class="inline-code highlight-jc hljs">perform</span> - For effect performing.
- <span class="inline-code highlight-jc hljs">with</span> - For effects annotations (in <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">func</span></span> signatures, etc).
- <span class="inline-code highlight-jc hljs">handle</span> - For blocks that handles effects, much like the <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">match</span></span> expression.
- <span class="inline-code highlight-jc hljs">effect</span> - Declares a new effect item.

### <span class="inline-code highlight-jc hljs">perform</span> syntax

The keyword <span class="inline-code highlight-jc hljs">perform</span> is similar to <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">break</span></span> expression with a value (optional too, though).

<div class="code-fence">
            <div class="copy"><i class="far fa-copy"></i></div>
            <div class="code line-numbers highlight-jc hljs">
                <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-comment">// Let&#x27;s imagine we are somewhere in a function</span></div><div class="line-num" data-line-num="2">2</div><div class="line">{</div><div class="line-num" data-line-num="3">3</div><div class="line">    <span class="hljs-keyword">if</span> something {</div><div class="line-num" data-line-num="4">4</div><div class="line">        perform effect1.</div><div class="line-num" data-line-num="5">5</div><div class="line">    }</div><div class="line-num" data-line-num="6">6</div><div class="line">}</div>
            </div>
        </div>
<div class="nav-btn-block">
    <button class="nav-btn left">
    <a class="link" href="/Jacy-Dev-Book/ideas/index">< Ideas</a>
</button>

    <button class="nav-btn right">
    <a class="link" href="/Jacy-Dev-Book/ideas/code-style-conventions">Code style conventions ></a>
</button>

</div>
