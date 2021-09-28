---
layout: 'default'
title: 'Null coalesce'
nav_order: 108
parent: 'Particles [β RFCs]'
# No children
---

# Null coalesce

Despite the fact that _Jacy_ does not have null replacing it with `Option` such as what Rust does, this particle is called so to use common term "null-coalesce" familiar to SQL, JS, etc. programmers.

## Null coalescing operator

![Elvis operator](https://i.stack.imgur.com/hQlrps.png)

This operator exists in, for example JavaScript - `??`, also known as Elvis operator - `?:` in many languages (PHP, Kotlin) or `COALESCE` in SQL.

At first I would like to remind that _Jacy_ does not have ternary operator `a ? b : c` that was the source of Elvis operator syntax with removed second term `a ?: b = a ? a : b`. Thus _Jacy_ will use `??` operator further in this particle and likely in the implementation.

Null coalescing operator is a kind of disjunction (`||`, or `or` in _Jacy_) but for values which are "optional" (nullable).
That's why I came up with an idea of null-conjunction, that is `&&` operator for optional values.

## Nullack operator

Nullack is new term I'll use here as short form of (lack of null values), nullack operator is a null-conjunction operator.
This idea is pretty uncommon thus behavior I choose would not likely be useful, anyway I want to discuss it.

Operator syntax is not specified, thus `[OP]` will be used further.


Code sample:
```rust
a [OP] b
```
Where `a` has type `Option<T>` and `Option<b>` has type `U`.

This operator MUST return `None` in case when `a` OR `b` are `None` values.

What this operator should return if both of `a` AND `b` are `Some` values is described in variants below.



### Variant #1

Return `(a!, b!): (T, U)`, that is a tuple where first and second elements are unwrapped `a` and `b` respectively.
<div class="nav-btn-block">
    <button class="nav-btn left">
    <a class="link" href="/Jacy-Dev-Book/particles/not-prepedent-op.html">< Not prepedent op</a>
</button>

    <button class="nav-btn right">
    <a class="link" href="/Jacy-Dev-Book/particles/organic-jacy.html">Organic jacy ></a>
</button>

</div>
