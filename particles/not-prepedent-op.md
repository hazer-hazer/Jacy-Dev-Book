---
layout: 'default'
title: 'Not prepedent op'
nav_order: 106
parent: 'Particles'
# No children
# No grandparent
---

# <span class="inline-code highlight-jc hljs"><span class="hljs-operator">not</span></span> prependent operator

Briefly, the idea is to allow putting <span class="inline-code highlight-jc hljs"><span class="hljs-operator">not</span></span> operator before an infix operators.
It would allow us not to define new operators like <span class="inline-code highlight-jc hljs">notin</span> or separately parse <span class="inline-code highlight-jc hljs"><span class="hljs-operator">not</span> <span class="hljs-keyword">in</span></span> as special case.

So, it would look like this:

<div class="code-fence">
            <div class="copy"><i class="far fa-copy"></i></div>
            <div class="code line-numbers highlight-jc hljs">
                <div class="line-num" data-line-num="1">1</div><div class="line">a <span class="hljs-operator">not</span> <span class="hljs-keyword">in</span> b</div><div class="line-num" data-line-num="2">2</div><div class="line"><span class="hljs-comment">// Becomes</span></div><div class="line-num" data-line-num="3">3</div><div class="line"><span class="hljs-title function_ invoke__">not</span> (a <span class="hljs-keyword">in</span> b)</div>
            </div>
        </div>

I'm not sure, but think that there won't be any troubles with precedence, as expressions are already parsed, and then transformed.
<div class="nav-btn-block">
    <button class="nav-btn left">
    <a class="link" href="/dev-book/particles/memory-leaks">< Memory leaks</a>
</button>

    <button class="nav-btn right">
    <a class="link" href="/dev-book/particles/null-coalesce">Null coalesce ></a>
</button>

</div>
