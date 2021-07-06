---
layout: default
title: CTE Contexts
nav_order: 10
parent: Compile-Time Evaluation

# description: This stage is where name resolution begins.
---

# CTE Contexts

In some places, we cannot put run-time computed expressions, e.g. when we declare a fixed-sized array `[T; getSize()]`, `getSize()` function must be CTE.

Here's the list of all (I hope) this kind of places (`N` and `M` are `const` expressions):

* Array types `[T; N]`
* Fill-array generator `[0; N]` (generate an array of `N` zeros)
* When we set default value for `const` parameter like `<const N: usize = M>`
* Enum discriminant `enum MyEnum { Kind = N }`
* `static` items initializers

