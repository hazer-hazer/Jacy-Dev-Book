---
layout: default
title: Invert Rust for usability
nav_order: 5
parent: Ideas
---

# Invert Rust

## This (new version of old "Invert Rust") idea is also DEPRECATED, because it cannot live without GC 😭

#### Disclaimer

I know that pass-by-reference is often understood wrong, as far as I know, there're a small count of languages which support "real" pass-by-reference (C++ sometimes), thus I'll try to avoid this term. Let's name it as what it does: "Make a Reference and Pass the reference by Value" (__MRPV__ further)

#### The concept

This idea is growing from my view on references usage, I don't have so much experience with low-level programming, anyway I'm almost sure that passing a reference (pointer) appears more often than moving, when we're talking about non-primitive (non-copy) types.

There're languages like Java or, inherently, Kotlin that does not syntactically separate MRPV and raw pass-by-value, but boxed types are MRPV and primitives are pass-by-value. I don't want to confuse myself and, importantly, someone else doing so.

### First things first

As *Jacy* is hardly inspired by Rust, let's, at first, look at what Rust does.
Rust is pass-by-move... that's all 😄

No, question is wider and deeper.
Rust is very good, pass-by-move is a nice rule that leads to straightforward code and safes us from some accidents with owning.
Anyway, as I claimed above -- we want reference by default.
And __questions__ that I need to answer are:
 - Can it be actually done and how?
 - Will it be consistent?
 - Is it beautiful and so convenient that we need it?
 - Does it cover enough low-level programming cases?

#### Let's look at Rust

Rust is pass by move, but what does "move" mean?
`move` is nothing more than `memcpy` 
