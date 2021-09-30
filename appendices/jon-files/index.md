---
layout: 'default'
title: 'JON Files'
nav_order: 40
parent: 'Appendices'
# No children
# No grandparent
---

# JON files

JON (Jacy Object Notation, ext.: <span class="inline-code highlight-jc hljs"><span class="hljs-operator">.</span>jon</span>) is an alternative for JSON used by *Jacy* programming language.
Its goals are:

- Simpler and less noisy syntax
- Data referencing

## Basic properties

- JON is case-sensitive, it this rule is applied to keywords too

### Root type

JON does not support root type specification as JSON does, there's no root <span class="inline-code highlight-jc hljs">{}` <span class="hljs-operator">or</span> `[]</span>, and a JON file is always an object.

## Data types

- <span class="inline-code highlight-jc hljs">null</span> (non-value)
- Boolean - <span class="inline-code highlight-jc hljs"><span class="hljs-literal">true</span>`<span class="hljs-operator">/</span>`<span class="hljs-literal">false</span></span>
- Integer
  - Decimal - <span class="inline-code highlight-jc hljs"><span class="hljs-number">123</span></span>
  - Hexadecimal - <span class="inline-code highlight-jc hljs"><span class="hljs-number">0xB16B00B5</span></span>
  - Octal - <span class="inline-code highlight-jc hljs"><span class="hljs-number">0o774</span></span>
  - Binary - <span class="inline-code highlight-jc hljs"><span class="hljs-number">0b110011001</span></span>
- Floating-point numbers
  - Raw - <span class="inline-code highlight-jc hljs"><span class="hljs-number">0.1523</span></span>
  - With exponential notation - <span class="inline-code highlight-jc hljs"><span class="hljs-number">0.123213e-123</span></span>
- Strings
  - One line - <span class="inline-code highlight-jc hljs"><span class="hljs-symbol">&#x27;Hello</span>, w<span class="hljs-operator">or</span>ld!&#x27;` <span class="hljs-operator">and</span> `<span class="hljs-string">&quot;Hello, world!&quot;</span></span> are same
  - Multi-line - <span class="inline-code highlight-jc hljs"><span class="hljs-string">&#x27;&#x27;&#x27;</span>My multiline string<span class="hljs-string">&#x27;&#x27;&#x27;</span>` <span class="hljs-operator">and</span> `<span class="hljs-string">&quot;&quot;</span><span class="hljs-string">&quot;My multiline string&quot;</span><span class="hljs-string">&quot;&quot;</span></span> are same
- Arrays
  - Collection of values enclosed into <span class="inline-code highlight-jc hljs">[]` <span class="hljs-operator">and</span> delimited with `,</span> (optionally, read further)
  - Arrays are heterogeneous
  - <span class="inline-code highlight-jc hljs">[<span class="hljs-number">1</span>, <span class="hljs-symbol">&#x27;Some</span> text here&#x27;, null, <span class="hljs-literal">true</span>]</span>
- Objects
  - Collection of key-value pairs enclosed into <span class="inline-code highlight-jc hljs">{}` <span class="hljs-operator">and</span> delimited by `,</span> (optionally, read further)
  - Each pair is <span class="inline-code highlight-jc hljs">key: value</span> where
    - <span class="inline-code highlight-jc hljs">key` is any text <span class="hljs-operator">and</span> does <span class="hljs-operator">not</span> require being enclosed into <span class="hljs-title function_ invoke__">quotes</span> (`&#x27;` <span class="hljs-operator">or</span> `<span class="hljs-string">&quot;`) until it does not contain `:</span></span> character

### Numeric data types

There's no limit to Integer ("int" further) and Floating-point ("float" further) numbers, and is only specified by implementation.
<div class="nav-btn-block">
    
    
</div>
