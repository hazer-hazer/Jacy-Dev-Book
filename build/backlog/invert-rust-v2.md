---
layout: 'default'
title: 'Invert rust v2'
nav_order: 101
parent: 'Backlog'
# No children
---

# Invert Rust

## This (new version of old "Invert Rust") idea is also DEPRECATED, because it cannot live without GC 😭

#### Disclaimer

I know that pass-by-reference is often understood wrong, as far as I know, there're a small count of languages which
support "real" pass-by-reference (C++ sometimes), thus I'll try to avoid this term. Let's name it as what it does: "Make
a Reference and Pass the reference by Value" (__MRPV__ further)

#### The concept

This idea is growing from my view on references usage, I don't have so much experience with low-level programming,
anyway I'm almost sure that passing a reference (pointer) appears more often than moving, when we're talking about
non-primitive (non-copy) types.

There're languages like Java or, inherently, Kotlin that does not syntactically separate MRPV and raw pass-by-value, but
boxed types are MRPV and primitives are pass-by-value. I don't want to confuse myself and, importantly, someone else
doing so.

There was the first idea, but it has many problems in the way that types unpredictably become reference-types.
Now, I come up with a concept where everything is more clear.

### First things first

As *Jacy* is hardly inspired by Rust, let's, at first, look at what Rust does. Rust is pass-by-move... that's all 😄

No, question is wider and deeper. Rust is very good, pass-by-move is a nice rule that leads to straightforward code and
safes us from some accidents with owning. Anyway, as I claimed above -- we want reference by default. And __questions__
that I need to answer are:
 - Can it be actually done and how?
 - Will it be consistent?
 - Is it beautiful and so convenient that we need it?
 - Does it cover enough low-level programming cases?

#### Let's look at Rust

Rust is pass by move, but what does "move" mean? `move` is nothing more than `memcpy` but with some static analysis that checks we don't use moved value.
Actually, assignment in Rust is always byte-by-byte copy, and *Jacy* respects this, because assignment with side effects, etc. is bad.


#### The key

I'm sadly describing this idea after I marked it as DEPRECATED. Why it is deprecated described below, now, let's look how it would look like.

Invert Rust means that:
- Non-copy type `T` internally becomes `&T`
- To make a non-ref type `own` must be used -- `own T`
- Copy types automatically becomes `own T`

At first, it might be confusing or even a nice solution.

Let's look at examples:
```rust
// We have
func foo(a: str);
// Rust has
func foo(a: &str);

// We have
func foo(a: own String);
// Rust have
func foo(a: String);

// We have
func foo(a: i32);
// Rust has
func foo(a: i32);
// As `i32` is copy type -- it automatically becomes `own i32`, so we don't need to write `own i32` ourself 
```

This examples show that when Rust use move -- we use `own`, and when Rust use `&` -- we don't annotate it as reference type, because for non-copy type, reference is default.

`own` is kind of saying to compiler: "it could be a reference type, but here's `own` thus don't place here a reference by default".

###### What we're unable to do

This solution covers all use cases, and doesn't break Rust semantics until we don't have elision for reference types, etc.
If some rules becomes "implicitly make this type ..., because it is convenient" -- we break everything.
Thus, all semantics must be saved, but just inverted.

##### What problems we solve?

Actually, by "problems" I mean "cover the most popular use cases to simplify writing code".

- Code becomes cleaner as we don't annotate `&` and `ref` mostly everywhere
- We don't have strange `&str`, etc.

##### What problems we produce?

The first one is the problem with copy-types. Above, I said that copy-types are `own T` by default, sounds simple, but... How do we make a reference to copy-type?!
If we apply this rule -- no way, without annotating it with `&`.
And here we go again... Doing so, code becomes noisier, as we've got `T`, `own T` and `&T` (*but `&T` is used just for some rare cases*) -- disgusting 🤢.

What could we do? - Remove rule "copy-type becomes `own T`", we save all the semantics.
But stop... Now we need to always write `own i32`, etc. just not to make a `&i32` by default?!! 🤦

#### Why is that idea deprecated?

- Problem with copy-types, like `own i32`
- Generics become `<own T, own T2, ...>`
- We may be confused with `own` and `move`, because `own` is in-type annotation but `move` is in-expression annotation
<div class="nav-btn-block">
    <button class="nav-btn left">
    <a class="link" href="/Jacy-Dev-Book/backlog/index.html">< Backlog</a>
</button>

    <button class="nav-btn right">
    <a class="link" href="/Jacy-Dev-Book/backlog/invert-rust.html">Invert rust ></a>
</button>

</div>
