---
layout: 'default'
title: 'JON Files'
nav_order: 40
parent: 'Appendices'
# No children
# No grandparent
---

# JON files

JON (Jacy Object Notation, ext.: <span class="inline-code line-numbers highlight-jc hljs">.jon</span>) is an alternative for JSON used by *Jacy* programming language.
Its goals are:

- Simpler and less noisy syntax
- Data referencing

## Basic properties

- JON is case-sensitive, it this rule is applied to keywords too

### Root type

JON does not support root type specification as JSON does, there's no root <span class="inline-code line-numbers highlight-jc hljs">{}</span> or <span class="inline-code line-numbers highlight-jc hljs">[]</span>, and a JON file is always an object.

## Data types

- <span class="inline-code line-numbers highlight-jc hljs">null</span> (non-value)
- Boolean - <span class="inline-code line-numbers highlight-jc hljs"><span class="hljs-literal">true</span></span>/<span class="inline-code line-numbers highlight-jc hljs"><span class="hljs-literal">false</span></span>
- Integer
  - Decimal - <span class="inline-code line-numbers highlight-jc hljs"><span class="hljs-number">123</span></span>
  - Hexadecimal - <span class="inline-code line-numbers highlight-jc hljs"><span class="hljs-number">0xB16B00B5</span></span>
  - Octal - <span class="inline-code line-numbers highlight-jc hljs"><span class="hljs-number">0o774</span></span>
  - Binary - <span class="inline-code line-numbers highlight-jc hljs"><span class="hljs-number">0b110011001</span></span>
- Floating-point numbers
  - Raw - <span class="inline-code line-numbers highlight-jc hljs"><span class="hljs-number">0.1523</span></span>
  - With exponential notation - <span class="inline-code line-numbers highlight-jc hljs"><span class="hljs-number">0.123213e-123</span></span>
- Strings
  - One line - <span class="inline-code line-numbers highlight-jc hljs"><span class="hljs-symbol">&#x27;Hello</span>, world!&#x27;</span> and <span class="inline-code line-numbers highlight-jc hljs"><span class="hljs-string">&quot;Hello, world!&quot;</span></span> are same
  - Multi-line - <span class="inline-code line-numbers highlight-jc hljs"><span class="hljs-string">&#x27;&#x27;&#x27;</span>My multiline string<span class="hljs-string">&#x27;&#x27;&#x27;</span></span> and <span class="inline-code line-numbers highlight-jc hljs"><span class="hljs-string">&quot;&quot;</span><span class="hljs-string">&quot;My multiline string&quot;</span><span class="hljs-string">&quot;&quot;</span></span> are same
- Arrays
  - Collection of values enclosed into <span class="inline-code line-numbers highlight-jc hljs">[]</span> and delimited with <span class="inline-code line-numbers highlight-jc hljs">,</span> (optionally, read further)
  - Arrays are heterogeneous
  - <span class="inline-code line-numbers highlight-jc hljs">[<span class="hljs-number">1</span>, <span class="hljs-symbol">&#x27;Some</span> text here&#x27;, null, <span class="hljs-literal">true</span>]</span>
- Objects
  - Collection of key-value pairs enclosed into <span class="inline-code line-numbers highlight-jc hljs">{}</span> and delimited by <span class="inline-code line-numbers highlight-jc hljs">,</span> (optionally, read further)
  - Each pair is <span class="inline-code line-numbers highlight-jc hljs">key: value</span> where
    - <span class="inline-code line-numbers highlight-jc hljs">key</span> is any text and does not require being enclosed into quotes (<span class="inline-code line-numbers highlight-jc hljs">&#x27;</span> or <span class="inline-code line-numbers highlight-jc hljs"><span class="hljs-string">&quot;</span></span>) until it does not contain <span class="inline-code line-numbers highlight-jc hljs">:</span> character

### Numeric data types

There's no limit to Integer ("int" further) and Floating-point ("float" further) numbers, and is only specified by implementation.
<div class="nav-btn-block">
    
    
</div>
