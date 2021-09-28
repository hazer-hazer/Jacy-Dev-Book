---
layout: 'default'
title: 'Hir'
nav_order: 100
parent: 'Lowering & HIR'
# No children
grand_parent: 'Compiler Workflow'
---

# HIR

Same as Rust (again...) _Jacy_ has HIR - High-level Intermediate Representation. It AST-like IR that is well-formed and
lowered.

#### Lowering

Lowering is a process of converting some syntactically different structures to common structures.

E.g. all kinds of loops are converted to `loop` structure because every loop is considered to "do something while
something". That is, `for` loop iterates over data until there're some data, same for while and `while let`.

By doing so, we reduce a large amount of AST nodes to some more common structures.
<div class="nav-btn-block">
    <button class="nav-btn left">
    <a class="link" href="/Jacy-Dev-Book/compiler-workflow/lowering/index.html">< Lowering & HIR</a>
</button>

    
</div>
