# User Guide

**This is a WIP quick overview of _Jacy_**
__You're unable to run any code present here. Please, think of this as an image from my mind 🥺__

## What is _Jacy_?

_Jacy_ is a small project, the reason I'm creating it is to learn compiler development and perhaps create an alternative to C++.

## Lexical structure

You can skip [Lexical structure] part and just move to [Intro](#intro).

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

{:> Custom operators [future feature]:}
> Is is planned to add custom operators in the future, likely it will be similar to how Swift does it.
> Anyway, the first versions won't allow customizing operators.

#### Operator precedence table

This table shows which operators are stronger than others, associativity is marked as "left to right" for left-associative operators and "right to left" for right-associative operators.
This table also includes expressions that are not operator expressions, anyway, it might be helpful to know that they are parsed assuming this figurative precedence.

> Precedence index is placed just for some help, sometimes you need to know the order.

The table is from high to low precedence ordered -- the operators in the first row have the strongest precedence.

| Precedence index | Operator groups / expressions | Associativity |
|  | Paths (`::`) | N/A |
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
|  | `in` | Non-associative |
|  | `<=>` | Non-associative |
|  | `<` `>` `<=` `=>` | Non-associative |
|  | `==` `!=` | Non-associative |
|  | `and` | left |
|  | `or` | left |
|  | `=` `+=` `-=` `*=` `/=` `%=` `&=` `|=` `^=` `<<=` `>>=` | left |

Prefix operators: `not`, `&` (borrow), `&mut` (borrow as mutable, `&` and `mut` can have whitespace between), `-` (negation), `*` (dereference).

Postfix operators: `?` (optional chaining), `!` (unwrap).

{:> Range operators precedence [why?]:}
> Range operators have this kind of precedence as we want to write `a..b+1` which means `a..(b+1)`
> as far as writing `a..b == c..d` which means `(a..b) == (c..d)`

#### `not` prefix

_Jacy_ has a special feature -- you can put `not` operator before infix operator to negate boolean operation.
Example: `a not in b` is the same as `not (a in b)`.
This is useful for operators like `in`, by the way, it is possible to write something like `a not and b` that would be the same as `not (a and b)`, but code like this is hard to read.

Of course, when you write `a not OP b` you got `not (a OP b)` thus keep in mind that `OP` must be a logical operator, otherwise you'll have a type error.

### Punctuation

Some symbols are reserved punctuations, punctuations differ from operators in the sense that operators, obviously, perform some operations, whereas punctuations are used as syntax units: delimiters, disambiguators, etc.

Also, some symbols depend on the context, sometimes they can be operators, sometimes punctuations. E.g. `=` is an assignment operator, but only in expressions, for function definition, we use `=` as body beginning (in expression-body case).

Symbols considered punctuations: `(`, `)`, `[`, `]`, `{`, `}`, `,`, `;`, `:`, `<`, `>` (in generics, not "less/greater than" operators).

## Intro

Let's begin with the cliché -- "Hello, world" in _Jacy_:

```jc
func main {
    print("Hello, world");
}
```

Here you can see:

- Functions in _Jacy_ are defined with `func` keyword.
- Parentheses are omitted -- if a function expects 0 parameters you're able not to write parentheses.
- _Jacy_ requires semicolons as a statement terminator.
- There's a `main` function, that is, the entry point of the program, as in many other compiled programming languages.

{:> Optional semicolons :}
> You may notice that in _Jacy_ semicolon is a required terminator for statements.
> In the first version, it would be so, anyway semicolon inference would be one of the first updates in future versions though.

As we already started with a function, let's talk about them right after the introduction to literals.

### Primitive types & Literals

Primitive types in _Jacy_:

- boolean type: `bool`.
- character type `char`.
- signed integer types: `i8`, `i16`, `i32`, `i64` and `int`.
- unsigned integer types: `u8`, `u16`, `u32`, `u64` and `uint`.
- floating-point number types: `f32` and `f64`.
- slice type: `[T]`.
- string slice type: `str`.
- tuple type: `(T1, T2, T3, ...)`
- array type: `[T; N]`

{:> Type naming :}
> Despite the names of primitive type, in _Jacy_, by convention, type names must begin with an upper-case letter.
> Primitive type names are exceptions, you must use PascalCase (capitalized camelCase) for type names.

#### Boolean

The boolean type can hold one of two values: `true` or `false`.

#### Character

In _Jacy_ characters are always valid, utf8 encoded Unicode points, thus the size of one character is 4 bytes.
In contrast to Rust, C, C++, and other languages that have character literal, in _Jacy_, you character literal is written in the same way as a string literal (as in Swift).

So, `"a"` can be a character, but `"abcde"` cannot, because it holds multiple characters (it is a string).
The question that you may come with is "How do I say that it is a character" -- you need to annotate the type of expression, depending on the context.
For variables, you need to write `let a: char = "a"`, but for function, you can just pass character without any annotation `foo("a")` if function expects `char` as the first argument.

#### Integer types

Integer types in _Jacy_ exist in 4 static sizes: 8, 16, 32, and 64-bit size, and two kinds - signed and unsigned.
The types `int` and `uint` are platform-dependent types, in Rust, they are the same as `isize` and `usize` respectively.

By default, integer literal is of type `int`.
To create an integer literal of a specific type, you can use a type suffix same as a type name, e.g. for `u8` typed integer `123` you write `123u8`.

{:> `i128` and `u128` :}
> As you can see, there is no 128-bit sized integer type in _Jacy_ for now, by the way, they are in the future plan.

#### Floating point types

For floating-point numbers, there're two types: `f32` and `f64` - 32-bit sized and 64-bit sized respectively.

Float literals support suffixes too as int's: `1.6783f32` or `55f64`.

{:> `f128` :}
> As 128-bit integers, `f128` is in the future plan.

#### Slice type

If you have no experience with Rust, slice type might be hard to comprehend. Slice is a kind of "view" into memory where data is placed, it is statically sized but the size is not unknown at compile-time.
In C, a slice would be the same as pointer + size, like `char * arr; int size`. While in C you can access any address you want and you pass a size everywhere to know how many elements you have access to. In _Jacy_ it is impossible (without hack-like code) to access invalid memory locations.

Don't confuse "slice" in _Jacy_ with a slice of the list, etc. in other programming languages, while concepts are pretty relative.

Slice type is a type enclosed into brackets - `[T]`, e.g. `[int]` is an "int slice".

#### `str` / String Slice type

There's one specific kind of slice that is used so often thus got his own type -- `str`.
It is simply a string slice, pretty same as `[char]`.

#### Tuple type

Tuple is a heterogeneous collection, i.e. collection of different types. Tuple elements do not have names and can be accessed by index, e.g. `(123, 666).0` will be `123`.

##### Unit type

Unit type is an empty tuple - `()`, its purpose is the same as of `void` in some programming languages.
By default, if type omitted - functions return `()`.

#### Array type

Array is a homogeneous collection, i.e. all elements are of the same type. Arrays have static compile-time-known size, so you cannot resize it.

Array type looks like slice type but with size, ascription after `;` - `[T; N]`, e.g. `[int; 100]` is an array of `100` ints.

### Functions

You can declare a function with `func` keyword followed by its name, parameters, and body (there're also some more particles but we'll review them further).

Let's disassemble a simple function:

```jc
func add(a: int, b: int): int {
    return a + b;
}
```

- `(a: int, b: int)` is a parameter list where `a` and `b` are names of parameters and `int`'s are types for each of them.
- After the parameter list goes return type, it is annotated with the same punctuation - `:`
- Function body is enclosed into `{}` (curly brackets, also I'll probably call them "braces" further)

To invoke `add` we need to pass two integers in it -- `add(1, 2)`, this expression will result in integer `3`.

#### Invocations with labels

_Jacy_ supports labeled arguments, it is a way to call a function without writing arguments in the same order as parameters are declared.

Let's call `add` function from example above with named arguments:

```jc
add(a: 6, b: 13); // 19
add(b: 13, a: 6); // 19. Order does not matter
```

#### Function overloading

_Jacy_ does not support type function overloading, but you can overload function with different parameter labels.

Example:

```jc
func add(intA: int, intB: int): int {
    return intA + intB;
}

func add(floatA: f64, floatB: f64): f64 {
    return floatA + floatB;
}
```

### Structures

Structures in _Jacy_ are declared the same way as in Rust:

```jc
struct MyStruct {
    field: i32,
}
```

### Traits

Traits are also similar to Rust:

```jc
trait DoesSmth {
    func doSmth();
}
```
