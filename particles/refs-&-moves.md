---
layout: default
title: Particles
nav_order: 2
has_children: true
---

# References and move semantics

This particle among the magnitude of other is about memory management in _Jacy_.
Here I want to discuss the one of the hardest questions I have about _Jacy_ -- "Why references?"

I want to have a language which I can use to develop high-level stuff as far as low-level, mix them and doing it as easy as possible.
When these two words meet, many questions arise: working with memory directly requires opening memory management mechanisms to user whereas high-level programming often hides it.
This is why so many languages exist: some aimed to general low-level programming, some to general high-level programming, even some aimed to work with very specific domain like smart contracts.
_Jacy_ is general purpose programming language, and I have to say that it is a low-level PL.
Anyway, I don't want to miss any approach that would make _Jacy_ more high-level and convenient to use.

## Move semantics bring references?

Maybe it would sound weirdly but I want to logically describe one dilemma.
I almost agreed with myself to make _Jacy_ more similar to Swift than Rust in the sense of memory management.
Swift is ref/copy by default while Rust is move by default.
What I want is move by default! And it is impossible to have both, default is one.

In my opinion low-level programming with references as option is better than low-level with references by default. Reference is appendix mechanism even it is often used as base of MM in many PLs.
Also, when you have option to use references or not, you have more control on what are you actually doing.

## Simplify unless code dies

Rust is too explicit in my opinion, being well-designed PL, it keeps you in shackles even when you're just trying to do something a little bit simpler than required. What am I talking about? Explicitness is good when we are talking about safety, etc. but it is not required when we're talking about code writing, however respectful.

Some things can be liberalized while saving all the safety rules in Rust.
For example: passing by reference. 

