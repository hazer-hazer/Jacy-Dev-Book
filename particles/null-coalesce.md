---
layout: 'default'
title: 'Null coalesce'
nav_order: 107
parent: 'Particles [β RFCs]'
# No children
# No grandparent
---

# Null coalesce

Despite the fact that _Jacy_ does not have null replacing it with <span class="inline-code highlight-jc hljs"><span class="hljs-type">Option</span></span> such as what Rust does, this particle is called so to use common term "null-coalesce" familiar to SQL, JS, etc. programmers.

## Null coalescing operator

![Elvis operator](https://i.stack.imgur.com/hQlrps.png)

This operator exists in, for example JavaScript - <span class="inline-code highlight-jc hljs">??</span>, also known as Elvis operator - <span class="inline-code highlight-jc hljs">?:</span> in many languages (PHP, Kotlin) or <span class="inline-code highlight-jc hljs">COALESCE</span> in SQL.

At first I would like to remind that _Jacy_ does not have ternary operator <span class="inline-code highlight-jc hljs">a ? b : c</span> that was the source of Elvis operator syntax with removed second term <span class="inline-code highlight-jc hljs">a ?: b = a ? a : b</span>. Thus _Jacy_ will use <span class="inline-code highlight-jc hljs">??</span> operator further in this particle and likely in the implementation.

Null coalescing operator is a kind of disjunction (<span class="inline-code highlight-jc hljs">||</span>, or <span class="inline-code highlight-jc hljs"><span class="hljs-operator">or</span></span> in _Jacy_) but for values which are "optional" (nullable).
That's why I came up with an idea of null-conjunction, that is <span class="inline-code highlight-jc hljs">&amp;&amp;</span> operator for optional values.

## Nullack operator

Nullack is new term I'll use here as short form of (lack of null values), nullack operator is a null-conjunction operator.
This idea is pretty uncommon thus behavior I choose would not likely be useful, anyway I want to discuss it.

Operator syntax is not specified, thus <span class="inline-code highlight-jc hljs">[OP]</span> will be used further.

Code sample:

<div class="code-fence highlight-jc hljs">
            <div class="line-num" data-line-num="1">1</div><div class="line">a [OP] b</div>
        </div>

Where <span class="inline-code highlight-jc hljs">a</span> has type <span class="inline-code highlight-jc hljs"><span class="hljs-type">Option</span>&lt;T&gt;</span> and <span class="inline-code highlight-jc hljs"><span class="hljs-type">Option</span>&lt;b&gt;</span> has type <span class="inline-code highlight-jc hljs">U</span>.

This operator MUST return <span class="inline-code highlight-jc hljs"><span class="hljs-literal">None</span></span> in case when <span class="inline-code highlight-jc hljs">a</span> OR <span class="inline-code highlight-jc hljs">b</span> are <span class="inline-code highlight-jc hljs"><span class="hljs-literal">None</span></span> values.

What this operator should return if both of <span class="inline-code highlight-jc hljs">a</span> AND <span class="inline-code highlight-jc hljs">b</span> are <span class="inline-code highlight-jc hljs"><span class="hljs-literal">Some</span></span> values is described in variants below.

### Variant #1

Return <span class="inline-code highlight-jc hljs">(a!, b!): (T, U)</span>, that is a tuple where first and second elements are unwrapped <span class="inline-code highlight-jc hljs">a</span> and <span class="inline-code highlight-jc hljs">b</span> respectively.
<div class="nav-btn-block">
    <button class="nav-btn left">
    <a class="link" href="/Jacy-Dev-Book/particles/not-prepedent-op.html">< Not prepedent op</a>
</button>

    <button class="nav-btn right">
    <a class="link" href="/Jacy-Dev-Book/particles/organic-jacy.html">Organic jacy ></a>
</button>

</div>
