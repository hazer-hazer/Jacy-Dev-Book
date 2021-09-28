---
layout: 'default'
title: 'Meaningful names'
nav_order: 100
parent: 'Lincy [Linter]'
# No children
# No grandparent
---

# Meaningful names check

Examples:
```rust
type Token = str;

func goodName(token: Token);
func goodShortcutName(tok: Token);
func goodOneLetterName(t: Token);

// But names less than 3 letters long must match beginning of the type name
func badOneLetterName(a: Token); // No-no-no

// Type names of course should be split to separate words
type SomeTypeName = i32;

func goodName(stn: SomeTypeName); // Ok
func badName(s: SomeTypeName); // Bad
```
<div class="nav-btn-block">
    <button class="nav-btn left">
    <a class="link" href="/Jacy-Dev-Book/lincy/index.html">< Lincy [Linter]</a>
</button>

    
</div>
