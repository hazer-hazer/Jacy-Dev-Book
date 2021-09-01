---
layout: 'default'
title: 'Lambdas'
nav_order: 3
parent: Kek
# No children
---

# Lambdas syntax

Oh, I fight with lambdas syntax so long, actually still doing this. The problem could be easily solved, just by using
Rust' syntax `|...| expr`. It does not confuse me much, btw I would like to make lambda parameter list cleaner with some
kind of opening delimiter and closing one.

To memorize the process of brain-storm, I'd like to describe the flow.

#### Idea #1 "Stupid"
The first idea was to use `(p1, p2, ..., pN) -> expr` syntax, but it does not play well with tuple syntax. This is
because each parameter is not just an identifier -- it is a pattern. I insist on lambda parameters to be patterns as
function parameters do, to be consistent. Also, the problem is that when we have required `->` we not allowed to
unambiguously parse return type of lambda, this could be solved with `(): returnType -> expr` actually.

#### Idea #2 "Rust syntax"
JUST USE RUST SYNTAX.
- Is solves problems with return type
- It is LL parsable
- It solves problems with pattern matching in parameters

But as I wrote above, I want opening and closing delimiter in lambda parameters. This Ruby-like syntax looks like
"capture something...".

#### Idea #3 "Full inference"
```
(p1, ..., pN) -> expr
```

- No type annotations and full inference

This one is very simple, but won't work as far as *Jacy* does not support parameters types inference.

#### Idea #4 "Solving conflicts"
The idea is to parse `(...)` to some non-AST structure -- NamedList, where each element in list is `TokenList: type`. If
we encounter a `->` after `)` -- we parse each `TokenList` as pattern and continuing as lambda parsing. If there's no
`->` we parse `TokenList` as expression and report errors if it is an invalid expression or `type` exists (tuples cannot
have types in expression).

Pros:
- Opening and closing delimiters
- We have `(...) -> expr` syntax

Cons:
- Hacking parser is not a good idea for WIP project, like early optimizations.
- Large Parser updates (we need to allow handling separate token stream).

#### Idea #5 "Haskell-like"
```
\(p1: type, ..., pN: type): type -> expr
```

Pros:
- Opening and closing delimiters
- No conflicts and easy LL parsing

Cons:
- We have `\` syntax 😞
- `->` is required so return type syntax is `(...): type`

Also, this syntax allows simplifications:
- We can allow `IDENT -> expr` as a shortcut for `BorrowPattern(IDENT) -> expr`
