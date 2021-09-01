---
layout: 'default'
title: 'Blocks'
nav_order: 100
parent: 'Syntax decisions'
# No children
---

# Blocks

Before the control-flow chapter, I have to establish rules about blocks, which are different from Rust's. All blocks (in
control-flow) which enclosed into `{}` are last-statement typed (it means that the last expression of this block is the
value and type of the whole block).

While Rust has rules about the absence of `;`, _Jacy_ does not have required `;`, so this rule cannot be applied in the
same way. Let's look at some examples:

* This block is of type `bool` and has result value `true`, even though we don't use this value

```rust
let a = {true}
```

* This block will produce a type error because it either has a result of type of `myval` or `()` (unit type)

```rust
let a = {if myval => myval}
```

* This block won't produce a type error, because we don't use the result value

```rust
{if myval => myval}
```

So, we already can establish some requirements about type analysis -- we need union types which are impossible to be
declared in language, but may exist in the type system.

**One-line blocks**

In this thing, _Jacy_ blocks differ from Rust's. I really appreciate the opportunity to declare one-line blocks without
`{}`. As far as I wanna _Jacy_ to be consistent, and I established that syntax of `match` expression arms use `=>`, for
one-line blocks we use the same syntax. Let's look at the syntax.

```rust
while true => print('kek')
```

After `=>` we can only place one expression, and if we put `{}` compiler will give a warning because there's no need to
put `{}` after `=>`. So, the syntax looks kind of like that.

```rust
block: `=>` expr | blockExpression | ';';
```

`{}` blocks in control-flow behave absolutely the same way as block-expressions.

One important thing is that function declaration has different syntax and rules about blocks, more about that soon
below.

**Ignoring blocks**

This is a feature that satisfies one definite rule from Zen -- prototyping ease. It is a pretty simple thing -- we can
ignore any block (including control-structures, `mod`s, `func`s, etc.) with `;`.

Examples.

```rust
if myval;
else doSomething()
```

Of course, I couldn't leave this thing without covering the Zen rule about helping a user with mistakes, so there will
be a warning if you're writing code like that.

> Don't confuse block-ignorance with trait method signatures, in case of traits it is not ignorance.
<div class="nav-btn-block">
    
    <button class="nav-btn right">
    <a class="link" href="/Jacy-Dev-Book/syntax-decisions/control-flow-structures.html">Control flow structures ❯</a>
</button>

</div>
