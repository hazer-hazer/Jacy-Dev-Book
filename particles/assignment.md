---
layout: 'default'
title: 'Assignment'
nav_order: 100
parent: 'Particles [β RFCs]'
# No children
---

# Assignment

Assignment in _Jacy_ as in Rust is per-byte copy operation and is not overloadable.

The reasons why overloading is not allowed are:
1. Assignment is too basic operation to allow users to alter its behavior.
2. Overloading of assignment brings bunch of implicitness that is not appreciated in _Jacy_
3. It complicates the logic for devs as for target users.
<div class="nav-btn-block">
    
    <button class="nav-btn right">
    <a class="link" href="/Jacy-Dev-Book/particles/computed-properties.html">Computed properties ></a>
</button>

</div>
