---
layout: 'default'
title: 'Strings'
nav_order: 13
parent: Particles
has_children: false
---

# Strings

This particle is about the design of strings and characters, from view of the syntax to language features.

## Escape sequences

_Jacy_ supports common C-like escape sequences, with some changes. 
These are: `\n`, `\r`, `\t`, `\b`, `\f`, `\v`, that have the same meaning as in other languages. 

Numeric character literals:
`\###` - octal representation
`\x##` - hexadecimal representation
`\u##` - unicode codepoint below `10000`
`\U####` - unicode codepoint

### Proposals

#### Platform-dependent new-line

The idea is to use `\p` for new-line, on unix-like systems it will expand to `\n` (LF) and `\r\n` (CRLF). 



## Character literals

I really like single-quoted strings, idk why, but solutions to allow single-quoted strings in statically typed languages like prepending character literals with special token such as `s'This is a string'` are awful. 
Anyway, Swift gift me an solution -- no character literals 😐.  Btw, Swift doesn't have single-quoted strings at all -- we will.

To infer that user assumed to use character instead of string we need to know types at first, thus, creating character becomes something run-time dependent 🤔.
