---
layout: 'default'
title: 'Lambdas'
nav_order: 102
parent: 'Syntax Decisions'
# No children
grand_parent: 'Appendices'
---

# Lambdas syntax

Oh, I fight with lambdas syntax so long, actually still doing this. The problem could be easily solved, just by using
Rust' syntax <span class="inline-code highlight-jc hljs"><span class="hljs-operator">|</span><span class="hljs-operator">..</span><span class="hljs-operator">.</span><span class="hljs-operator">|</span> expr</span>. It does not confuse me much, btw I would like to make lambda parameter list cleaner with some
kind of opening delimiter and closing one.

To memorize the process of brain-storm, I'd like to describe the flow.

## Idea #1 "Stupid"

The first idea was to use <span class="inline-code highlight-jc hljs">(p1, p2, <span class="hljs-operator">..</span><span class="hljs-operator">.</span>, pN) <span class="hljs-operator">-</span><span class="hljs-operator">&gt;</span> expr</span> syntax, but it does not play well with tuple syntax. This is
because each parameter is not just an identifier -- it is a pattern. I insist on lambda parameters to be patterns as
function parameters do, to be consistent. Also, the problem is that when we have required <span class="inline-code highlight-jc hljs"><span class="hljs-operator">-</span><span class="hljs-operator">&gt;</span></span> we not allowed to
unambiguously parse return type of lambda, this could be solved with <span class="inline-code highlight-jc hljs">(): returnType <span class="hljs-operator">-</span><span class="hljs-operator">&gt;</span> expr</span> actually.

## Idea #2 "Rust syntax"

JUST USE RUST SYNTAX.

- Is solves problems with return type
- It is LL parsable
- It solves problems with pattern matching in parameters

But as I wrote above, I want opening and closing delimiter in lambda parameters. This Ruby-like syntax looks like
"capture something...".

## Idea #3 "Full inference"

<span class="inline-code highlight-jc hljs">`</span>plaintext
(p1, ..., pN) -> expr
<span class="inline-code highlight-jc hljs">`</span>

- No type annotations and full inference

This one is very simple, but won't work as far as *Jacy* does not support parameters types inference.

## Idea #4 "Solving conflicts"

The idea is to parse <span class="inline-code highlight-jc hljs">(<span class="hljs-operator">..</span><span class="hljs-operator">.</span>)` to some non<span class="hljs-operator">-</span>AST structure <span class="hljs-operator">-</span><span class="hljs-operator">-</span> NamedList, <span class="hljs-keyword">where</span> each element <span class="hljs-keyword">in</span> list is `TokenList: <span class="hljs-keyword">type</span></span>. If
we encounter a <span class="inline-code highlight-jc hljs"><span class="hljs-operator">-</span><span class="hljs-operator">&gt;</span>` after `)` <span class="hljs-operator">-</span><span class="hljs-operator">-</span> we parse each `TokenList</span> as pattern and continuing as lambda parsing. If there's no
<span class="inline-code highlight-jc hljs"><span class="hljs-operator">-</span><span class="hljs-operator">&gt;</span>` we parse `TokenList` <span class="hljs-keyword">as</span> expression <span class="hljs-operator">and</span> rep<span class="hljs-operator">or</span>t err<span class="hljs-operator">or</span>s <span class="hljs-keyword">if</span> it is an invalid expression <span class="hljs-operator">or</span> `<span class="hljs-keyword">type</span></span> exists (tuples cannot
have types in expression).

Pros:

- Opening and closing delimiters
- We have <span class="inline-code highlight-jc hljs">(<span class="hljs-operator">..</span><span class="hljs-operator">.</span>) <span class="hljs-operator">-</span><span class="hljs-operator">&gt;</span> expr</span> syntax

Cons:

- Hacking parser is not a good idea for WIP project, like early optimizations.
- Large Parser updates (we need to allow handling separate token stream).

## Idea #5 "Haskell-like"

<span class="inline-code highlight-jc hljs">`</span>plaintext
\(p1: type, ..., pN: type): type -> expr
<span class="inline-code highlight-jc hljs">`</span>

Pros:

- Opening and closing delimiters
- No conflicts and easy LL parsing

Cons:

- We have <span class="inline-code highlight-jc hljs">\</span> syntax 😞
- <span class="inline-code highlight-jc hljs"><span class="hljs-operator">-</span><span class="hljs-operator">&gt;</span>` is required so <span class="hljs-keyword">return</span> <span class="hljs-keyword">type</span> <span class="hljs-title class_">syntax</span> is `(<span class="hljs-operator">..</span><span class="hljs-operator">.</span>): <span class="hljs-keyword">type</span></span>

Also, this syntax allows simplifications:

- We can allow <span class="inline-code highlight-jc hljs">IDENT <span class="hljs-operator">-</span><span class="hljs-operator">&gt;</span> expr` <span class="hljs-keyword">as</span> a sh<span class="hljs-operator">or</span>tcut f<span class="hljs-operator">or</span> `<span class="hljs-title function_ invoke__">BorrowPattern</span>(IDENT) <span class="hljs-operator">-</span><span class="hljs-operator">&gt;</span> expr</span>
<div class="nav-btn-block">
    <button class="nav-btn left">
    <a class="link" href="/Jacy-Dev-Book/appendices/syntax-decisions/control-flow-structures.html">< Control flow structures</a>
</button>

    <button class="nav-btn right">
    <a class="link" href="/Jacy-Dev-Book/appendices/syntax-decisions/semicolons.html">Semicolons ></a>
</button>

</div>
