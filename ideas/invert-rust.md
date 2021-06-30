---
layout: default
title: Invert Rust for usability
nav_order: 5
parent: Ideas

# description: This stage is where name resolution begins.
---

# Invert Rust for usability

This idea is really complex and it is hard to predict if it would work.

As far as I want _Jacy_ to be aimed at more high-level than Rust do, I appreciate usability in the way when we save the most important aspects of Rustish safety and power with a lack of some low-level features.

## Why not Rust-like

What is problematic for me in Rust design \(this is not a list of Rust cons, no, these are things I find too explicit/low-level, etc.\).

### Move by default

Rust is "always move" PL, which means that even primitives are moved but copied before. This is a good solution and I like it more than C++ where we need to write `const &` or `std::move` always everywhere.

Anyway, most of the time we pass non-Copy types as immutable references, that is, we rarely need to get a reference to modify its underlying value. Moves, as I think, used more often than `&mut` but not as often as immutable references.

The solution is to have immutable references by default, that is, we replace "Move or Copy" with "Borrow or Copy". I'll call this IBD \(Immutable Borrow by Default\) further.

Doing so requires "move" to be a first-class operation, it can be a specific operator, e.g. prefix `^` to move or just the `move` keyword.

Example:

```text
struct Struct {
    field: i32,
}

func printByRef(instance: A) {
    print(instance.field);
}

func printMove(move instance: A) {
    print(instance.field);
}

func printNum(num: i32) {
    print(num);
}

func changeNum(ref num: i32) {
    num = 0;
}

func main {
    let instance = Struct {field: 666};

    printByRef(instance); // `instance` is not moved here like in Rust
    printByRef(instance); // `instance` here and before is passed by reference

    printMove(move instance); // `move` is explicit
    // printMove(move instance); // Error: `instance` is moved
    // printByRef(instance); // Same error: `instance` is moved

    let num = 1000;

    printNum(num);
    printNum(num); // Everything is find -- `i32` is a Copy-type

    let mut var = 0xB16B00B5;

    print(var); // Prints 2976579765
    changeNum(var);
    print(var); // Prints 0
    
    
    let mut a = Struct {field: 100};
    
    let mut r0 = a;
    let mut r1 = a; // Error: Cannot borrow `a` as mutable more than once
}
```



### The problems I see

I think it is actually impossible to replace Rustish "move by default" with "ref by default" and break everything. The only problems that come up from this solution appear from the view of semantics.

#### Copy-Types borrowing

Having IBD we cannot get rid of references in semantics, as far as we don't borrow Copy-types and so need a way to pass them by reference. E.g. we have a variable storing `i32`, that is, it won't be passed as IBD, and if we need to have a function modifying `i32` we need to explicitly pass it by reference.

Thus let's imagine we have `ref` keyword which is used in both function signature and passing to function.

#### Lack of explicitness

E.g. in Rust when we want to slice an array, we write `let slice = &array[from..to]`, 'cause the size of the slice is not known at compile-time, so we cannot allocate it on the stack. In IBD it would be `let slice = array[from..to]`, as far as the slice is not a Copy-Type \(same in Rust\). That's just an example of what we hide with IBD but not a problem.



#### Examples

Let's look at different kinds of data passes:

**Assignment**

`a = b` in Rust is `a = move b` but with IBD it will become `a = &b`.

To move ownership there must be `move` annotation which 

**Functions**

When we create a function like `func foo(param: String)`, `param` is of type `&String`. To make it mutable type must be prepended with `mut`, so it gonna look like `mut String` which is actually a `&mut String`.

Copy-types, e.g. `i32` are copied, that is, they are passed by value and copied. So, if we want to change the value of some variable containing copy type we would write `func foo(param: ref mut i32)` and must be expicitly passed with `ref mut` prefix.



