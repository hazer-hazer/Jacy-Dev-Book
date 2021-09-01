---
layout: 'default'
title: 'Index'
nav_order: 13
parent: null
has_children: true
---

# JON files

JON (Jacy Object Notation, ext.: `.jon`) is an alternative for JSON used by *Jacy* programming language.
Its goals are:
- Simpler and less noisy syntax
- Data referencing

### Basic properties

- JON is case-sensitive, it this rule is applied to keywords too

#### Root type

JON does not support root type specification as JSON does, there's no root `{}` or `[]`, and a JON file is always an object.

### Data types

- `null` (non-value)
- Boolean - `true`/`false`
- Integer
  - Decimal - `123`
  - Hexadecimal - `0xB16B00B5`
  - Octal - `0o774`
  - Binary - `0b110011001`
- Floating-point numbers
  - Raw - `0.1523`
  - With exponential notation - `0.123213e-123`
- Strings
  - One line - `'Hello, world!'` and `"Hello, world!"` are same
  - Multi-line - `'''My multiline string'''` and `"""My multiline string"""` are same
- Arrays
  - Collection of values enclosed into `[]` and delimited with `,` (optionally, read further)
  - Arrays are heterogeneous
  - `[1, 'Some text here', null, true]`
- Objects
  - Collection of key-value pairs enclosed into `{}` and delimited by `,` (optionally, read further)
  - Each pair is `key: value` where
    - `key` is any text and does not require being enclosed into quotes (`'` or `"`) until it does not contain `:` character


#### Numeric data types

There's no limit to Integer ("int" further) and Floating-point ("float" further) numbers, and is only specified by implementation.
