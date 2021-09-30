---
layout: 'default'
title: 'Checklist'
nav_order: 103
parent: 'Appendices'
# No children
# No grandparent
---

# *Jacy* Programming language [checklist](https://www.mcmillen.dev/language_checklist.html)

<span class="inline-code highlight-jc hljs"></span><span class="inline-code highlight-jc hljs">plaintext
You appear to be advocating a new:
[x] functional  [x] imperative  [x] object-oriented  [ ] procedural [ ] stack-based
[x] <span class="hljs-string">&quot;multi-paradigm&quot;</span>  [ ] lazy  [x] eager  [x] statically-typed  [ ] dynamically-typed
[ ] pure  [ ] impure  [ ] non-hygienic  [ ] visual  [ ] beginner-friendly
[ ] non-programmer-friendly  [ ] completely incomprehensible
programming language.  Your language will <span class="hljs-operator">not</span> work.  Here is why it will <span class="hljs-operator">not</span> work.

You appear to believe that:
[ ] Syntax is what makes programming difficult
[ ] Garbage collection is free                [ ] Computers have infinite memory
[ ] Nobody really needs:
    [ ] concurrency  [ ] a REPL  [ ] debugger support  [ ] IDE support  [ ] I/O
    [ ] to interact with code <span class="hljs-operator">not</span> written <span class="hljs-keyword">in</span> your language
[ ] The entire world speaks <span class="hljs-number">7</span>-bit ASCII
[ ] Scaling up to large software projects will be easy
[ ] Convincing programmers to adopt a new language will be easy
[ ] Convincing programmers to adopt a language-specific IDE will be easy
[ ] Programmers love writing lots of boilerplate
[ ] Specifying behaviors <span class="hljs-keyword">as</span> <span class="hljs-string">&quot;undefined&quot;</span> means that programmers won<span class="hljs-symbol">&#x27;t</span> rely on them
[ ] <span class="hljs-string">&quot;Spooky action at a distance&quot;</span> makes programming more fun

Unfortunately, your <span class="hljs-title function_ invoke__">language</span> (has/lacks):
[h] comprehensible syntax  [h] semicolons  [ ] significant whitespace  [One day 🙃] macros
[ ] implicit <span class="hljs-keyword">type</span> <span class="hljs-title class_">conversion</span>  [h] explicit casting  [h] <span class="hljs-keyword">type</span> <span class="hljs-title class_">inference</span>
[ ] goto  [ ] exceptions  [h] closures  [ ] tail recursion  [ ] coroutines
[ ] reflection  [h] subtyping  [ ] multiple inheritance  [h] operator overloading
[h] algebraic datatypes  [kind of] recursive types  [ ] polymorphic types
[ ] covariant array typing  [I hope] monads  [ ] dependent types
[h] infix operators  [ ] nested comments  [ ] multi-line strings  [ ] regexes
[h] call-by-value  [ ] call-by-name  [h] call-by-reference  [ ] call-cc

The following philosophical objections apply:
[ ] Programmers should <span class="hljs-operator">not</span> need to understand category theory to write <span class="hljs-string">&quot;Hello, World!&quot;</span>
[ ] Programmers should <span class="hljs-operator">not</span> develop RSI from writing <span class="hljs-string">&quot;Hello, World!&quot;</span>
[ ] The most significant program written <span class="hljs-keyword">in</span> your language is its own compiler
[ ] The most significant program written <span class="hljs-keyword">in</span> your language isn<span class="hljs-symbol">&#x27;t</span> even its own compiler
[x] No language spec
[x] <span class="hljs-string">&quot;The implementation is the spec&quot;</span>
   [ ] The implementation is closed-source  [ ] covered by patents  [ ] <span class="hljs-operator">not</span> owned by you
[ ] Your <span class="hljs-keyword">type</span> <span class="hljs-title class_">system</span> is unsound  [ ] Your language cannot be unambiguously parsed
   [ ] a proof of same is attached
   [ ] invoking this proof crashes the compiler
