---
layout: 'default'
title: 'Cte contexts'
nav_order: 2
parent: null
has_children: false
---

# CTE Contexts

In some places, we cannot put run-time computed expressions, e.g. when we declare a fixed-sized array `[T; getSize()]`,
`getSize()` function must be CTE.

Here's the list of all (I hope) this kind of places (`N` and `M` are `const` expressions):

* Array types `[T; N]`
* Fill-array generator `[0; N]` (generate an array of `N` zeros)
* When we set default value for `const` parameter like `<const N: usize = M>`
* Enum discriminant `enum MyEnum { Kind = N }`
* `static` items initializers
