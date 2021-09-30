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
[x] functional  [x] imperative  [x] object<span class="hljs-operator">-</span><span class="hljs-operator">or</span>iented  [ ] procedural [ ] stack<span class="hljs-operator">-</span>based
[x] <span class="hljs-string">&quot;multi-paradigm&quot;</span>  [ ] lazy  [x] eager  [x] statically<span class="hljs-operator">-</span>typed  [ ] dynamically<span class="hljs-operator">-</span>typed
[ ] pure  [ ] impure  [ ] non<span class="hljs-operator">-</span>hygienic  [ ] visual  [ ] beginner<span class="hljs-operator">-</span>friendly
[ ] non<span class="hljs-operator">-</span>programmer<span class="hljs-operator">-</span>friendly  [ ] completely incomprehensible
programming language<span class="hljs-operator">.</span>  Your language will <span class="hljs-operator">not</span> w<span class="hljs-operator">or</span>k<span class="hljs-operator">.</span>  Here is why it will <span class="hljs-operator">not</span> w<span class="hljs-operator">or</span>k<span class="hljs-operator">.</span>

You appear to believe that:
[ ] Syntax is what makes programming difficult
[ ] Garbage collection is free                [ ] Computers have infinite mem<span class="hljs-operator">or</span>y
[ ] Nobody really needs:
    [ ] concurrency  [ ] a REPL  [ ] debugger supp<span class="hljs-operator">or</span>t  [ ] IDE supp<span class="hljs-operator">or</span>t  [ ] I<span class="hljs-operator">/</span>O
    [ ] to interact with code <span class="hljs-operator">not</span> written <span class="hljs-keyword">in</span> your language
[ ] The entire w<span class="hljs-operator">or</span>ld speaks <span class="hljs-number">7</span><span class="hljs-operator">-</span>bit ASCII
[ ] Scaling up to large software projects will be easy
[ ] Convincing programmers to adopt a new language will be easy
[ ] Convincing programmers to adopt a language<span class="hljs-operator">-</span>specific IDE will be easy
[ ] Programmers love writing lots of boilerplate
[ ] Specifying behavi<span class="hljs-operator">or</span>s <span class="hljs-keyword">as</span> <span class="hljs-string">&quot;undefined&quot;</span> means that programmers won<span class="hljs-symbol">&#x27;t</span> rely on them
[ ] <span class="hljs-string">&quot;Spooky action at a distance&quot;</span> makes programming m<span class="hljs-operator">or</span>e fun

Unf<span class="hljs-operator">or</span>tunately, your <span class="hljs-title function_ invoke__">language</span> (has<span class="hljs-operator">/</span>lacks):
[h] comprehensible syntax  [h] semicolons  [ ] significant whitespace  [One day 🙃] macros
[ ] implicit <span class="hljs-keyword">type</span> <span class="hljs-title class_">conversion</span>  [h] explicit casting  [h] <span class="hljs-keyword">type</span> <span class="hljs-title class_">inference</span>
[ ] goto  [ ] exceptions  [h] closures  [ ] tail recursion  [ ] c<span class="hljs-operator">or</span>outines
[ ] reflection  [h] subtyping  [ ] multiple inheritance  [h] operat<span class="hljs-operator">or</span> overloading
[h] algebraic datatypes  [kind of] recursive types  [ ] polym<span class="hljs-operator">or</span>phic types
[ ] covariant array typing  [I hope] monads  [ ] dependent types
[h] infix operat<span class="hljs-operator">or</span>s  [ ] nested comments  [ ] multi<span class="hljs-operator">-</span>line strings  [ ] regexes
[h] call<span class="hljs-operator">-</span>by<span class="hljs-operator">-</span>value  [ ] call<span class="hljs-operator">-</span>by<span class="hljs-operator">-</span>name  [h] call<span class="hljs-operator">-</span>by<span class="hljs-operator">-</span>reference  [ ] call<span class="hljs-operator">-</span>cc

The following philosophical objections apply:
[ ] Programmers should <span class="hljs-operator">not</span> need to underst<span class="hljs-operator">and</span> categ<span class="hljs-operator">or</span>y the<span class="hljs-operator">or</span>y to write <span class="hljs-string">&quot;Hello, World!&quot;</span>
[ ] Programmers should <span class="hljs-operator">not</span> develop RSI from writing <span class="hljs-string">&quot;Hello, World!&quot;</span>
[ ] The most significant program written <span class="hljs-keyword">in</span> your language is its own compiler
[ ] The most significant program written <span class="hljs-keyword">in</span> your language isn<span class="hljs-symbol">&#x27;t</span> even its own compiler
[x] No language spec
[x] <span class="hljs-string">&quot;The implementation is the spec&quot;</span>
   [ ] The implementation is closed<span class="hljs-operator">-</span>source  [ ] covered by patents  [ ] <span class="hljs-operator">not</span> owned by you
[ ] Your <span class="hljs-keyword">type</span> <span class="hljs-title class_">system</span> is unsound  [ ] Your language can<span class="hljs-operator">not</span> be unambiguously parsed
   [ ] a proof of same is attached
   [ ] invoking this proof crashes the compiler
[ ] The name of your language makes it impossible to find on Google
[ ] Interpreted languages will never be <span class="hljs-keyword">as</span> fast <span class="hljs-keyword">as</span> C
[ ] Compiled languages will never be <span class="hljs-string">&quot;extensible&quot;</span>
[ ] Writing a compiler that underst<span class="hljs-operator">and</span>s English is AI<span class="hljs-operator">-</span>complete
[ ] Your language relies on an optimization which has never been shown possible
[ ] There are less than <span class="hljs-number">100</span> programmers on Earth smart enough to <span class="hljs-keyword">use</span> your language
[ ] ____________________________ takes exponential time
[x] Type system is known to be undecidable, <span class="hljs-keyword">as</span> far <span class="hljs-keyword">as</span> it gonna be Turing<span class="hljs-operator">-</span>complete

