---
layout: 'default'
title: 'Soft keywords'
nav_order: 110
parent: 'Particles'
# No children
---

# Soft keywords

This is a list of keywords that seem to be possible to make "soft".

> "soft" keyword means that it is possible to use it as an identifier in most places, anyway they're reserved for certain situations.
> Sometimes, "soft" keywords are not matched as keywords unless syntax is proper, these soft-keywords are soften.

For now, I'll leave all keywords hard, as syntax often changes, thus there would be some conflicts.

### `init`

`init` keyword is used for initializers (constructors), and syntax is following:
```jc
init() {
    // ...
}
```
Same as function item but without `func` keyword. Absence of `func` keyword gives us opportunity to softly check for `init` keyword.
`init` is an item, thus only appears on item-only level (in structures), so it is possible to check if it's an initializer but not a function call.

__Problems__:
- Requires context-dependent parsing, as we need to check for `init` appearance only inside `struct` (maybe `trait`) but not in `func` (expression context)
[Refs & moves](particles/refs-&-moves.md){: .btn .btn-outline }[Std annotations](particles/std-annotations.md){: .btn .btn-outline }