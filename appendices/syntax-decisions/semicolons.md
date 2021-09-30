---
layout: 'default'
title: 'Semicolons'
nav_order: 103
parent: 'Syntax Decisions'
# No children
grand_parent: 'Appendices'
---

# Semicolons

I've made a bad decision to make all <span class="inline-code line-numbers highlight-jc hljs">;</span> optional at the start of development.

Now, <span class="inline-code line-numbers highlight-jc hljs">;</span> is required, anyway, I won't add rules about <span class="inline-code line-numbers highlight-jc hljs">;</span> like Rust does. In Rust, if you place a semicolon at the end
of expression-statement, it is treated as return-expression or the value of the block. In Jacy there won't be any rules
like that, for control-flow structure blocks the last expression is always the value of the block and in functions
explicit <span class="inline-code line-numbers highlight-jc hljs"><span class="hljs-keyword">return</span></span> is always required if block (\<span class="inline-code line-numbers highlight-jc hljs">{}\</span>) syntax is used.

I've promised myself to add "semicolon inference" in the future, so I cannot rely on semicolon as part of any additional
rules except the only one -- using as a terminating token.

> The important thing is that I won't implement "semicolon insertion", because syntax is too complex to reduce all cases
> to hard rules.
>
> What I'm gonna do is check for NLs in each place where they can be optional and also use them as alternative to <span class="inline-code line-numbers highlight-jc hljs">;</span>

Resources:

* [Semicolon Inference](https://pling.jondgoodwin.com/post/semicolon-inference/)
<div class="nav-btn-block">
    <button class="nav-btn left">
    <a class="link" href="/Jacy-Dev-Book/appendices/syntax-decisions/lambdas.html">< Lambdas</a>
</button>

    <button class="nav-btn right">
    <a class="link" href="/Jacy-Dev-Book/appendices/syntax-decisions/variables.html">Variables ></a>
</button>

</div>
