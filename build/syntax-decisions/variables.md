---
layout: 'default'
title: 'Variables'
nav_order: 105
parent: 'Syntax decisions'
# No children
---

# Variables

The first idea was to use `var` and `val`, it's pretty nice, we don't have weird `let` and `let mut` like Rust, but then
I thought "`var` and `val` are pretty confusing, they only differ in `r` and `l`, not easy to read". So, I replaced
`val` with `let` and it looked like the solution. Now, we have `let` and `let mut` 😊... Why? I forgot about
pattern-matching, Rust's solution is right because `let` is not a constant var declaration, it is just a declaration of
a variable, and the variable name is a pattern in which we can set if it is a `mut`able or not. I've already reserved
the `mut` keyword, so now we have only one keyword for variable declaration (run-time!).

The syntax.

```antlr4
'let' pattern (':' type)? ('=' expr)?
```

Anyway, I'm able to add the `var` keyword and just use it as an alias for `let mut`. In this way, we are not able to use
pattern, just only an identifier, so we also lose the ability of destructuring. I think it does not worth it, let's stay
with `let` and `let mut`.

[Semicolons](syntax-decisions\semicolons.md){: .btn .btn-outline }
    