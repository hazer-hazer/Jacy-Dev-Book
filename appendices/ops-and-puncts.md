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
functions. When calling <span class="inline-code highlight-jc hljs">a + b</span> the trait <span class="inline-code highlight-jc hljs">std::ops::Add</span> will be used. Mostly
all operators are overloadable.

## Operators in expressions

| Operator | Trait to overload |
| :------: | :---------------- |
| <span class="inline-code highlight-jc hljs">a + b</span> | <span class="inline-code highlight-jc hljs">std::ops::Add</span> |
| <span class="inline-code highlight-jc hljs">a - b</span> | <span class="inline-code highlight-jc hljs">std::ops::Sub</span> |
| <span class="inline-code highlight-jc hljs">a * b</span> | <span class="inline-code highlight-jc hljs">std::ops::Mul</span> |
| <span class="inline-code highlight-jc hljs">a / b</span> | <span class="inline-code highlight-jc hljs">std::ops::Div</span> |
| <span class="inline-code highlight-jc hljs">a % b</span> | <span class="inline-code highlight-jc hljs">std::ops::Rem</span> |
| <span class="inline-code highlight-jc hljs">a ** b</span> (\*) | <span class="inline-code highlight-jc hljs">std::ops::Pow</span> |
| <span class="inline-code highlight-jc hljs">a <span class="hljs-operator">or</span> b</span> | N/A |
| <span class="inline-code highlight-jc hljs">a <span class="hljs-operator">and</span> b</span> | N/A |
| <span class="inline-code highlight-jc hljs">!a</span> | <span class="inline-code highlight-jc hljs">std::ops::Not</span> |
| <span class="inline-code highlight-jc hljs">a &amp; b</span> | <span class="inline-code highlight-jc hljs">std::ops::BitAnd</span> |
| <span class="inline-code highlight-jc hljs">a | b</span> | <span class="inline-code highlight-jc hljs">std::ops::BitOr</span> |
| <span class="inline-code highlight-jc hljs">a &lt;&lt; b</span> | <span class="inline-code highlight-jc hljs">std::ops::Shl</span> |
| <span class="inline-code highlight-jc hljs">a &gt;&gt; b</span> | <span class="inline-code highlight-jc hljs">std::ops::Shr</span> |
| <span class="inline-code highlight-jc hljs">a ^ b</span> | <span class="inline-code highlight-jc hljs">std::ops::Xor</span> |
| <span class="inline-code highlight-jc hljs">a &lt; b</span> &nbsp; <span class="inline-code highlight-jc hljs">a &gt; b</span> &nbsp; <span class="inline-code highlight-jc hljs">a &gt;= b</span> &nbsp; <span class="inline-code highlight-jc hljs">a &lt;= b</span> &nbsp; <span class="inline-code highlight-jc hljs">a &lt;<span class="hljs-operator">=&gt;</span> b</span> | <span class="inline-code highlight-jc hljs">std::ops::Cmp</span> |
| <span class="inline-code highlight-jc hljs">a == b</span> &nbsp; <span class="inline-code highlight-jc hljs">a != b</span> | <span class="inline-code highlight-jc hljs">std::ops::Eq</span> |
| <span class="inline-code highlight-jc hljs">a === b</span> &nbsp; <span class="inline-code highlight-jc hljs">a !== b</span> | ??? (Not described) |
| <span class="inline-code highlight-jc hljs">a..b</span> | <span class="inline-code highlight-jc hljs">std::ops::Range</span> |
| <span class="inline-code highlight-jc hljs">a..=b</span> | <span class="inline-code highlight-jc hljs">std::ops::RangeIncl</span> |
| <span class="inline-code highlight-jc hljs">..b</span> | <span class="inline-code highlight-jc hljs">std::ops::RangeTo</span> |
| <span class="inline-code highlight-jc hljs">a..</span> | <span class="inline-code highlight-jc hljs">std::ops::RangeFrom</span> |
| <span class="inline-code highlight-jc hljs">..=b</span> | <span class="inline-code highlight-jc hljs">std::ops::RangeToIncl</span> |
| <span class="inline-code highlight-jc hljs">..</span> | <span class="inline-code highlight-jc hljs">std::ops::RangeFull</span> (\*\*) |
| <span class="inline-code highlight-jc hljs">a += b</span> | <span class="inline-code highlight-jc hljs">std::ops::AddAssign</span> |
| <span class="inline-code highlight-jc hljs">a -= b</span> | <span class="inline-code highlight-jc hljs">std::ops::SubAssign</span> |
| <span class="inline-code highlight-jc hljs">a *= b</span> | <span class="inline-code highlight-jc hljs">std::ops::MulAssign</span> |
| <span class="inline-code highlight-jc hljs">a /= b</span> | <span class="inline-code highlight-jc hljs">std::ops::DivAssign</span> |
| <span class="inline-code highlight-jc hljs">a %= b</span> | <span class="inline-code highlight-jc hljs">std::ops::RemAssign</span> |
| <span class="inline-code highlight-jc hljs">a **= b</span> | <span class="inline-code highlight-jc hljs">std::ops::PowAssign</span> |
| <span class="inline-code highlight-jc hljs">a |= b</span> | <span class="inline-code highlight-jc hljs">std::ops::BitOrAssign</span> |
| <span class="inline-code highlight-jc hljs">a &amp;= b</span> | <span class="inline-code highlight-jc hljs">std::ops::BitAndAssign</span> |
| <span class="inline-code highlight-jc hljs">a &lt;&lt;= b</span> | <span class="inline-code highlight-jc hljs">std::ops::ShlAssign</span> |
| <span class="inline-code highlight-jc hljs">a &gt;&gt;= b</span> | <span class="inline-code highlight-jc hljs">std::ops::ShrAssign</span> |
| <span class="inline-code highlight-jc hljs">a ^= b</span> | <span class="inline-code highlight-jc hljs">std::ops::XorAssign</span> |
| <span class="inline-code highlight-jc hljs">a?</span> | <span class="inline-code highlight-jc hljs">std::ops::Try::branch</span> |
| <span class="inline-code highlight-jc hljs">a!</span> | <span class="inline-code highlight-jc hljs">std::ops::Try::unwrap</span> |
| <span class="inline-code highlight-jc hljs">a.b</span> | N/A |
| <span class="inline-code highlight-jc hljs"><span class="hljs-title function_ invoke__">a</span>()</span> | <span class="inline-code highlight-jc hljs">std::ops::Invoke</span> |
| <span class="inline-code highlight-jc hljs">*a</span> | <span class="inline-code highlight-jc hljs">std::ops::Deref</span> |
| <span class="inline-code highlight-jc hljs">*a = b</span> | <span class="inline-code highlight-jc hljs">std::ops::DerefMut</span> |
| <span class="inline-code highlight-jc hljs">&amp;a</span> | N/A |
| <span class="inline-code highlight-jc hljs">a |&gt; b</span> | N/A |

