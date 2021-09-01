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
<button class="btn btn-outline" style="float: left;">
    <a style="text-decoration: none;" href="/Jacy-Dev-Book/code-docs/index.html">< Code docs</a>
</button>
<button class="btn btn-outline" style="float: right;">
    <a style="text-decoration: none;" href="/Jacy-Dev-Book/code-docs/logger-and-panics.html">Logger and panics ></a>
</button>
