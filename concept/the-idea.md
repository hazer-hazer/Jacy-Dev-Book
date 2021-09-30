---
layout: 'default'
title: 'The idea'
nav_order: 101
parent: 'Concept'
# No children
# No grandparent
---

# The Idea

_Jacy_ is an experimental project that is aimed to have powerful features with ease of use but without an implicitness.

Some main features _Jacy_ would have one day:

* The base of functional programming (first-class monads, pattern matching,

  etc.)

* Rustish ownership system and safety
* <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">trait</span></span> system
* Comprehensive type system (generics, type bounds, <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">where</span></span> clause,

  etc.)

All of these features are not firmly established, that's just a starting point from which the way of research will be
done.

What is the muse of _Jacy_? -- Do as much as we can on compilation-time. At first, I was inspired by modern languages
that became fairly popular -- Kotlin/Swift, etc. Anyway, the reason for their popularity is that their purpose is to
modernize old technologies, Kotlin for Java, Swift for Objective-C. I fell into a stupor, I didn't want to solve
problems of old languages, I wanted to make something new and solid.

Also, I want to describe some kind of Zen, I need a list of common values that _Jacy_ should have in my opinion:

1. Convenience is more important than anything else, except the cases when convenience violates any other rule.
2. Everything that can be explicit -- must be explicit.
3. Safety, safety, and safety, but it is important as far as there's no lack of convenience.
4. Sometimes we just prototype something and want to write code with the speed of speaking. So every feature in _Jacy_
   should be review from the side of coding speed and ease.
5. If we can help a user with avoiding mistakes -- we help him.
<div class="nav-btn-block">
    <button class="nav-btn left">
    <a class="link" href="/Jacy-Dev-Book/concept/goal.html">< Goal</a>
</button>

    <button class="nav-btn right">
    <a class="link" href="/Jacy-Dev-Book/concept/why-affine-types.html">Why affine types ></a>
</button>

</div>
