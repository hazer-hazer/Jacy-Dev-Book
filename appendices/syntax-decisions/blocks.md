---
layout: 'default'
title: 'Blocks'
nav_order: 100
parent: 'Syntax Decisions'
# No children
grand_parent: 'Appendices'
---

# Blocks

Before the control-flow chapter, I have to establish rules about blocks, which are different from Rust's. All blocks (in
control-flow) which enclosed into <span class="inline-code highlight-jc hljs">{}</span> are last-statement typed (it means that the last expression of this block is the
value and type of the whole block).

While Rust has rules about the absence of <span class="inline-code highlight-jc hljs">;</span>, _Jacy_ does not have required <span class="inline-code highlight-jc hljs">;</span>, so this rule cannot be applied in the
same way. Let's look at some examples:

* This block is of type <span class="inline-code highlight-jc hljs"><span class="hljs-type">bool</span></span> and has result value <span class="inline-code highlight-jc hljs"><span class="hljs-literal">true</span></span>, even though we don't use this value

<div class="code-fence highlight-jc hljs">
            <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">let</span> <span class="hljs-variable">a</span> = {<span class="hljs-literal">true</span>}</div>
        </div>

* This block will produce a type error because it either has a result of type of <span class="inline-code highlight-jc hljs">myval</span> or <span class="inline-code highlight-jc hljs">()</span> (unit type)

<div class="code-fence highlight-jc hljs">
            <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">let</span> <span class="hljs-variable">a</span> = {<span class="hljs-keyword">if</span> myval <span class="hljs-operator">=&gt;</span> myval}</div>
        </div>

* This block won't produce a type error, because we don't use the result value

<div class="code-fence highlight-jc hljs">
            <div class="line-num" data-line-num="1">1</div><div class="line">{<span class="hljs-keyword">if</span> myval <span class="hljs-operator">=&gt;</span> myval}</div>
        </div>

So, we already can establish some requirements about type analysis -- we need union types which are impossible to be
declared in language, but may exist in the type system.

## One-line blocks

In this thing, _Jacy_ blocks differ from Rust's. I really appreciate the opportunity to declare one-line blocks without
<span class="inline-code highlight-jc hljs">{}</span>. As far as I wanna _Jacy_ to be consistent, and I established that syntax of <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">match</span></span> expression arms use <span class="inline-code highlight-jc hljs"><span class="hljs-operator">=&gt;</span></span>, for
one-line blocks we use the same syntax. Let's look at the syntax.

<div class="code-fence highlight-jc hljs">
            <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">while</span> <span class="hljs-literal">true</span> <span class="hljs-operator">=&gt;</span> <span class="hljs-title function_ invoke__">print</span>(<span class="hljs-string">&quot;kek&quot;</span>)</div>
        </div>

After <span class="inline-code highlight-jc hljs"><span class="hljs-operator">=&gt;</span></span> we can only place one expression, and if we put <span class="inline-code highlight-jc hljs">{}</span> compiler will give a warning because there's no need to
put <span class="inline-code highlight-jc hljs">{}</span> after <span class="inline-code highlight-jc hljs"><span class="hljs-operator">=&gt;</span></span>. So, the syntax looks kind of like that.

```antlr4
block: <span class="inline-code highlight-jc hljs"><span class="hljs-operator">=&gt;</span></span> expr | blockExpression | ';';
```

<span class="inline-code highlight-jc hljs">{}</span> blocks in control-flow behave absolutely the same way as block-expressions.

One important thing is that function declaration has different syntax and rules about blocks, more about that soon
below.

## Ignoring blocks

This is a feature that satisfies one definite rule from Zen -- prototyping ease. It is a pretty simple thing -- we can
ignore any block (including control-structures, <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">mod</span></span>s, <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">func</span></span>s, etc.) with <span class="inline-code highlight-jc hljs">;</span>.

Examples.

<div class="code-fence highlight-jc hljs">
            <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">if</span> myval;</div><div class="line-num" data-line-num="2">2</div><div class="line"><span class="hljs-keyword">else</span> <span class="hljs-title function_ invoke__">doSomething</span>()</div>
        </div>

Of course, I couldn't leave this thing without covering the Zen rule about helping a user with mistakes, so there will
be a warning if you're writing code like that.

> Don't confuse block-ignorance with trait method signatures, in case of traits it is not ignorance.
<div class="nav-btn-block">
    <button class="nav-btn left">
    <a class="link" href="/Jacy-Dev-Book/appendices/syntax-decisions/index.html">< Syntax Decisions</a>
</button>

    <button class="nav-btn right">
    <a class="link" href="/Jacy-Dev-Book/appendices/syntax-decisions/control-flow-structures.html">Control flow structures ></a>
</button>

</div>
