---
layout: default
title: `not` prependent operator
parent: Particles
nav_order: 1
---

# `not` prependent operator

Briefly, the idea is to allow putting `not` operator before an infix operators. 
It would allow us not to define new operators like `notin` or separately parse `not in` as special case. 

So, it would look like this:
```rust
a not in b
// Becomes
not (a in b)
```

I'm not sure, but think that there won't be any troubles with precedence, as expressions are already parsed, and then transformed.
