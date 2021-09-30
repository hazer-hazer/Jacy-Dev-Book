---
layout: 'default'
title: 'Ops and puncts'
nav_order: 105
parent: 'Appendices'
# No children
# No grandparent
---

# Operators and punctuations

Operators in _Jacy_ are not something internally special in comparison with
functions. When calling <span class="inline-code highlight-jc hljs">a <span class="hljs-operator">+</span> b` the <span class="hljs-keyword">trait</span> `std::ops::Add</span> will be used. Mostly
all operators are overloadable.

## Operators in expressions

| Operator | Trait to overload |
| :------: | :---------------- |
| <span class="inline-code highlight-jc hljs">a <span class="hljs-operator">+</span> b` <span class="hljs-operator">|</span> `std::ops::Add</span> |
| <span class="inline-code highlight-jc hljs">a <span class="hljs-operator">-</span> b` <span class="hljs-operator">|</span> `std::ops::Sub</span> |
| <span class="inline-code highlight-jc hljs">a <span class="hljs-operator">*</span> b` <span class="hljs-operator">|</span> `std::ops::Mul</span> |
| <span class="inline-code highlight-jc hljs">a <span class="hljs-operator">/</span> b` <span class="hljs-operator">|</span> `std::ops::Div</span> |
| <span class="inline-code highlight-jc hljs">a <span class="hljs-operator">%</span> b` <span class="hljs-operator">|</span> `std::ops::Rem</span> |
| <span class="inline-code highlight-jc hljs">a <span class="hljs-operator">*</span><span class="hljs-operator">*</span> b` (\<span class="hljs-operator">*</span>) <span class="hljs-operator">|</span> `std::ops::Pow</span> |
| <span class="inline-code highlight-jc hljs">a <span class="hljs-operator">or</span> b</span> | N/A |
| <span class="inline-code highlight-jc hljs">a <span class="hljs-operator">and</span> b</span> | N/A |
| <span class="inline-code highlight-jc hljs">!a` <span class="hljs-operator">|</span> `std::ops::Not</span> |
| <span class="inline-code highlight-jc hljs">a <span class="hljs-operator">&amp;</span> b` <span class="hljs-operator">|</span> `std::ops::BitAnd</span> |
| <span class="inline-code highlight-jc hljs">a <span class="hljs-operator">|</span> b` <span class="hljs-operator">|</span> `std::ops::BitOr</span> |
| <span class="inline-code highlight-jc hljs">a <span class="hljs-operator">&lt;&lt;</span> b` <span class="hljs-operator">|</span> `std::ops::Shl</span> |
| <span class="inline-code highlight-jc hljs">a <span class="hljs-operator">&gt;&gt;</span> b` <span class="hljs-operator">|</span> `std::ops::Shr</span> |
| <span class="inline-code highlight-jc hljs">a <span class="hljs-operator">^</span> b` <span class="hljs-operator">|</span> `std::ops::X<span class="hljs-operator">or</span></span> |
| <span class="inline-code highlight-jc hljs">a <span class="hljs-operator">&lt;</span> b` <span class="hljs-operator">&amp;</span>nbsp; `a <span class="hljs-operator">&gt;</span> b` <span class="hljs-operator">&amp;</span>nbsp; `a <span class="hljs-operator">&gt;</span><span class="hljs-operator">=</span> b` <span class="hljs-operator">&amp;</span>nbsp; `a <span class="hljs-operator">&lt;</span><span class="hljs-operator">=</span> b` <span class="hljs-operator">&amp;</span>nbsp; `a <span class="hljs-operator">&lt;</span><span class="hljs-operator">=</span><span class="hljs-operator">&gt;</span> b` <span class="hljs-operator">|</span> `std::ops::Cmp</span> |
| <span class="inline-code highlight-jc hljs">a <span class="hljs-operator">=</span><span class="hljs-operator">=</span> b` <span class="hljs-operator">&amp;</span>nbsp; `a <span class="hljs-operator">!=</span> b` <span class="hljs-operator">|</span> `std::ops::Eq</span> |
| <span class="inline-code highlight-jc hljs">a <span class="hljs-operator">=</span><span class="hljs-operator">=</span><span class="hljs-operator">=</span> b` <span class="hljs-operator">&amp;</span>nbsp; `a <span class="hljs-operator">!=</span><span class="hljs-operator">=</span> b</span> | ??? (Not described) |
| <span class="inline-code highlight-jc hljs">a<span class="hljs-operator">..</span>b` <span class="hljs-operator">|</span> `std::ops::Range</span> |
| <span class="inline-code highlight-jc hljs">a<span class="hljs-operator">..</span><span class="hljs-operator">=</span>b` <span class="hljs-operator">|</span> `std::ops::RangeIncl</span> |
| <span class="inline-code highlight-jc hljs"><span class="hljs-operator">..</span>b` <span class="hljs-operator">|</span> `std::ops::RangeTo</span> |
| <span class="inline-code highlight-jc hljs">a<span class="hljs-operator">..</span>` <span class="hljs-operator">|</span> `std::ops::RangeFrom</span> |
| <span class="inline-code highlight-jc hljs"><span class="hljs-operator">..</span><span class="hljs-operator">=</span>b` <span class="hljs-operator">|</span> `std::ops::RangeToIncl</span> |
| <span class="inline-code highlight-jc hljs"><span class="hljs-operator">..</span>` <span class="hljs-operator">|</span> `std::ops::RangeFull</span> (\*\*) |
| <span class="inline-code highlight-jc hljs">a <span class="hljs-operator">+=</span> b` <span class="hljs-operator">|</span> `std::ops::AddAssign</span> |
| <span class="inline-code highlight-jc hljs">a <span class="hljs-operator">-=</span> b` <span class="hljs-operator">|</span> `std::ops::SubAssign</span> |
| <span class="inline-code highlight-jc hljs">a <span class="hljs-operator">*=</span> b` <span class="hljs-operator">|</span> `std::ops::MulAssign</span> |
| <span class="inline-code highlight-jc hljs">a <span class="hljs-operator">/=</span> b` <span class="hljs-operator">|</span> `std::ops::DivAssign</span> |
| <span class="inline-code highlight-jc hljs">a <span class="hljs-operator">%=</span> b` <span class="hljs-operator">|</span> `std::ops::RemAssign</span> |
| <span class="inline-code highlight-jc hljs">a <span class="hljs-operator">**=</span> b` <span class="hljs-operator">|</span> `std::ops::PowAssign</span> |
| <span class="inline-code highlight-jc hljs">a <span class="hljs-operator">|=</span> b` <span class="hljs-operator">|</span> `std::ops::BitOrAssign</span> |
| <span class="inline-code highlight-jc hljs">a <span class="hljs-operator">&amp;=</span> b` <span class="hljs-operator">|</span> `std::ops::BitAndAssign</span> |
| <span class="inline-code highlight-jc hljs">a <span class="hljs-operator">&lt;&lt;=</span> b` <span class="hljs-operator">|</span> `std::ops::ShlAssign</span> |
| <span class="inline-code highlight-jc hljs">a <span class="hljs-operator">&gt;&gt;=</span> b` <span class="hljs-operator">|</span> `std::ops::ShrAssign</span> |
| <span class="inline-code highlight-jc hljs">a <span class="hljs-operator">^=</span> b` <span class="hljs-operator">|</span> `std::ops::X<span class="hljs-operator">or</span>Assign</span> |
| <span class="inline-code highlight-jc hljs">a?` <span class="hljs-operator">|</span> `std::ops::Try::branch</span> |
| <span class="inline-code highlight-jc hljs">a!` <span class="hljs-operator">|</span> `std::ops::Try::unwrap</span> |
| <span class="inline-code highlight-jc hljs">a<span class="hljs-operator">.</span>b</span> | N/A |
| <span class="inline-code highlight-jc hljs"><span class="hljs-title function_ invoke__">a</span>()` <span class="hljs-operator">|</span> `std::ops::Invoke</span> |
| <span class="inline-code highlight-jc hljs"><span class="hljs-operator">*</span>a` <span class="hljs-operator">|</span> `std::ops::Deref</span> |
| <span class="inline-code highlight-jc hljs"><span class="hljs-operator">*</span>a <span class="hljs-operator">=</span> b` <span class="hljs-operator">|</span> `std::ops::DerefMut</span> |
| <span class="inline-code highlight-jc hljs"><span class="hljs-operator">&amp;</span>a</span> | N/A |
| <span class="inline-code highlight-jc hljs">a <span class="hljs-operator">|</span><span class="hljs-operator">&gt;</span> b</span> | N/A |

