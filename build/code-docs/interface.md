---
layout: 'default'
title: 'Interface'
nav_order: 103
parent: 'Code docs'
# No children
---

# Interface

`Interface` is the main class that runs each compilation stage. Also, some logic is directly placed inside the interface
but not in stage classes, it's kinda bad but... 

`Interface` catches errors, that is, when something went wrong at any stage we can log debug info about the current
compiler state, etc.
<div class="nav-btn-block">
    <button class="nav-btn left">
    <a class="link" href="/Jacy-Dev-Book/code-docs/index.html">< Code docs</a>
</button>

    <button class="nav-btn right">
    <a class="link" href="/Jacy-Dev-Book/code-docs/logger-and-panics.html">Logger and panics ></a>
</button>

</div>