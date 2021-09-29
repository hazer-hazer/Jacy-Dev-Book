---
layout: 'default'
title: 'Cte expressions'
nav_order: 102
parent: 'Compile time evaluation'
# No children
# No grandparent
---

# CTE Expressions

Compile-Time Evaluable Expressions (CTEE further) syntactically are the same as raw expressions (run-time). It means
that when you look at some complex expression in the code you cannot always be sure that it is CTEE, but you always can
find if it is by yourself. To do that you need to check that every CTEE rule followed -- this is what the compiler does.

## CTEE Rules

Expression is CTEE if:

* It is a literal (e.g. `1`, `123.45`, `"Hello, Jacy"`, etc.)
* It is a struct whose fields are all CTEE types
* It is an enum whose variants are all CTEE types
* It is a result of `const func`

> More on CTE structures and enums in next chapters
<div class="nav-btn-block">
    <button class="nav-btn left">
    <a class="link" href="/Jacy-Dev-Book/compile-time-evaluation/cte-contexts.html">< Cte contexts</a>
</button>

    <button class="nav-btn right">
    <a class="link" href="/Jacy-Dev-Book/compile-time-evaluation/cte-functions.html">Cte functions ></a>
</button>

</div>
