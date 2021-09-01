---
layout: 'default'
title: 'Assignment'
nav_order: 100
parent: 'Particles'
# No children
---

# Assignment

Assignment in _Jacy_ as in Rust is a per-byte copy operation and is not overloadable.

The reasons why overloading is not allowed are:
1. Assignment is a too basic operation to allow users to alter behavior.
2. Overloading of assignment brings the bunch of implicitness that is not appreciated in _Jacy_
3. It complicates the logic for devs as for target users.
