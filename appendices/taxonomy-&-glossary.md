---
layout: 'default'
title: 'Taxonomy & glossary'
nav_order: 108
parent: 'Appendices'
# No children
# No grandparent
---

# Taxonomy and glossary

## Permissions

### Mutability

**Mutable** - Allows read + write
**Immutable** - Allows only read, disallows write
**Opaque** - Disallows both read and write

> Don't confuse Opaque permission with Rust's opaque types (aka <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">impl</span> <span class="hljs-title class_">Trait</span></span>)

### Aliasing

**Linear** - Disallows aliases
**Locally sharable** - Allows aliases in single-thread
**Globally sharable** - Allows aliases shared between threads

### Combinations

> Some combinations are merged and some deleted

| Mutability | Aliasing | Description |
|:----------:|:--------:|:-----------:|
| Mutable/Immutable | Linear | [#1](#mut-imm-lin) |
| Mutable | Locally sharable | [#2](#mut-loc) |
| Mutable | Globally sharable | [#3](#mut-glob) |
| Immutable | Locally/Globally sharable | [#4](#mut-loc-glob) |
| Opaque | N/A | [#5](#opaque) |

### Mutable/Immutable + Linear

This is the foundation of Rust -- move semantics.
Example:

<div class="code-fence">
            <div class="copy">copy</div>
            <div class="code line-numbers highlight-jc hljs">
                <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">let</span> <span class="hljs-keyword">mut </span><span class="hljs-variable">a</span> = MyStruct {field: <span class="hljs-number">123</span>};</div><div class="line-num" data-line-num="2">2</div><div class="line"><span class="hljs-keyword">let</span> <span class="hljs-variable">b</span> = a; <span class="hljs-comment">// <span class="inline-code highlight-jc hljs">a</span> is moved to <span class="inline-code highlight-jc hljs">b</span></span></div><div class="line-num" data-line-num="3">3</div><div class="line"><span class="hljs-keyword">let</span> <span class="hljs-keyword">mut </span><span class="hljs-variable">c</span> = b; <span class="hljs-comment">// <span class="inline-code highlight-jc hljs">b</span> is moved to <span class="inline-code highlight-jc hljs">c</span></span></div>
            </div>
        </div>

Linear type is orthogonal to aliasing as it cannot be aliased at all -- it is always moved.
Linear types allow moving from immutable context to mutable one.

> Actually, it is important to note, that these are not the actual "Linear" types, more likely to say that these are "Affine" types as we don't require user to use value (except linter warnings)
> Conclusion: **APPLIED**

### Mutable + Locally sharable

Example (pseudo Pony-like code):

<div class="code-fence">
            <div class="copy">copy</div>
            <div class="code line-numbers highlight-jc hljs">
                <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">let</span> <span class="hljs-keyword">mut </span><span class="hljs-variable">a</span> = <span class="hljs-number">123</span>;</div><div class="line-num" data-line-num="2">2</div><div class="line"><span class="hljs-keyword">let</span> <span class="hljs-keyword">mut </span><span class="hljs-variable">b</span> = <span class="hljs-keyword">mut</span> <span class="hljs-keyword">ref</span> a;</div><div class="line-num" data-line-num="3">3</div><div class="line"><span class="hljs-keyword">let</span> <span class="hljs-keyword">mut </span><span class="hljs-variable">c</span> = b; <span class="hljs-comment">// <span class="inline-code highlight-jc hljs">b</span> is not moved to <span class="inline-code highlight-jc hljs">c</span>, <span class="inline-code highlight-jc hljs">c</span> re-borrows <span class="inline-code highlight-jc hljs">a</span></span></div><div class="line-num" data-line-num="4">4</div><div class="line"></div><div class="line-num" data-line-num="5">5</div><div class="line"><span class="hljs-comment">// <span class="inline-code highlight-jc hljs">b</span> cannot be sent to another thread and can only be used in single one</span></div>
            </div>
        </div>

The problem of multiple mutable aliases is that they bring possibility to make a mistake if some code is running concurrently, also, it would be hard (and maybe impossible) to manage such aliases without GC, thus we refuse this concept.

> Conclusion: **DENIED**

### Mutable + Globally sharable

Raw usage is **UNSAFE** as it needs lock functionality.

The safe implementation is commonly known as Mutex.

> Conclusion: **DENIED** (as first class item without a wrapper)

### Immutable + Locally/Globally sharable

Immutable aliases are safe to share globally, obviously, checking that there're no mutable aliases to them.
These are under the Rust borrowing rules.

> Conclusion: **APPLIED**

### Opaque

Neither able to read or write to alias. Used for function pointers and other "externally-created" data.

Dividing opaque permission by aliasing is a nonsense as far as it just cannot be read or written to.

- Pony calls this <span class="inline-code highlight-jc hljs">iso</span>
- Cone calls this <span class="inline-code highlight-jc hljs">opaq</span>
- Rust does not have this ([here is an issue](https://github.com/rust-lang/rfcs/blob/master/text/1861-extern-types.md))

> Conclusion: **?**

### Borrowed references

Borrowed references obey Rust borrow checker rules:

- There can only exist one mutable or any count of immutable borrows
<div class="nav-btn-block">
    <button class="nav-btn left">
    <a class="link" href="/Jacy-Dev-Book/appendices/syntax-decisions">< Syntax Decisions</a>
</button>

    
</div>