* (\*) For the exponentiation operator, there can be a conflict with
  dereferencing operator <span class="inline-code highlight-jc hljs">*</span>, to solve it you need to put white space between
  terms. E.g. <span class="inline-code highlight-jc hljs">a**b</span> == <span class="inline-code highlight-jc hljs">a ** b</span> as far as <span class="inline-code highlight-jc hljs">a **b</span> == <span class="inline-code highlight-jc hljs">a ** b</span> but not == `a *
  *b<span class="inline-code highlight-jc hljs">, <span class="hljs-operator">and</span> </span>a*b<span class="inline-code highlight-jc hljs"> == </span>a * b`. So, with dereferencing, always put white space
  before <span class="inline-code highlight-jc hljs">*</span> (as dereferencing operator).
* (\*\*) <span class="inline-code highlight-jc hljs">RangeFull</span> is not a real operator, it is an empty <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">struct</span></span> which can
  be passed somewhere.

## Punctuations

| Punctuation | Usages |
| :--- | :--- |
| <span class="inline-code highlight-jc hljs">:</span> | Type annotations in almost all constructions, function call argument name |
| <span class="inline-code highlight-jc hljs"><span class="hljs-operator">-&gt;</span></span> | Function types, lambdas |
| <span class="inline-code highlight-jc hljs">;</span> | Statement terminator, body ignorance, item declaration |
| <span class="inline-code highlight-jc hljs"><span class="hljs-operator">=&gt;</span></span> | <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">match</span></span> arms |
|  |  |

## Operators and punctuations precedence

Precedence (from highest to lowest)