* (\*) For the exponentiation operator, there can be a conflict with
  dereferencing operator <span class="inline-code highlight-jc hljs"><span class="hljs-operator">*</span></span>, to solve it you need to put white space between
  terms. E.g. <span class="inline-code highlight-jc hljs">a<span class="hljs-operator">*</span><span class="hljs-operator">*</span>b` <span class="hljs-operator">=</span><span class="hljs-operator">=</span> `a <span class="hljs-operator">*</span><span class="hljs-operator">*</span> b` <span class="hljs-keyword">as</span> far <span class="hljs-keyword">as</span> `a <span class="hljs-operator">*</span><span class="hljs-operator">*</span>b` <span class="hljs-operator">=</span><span class="hljs-operator">=</span> `a <span class="hljs-operator">*</span><span class="hljs-operator">*</span> b` but <span class="hljs-operator">not</span> <span class="hljs-operator">=</span><span class="hljs-operator">=</span> </span>a *
  *b<span class="inline-code highlight-jc hljs">, <span class="hljs-operator">and</span> `a<span class="hljs-operator">*</span>b` <span class="hljs-operator">=</span><span class="hljs-operator">=</span> `a <span class="hljs-operator">*</span> b</span>. So, with dereferencing, always put white space
  before <span class="inline-code highlight-jc hljs"><span class="hljs-operator">*</span></span> (as dereferencing operator).
