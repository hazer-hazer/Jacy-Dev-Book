---
layout: 'default'
title: 'Const keyword'
nav_order: 100
parent: 'Compile time evaluation'
# No children
---

# `const` keyword

In CTE `const` used to declare, obviously, a constant which will be evaluated at compile-time and which usages will be
inlined.

I wanna note that `const` is a synonym for compile-time evaluable expression, so further I'll use it in this context.

`const` must be immediately assigned when declared. Syntax.

```antlr4
'const' IDENT '=' expr
```

After `'='` goes an expression which MUST also be CTE, but not exactly another `const`.

The difference between `let` and `const` is that `const` is an item, whereas `let` is a statement. As being an item
`const` can be placed mostly on any level, including top-level.

```antlr4
const a = 10

trait MyTrait {
    const traitConst = 1010
}

func main() {
    const b = 123
}
```
[Cte contexts](compile-time-evaluation/cte-contexts.md){: .btn .btn-outline }