---
layout: 'default'
title: 'Variables'
nav_order: 105
parent: 'Syntax Decisions'
# No children
grand_parent: 'Particles'
---

# Variables

The first idea was to use <span class="inline-code highlight-jc hljs">var</span> and <span class="inline-code highlight-jc hljs">val</span>, it's pretty nice, we don't have weird <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">let</span></span> and <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">let</span> <span class="hljs-variable">mut</span></span> like Rust, but then
I thought "<span class="inline-code highlight-jc hljs">var</span> and <span class="inline-code highlight-jc hljs">val</span> are pretty confusing, they only differ in <span class="inline-code highlight-jc hljs">r</span> and <span class="inline-code highlight-jc hljs">l</span>, not easy to read". So, I replaced
<span class="inline-code highlight-jc hljs">val</span> with <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">let</span></span> and it looked like the solution. Now, we have <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">let</span></span> and <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">let</span> <span class="hljs-variable">mut</span></span> 😊... Why? I forgot about
pattern-matching, Rust's solution is right because <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">let</span></span> is not a constant var declaration, it is just a declaration of
a variable, and the variable name is a pattern in which we can set if it is a <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">mut</span></span>able or not. I've already reserved
the <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">mut</span></span> keyword, so now we have only one keyword for variable declaration (run-time!).

The syntax.

<div class="code-fence">
            <div class="copy"><i class="far fa-copy"></i></div>
            <div class="code">'let' pattern (':' type)? ('=' expr)?
</div>
        </div>

Anyway, I'm able to add the <span class="inline-code highlight-jc hljs">var</span> keyword and just use it as an alias for <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">let</span> <span class="hljs-variable">mut</span></span>. In this way, we are not able to use
pattern, just only an identifier, so we also lose the ability of destructuring. I think it does not worth it, let's stay
with <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">let</span></span> and <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">let</span> <span class="hljs-variable">mut</span></span>.
<div class="nav-btn-block">
    <button class="nav-btn left">
    <a class="link" href="/Jacy-Dev-Book/particles/syntax-decisions/semicolons">< Semicolons</a>
</button>

    
</div>
