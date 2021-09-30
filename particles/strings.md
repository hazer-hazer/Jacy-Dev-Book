---
layout: 'default'
title: 'Strings'
nav_order: 112
parent: 'Particles [β RFCs]'
# No children
# No grandparent
---

# Strings

This particle is about the design of strings and characters, from view of the syntax to language features.

## Escape sequences

_Jacy_ supports common C-like escape sequences, with some changes.
These are: <span class="inline-code highlight-jc hljs">\n`, `\r`, `\t`, `\b`, `\f`, `\v</span>, that have the same meaning as in other languages.

Numeric character literals:
<span class="inline-code highlight-jc hljs">\###</span> - octal representation
<span class="inline-code highlight-jc hljs">\x##</span> - hexadecimal representation
<span class="inline-code highlight-jc hljs">\u##` <span class="hljs-operator">-</span> unicode codepoint below `<span class="hljs-number">10000</span></span>
<span class="inline-code highlight-jc hljs">\U####</span> - unicode codepoint

### Proposals

#### Platform-dependent new-line

The idea is to use <span class="inline-code highlight-jc hljs">\p` <span class="hljs-keyword">for</span> <span class="hljs-title class_">new</span><span class="hljs-operator">-</span>line, on unix<span class="hljs-operator">-</span>like systems it will exp<span class="hljs-operator">and</span> to `\n` (LF) <span class="hljs-operator">and</span> `\r\n</span> (CRLF).

## Character literals

I really like single-quoted strings, idk why, but solutions to allow single-quoted strings in statically typed languages like prepending character literals with special token such as <span class="inline-code highlight-jc hljs">s<span class="hljs-symbol">&#x27;This</span> is a string&#x27;</span> are awful.
Anyway, Swift gift me an solution -- no character literals 😐.  Btw, Swift doesn't have single-quoted strings at all -- we will.

To infer that user assumed to use character instead of string we need to know types at first, thus, creating character becomes something run-time dependent 🤔.
<div class="nav-btn-block">
    <button class="nav-btn left">
    <a class="link" href="/Jacy-Dev-Book/particles/std-annotations.html">< Std annotations</a>
</button>

    
</div>
