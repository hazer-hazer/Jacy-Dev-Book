---
layout: 'default'
title: 'Ops and puncts'
nav_order: 103
parent: 'Appendices'
# No children
---

# Operators and punctuations

Operators in _Jacy_ are not something internally special in comparison with
functions. When calling `a + b` the trait `std::ops::Add` will be used. Mostly
all operators are overloadable.

### Operators in expressions

| Operator | Trait to overload |
| :------: | :---------------- |
| `a + b` | `std::ops::Add` |
| `a - b` | `std::ops::Sub` |
| `a * b` | `std::ops::Mul` |
| `a / b` | `std::ops::Div` |
| `a % b` | `std::ops::Rem` |
| `a ** b` (\*) | `std::ops::Pow` |
| `a or b` | N/A |
| `a and b` | N/A |
| `!a` | `std::ops::Not` |
| `a & b` | `std::ops::BitAnd` |
| `a | b` | `std::ops::BitOr` |
| `a << b` | `std::ops::Shl` |
| `a >> b` | `std::ops::Shr` |
| `a ^ b` | `std::ops::Xor` |
| `a < b` &nbsp; `a > b` &nbsp; `a >= b` &nbsp; `a <= b` &nbsp; `a <=> b` | `std::ops::Cmp` |
| `a == b` &nbsp; `a != b` | `std::ops::Eq` |
| `a === b` &nbsp; `a !== b` | ??? (Not described) |
| `a..b` | `std::ops::Range` |
| `a..=b` | `std::ops::RangeIncl` |
| `..b` | `std::ops::RangeTo` |
| `a..` | `std::ops::RangeFrom` |
| `..=b` | `std::ops::RangeToIncl` |
| `..` | `std::ops::RangeFull` (\*\*) |
| `a += b` | `std::ops::AddAssign` |
| `a -= b` | `std::ops::SubAssign` |
| `a *= b` | `std::ops::MulAssign` |
| `a /= b` | `std::ops::DivAssign` |
| `a %= b` | `std::ops::RemAssign` |
| `a **= b` | `std::ops::PowAssign` |
| `a |= b` | `std::ops::BitOrAssign` |
| `a &= b` | `std::ops::BitAndAssign` |
| `a <<= b` | `std::ops::ShlAssign` |
| `a >>= b` | `std::ops::ShrAssign` |
| `a ^= b` | `std::ops::XorAssign` |
| `a?` | `std::ops::Try::branch` |
| `a!` | `std::ops::Try::unwrap` |
| `a.b` | N/A |
| `a()` | `std::ops::Invoke` |
| `*a` | `std::ops::Deref` |
| `*a = b` | `std::ops::DerefMut` |
| `&a` | N/A |
| `a |> b` | N/A |

* (\*) For the exponentiation operator, there can be a conflict with
  dereferencing operator `*`, to solve it you need to put white space between
  terms. E.g. `a**b` == `a ** b` as far as `a **b` == `a ** b` but not == `a *
  *b`, and `a*b` == `a * b`. So, with dereferencing, always put white space
  before `*` (as dereferencing operator).
* (\*\*) `RangeFull` is not a real operator, it is an empty `struct` which can
  be passed somewhere.

### Punctuations

| Punctuation | Usages |
| :--- | :--- |
| `:` | Type annotations in almost all constructions, function call argument name |
| `->` | Function types, lambdas |
| `;` | Statement terminator, body ignorance, item declaration |
| `=>` | `match` arms |
|  |  |


### Operators and punctuations precedence

Precedence (from highest to lowest)

| Symbols |
| :-----: |
| `a::b` |
| `a.b` |
| `a()` &nbsp; `a[]` |
| `a?` |
| `-a` &nbsp; `*a` &nbsp; `!a` &nbsp; `&a` &nbsp; `&mut a` |
| `a as b` |
| `a ** b` |
| `a * b` &nbsp; `a / b` &nbsp; `a % b` |
| `a + b` &nbsp; `a - b` |
| `a << b` &nbsp; `a >> b` |
| `a & b` |
| `a ^ b` |
| `a | b` |
| `a == b` &nbsp; `a != b` &nbsp; `a === b` &nbsp; `a !== b` &nbsp; `a < b` &nbsp; `a > b` &nbsp; `a <= b` &nbsp; `a >= b` &nbsp; `<=>` |
| `a and b` |
| `a or b` |
| `a..b` &nbsp; `a..` &nbsp; `..` &nbsp; `..=b` &nbsp; `..b` &nbsp; `a..=b` |
| `a |> b` |
| `a = b` &nbsp; `a += b` &nbsp; `a -= b` &nbsp; `a *= b` &nbsp; `a /= b` &nbsp; `a %= b` &nbsp; `a **= b` &nbsp; `a &= b` &nbsp; `a |= b` &nbsp; `a ^= b` &nbsp; `a <<= b` &nbsp; `a >>= b` |
| `return a` &nbsp; `break a` &nbsp; `() -> {}` |
<button class="btn btn-outline"><a href="/appendices/index.md">< Appendices</a></button>
