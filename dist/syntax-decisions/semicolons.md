---
layout: 'default'
title: 'Semicolons'
nav_order: 2
parent: Syntax decisions
---

# Semicolons

I've made a bad decision to make all `;` optional at the start of development.

Now, `;` is required, anyway, I won't add rules about `;` like Rust does. In Rust, if you place a semicolon at the end
of expression-statement, it is treated as return-expression or the value of the block. In Jacy there won't be any rules
like that, for control-flow structure blocks the last expression is always the value of the block and in functions
explicit `return` is always required if block (\`{}\`) syntax is used.

I've promised myself to add "semicolon inference" in the future, so I cannot rely on semicolon as part of any additional
rules except the only one -- using as a terminating token.

> The important thing is that I won't implement "semicolon insertion", because syntax is too complex to reduce all cases
> to hard rules.
>
> What I'm gonna do is check for NLs in each place where they can be optional and also use them as alternative to `;`

Resources:

* [Semicolon Inference](https://pling.jondgoodwin.com/post/semicolon-inference/)
