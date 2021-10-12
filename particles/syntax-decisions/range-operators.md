---
layout: 'default'
title: 'Range operators'
nav_order: 103
parent: 'Syntax Decisions'
# No children
grand_parent: 'Particles'
---

# Range Operators

Here, I'm going to explain why <span class="inline-code highlight-jc hljs">..</span> and <span class="inline-code highlight-jc hljs">..=</span> operators were chosen as range operators instead of other variants.

At first, I'd like to say that the idea of having all 4 options, i.e. range operators "from to both inclusive", "from to left exclusive", "from to right exclusive" and "from to both exclusive", considered bad options for me even though I thought it's could be a nice feature.

The range operators I want to see are from-to-inclusive and from-to-right-exclusive, because all-inclusive option is obviously needed in many places, but from-to-right-exclusive is kind of required as it is a way to iterate over indices, e.g. <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">for</span> <span class="hljs-variable">i</span> <span class="hljs-keyword">in</span> <span class="hljs-number">0</span>..size</span>.

Why not <span class="inline-code highlight-jc hljs">..&lt;</span> like in Swift? - The problem is that <span class="inline-code highlight-jc hljs">..&lt;</span> is a very popular construction and it looks awkward for me. Yes, just a personal opinion.
Why not <span class="inline-code highlight-jc hljs">...</span> like many other languages do? - I see <span class="inline-code highlight-jc hljs">...</span> as better option for spread operator or rest pattern (such as in <span class="inline-code highlight-jc hljs">Struct {a, b, ...}</span>), and also it would be more familiar to JavaScript programmers.

This exclusions leave us with two options <span class="inline-code highlight-jc hljs">..</span> and <span class="inline-code highlight-jc hljs">..=</span>, where <span class="inline-code highlight-jc hljs">..</span> is likely to be the most popular usage of range operators at all, thus has the simplest construction.
That's all.
<div class="nav-btn-block">
    <button class="nav-btn left">
    <a class="link" href="/Jacy-Dev-Book/particles/syntax-decisions/lambdas">< Lambdas</a>
</button>

    <button class="nav-btn right">
    <a class="link" href="/Jacy-Dev-Book/particles/syntax-decisions/semicolons">Semicolons ></a>
</button>

</div>
