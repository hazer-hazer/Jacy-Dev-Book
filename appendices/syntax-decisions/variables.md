---
layout: 'default'
title: 'Variables'
nav_order: 104
parent: 'Syntax Decisions'
# No children
grand_parent: 'Appendices'
---

# Variables

The first idea was to use <span class="inline-code highlight-jc hljs">var` <span class="hljs-operator">and</span> `val`, it<span class="hljs-symbol">&#x27;s</span> pretty nice, we don<span class="hljs-symbol">&#x27;t</span> have weird `<span class="hljs-keyword">let</span>` <span class="hljs-operator">and</span> `<span class="hljs-keyword">let</span> <span class="hljs-variable">mut</span></span> like Rust, but then
I thought "<span class="inline-code highlight-jc hljs">var` <span class="hljs-operator">and</span> `val` are pretty confusing, they only differ <span class="hljs-keyword">in</span> `r` <span class="hljs-operator">and</span> `l</span>, not easy to read". So, I replaced
<span class="inline-code highlight-jc hljs">val` with `<span class="hljs-keyword">let</span>` <span class="hljs-operator">and</span> it looked like the solution<span class="hljs-operator">.</span> Now, we have `<span class="hljs-keyword">let</span>` <span class="hljs-operator">and</span> `<span class="hljs-keyword">let</span> <span class="hljs-variable">mut</span></span> 😊... Why? I forgot about
pattern-matching, Rust's solution is right because <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">let</span></span> is not a constant var declaration, it is just a declaration of
a variable, and the variable name is a pattern in which we can set if it is a <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">mut</span></span>able or not. I've already reserved
the <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">mut</span></span> keyword, so now we have only one keyword for variable declaration (run-time!).

The syntax.

<span class="inline-code highlight-jc hljs">`</span>antlr4
'let' pattern (':' type)? ('=' expr)?
<span class="inline-code highlight-jc hljs">`</span>

Anyway, I'm able to add the <span class="inline-code highlight-jc hljs">var` keyw<span class="hljs-operator">or</span>d <span class="hljs-operator">and</span> just <span class="hljs-keyword">use</span> it <span class="hljs-keyword">as</span> an alias f<span class="hljs-operator">or</span> `<span class="hljs-keyword">let</span> <span class="hljs-variable">mut</span></span>. In this way, we are not able to use
pattern, just only an identifier, so we also lose the ability of destructuring. I think it does not worth it, let's stay
with <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">let</span>` <span class="hljs-operator">and</span> `<span class="hljs-keyword">let</span> <span class="hljs-variable">mut</span></span>.
<div class="nav-btn-block">
    <button class="nav-btn left">
    <a class="link" href="/Jacy-Dev-Book/appendices/syntax-decisions/semicolons.html">< Semicolons</a>
</button>

    
</div>
