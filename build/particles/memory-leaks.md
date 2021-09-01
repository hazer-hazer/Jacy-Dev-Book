---
layout: 'default'
title: 'Memory leaks'
nav_order: 105
parent: 'Particles'
# No children
---

# Memory leaks

What are memory leaks and how do we prevent them and should we?

# Cause

In languages like C or C++ memory leaks can exist in a code in any way, it is not what we actually interested in. The question is -- can we help user avoid memory leaks?
In languages with automatic memory management memory leaks can still exist, and it can be not a user fault, V8 GC can have some troubles when, for example, code uses closures.
GC is not really interesting for me (tracing GC). Rust does not have GC at all and isn't built on any GC-like concept like Swift (that uses ARC) -- memory is managed statically (if we are talking about references). 
Memory leaks with references are not possible in Rust as it would break the whole theory of its safety, by the way, ML can be caused by cyclic Rc without Weak break or when we use unsafe pointers, for example, in FFI.
Actually, FFI kind of "requires" memory leaks as if memory is fully managed by the language, it is impossible to say it: "this mekory gonna be used externally by C program", thus we need to be able to leave memory out of control.

# ARC as first-class entity

I want to disassemble an idea of first-class ARC. The reason to have ARC as first-class entity is an ability to statically check wherever a problem like cyclic references occur and may cause a memory leak.
<button class="btn btn-outline" href="/particles/index.md">< Particles</button>
<button class="btn btn-outline" href="/particles/not-prepedent-op.md">Not prepedent op ></button>
