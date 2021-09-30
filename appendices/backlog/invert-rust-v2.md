---
layout: 'default'
title: 'Invert rust v2'
nav_order: 100
parent: 'Backlog'
# No children
grand_parent: 'Appendices'
---

# Invert Rust

## This (new version of old "Invert Rust") idea is also DEPRECATED, because it cannot live without GC 😭

### Disclaimer

I know that pass-by-reference is often understood wrong, as far as I know, there're a small count of languages which
support "real" pass-by-reference (C++ sometimes), thus I'll try to avoid this term. Let's name it as what it does: "Make
a Reference and Pass the reference by Value" (__MRPV__ further)

#### The concept

This idea is growing from my view on references usage, I don't have so much experience with low-level programming,
anyway I'm almost sure that passing a reference (pointer) appears more often than moving, when we're talking about
non-primitive (non-copy) types.

There're languages like Java or, inherently, Kotlin that does not syntactically separate MRPV and raw pass-by-value, but
boxed types are MRPV and primitives are pass-by-value. I don't want to confuse myself and, importantly, someone else
doing so.

There was the first idea, but it has many problems in the way that types unpredictably become reference-types.
Now, I come up with a concept where everything is more clear.

### First things first

As *Jacy* is hardly inspired by Rust, let's, at first, look at what Rust does. Rust is pass-by-move... that's all 😄

No, question is wider and deeper. Rust is very good, pass-by-move is a nice rule that leads to straightforward code and
safes us from some accidents with owning. Anyway, as I claimed above -- we want reference by default. And __questions__
that I need to answer are:

- Can it be actually done and how?
- Will it be consistent?
- Is it beautiful and so convenient that we need it?
- Does it cover enough low-level programming cases?

#### Let's look at Rust

Rust is pass by move, but what does "move" mean? <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">move</span>` is <span class="hljs-operator">not</span>hing m<span class="hljs-operator">or</span>e than `memcpy</span> but with some static analysis that checks we don't use moved value.
Actually, assignment in Rust is always byte-by-byte copy, and *Jacy* respects this, because assignment with side effects, etc. is bad.

#### The key

I'm sadly describing this idea after I marked it as DEPRECATED. Why it is deprecated described below, now, let's look how it would look like.

Invert Rust means that:

- Non-copy type <span class="inline-code highlight-jc hljs">T` internally becomes `<span class="hljs-operator">&amp;</span>T</span>
- To make a non-ref type <span class="inline-code highlight-jc hljs">own` must be used <span class="hljs-operator">-</span><span class="hljs-operator">-</span> `own T</span>
- Copy types automatically becomes <span class="inline-code highlight-jc hljs">own T</span>

At first, it might be confusing or even a nice solution.

Let's look at examples:

<div class="code-fence highlight-jc hljs">
            <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-comment">// We have</span></div><div class="line-num" data-line-num="2">2</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-title function_">foo</span>(a: <span class="hljs-type">str</span>);</div><div class="line-num" data-line-num="3">3</div><div class="line"><span class="hljs-comment">// Rust has</span></div><div class="line-num" data-line-num="4">4</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-title function_">foo</span>(a: <span class="hljs-operator">&amp;</span><span class="hljs-type">str</span>);</div><div class="line-num" data-line-num="5">5</div><div class="line"></div><div class="line-num" data-line-num="6">6</div><div class="line"><span class="hljs-comment">// We have</span></div><div class="line-num" data-line-num="7">7</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-title function_">foo</span>(a: own <span class="hljs-type">String</span>);</div><div class="line-num" data-line-num="8">8</div><div class="line"><span class="hljs-comment">// Rust have</span></div><div class="line-num" data-line-num="9">9</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-title function_">foo</span>(a: <span class="hljs-type">String</span>);</div><div class="line-num" data-line-num="10">10</div><div class="line"></div><div class="line-num" data-line-num="11">11</div><div class="line"><span class="hljs-comment">// We have</span></div><div class="line-num" data-line-num="12">12</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-title function_">foo</span>(a: <span class="hljs-type">i32</span>);</div><div class="line-num" data-line-num="13">13</div><div class="line"><span class="hljs-comment">// Rust has</span></div><div class="line-num" data-line-num="14">14</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-title function_">foo</span>(a: <span class="hljs-type">i32</span>);</div><div class="line-num" data-line-num="15">15</div><div class="line"><span class="hljs-comment">// As <span class="inline-code highlight-jc hljs"><span class="hljs-type">i32</span>` is copy <span class="hljs-keyword">type</span> <span class="hljs-operator">-</span><span class="hljs-operator">-</span> it automatically becomes `own <span class="hljs-type">i32</span>`, so we don<span class="hljs-operator">&amp;</span>#x27;t need to write `own <span class="hljs-type">i32</span></span> ourself </span></div>
        </div>

