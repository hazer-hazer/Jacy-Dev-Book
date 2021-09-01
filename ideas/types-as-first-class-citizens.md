---
layout: 'default'
title: 'Types as first class citizens'
nav_order: 104
parent: 'Ideas'
# No children
---

# Types as first-class citizens

The idea is growing from powerfulness of compile-time evaluation. All types must be known at compile-time, and as far as
I am going to implement comprehensive CTE system, "types as first-class citizens" sounds really fittable in this
picture.

### Type declarations

At first, I thought it would be nice if we could use `type` for declaring not only aliases to types but also use them in
the way as type variables. Types are items, all items are forwardly declared, that is, if some type is declared in a
scope, it can be used before it actually appears in the code. Example.
```rust
func foo {
    let a: MyType = 123;

    type MyType = i32;
}
```

For me, it looks problematic as the control flow with types would be either impossible or weird.
```rust
func foo {
    if a {
        a = i64;
    }

    type a = i32;
}
```
Hmm... WTF???

Actually, control-flow for types is useless in the way of using declared aliases. Aliases are not dynamic, thus if we
declared one -- we already know what type it is. But what if we don't know what type we receive? E.g. in generics, we
get type parameter which is unknown, and what if it would be possible to check this type as a value?

### Dynamic type checks

Example.
```rust
func foo<T>(arg: T) {
    if T == bool {
        print("We've got 'bool'");
    } else {
        print("We've got not a 'bool'");
    }
}
```

Looks useful, but... not, actually. I cannot come up with a case when this cannot be described with generics and
constraints.

### Returning types
<div class="nav-btn-block">
    <button class="nav-btn left">
    <a href="/Jacy-Dev-Book/ideas/named-arg-alias.html">< Named arg alias</a>
</button>

    
</div>
