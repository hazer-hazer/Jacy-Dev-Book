---
layout: 'default'
title: 'Cte contexts'
nav_order: 101
parent: 'Compile time evaluation'
# No children
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
<button class="btn btn-outline"><a href="/compile-time-evaluation/const-keyword.md">< Const keyword</a></button>
<button class="btn btn-outline"><a href="/compile-time-evaluation/cte-expressions.md">Cte expressions ></a></button>
