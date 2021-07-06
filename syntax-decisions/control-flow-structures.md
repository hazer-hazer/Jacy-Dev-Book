---
layout: default
title: Control-Flow structures
nav_order: 20
parent: Syntax Decisions

description: >-
  The control flow of *Jacy* is mostly inspired by Rust.We've got `if`/`if let`
  as an expression, `loop` as an expression,`while`/`while let` and
  `for`.`while`/`while let` and `for` are statements
---

# Control-Flow structures



The control flow of _Jacy_ is mostly inspired by Rust.

We've got `if`/`if let` as an expression, `loop` as an expression, `while`/`while let` and `for`.

`while`/`while let` and `for` are statements, because:

* Why we need to use them as expressions if they return `()` \(unit\)
* I'm trying to solve the problem above, and it will be solved they'll

  become expression which returns an any-type value

* If I made them expressions then it would break backward compatibility:
* * You could put them in expression place, but they returned `()`, and

    in the new version, they started returning some non-`()` value

**if/if let**

`if` is an expression, works the same as in other languages, here's nothing to say about except that I need to note that _Jacy_ does not support implicit `bool` conversion even through operator overloading like C++ does.

**if let**

`if let` is a way to check if some value matches a specific pattern. Also, as this is a pattern matching we able to destruct our value.

Syntax is following:

```text
ifLetExpression: 'if let' pattern '=' expr block
```

**while/while let**

`while` is a statement that works the same as `while` in other c-like languages

`while let` is the same as `while` except that its condition behaves like `if let`.

**while/while let as expressions**

Here are some thoughts about possible solutions.

```text
while myval {
    // Do something if `myval` is true
} else {
    // Do something if `myval` is false (at first)
}
```

It is an obvious solution, but has some problems:

* As far as `while` can return some value it must explicitly `break`

  with value. We cannot just use the last statement of the `while` block

  as the result value, because `while` is possibly multiple-times

  iterable.

* If we don't `break` with value, then what would be the result? - It

  cannot be simply written in asm-like code with jumps, because we don't

  know when our `while` "does not break".

Problem example:

```text
let a = while myval {
    if somethingElse => break true
} else {
    false
}
```

* What is the type of this `while` expression? - `bool | ()`, but we

  don't support inferred union types.

For now, I cannot come up with any good solution, so `while` is a statement. Anyway, let's try something:

**IDEA \#1** This one requires static-analysis \(maybe complex\):

```text
let a = while myval {
    if somethingElse => break true
    break false
} else {
    false
}
```

We can analyze this code and say that each `break`-value is `bool`, so we allow this.

What about this?:

```text
let a = while myval {
    if somethingElse => break true
} else {
    false
}
```

Each `break`-value is of type `bool`, so we allow it because the alternative workflow is an infinite loop.

We required some static-analysis on `while`, which is, as I see, is not really complex and not differs much from the `if` expression value inference. The only problem is that the use cases of `while-else` are not common, especially when we cover only this use case:

```text
let a = if myval {
    let mut result = false
    while myval {
        // ...
        if somethingElse {
            result = true
            break
        }
    }
    return result
} else {
    false
}
```

**for**

`for`-loop is a statement, not an expression, here, problems with making it an expression are the same as for `while` \(read above\) but even more complex. `for`-loop in _Jacy_ has only one syntax \(`for ... in ...`\) same as Rust, which covers all usages \(almost\) of `for`-loop from C++.

The syntax is the following:

```text
forLoop: 'for' pattern 'in' expression block
```

Examples:

```text
// In C++ we write
for (int i = 0; i < something; i++) {
    // ...
}

// In Jacy:
for i in 0..=something {
    // ...
}

// In C++
for (const auto & x : vec) {
    // ...
}

// In Jacy
for x in &vec {
    // ...
}
```