| Symbols |
| :-----: |
| <span class="inline-code highlight-jc hljs">a::b</span> |
| <span class="inline-code highlight-jc hljs">a.b</span> |
| <span class="inline-code highlight-jc hljs"><span class="hljs-title function_ invoke__">a</span>()</span> &nbsp; <span class="inline-code highlight-jc hljs">a[]</span> |
| <span class="inline-code highlight-jc hljs">a?</span> |
| <span class="inline-code highlight-jc hljs">-a</span> &nbsp; <span class="inline-code highlight-jc hljs">*a</span> &nbsp; <span class="inline-code highlight-jc hljs">!a</span> &nbsp; <span class="inline-code highlight-jc hljs">&amp;a</span> &nbsp; <span class="inline-code highlight-jc hljs">&amp;<span class="hljs-keyword">mut</span> a</span> |
| <span class="inline-code highlight-jc hljs">a <span class="hljs-keyword">as</span> b</span> |
| <span class="inline-code highlight-jc hljs">a ** b</span> |
| <span class="inline-code highlight-jc hljs">a * b</span> &nbsp; <span class="inline-code highlight-jc hljs">a / b</span> &nbsp; <span class="inline-code highlight-jc hljs">a % b</span> |
| <span class="inline-code highlight-jc hljs">a + b</span> &nbsp; <span class="inline-code highlight-jc hljs">a - b</span> |
| <span class="inline-code highlight-jc hljs">a &lt;&lt; b</span> &nbsp; <span class="inline-code highlight-jc hljs">a &gt;&gt; b</span> |
| <span class="inline-code highlight-jc hljs">a &amp; b</span> |
| <span class="inline-code highlight-jc hljs">a ^ b</span> |
| <span class="inline-code highlight-jc hljs">a | b</span> |
| <span class="inline-code highlight-jc hljs">a == b</span> &nbsp; <span class="inline-code highlight-jc hljs">a != b</span> &nbsp; <span class="inline-code highlight-jc hljs">a === b</span> &nbsp; <span class="inline-code highlight-jc hljs">a !== b</span> &nbsp; <span class="inline-code highlight-jc hljs">a &lt; b</span> &nbsp; <span class="inline-code highlight-jc hljs">a &gt; b</span> &nbsp; <span class="inline-code highlight-jc hljs">a &lt;= b</span> &nbsp; <span class="inline-code highlight-jc hljs">a &gt;= b</span> &nbsp; <span class="inline-code highlight-jc hljs">&lt;<span class="hljs-operator">=&gt;</span></span> |
| <span class="inline-code highlight-jc hljs">a <span class="hljs-operator">and</span> b</span> |
| <span class="inline-code highlight-jc hljs">a <span class="hljs-operator">or</span> b</span> |
| <span class="inline-code highlight-jc hljs">a..b</span> &nbsp; <span class="inline-code highlight-jc hljs">a..</span> &nbsp; <span class="inline-code highlight-jc hljs">..</span> &nbsp; <span class="inline-code highlight-jc hljs">..=b</span> &nbsp; <span class="inline-code highlight-jc hljs">..b</span> &nbsp; <span class="inline-code highlight-jc hljs">a..=b</span> |
| <span class="inline-code highlight-jc hljs">a |&gt; b</span> |
| <span class="inline-code highlight-jc hljs">a = b</span> &nbsp; <span class="inline-code highlight-jc hljs">a += b</span> &nbsp; <span class="inline-code highlight-jc hljs">a -= b</span> &nbsp; <span class="inline-code highlight-jc hljs">a *= b</span> &nbsp; <span class="inline-code highlight-jc hljs">a /= b</span> &nbsp; <span class="inline-code highlight-jc hljs">a %= b</span> &nbsp; <span class="inline-code highlight-jc hljs">a **= b</span> &nbsp; <span class="inline-code highlight-jc hljs">a &amp;= b</span> &nbsp; <span class="inline-code highlight-jc hljs">a |= b</span> &nbsp; <span class="inline-code highlight-jc hljs">a ^= b</span> &nbsp; <span class="inline-code highlight-jc hljs">a &lt;&lt;= b</span> &nbsp; <span class="inline-code highlight-jc hljs">a &gt;&gt;= b</span> |
| <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">return</span> a</span> &nbsp; <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">break</span> a</span> &nbsp; <span class="inline-code highlight-jc hljs">() <span class="hljs-operator">-&gt;</span> {}</span> |
<div class="nav-btn-block">
    <button class="nav-btn left">
    <a class="link" href="/dev-book/appendices/jon-files">< JON Files</a>
</button>

    <button class="nav-btn right">
    <a class="link" href="/dev-book/appendices/spec">Specification [WIP] ></a>
</button>

</div>
