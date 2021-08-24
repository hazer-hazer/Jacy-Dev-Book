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
