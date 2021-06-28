# Invert Rust for usability

This idea is really complex and it is hard to predict if it would work.

As far as I want _Jacy_ to be aimed at more high-level than Rust do, I appreciate usability in the way when we save the most important aspects of Rustish safety and power with a lack of some low-level features.

### Why not Rust-like

What is problematic for me in Rust design \(this is not a list of Rust cons, no, these are things I find too explicit/low-level, etc.\).

#### Move by default

Rust is "always move" PL, which means that even primitives are moved but copied before. This is a good solution and I like it more than C++ where we need to write `const &` or `std::move` always everywhere.

Anyway, most of the time we pass non-Copy types as immutable references, that is, we rarely need to get a reference to modify its underlying value. Moves, as I think, used more often than `&mut` but not as often as immutable references.

The solution is to have immutable references by default, that is, a kind of Copy-On-Write \("COW" further\).

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

