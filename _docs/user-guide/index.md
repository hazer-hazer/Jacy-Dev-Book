# User Guide

**This is a WIP fast overview of _Jacy_**

#### What is _Jacy_?

_Jacy_ is a small project, the reason I'm creating it is to learn compiler development and perhaps create an alternative to C++.

## Lexical structure

_Jacy_ might be easy to read for users familiar with C-like syntax. Its syntax is influenced by Rust, Swift, and C++.
Anyway, some things might be uncommon especially for users not coming from Rust, and I'll try to explain everything as clean as I can.

This part is about Lexical structure, that is further, talking about syntax I will refer to particular syntax units, e.g. Identifiers.

### Comments

Comments are syntax units that are ignored and do not affect program compilation.
You can use them for any additional info and documentation for your code.
_Jacy_ has C-style comments, `//` for one-line and `/**/` for multiline.
Documentation comments start with `///` for one-line and `/**` for multiline (with closing `*/`)

### Identifiers

Identifiers in _Jacy_ start with an English letter or `_` (underscore) followed by `_`, letters or digits.
Identifiers are used as names and cannot be the same as reserved words (keywords), which are listed below.

__Anyway, in _Jacy_ `_` is a reserved keyword__

Examples of valid identifiers: `text`, `_123`, `__someStrangeName`, `snake_style_name`


### Keywords

This words are keywords, thus cannot be used as identifiers: `and`, `as`, `async`, `await`, `break`, `const`, `continue`, `elif`, `else`, `enum`, `false`, `for`, `func`, `if`, `impl`, `in`, `infix`, `init`, `loop`, `match`, `mod`, `move`, `mut`, `not`, `of`, `or`, `return`, `party`, `pub`, `ref`, `self`, `static`, `struct`, `super`, `trait`, `true`, `type`, `use`, `let`, `where`, `while`.

There're also reserved keywords that are not in use: `do`, `import`, `macro`, `of`.

### Operators

Operators are special symbols that you use to work with values.
There're three kinds of operators: prefix (unary), infix (binary), and postfix (unary).
Prefix, infix, and postfix are about where an operator is placed: before, between, or after expression(s).

Infix operators have some properties: precedence and associativity.

Precedence is a strength of operator, for example, we all know that `a + b * c` is the same as `a + (b * c)`, as `*` operator in math is stronger than `+` operator.

Associativity is about how operators with the same precedence are grouped, that is, if `+` operator is left-associative, then `a + b + c` is `(a + b) + c` and if it is right-associative then `a + (b + c)`.
Most infix operators are left-associative.

Prefix and postfix operators in _Jacy_ all have one precedence by groups: postfix is stronger than prefix operator.

#### Operator precedence table

This table shows which operators are stronger than others, associativity is marked as "left to right" for left-associative operators and "right to left" for right-associative operators.
This table also includes expressions that are not operator expressions, anyway, it might be helpful to know that they are parsed assuming this figurative precedence.

> Precedence index is placed just for some help, sometimes you need to know the order.

The table is from high to low precedence ordered -- the operators in the first row have the strongest precedence.

| Precedence index | Operator groups / expressions | Associativity |
|  | Paths (`::` punctuation) | N/A |
|  | Field expression (aka member access - `a.b`) | left to right |
|  | Invocations (aka calls - `a(...)`), array access (aka indexing - `a[...]`) | N/A |
|  | [Postfix operators] `?` | N/A |
|  | [Prefix operators] `!`, `&`, `&mut`, `-`, `*` | N/A |
|  | `as` | left |
|  | `*` `/` `%` | left |
|  | `+` `-` | left |
|  | `..` `..=` | Non-associative |
|  | `<<` `>>` | left |
|  | `&` (infix) | left |
|  | `^` | left |
|  | `|` | left |
|  | `<=>` | Non-associative |
|  | `<` `>` `<=` `=>` | Non-associative |
|  | `==` `!=` | Non-associative |
|  | `and` | left |
|  | `or` | left |
|  | `=` `+=` `-=` `*=` `/=` `%=` `&=` `|=` `^=` `<<=` `>>=` | left |


{:> Range operators internals :}
> Range operators have this kind of precedence as we want to write `a..b+1` which means `a..(b+1)`
> as far as writing `a..b == c..d` which means `(a..b) == (c..d)`


