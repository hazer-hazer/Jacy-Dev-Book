---
layout: 'default'
title: 'Interface'
nav_order: 102
parent: 'Code docs'
# No children
# No grandparent
---

# Interface

<span class="inline-code highlight-jc hljs">Interface</span> is the main class that runs each compilation stage. Also, some logic is directly placed inside the interface
but not in stage classes, it's kinda bad but...

<span class="inline-code highlight-jc hljs">Interface</span> catches errors, that is, when something went wrong at any stage we can log debug info about the current
compiler state, etc.
<div class="nav-btn-block">
    <button class="nav-btn left">
    <a class="link" href="/dev-book/code-docs/dev-conventions">< Dev conventions</a>
</button>

    <button class="nav-btn right">
    <a class="link" href="/dev-book/code-docs/interning">Interning ></a>
</button>

</div>
