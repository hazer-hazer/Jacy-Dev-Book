---
layout: default
title: const keyword
nav_order: 5
parent: Compile-Time Evaluation

# description: This stage is where name resolution begins.
---

# `const` keyword

In CTE `const` used to declare, obviously, a constant which will be evaluated at compile-time and which usages will be inlined.

I wanna note that `const` is a synonym for compile-time evaluable expression, so further I'll use it in this context.

`const` must be immediately assigned when declared. Syntax:

```text
'const' IDENT '=' expr
```

After `'='` goes an expression which MUST also be CTE, but not exactly another `const`.

The difference between `let` and `const` is that `const` is an item, whereas `let` is a statement. As being an item `const` can be placed mostly on any level, including top-level:

```text
const a = 10

trait MyTrait {
    const traitConst = 1010
}

func main() {
    const b = 123
}
```



