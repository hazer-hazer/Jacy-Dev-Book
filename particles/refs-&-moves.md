---
layout: 'default'
title: 'Refs & moves'
nav_order: 109
parent: 'Particles [β RFCs]'
# No children
# No grandparent
---

# References and move semantics

This particle among the magnitude of others is about memory management in _Jacy_.
Here I want to discuss one of the hardest questions I have about _Jacy_ -- "Why references?"

I want to have a language that I can use to develop high-level stuff as far as low level, mix them, and doing it as easily as possible.
When these two worlds meet, many questions arise: working with memory directly requires opening memory management mechanisms to the user whereas high-level programming often hides it.
This is why so many languages exist: some aimed at general low-level programming, some to general high-level programming, even some aimed to work with a very specific domain like smart contracts.
_Jacy_ is a general-purpose programming language, and I have to say that it is a low-level PL.
Anyway, I don't want to miss an approach that would make _Jacy_ more high-level and convenient to use.

## Move semantics bring references?

Maybe it would sound weird but I want to logically describe one dilemma.
I almost agreed with myself to make _Jacy_ more similar to Swift than Rust in the sense of memory management.
Swift is ref/copy by default while Rust is move-by-default.
What I want is move-by-default! And it is impossible to have both, default is one.

In my opinion, low-level programming with references as an option is better than low-level with references by default. Reference is an appendix mechanism even it is often used as the base of MM in many PLs.
Also, when you have the option to use references or not, you have more control over what are you doing.

## Simplify unless code dies

Rust is too explicit in my opinion, being well-designed PL, keeps you in shackles even when you're just trying to do something a little bit simpler than required. What am I talking about? Explicitness is good when we are talking about safety, etc. but it is not required when we're talking about code writing, however respectful.

Some things can be liberalized while saving all the safety rules in Rust.
For example: passing by reference. We have function signature, we know that function accepts reference (possibly) mutable, that is, we don't lose safety if not requiring the user to explicitly borrow value.

Example:

<div class="code-fence line-numbers highlight-jc hljs">
            <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-comment">// Some non-copy type</span></div><div class="line-num" data-line-num="2">2</div><div class="line"><span class="hljs-keyword">struct</span> <span class="hljs-title class_">S</span> {</div><div class="line-num" data-line-num="3">3</div><div class="line">    field: <span class="hljs-type">int</span>,</div><div class="line-num" data-line-num="4">4</div><div class="line">}</div><div class="line-num" data-line-num="5">5</div><div class="line"></div><div class="line-num" data-line-num="6">6</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-title function_">foo</span>(instance: &amp;S) {</div><div class="line-num" data-line-num="7">7</div><div class="line">    <span class="hljs-title function_ invoke__">print</span>(instance.field)</div><div class="line-num" data-line-num="8">8</div><div class="line">}</div><div class="line-num" data-line-num="9">9</div><div class="line"></div><div class="line-num" data-line-num="10">10</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-title function_">main</span> {</div><div class="line-num" data-line-num="11">11</div><div class="line">    <span class="hljs-keyword">let</span> <span class="hljs-variable">s</span> = S {field: <span class="hljs-number">123</span>};</div><div class="line-num" data-line-num="12">12</div><div class="line">    </div><div class="line-num" data-line-num="13">13</div><div class="line">    <span class="hljs-comment">// This is how to do it in Rust</span></div><div class="line-num" data-line-num="14">14</div><div class="line">    <span class="hljs-title function_ invoke__">foo</span>(&amp;s);</div><div class="line-num" data-line-num="15">15</div><div class="line"></div><div class="line-num" data-line-num="16">16</div><div class="line">    <span class="hljs-comment">// This is how to do it in Jacy</span></div><div class="line-num" data-line-num="17">17</div><div class="line">    <span class="hljs-title function_ invoke__">foo</span>(s);</div><div class="line-num" data-line-num="18">18</div><div class="line">}</div>
        </div>

Rust version:

- Comprehension is bipolar
  - In function <span class="inline-code highlight-jc hljs">foo</span> user knows that <span class="inline-code highlight-jc hljs">S</span> is a reference
  - user cannot pass non-reference type to <span class="inline-code highlight-jc hljs">foo</span> thus needs to explicitly borrow it
- User needs to explicitly borrow value, so code becomes noisier
- If a function has to look like it accepts any value (<span class="inline-code highlight-jc hljs">print</span> for example) -- the user needs to write a macro that prepends <span class="inline-code highlight-jc hljs">&amp;</span> for each argument

_Jacy_ version:

