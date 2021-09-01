---
layout: default
title: HIR
nav_order: 15
parent: Compilation Process

# description: This stage is where name resolution begins.
---

# HIR

Same as Rust (again...) _Jacy_ has HIR - High-level Intermediate Representation. It AST-like IR that is well-formed and
lowered.

#### Lowering

Lowering is a process of converting some syntactically different structures to common structures.

E.g. all kinds of loops are converted to `loop` structure because every loop is considered to "do something while
something". That is, `for` loop iterates over data until there're some data, same for while and `while let`.

By doing so, we reduce a large amount of AST nodes to some more common structures.
