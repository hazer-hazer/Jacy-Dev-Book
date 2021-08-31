---
layout: 'default'
title: 'Intro'
nav_order: 1
parent: Spec
---

# Intro

*Jacy*, being WIP is updating everyday, and that's okay, but problem is that the main question is not answered yet: "What am I doing?".
Actually, I consider this as the most important question about *Jacy*, as far as concepts growing from it affect everything starting from syntax and ending with code generation.

#### What am I doing?

I'm not sure if it is possible to call *Jacy* an experimental and even research project how I would like to see it.
The nearest characteristic is "DIY Project" 😐
does not matter, anyway, I've got my own opinion and view, thus I need to step away from Rust, not just because I want *Jacy* to be "special" and differ from Rust, but because I cannot inherit mostly everything from one language not knowing what I want to achieve.


## Ownership

Everything is move by default, same as in Rust, and copy-types rule is applied too, of course.

### Can we get rid of multiple function types?

Rust has: function pointer types, `Fn`, `FnMut` and `FnOnce`.

#### 1. Is it possible to remove function pointer type?

The answer is in what function pointer is -- it is pointer to function item, i.e.
