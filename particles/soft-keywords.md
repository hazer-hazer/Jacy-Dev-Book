---
layout: 'default'
title: 'Soft keywords'
nav_order: 110
parent: 'Particles [β RFCs]'
# No children
# No grandparent
---

# Soft keywords

This is a list of keywords that seem to be possible to make "soft".

> "soft" keyword means that it is possible to use it as an identifier in most places, anyway they're reserved for certain situations.
> Sometimes, "soft" keywords are not matched as keywords unless syntax is proper, these soft-keywords are soften.

For now, I'll leave all keywords hard, as syntax often changes, thus there would be some conflicts.

## <span class="inline-code highlight-jc hljs">init</span>

<span class="inline-code highlight-jc hljs">init</span> keyword is used for initializers (constructors), and syntax is following:

<div class="code-fence">
            <div class="copy"><i class="fas fa-copy"></i></div>
            <div class="code line-numbers highlight-jc hljs">
                <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-title function_ invoke__">init</span>() {</div><div class="line-num" data-line-num="2">2</div><div class="line">    <span class="hljs-comment">// ...</span></div><div class="line-num" data-line-num="3">3</div><div class="line">}</div>
            </div>
        </div>

Same as function item but without <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">func</span></span> keyword. Absence of <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">func</span></span> keyword gives us opportunity to softly check for <span class="inline-code highlight-jc hljs">init</span> keyword.
<span class="inline-code highlight-jc hljs">init</span> is an item, thus only appears on item-only level (in structures), so it is possible to check if it's an initializer but not a function call.

### Problems

- Requires context-dependent parsing, as we need to check for <span class="inline-code highlight-jc hljs">init</span> appearance only inside <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">struct</span></span> (maybe <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">trait</span></span>) but not in <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">func</span></span> (expression context)
<div class="nav-btn-block">
    <button class="nav-btn left">
    <a class="link" href="/Jacy-Dev-Book/particles/refs-&-moves.html">< Refs & moves</a>
</button>

    <button class="nav-btn right">
    <a class="link" href="/Jacy-Dev-Book/particles/std-annotations.html">Std annotations ></a>
</button>

</div>
