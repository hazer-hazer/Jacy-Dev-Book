---
layout: 'default'
title: 'Strings'
nav_order: 112
parent: 'Particles'
# No children
# No grandparent
---

# Strings

This particle is about the design of strings and characters, from view of the syntax to language features.

## Escape sequences

_Jacy_ supports common C-like escape sequences, with some changes.
These are: <span class="inline-code highlight-jc hljs">\n</span>, <span class="inline-code highlight-jc hljs">\r</span>, <span class="inline-code highlight-jc hljs">\t</span>, <span class="inline-code highlight-jc hljs">\b</span>, <span class="inline-code highlight-jc hljs">\f</span>, <span class="inline-code highlight-jc hljs">\v</span>, that have the same meaning as in other languages.

Numeric character literals:
<span class="inline-code highlight-jc hljs">\###</span> - octal representation
<span class="inline-code highlight-jc hljs">\x##</span> - hexadecimal representation
<span class="inline-code highlight-jc hljs">\u##</span> - unicode codepoint below <span class="inline-code highlight-jc hljs"><span class="hljs-number">10000</span></span>
<span class="inline-code highlight-jc hljs">\U####</span> - unicode codepoint

### Proposals

#### Platform-dependent new-line

The idea is to use <span class="inline-code highlight-jc hljs">\p</span> for new-line, on unix-like systems it will expand to <span class="inline-code highlight-jc hljs">\n</span> (LF) and <span class="inline-code highlight-jc hljs">\r\n</span> (CRLF).

## Character literals

I really like single-quoted strings, idk why, but solutions to allow single-quoted strings in statically typed languages like prepending character literals with special token such as <span class="inline-code highlight-jc hljs">s<span class="hljs-symbol">&#x27;This</span> is a string&#x27;</span> are awful.
Anyway, Swift gift me an solution -- no character literals 😐.  Btw, Swift doesn't have single-quoted strings at all -- we will.

To infer that user assumed to use character instead of string we need to know types at first, thus, creating character becomes something run-time dependent 🤔.
<div class="nav-btn-block">
    <button class="nav-btn left">
    <a class="link" href="/Jacy-Dev-Book/particles/std-annotations">< Std annotations</a>
</button>

    <button class="nav-btn right">
    <a class="link" href="/Jacy-Dev-Book/particles/syntax-decisions">Syntax Decisions ></a>
</button>

</div>