This examples show that when Rust use move -- we use <span class="inline-code highlight-jc hljs">own`, <span class="hljs-operator">and</span> when Rust <span class="hljs-keyword">use</span> `<span class="hljs-operator">&amp;</span></span> -- we don't annotate it as reference type, because for non-copy type, reference is default.

<span class="inline-code highlight-jc hljs">own` is kind of saying to compiler: <span class="hljs-string">&quot;it could be a reference type, but here&#x27;s `own</span></span> thus don't place here a reference by default".

##### What we're unable to do

This solution covers all use cases, and doesn't break Rust semantics until we don't have elision for reference types, etc.
If some rules becomes "implicitly make this type ..., because it is convenient" -- we break everything.
Thus, all semantics must be saved, but just inverted.

##### What problems we solve?

Actually, by "problems" I mean "cover the most popular use cases to simplify writing code".

- Code becomes cleaner as we don't annotate <span class="inline-code highlight-jc hljs"><span class="hljs-operator">&amp;</span>` <span class="hljs-operator">and</span> `<span class="hljs-keyword">ref</span></span> mostly everywhere
- We don't have strange <span class="inline-code highlight-jc hljs"><span class="hljs-operator">&amp;</span><span class="hljs-type">str</span></span>, etc.

##### What problems we produce?

The first one is the problem with copy-types. Above, I said that copy-types are <span class="inline-code highlight-jc hljs">own T</span> by default, sounds simple, but... How do we make a reference to copy-type?!
If we apply this rule -- no way, without annotating it with <span class="inline-code highlight-jc hljs"><span class="hljs-operator">&amp;</span></span>.
And here we go again... Doing so, code becomes noisier, as we've got <span class="inline-code highlight-jc hljs">T`, `own T` <span class="hljs-operator">and</span> `<span class="hljs-operator">&amp;</span>T` (<span class="hljs-operator">*</span>but `<span class="hljs-operator">&amp;</span>T</span> is used just for some rare cases*) -- disgusting 🤢.

What could we do? - Remove rule "copy-type becomes <span class="inline-code highlight-jc hljs">own T</span>", we save all the semantics.
But stop... Now we need to always write <span class="inline-code highlight-jc hljs">own <span class="hljs-type">i32</span>`, etc<span class="hljs-operator">.</span> just <span class="hljs-operator">not</span> to make a `<span class="hljs-operator">&amp;</span><span class="hljs-type">i32</span></span> by default?!! 🤦

#### Why is that idea deprecated?

- Problem with copy-types, like <span class="inline-code highlight-jc hljs">own <span class="hljs-type">i32</span></span>
- Generics become <span class="inline-code highlight-jc hljs"><span class="hljs-operator">&lt;</span>own T, own T2, <span class="hljs-operator">..</span><span class="hljs-operator">.</span><span class="hljs-operator">&gt;</span></span>
- We may be confused with <span class="inline-code highlight-jc hljs">own` <span class="hljs-operator">and</span> `<span class="hljs-keyword">move</span>`, because `own` is <span class="hljs-keyword">in</span><span class="hljs-operator">-</span><span class="hljs-keyword">type</span> <span class="hljs-title class_">annotation</span> but `<span class="hljs-keyword">move</span></span> is in-expression annotation
<div class="nav-btn-block">
    <button class="nav-btn left">
    <a class="link" href="/Jacy-Dev-Book/appendices/backlog/index.html">< Backlog</a>
</button>

    <button class="nav-btn right">
    <a class="link" href="/Jacy-Dev-Book/appendices/backlog/invert-rust.html">Invert rust ></a>
</button>

</div>
