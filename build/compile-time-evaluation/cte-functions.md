---
layout: 'default'
title: 'Cte functions'
nav_order: 103
parent: 'Compile time evaluation'
# No children
---

# CTE Functions

A function is CTE if:

* It is marked with `const` modifier
* It is possible to infer that function can be CTE

We mark a function as CTE so.

```rust
const func foo() {}
```

Then the compiler will check that all computations performed inside this function `'foo'` are CTE, if not, it gives an
error.

In another way, the result of the function won't be inlined in usage places, but it is possible to use a function that
wasn't qualified as `const` in a CTE context. More about that below.

**const inference**

Another approach is more complex for the compiler but simple for the user: If we declare a function and use it in CTE
context when compiler goes to this function and checks that it's CTE function. Anyway, if we use this function in a
run-time context it won't be inlined and evaluated at compile-time. Example.

```rust
// Just a simple function that returns `1`
func foo = 1

const func myConstFunc {
    const a = foo()
}

func myRawFunc {
    let a = foo()
}
```

After `const` expansion this code will look (structurally) like that.

```rust
func foo() = 1

const func myConstFunc() {
    const a = 1
}

func myRawFunc() {
    let a = foo()
}
```

As you can see in `myRawFunc` `foo` is still a function call, because `foo` used in a non-`const` context. Whereas in
`myConstFunc` value returned by `foo` was inlined as we declared `a` as `const`. `const` qualifier does not mean that
everything inside it will be inlined, you still can declare `let` or use `if` inside of it. `const` just means the
compiler will check function for constness and tell you if it's not.
<button class="btn btn-outline" href="/compile-time-evaluation\cte-expressions.md">< Cte expressions</button>
<button class="btn btn-outline" href="/compile-time-evaluation\index.md">Compile time evaluation ></button>
