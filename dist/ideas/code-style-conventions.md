---
layout: 'default'
title: 'Code style conventions'
nav_order: 3
parent: Ideas
---

# Code Style Conventions

As far as *Jacy* is VERY WIP, I won't describe serious conventions, thus it's gonna be here -- in ideas.

## Namings

Okay, I respect Rust, but snake_case is not kind of what most of people use I think, even not considering things like
"most people do ...", does not matter, I can describe everything from my view.


##### To be (snake) or not to be

Actually, it does not matter for me. The only thing I won't accept is usage of, so called, PascalCase for functions,
variables, etc. except types, names.


### Intro and common rules

List of all writing styles referenced in convention:
 - __camelCase__ - starts with lowercase letter, each next word starts with uppercase
 - __PascalCase__ - starts with uppercase letter, each next word starts with uppercase
 - __snake_case__ - each word starts with lowercase letter, words separated with `_`
 - __SCREAMING_SNAKE_CASE__ - all letters in uppercase, words separated with `_`

All other variations MUST NOT be used in code.

Further in this text I will use "MUST" and "SHOULD", "MAY" (mostly for alternatives to things that "SHOULD BE..."), so
that gonna be clean what is my view.

"__Different code-styles MUST not be mixed__" is the most important rule here, I think. It means, that if somewhere here
is written that something "SHOULD BE ..." but "MAY BE ..." and you've chosen a described alternative -- use it
everywhere in your code.


### Variables and functions

Variables and functions SHOULD be named in __camelCase__: `somethingSomewhere`, `myFunction`, `foo`, `barBazFuzz`

Variables and functions MAY be named in __snake_case__: `something_somewhere`, `my_function`, `foo`, `bar_baz_fuzz`

If one of style is chosen it MUST be followed in the whole code.


### Constants

Talking about constants, I mean constants declared with `const`. Actually `let` without `mut` is a constant, but `let`
is under rule above

`const` SHOULD BE named in __SCREAMING_SNAKE_CASE__: `UNCHANGEABLE_VALUE`

Scientific constants like PI number MUST BE named in __SCREAMING_SNAKE_CASE__: `PI`, `G`

`const` MAY BE named in __camelCase__: `myImportantValue`

### Type names

Type names include names for:
 - `struct`
 - `trait`
 - `enum`
 - `type`
 - type parameters (read further)

All types MUST be in __PascalCase__: `MyType`, `SomeStructure`, `EnumWithEverythingINeed`

__Exception__ is built-in primitive types: `i8`, `i16`, `i32`, `int`, `i64`, `i128`, `u8`, `u16`, `u32`, `uint`, `u64`,
`u128`, `isize`, `usize`, `f32`, `f64`, `double`, `bool`, `char`, `str`

Nothing else CANNOT BE named in __PascalCase__ except user-defined types!

### Type parameters

Actually, type parameters are under rule above ("Type names"), anyway, they are styled a little bit different.

Type parameters MUST BE named in __PascalCase__: `T`, `U`, `V` and SHOULD BE 1 character long.

As you can see, 1 uppercase character is used for type parameters, but which to use when there're more than one or usage
is specific? Here's the table of common cases:

|   Case   |   Names   |
| :------: | :-------- |
| Single "any" type | `T` |
| Key-value types | `K` for key and `V` for value. Often used in mapping structures |
| Multiple types | First - `T`, Second - `S`, Third - `U`, Fourth - `V` |
| Meaningful types | `TSize`, `TInput`, `TOutput` |
| A lot of "any" types | `T0`, `T1`, `T2`, ..., `TN`. Rarely needed, but can occur in, for example, tuple type implementations |

> "any" type imply cases when it is not important to refer to this type, and it just needed to be annotated.

### Modules (`mod`)

`mod` MUST BE named in __snake_case__: `std`, `my_lib`, `some_module`