* (\*\*) <span class="inline-code highlight-jc hljs">RangeFull` is <span class="hljs-operator">not</span> a real operat<span class="hljs-operator">or</span>, it is an empty `<span class="hljs-keyword">struct</span></span> which can
  be passed somewhere.

## Punctuations

| Punctuation | Usages |
| :--- | :--- |
| <span class="inline-code highlight-jc hljs">:</span> | Type annotations in almost all constructions, function call argument name |
| <span class="inline-code highlight-jc hljs"><span class="hljs-operator">-</span><span class="hljs-operator">&gt;</span></span> | Function types, lambdas |
| <span class="inline-code highlight-jc hljs">;</span> | Statement terminator, body ignorance, item declaration |
| <span class="inline-code highlight-jc hljs"><span class="hljs-operator">=</span><span class="hljs-operator">&gt;</span>` <span class="hljs-operator">|</span> `<span class="hljs-keyword">match</span></span> arms |
|  |  |

## Operators and punctuations precedence

Precedence (from highest to lowest)

| Symbols |
| :-----: |
| <span class="inline-code highlight-jc hljs">a::b</span> |
| <span class="inline-code highlight-jc hljs">a<span class="hljs-operator">.</span>b</span> |
| <span class="inline-code highlight-jc hljs"><span class="hljs-title function_ invoke__">a</span>()` <span class="hljs-operator">&amp;</span>nbsp; `a[]</span> |
| <span class="inline-code highlight-jc hljs">a?</span> |
| <span class="inline-code highlight-jc hljs"><span class="hljs-operator">-</span>a` <span class="hljs-operator">&amp;</span>nbsp; `<span class="hljs-operator">*</span>a` <span class="hljs-operator">&amp;</span>nbsp; `!a` <span class="hljs-operator">&amp;</span>nbsp; `<span class="hljs-operator">&amp;</span>a` <span class="hljs-operator">&amp;</span>nbsp; `<span class="hljs-operator">&amp;</span><span class="hljs-keyword">mut</span> a</span> |
| <span class="inline-code highlight-jc hljs">a <span class="hljs-keyword">as</span> b</span> |
| <span class="inline-code highlight-jc hljs">a <span class="hljs-operator">*</span><span class="hljs-operator">*</span> b</span> |
| <span class="inline-code highlight-jc hljs">a <span class="hljs-operator">*</span> b` <span class="hljs-operator">&amp;</span>nbsp; `a <span class="hljs-operator">/</span> b` <span class="hljs-operator">&amp;</span>nbsp; `a <span class="hljs-operator">%</span> b</span> |
| <span class="inline-code highlight-jc hljs">a <span class="hljs-operator">+</span> b` <span class="hljs-operator">&amp;</span>nbsp; `a <span class="hljs-operator">-</span> b</span> |
| <span class="inline-code highlight-jc hljs">a <span class="hljs-operator">&lt;&lt;</span> b` <span class="hljs-operator">&amp;</span>nbsp; `a <span class="hljs-operator">&gt;&gt;</span> b</span> |
| <span class="inline-code highlight-jc hljs">a <span class="hljs-operator">&amp;</span> b</span> |
| <span class="inline-code highlight-jc hljs">a <span class="hljs-operator">^</span> b</span> |
| <span class="inline-code highlight-jc hljs">a <span class="hljs-operator">|</span> b</span> |
| <span class="inline-code highlight-jc hljs">a <span class="hljs-operator">=</span><span class="hljs-operator">=</span> b` <span class="hljs-operator">&amp;</span>nbsp; `a <span class="hljs-operator">!=</span> b` <span class="hljs-operator">&amp;</span>nbsp; `a <span class="hljs-operator">=</span><span class="hljs-operator">=</span><span class="hljs-operator">=</span> b` <span class="hljs-operator">&amp;</span>nbsp; `a <span class="hljs-operator">!=</span><span class="hljs-operator">=</span> b` <span class="hljs-operator">&amp;</span>nbsp; `a <span class="hljs-operator">&lt;</span> b` <span class="hljs-operator">&amp;</span>nbsp; `a <span class="hljs-operator">&gt;</span> b` <span class="hljs-operator">&amp;</span>nbsp; `a <span class="hljs-operator">&lt;</span><span class="hljs-operator">=</span> b` <span class="hljs-operator">&amp;</span>nbsp; `a <span class="hljs-operator">&gt;</span><span class="hljs-operator">=</span> b` <span class="hljs-operator">&amp;</span>nbsp; `<span class="hljs-operator">&lt;</span><span class="hljs-operator">=</span><span class="hljs-operator">&gt;</span></span> |
| <span class="inline-code highlight-jc hljs">a <span class="hljs-operator">and</span> b</span> |
| <span class="inline-code highlight-jc hljs">a <span class="hljs-operator">or</span> b</span> |
| <span class="inline-code highlight-jc hljs">a<span class="hljs-operator">..</span>b` <span class="hljs-operator">&amp;</span>nbsp; `a<span class="hljs-operator">..</span>` <span class="hljs-operator">&amp;</span>nbsp; `<span class="hljs-operator">..</span>` <span class="hljs-operator">&amp;</span>nbsp; `<span class="hljs-operator">..</span><span class="hljs-operator">=</span>b` <span class="hljs-operator">&amp;</span>nbsp; `<span class="hljs-operator">..</span>b` <span class="hljs-operator">&amp;</span>nbsp; `a<span class="hljs-operator">..</span><span class="hljs-operator">=</span>b</span> |
| <span class="inline-code highlight-jc hljs">a <span class="hljs-operator">|</span><span class="hljs-operator">&gt;</span> b</span> |
| <span class="inline-code highlight-jc hljs">a <span class="hljs-operator">=</span> b` <span class="hljs-operator">&amp;</span>nbsp; `a <span class="hljs-operator">+=</span> b` <span class="hljs-operator">&amp;</span>nbsp; `a <span class="hljs-operator">-=</span> b` <span class="hljs-operator">&amp;</span>nbsp; `a <span class="hljs-operator">*=</span> b` <span class="hljs-operator">&amp;</span>nbsp; `a <span class="hljs-operator">/=</span> b` <span class="hljs-operator">&amp;</span>nbsp; `a <span class="hljs-operator">%=</span> b` <span class="hljs-operator">&amp;</span>nbsp; `a <span class="hljs-operator">**=</span> b` <span class="hljs-operator">&amp;</span>nbsp; `a <span class="hljs-operator">&amp;=</span> b` <span class="hljs-operator">&amp;</span>nbsp; `a <span class="hljs-operator">|=</span> b` <span class="hljs-operator">&amp;</span>nbsp; `a <span class="hljs-operator">^=</span> b` <span class="hljs-operator">&amp;</span>nbsp; `a <span class="hljs-operator">&lt;&lt;=</span> b` <span class="hljs-operator">&amp;</span>nbsp; `a <span class="hljs-operator">&gt;&gt;=</span> b</span> |
| <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">return</span> a` <span class="hljs-operator">&amp;</span>nbsp; `<span class="hljs-keyword">break</span> a` <span class="hljs-operator">&amp;</span>nbsp; `() <span class="hljs-operator">-</span><span class="hljs-operator">&gt;</span> {}</span> |
<div class="nav-btn-block">
    <button class="nav-btn left">
    <a class="link" href="/Jacy-Dev-Book/appendices/jon-files">< JON Files</a>
</button>

    <button class="nav-btn right">
    <a class="link" href="/Jacy-Dev-Book/appendices/spec">Specification [WIP] ></a>
</button>

</div>