[ ] The name of your language makes it impossible to find on Google
[ ] Interpreted languages will never be <span class="hljs-keyword">as</span> fast <span class="hljs-keyword">as</span> C
[ ] Compiled languages will never be <span class="hljs-string">&quot;extensible&quot;</span>
[ ] Writing a compiler that understands English is AI-complete
[ ] Your language relies on an optimization which has never been shown possible
[ ] There are less than <span class="hljs-number">100</span> programmers on Earth smart enough to <span class="hljs-keyword">use</span> your language
[ ] ____________________________ takes exponential time
[x] Type system is known to be undecidable, <span class="hljs-keyword">as</span> far <span class="hljs-keyword">as</span> it gonna be Turing-complete

Your implementation has the following flaws:
[ ] CPUs do <span class="hljs-operator">not</span> work that way
[ ] RAM does <span class="hljs-operator">not</span> work that way
[ ] VMs do <span class="hljs-operator">not</span> work that way
[ ] Compilers do <span class="hljs-operator">not</span> work that way
[ ] Compilers cannot work that way
[ ] Shift-reduce conflicts <span class="hljs-keyword">in</span> parsing seem to be resolved using <span class="hljs-title function_ invoke__">rand</span>()
[ ] You require the compiler to be present at runtime
[ ] You require the language runtime to be present at compile-time
[ ] Your compiler errors are completely inscrutable
[ ] Dangerous behavior is only a warning
[ ] The compiler crashes <span class="hljs-keyword">if</span> you look at it funny
[ ] The VM crashes <span class="hljs-keyword">if</span> you look at it funny
[ ] You don<span class="hljs-symbol">&#x27;t</span> seem to understand basic optimization techniques
[ ] You don<span class="hljs-symbol">&#x27;t</span> seem to understand basic systems programming
[ ] You don<span class="hljs-symbol">&#x27;t</span> seem to understand pointers
[ ] You don<span class="hljs-symbol">&#x27;t</span> seem to understand functions

Additionally, your marketing has the following problems:
[ ] Unsupported claims of increased productivity
[ ] Unsupported claims of greater <span class="hljs-string">&quot;ease of use&quot;</span>
[ ] Obviously rigged benchmarks
   [ ] Graphics, simulation, <span class="hljs-operator">or</span> crypto benchmarks <span class="hljs-keyword">where</span> your code just calls
       handwritten assembly through your FFI
   [ ] <span class="hljs-type">String</span>-processing benchmarks <span class="hljs-keyword">where</span> you just call PCRE
   [ ] Matrix-math benchmarks <span class="hljs-keyword">where</span> you just call BLAS
[ ] Noone really believes that your language is faster than:
    [ ] assembly  [ ] C  [ ] FORTRAN  [ ] Java  [ ] Ruby  [ ] Prolog
[ ] Rejection of orthodox programming-language theory without justification
[ ] Rejection of orthodox systems programming without justification
[ ] Rejection of orthodox algorithmic theory without justification
[ ] Rejection of basic computer science without justification

Taking the wider ecosystem into account, I would like to note that:
[ ] Your complex sample code would be one line <span class="hljs-keyword">in</span>: _______________________
[x] We already have an unsafe imperative language
[ ] We already have a safe imperative OO language
[ ] We already have a safe statically-typed eager functional language
[ ] You have reinvented Lisp but worse
[ ] You have reinvented Javascript but worse
[ ] You have reinvented Java but worse
[ ] You have reinvented C++ but worse
[ ] You have reinvented PHP but worse
[ ] You have reinvented PHP better, but that<span class="hljs-symbol">&#x27;s</span> still no justification
[ ] You have reinvented Brainfuck but non-ironically

In conclusion, this is what I think of you:
[ ] You have some interesting ideas, but this won<span class="hljs-symbol">&#x27;t</span> fly.
[ ] This is a bad language, <span class="hljs-operator">and</span> you should feel bad <span class="hljs-keyword">for</span> <span class="hljs-title class_">inventing</span> it.
[ ] Programming <span class="hljs-keyword">in</span> this language is an adequate punishment <span class="hljs-keyword">for</span> <span class="hljs-title class_">inventing</span> it.
</span><span class="inline-code highlight-jc hljs"></span>
<div class="nav-btn-block">
    <button class="nav-btn left">
    <a class="link" href="/Jacy-Dev-Book/appendices/cheatsheets">< Appendices</a>
</button>

    <button class="nav-btn right">
    <a class="link" href="/Jacy-Dev-Book/appendices/jon-files">JON Files ></a>
</button>

</div>