- Comprehension is linear: Code readers have to look for function <span class="inline-code highlight-jc hljs">foo</span> to know if it accepts reference, and cannot always see what is going in the code.
- User does not need to always add <span class="inline-code highlight-jc hljs">&amp;</span> to borrow value
- Functions like <span class="inline-code highlight-jc hljs">print</span> can be easily made without troubles with passing non-reference types while borrowing them

At first, I need to say that I like the explicitness of Rust, anyway, I need to explain why I've chosen the implicit version.
When you're writing a code, most of the moves you make are about "working with values" and "passing values to functions which are already implemented" (exaggerated).
When you're implementing a function -- you think about what values it needs to accept and what to with these values.
But when you're implementing a function that uses already implemented one -- you rarely need to think if you're passing your values by reference or by value.

Let me describe what am talking about:

<div class="code-fence line-numbers highlight-jc hljs">
            <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">struct</span> <span class="hljs-title class_">S</span> {</div><div class="line-num" data-line-num="2">2</div><div class="line">    field: <span class="hljs-type">int</span>,</div><div class="line-num" data-line-num="3">3</div><div class="line">}</div><div class="line-num" data-line-num="4">4</div><div class="line"></div><div class="line-num" data-line-num="5">5</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-title function_">byRef</span>(instance: &amp;S) {</div><div class="line-num" data-line-num="6">6</div><div class="line">    <span class="hljs-comment">// Do something with reference</span></div><div class="line-num" data-line-num="7">7</div><div class="line">}</div><div class="line-num" data-line-num="8">8</div><div class="line"></div><div class="line-num" data-line-num="9">9</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-title function_">byVal</span>(instance: S) {</div><div class="line-num" data-line-num="10">10</div><div class="line">    <span class="hljs-comment">// Do something with value</span></div><div class="line-num" data-line-num="11">11</div><div class="line">}</div><div class="line-num" data-line-num="12">12</div><div class="line"></div><div class="line-num" data-line-num="13">13</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-title function_">byMutRef</span>(instance: &amp;<span class="hljs-keyword">mut</span> S) {</div><div class="line-num" data-line-num="14">14</div><div class="line">    <span class="hljs-comment">// Do some mutating stuff</span></div><div class="line-num" data-line-num="15">15</div><div class="line">}</div><div class="line-num" data-line-num="16">16</div><div class="line"></div><div class="line-num" data-line-num="17">17</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-title function_">example1</span> {</div><div class="line-num" data-line-num="18">18</div><div class="line">    <span class="hljs-keyword">let</span> <span class="hljs-variable">s</span> = S {field: <span class="hljs-number">123</span>};</div><div class="line-num" data-line-num="19">19</div><div class="line"></div><div class="line-num" data-line-num="20">20</div><div class="line">    <span class="hljs-title function_ invoke__">byRef</span>(s);</div><div class="line-num" data-line-num="21">21</div><div class="line">    <span class="hljs-title function_ invoke__">byRef</span>(s);</div><div class="line-num" data-line-num="22">22</div><div class="line">    <span class="hljs-title function_ invoke__">byMutRef</span>(s);</div><div class="line-num" data-line-num="23">23</div><div class="line">    <span class="hljs-title function_ invoke__">byRef</span>(s);</div><div class="line-num" data-line-num="24">24</div><div class="line"></div><div class="line-num" data-line-num="25">25</div><div class="line">    <span class="hljs-title function_ invoke__">byVal</span>(s);</div><div class="line-num" data-line-num="26">26</div><div class="line"></div><div class="line-num" data-line-num="27">27</div><div class="line">    <span class="hljs-comment">// Oops... <span class="inline-code highlight-jc hljs">s</span> is moved in call to <span class="inline-code highlight-jc hljs">byVal</span></span></div><div class="line-num" data-line-num="28">28</div><div class="line">    <span class="hljs-comment">// byRef();</span></div><div class="line-num" data-line-num="29">29</div><div class="line">}</div><div class="line-num" data-line-num="30">30</div><div class="line"></div><div class="line-num" data-line-num="31">31</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-title function_">example2</span> {</div><div class="line-num" data-line-num="32">32</div><div class="line">    <span class="hljs-keyword">let</span> <span class="hljs-variable">s</span> = S {field: <span class="hljs-number">123</span>};</div><div class="line-num" data-line-num="33">33</div><div class="line"></div><div class="line-num" data-line-num="34">34</div><div class="line">    <span class="hljs-comment">// </span></div><div class="line-num" data-line-num="35">35</div><div class="line">    <span class="hljs-title function_ invoke__">byRef</span>(s);</div><div class="line-num" data-line-num="36">36</div><div class="line">}</div>
        </div>

What I want to show is that we don't lose the safety as we still have move semantics and borrowing rules. The only change is that now passing by reference is implicit for callee that is, as I think, not bad.

That all sounds good, but...

## PROBLEM

Yes, we don't lose the safety and Rustish semantics of reference passing, anyway, I missed something.
Unlike C++, in Rust (and in _Jacy_) <span class="inline-code highlight-jc hljs">&amp;T</span> has different, more specific, semantics, that is, C++ operates on types and when you pass this type by reference it is not required to be pointer-like (as Rust does). C++ specification does not tell must implementation always use pointers to implement references, that is internal behavior is implementation-relative. This is why C++ does not specify an operator for creating a reference -- you cannot make a reference manually because the compiler could decide not to wrap reference to a pointer.
In _Jacy_, as in Rust, reference is a "pointer with constraint" that are:

- References are always pointers, that is <span class="inline-code highlight-jc hljs">T</span> and <span class="inline-code highlight-jc hljs">&amp;T</span>, and can be thought of as <span class="inline-code highlight-jc hljs">T</span> and <span class="inline-code highlight-jc hljs">ReferenceOf&lt;T&gt;</span>
- Reference always points to valid data
  - It cannot be null
  - It cannot be a dangling pointer
- References are strong - there's nothing like <span class="inline-code highlight-jc hljs">void&amp;</span> respectively to <span class="inline-code highlight-jc hljs">void*</span>

Keeping this in mind some problems arise, like, <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">impl</span> &amp;T</span>.

Example:

<div class="code-fence line-numbers highlight-jc hljs">
            <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">struct</span> <span class="hljs-title class_">S</span> {}</div><div class="line-num" data-line-num="2">2</div><div class="line"></div><div class="line-num" data-line-num="3">3</div><div class="line"><span class="hljs-keyword">impl</span> <span class="hljs-title class_">SomeTrait</span> <span class="hljs-keyword">for</span> <span class="hljs-title class_">S</span> {</div><div class="line-num" data-line-num="4">4</div><div class="line">    <span class="hljs-keyword">func</span> <span class="hljs-title function_">kek</span> {}</div><div class="line-num" data-line-num="5">5</div><div class="line">}</div><div class="line-num" data-line-num="6">6</div><div class="line"></div><div class="line-num" data-line-num="7">7</div><div class="line"><span class="hljs-keyword">impl</span> <span class="hljs-title class_">SomeTrait</span> <span class="hljs-keyword">for</span> &amp;S {</div><div class="line-num" data-line-num="8">8</div><div class="line">    <span class="hljs-keyword">func</span> <span class="hljs-title function_">kek</span> {}</div><div class="line-num" data-line-num="9">9</div><div class="line">}</div><div class="line-num" data-line-num="10">10</div><div class="line"></div><div class="line-num" data-line-num="11">11</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-title function_">foo</span>&lt;T: SomeTrait&gt;(st: T) {</div><div class="line-num" data-line-num="12">12</div><div class="line">    st.<span class="hljs-title function_ invoke__">kek</span>();</div><div class="line-num" data-line-num="13">13</div><div class="line">}</div><div class="line-num" data-line-num="14">14</div><div class="line"></div><div class="line-num" data-line-num="15">15</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-title function_">main</span> {</div><div class="line-num" data-line-num="16">16</div><div class="line">    <span class="hljs-keyword">let</span> <span class="hljs-variable">s</span> = S {};</div><div class="line-num" data-line-num="17">17</div><div class="line"></div><div class="line-num" data-line-num="18">18</div><div class="line">    <span class="hljs-title function_ invoke__">foo</span>(s); <span class="hljs-comment">// ???</span></div><div class="line-num" data-line-num="19">19</div><div class="line">}</div>
        </div>

We passed <span class="inline-code highlight-jc hljs">s</span> to <span class="inline-code highlight-jc hljs">foo</span> which expects something implementing <span class="inline-code highlight-jc hljs">SomeTrait</span>, but <span class="inline-code highlight-jc hljs">SomeTrait</span> is implemented for both <span class="inline-code highlight-jc hljs">S</span> and <span class="inline-code highlight-jc hljs">&amp;S</span>, do we need to implicitly pass <span class="inline-code highlight-jc hljs">s</span> by reference?

I would answer "No", as moving <span class="inline-code highlight-jc hljs">s</span> is nearly what the signature of function <span class="inline-code highlight-jc hljs">foo</span> specifies -- there is no <span class="inline-code highlight-jc hljs">&amp;</span> for type <span class="inline-code highlight-jc hljs">T</span>, it is moved. Thus user needs to explicitly pass by reference.

So, this code will call <span class="inline-code highlight-jc hljs">SomeTrait::<span class="hljs-title function_ invoke__">kek</span>(S)</span> (without <span class="inline-code highlight-jc hljs">&amp;</span>).

User has to explicitly say that he wants to pass by reference (implicit pass does not exclude the existence of Rustish <span class="inline-code highlight-jc hljs">&amp;</span> borrowing operator):

<div class="code-fence line-numbers highlight-jc hljs">
            <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-title function_">main</span> {</div><div class="line-num" data-line-num="2">2</div><div class="line">    <span class="hljs-keyword">let</span> <span class="hljs-variable">s</span> = S {};</div><div class="line-num" data-line-num="3">3</div><div class="line"></div><div class="line-num" data-line-num="4">4</div><div class="line">    <span class="hljs-title function_ invoke__">foo</span>(&amp;s);</div><div class="line-num" data-line-num="5">5</div><div class="line">}</div>
        </div>

Okay, the problem is solved? Actually, no. Let's look at a more difficult example:

<div class="code-fence line-numbers highlight-jc hljs">
            <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">struct</span> <span class="hljs-title class_">S</span> {}</div><div class="line-num" data-line-num="2">2</div><div class="line"></div><div class="line-num" data-line-num="3">3</div><div class="line"><span class="hljs-keyword">impl</span> <span class="hljs-title class_">SomeTrait</span> <span class="hljs-keyword">for</span> &amp;S {</div><div class="line-num" data-line-num="4">4</div><div class="line">    <span class="hljs-keyword">func</span> <span class="hljs-title function_">kek</span> {}</div><div class="line-num" data-line-num="5">5</div><div class="line">}</div><div class="line-num" data-line-num="6">6</div><div class="line"></div><div class="line-num" data-line-num="7">7</div><div class="line"><span class="hljs-keyword">mod</span> <span class="hljs-title class_">module</span> {</div><div class="line-num" data-line-num="8">8</div><div class="line">    <span class="hljs-keyword">impl</span> <span class="hljs-title class_">SomeTrait</span> <span class="hljs-keyword">for</span> <span class="hljs-title class_">S</span> {</div><div class="line-num" data-line-num="9">9</div><div class="line">        <span class="hljs-keyword">func</span> <span class="hljs-title function_">kek</span> {}</div><div class="line-num" data-line-num="10">10</div><div class="line">    }</div><div class="line-num" data-line-num="11">11</div><div class="line"></div><div class="line-num" data-line-num="12">12</div><div class="line">    <span class="hljs-keyword">pub</span> <span class="hljs-keyword">func</span> <span class="hljs-title function_">foo</span>&lt;T: SomeTrait&gt;(s: T) {}</div><div class="line-num" data-line-num="13">13</div><div class="line">}</div><div class="line-num" data-line-num="14">14</div><div class="line"></div><div class="line-num" data-line-num="15">15</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-title function_">main</span> {</div><div class="line-num" data-line-num="16">16</div><div class="line">    <span class="hljs-keyword">let</span> <span class="hljs-variable">s</span> = S {};</div><div class="line-num" data-line-num="17">17</div><div class="line"></div><div class="line-num" data-line-num="18">18</div><div class="line">    module::<span class="hljs-title function_ invoke__">foo</span>(s);</div><div class="line-num" data-line-num="19">19</div><div class="line">}</div>
        </div>

What is <span class="inline-code highlight-jc hljs">T</span> in <span class="inline-code highlight-jc hljs">module::foo</span>? <span class="inline-code highlight-jc hljs">&amp;T</span> or <span class="inline-code highlight-jc hljs">T</span>? The answer is the same as in the example above -- the best fit for this call is <span class="inline-code highlight-jc hljs">T</span> (without reference). Anyway, here, I want to show how difficult-to-read implicit pass-by-reference can be structured.

## CONCLUSION

__STATUS__ - IDEA IS DENIED.

__REVISIONS__ - ALLOWED
<div class="nav-btn-block">
    <button class="nav-btn left">
    <a class="link" href="/Jacy-Dev-Book/particles/organic-jacy.html">< Organic jacy</a>
</button>

    <button class="nav-btn right">
    <a class="link" href="/Jacy-Dev-Book/particles/soft-keywords.html">Soft keywords ></a>
</button>

</div>
