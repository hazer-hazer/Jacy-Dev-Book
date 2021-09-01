---
layout: 'default'
title: 'Not prepedent op'
nav_order: 106
parent: 'Particles'
# No children
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
<div class="nav-btn-block">
    <button class="nav-btn left">
    <a href="/Jacy-Dev-Book/particles/memory-leaks.html">❮ Memory leaks</a>
</button>

    <button class="nav-btn right">
    <a href="/Jacy-Dev-Book/particles/null-coalesce.html">Null coalesce ❯</a>
</button>

</div>