Your implementation has the following flaws:
[ ] CPUs do <span class="hljs-operator">not</span> w<span class="hljs-operator">or</span>k that way
[ ] RAM does <span class="hljs-operator">not</span> w<span class="hljs-operator">or</span>k that way
[ ] VMs do <span class="hljs-operator">not</span> w<span class="hljs-operator">or</span>k that way
[ ] Compilers do <span class="hljs-operator">not</span> w<span class="hljs-operator">or</span>k that way
[ ] Compilers can<span class="hljs-operator">not</span> w<span class="hljs-operator">or</span>k that way
[ ] Shift<span class="hljs-operator">-</span>reduce conflicts <span class="hljs-keyword">in</span> parsing seem to be resolved using <span class="hljs-title function_ invoke__">rand</span>()
[ ] You require the compiler to be present at runtime
[ ] You require the language runtime to be present at compile<span class="hljs-operator">-</span>time
[ ] Your compiler err<span class="hljs-operator">or</span>s are completely inscrutable
[ ] Dangerous behavi<span class="hljs-operator">or</span> is only a warning
[ ] The compiler crashes <span class="hljs-keyword">if</span> you look at it funny
[ ] The VM crashes <span class="hljs-keyword">if</span> you look at it funny
[ ] You don<span class="hljs-symbol">&#x27;t</span> seem to underst<span class="hljs-operator">and</span> basic optimization techniques
[ ] You don<span class="hljs-symbol">&#x27;t</span> seem to underst<span class="hljs-operator">and</span> basic systems programming
[ ] You don<span class="hljs-symbol">&#x27;t</span> seem to underst<span class="hljs-operator">and</span> pointers
[ ] You don<span class="hljs-symbol">&#x27;t</span> seem to underst<span class="hljs-operator">and</span> functions

Additionally, your marketing has the following problems:
[ ] Unsupp<span class="hljs-operator">or</span>ted claims of increased productivity
[ ] Unsupp<span class="hljs-operator">or</span>ted claims of greater <span class="hljs-string">&quot;ease of use&quot;</span>
[ ] Obviously rigged benchmarks
   [ ] Graphics, simulation, <span class="hljs-operator">or</span> crypto benchmarks <span class="hljs-keyword">where</span> your code just calls
       h<span class="hljs-operator">and</span>written assembly through your FFI
   [ ] <span class="hljs-type">String</span><span class="hljs-operator">-</span>processing benchmarks <span class="hljs-keyword">where</span> you just call PCRE
   [ ] Matrix<span class="hljs-operator">-</span>math benchmarks <span class="hljs-keyword">where</span> you just call BLAS
[ ] Noone really believes that your language is faster than:
    [ ] assembly  [ ] C  [ ] FORTRAN  [ ] Java  [ ] Ruby  [ ] Prolog
[ ] Rejection of <span class="hljs-operator">or</span>thodox programming<span class="hljs-operator">-</span>language the<span class="hljs-operator">or</span>y without justification
[ ] Rejection of <span class="hljs-operator">or</span>thodox systems programming without justification
[ ] Rejection of <span class="hljs-operator">or</span>thodox alg<span class="hljs-operator">or</span>ithmic the<span class="hljs-operator">or</span>y without justification
[ ] Rejection of basic computer science without justification

Taking the wider ecosystem into account, I would like to <span class="hljs-operator">not</span>e that:
[ ] Your complex sample code would be one line <span class="hljs-keyword">in</span>: _______________________
[x] We already have an unsafe imperative language
[ ] We already have a safe imperative OO language
[ ] We already have a safe statically<span class="hljs-operator">-</span>typed eager functional language
[ ] You have reinvented Lisp but w<span class="hljs-operator">or</span>se
[ ] You have reinvented Javascript but w<span class="hljs-operator">or</span>se
[ ] You have reinvented Java but w<span class="hljs-operator">or</span>se
[ ] You have reinvented C<span class="hljs-operator">+</span><span class="hljs-operator">+</span> but w<span class="hljs-operator">or</span>se
[ ] You have reinvented PHP but w<span class="hljs-operator">or</span>se
[ ] You have reinvented PHP better, but that<span class="hljs-symbol">&#x27;s</span> still no justification
[ ] You have reinvented Brainfuck but non<span class="hljs-operator">-</span>ironically

In conclusion, this is what I think of you:
[ ] You have some interesting ideas, but this won<span class="hljs-symbol">&#x27;t</span> fly<span class="hljs-operator">.</span>
[ ] This is a bad language, <span class="hljs-operator">and</span> you should feel bad <span class="hljs-keyword">for</span> <span class="hljs-title class_">inventing</span> it<span class="hljs-operator">.</span>
[ ] Programming <span class="hljs-keyword">in</span> this language is an adequate punishment <span class="hljs-keyword">for</span> <span class="hljs-title class_">inventing</span> it<span class="hljs-operator">.</span>
</span><span class="inline-code highlight-jc hljs"></span>
<div class="nav-btn-block">
    <button class="nav-btn left">
    <a class="link" href="/Jacy-Dev-Book/appendices/cheatsheets">< Appendices</a>
</button>

    <button class="nav-btn right">
    <a class="link" href="/Jacy-Dev-Book/appendices/jon-files">JON Files ></a>
</button>

</div>
