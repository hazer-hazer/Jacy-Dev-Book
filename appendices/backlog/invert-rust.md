---
layout: 'default'
title: 'Invert rust'
nav_order: 101
parent: 'Backlog'
# No children
grand_parent: 'Appendices'
---

# Invert Rust for usability

## This article is deprecated as far as the key concept was invalidly described, there're replacement in ideas/invert-rust which is right

> __Please read this__
> When reading my ideas keep in mind that it is a mind flow but not a RFC. While you read you can how my opinion is
> jumping back and forth, so statements described earlier can conflict with some later.

This idea is really complex and it is hard to predict if it would work.

As far as I want _Jacy_ to be aimed at more high-level than Rust do, I appreciate usability in the way when we save the
most important aspects of Rustish safety and power with a lack of some low-level features.

## Why not Rust-like

What is problematic for me in Rust design (this is not a list of Rust cons, no, these are things I find too
explicit/low-level, etc.).

### Move by default

Rust is "always move" PL, which means that even primitives are moved but copied before. This is a good solution and I
like it more than C++ where we need to write <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">const</span> <span class="hljs-operator">&amp;</span>` <span class="hljs-operator">or</span> `std::<span class="hljs-keyword">move</span></span> always everywhere.

Anyway, most of the time we pass non-Copy types as immutable references, that is, we rarely need to get a reference to
modify its underlying value. Moves, as I think, used more often than <span class="inline-code highlight-jc hljs"><span class="hljs-operator">&amp;</span><span class="hljs-keyword">mut</span></span> but not as often as immutable references.

The solution is to have immutable references by default, that is, we replace "Move or Copy" with "Borrow or Copy". I'll
call this PIR (Pass by Immutable Reference) further.

I want to note that I don't really like the idea of dividing all programming languages to groups like "pass-by-value" or
"pass-by-reference", etc. Because most of the languages mix it, or "pass-by-reference" in case means "make a reference
and pass-by-value", anyway I'll use PIR as it is simple to describe common cases. Just keep in mind that it mostly about
assignment and passing to functions.

Doing so requires "move" to be a first-class operation, it can be a specific operator, e.g. prefix <span class="inline-code highlight-jc hljs"><span class="hljs-operator">^</span></span> to move or just
the <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">move</span></span> keyword.

Example.

<div class="code-fence highlight-jc hljs">
            <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">struct</span> <span class="hljs-title class_">Struct</span> {</div><div class="line-num" data-line-num="2">2</div><div class="line">    field: <span class="hljs-type">i32</span>,</div><div class="line-num" data-line-num="3">3</div><div class="line">}</div><div class="line-num" data-line-num="4">4</div><div class="line"></div><div class="line-num" data-line-num="5">5</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-title function_">printByRef</span>(instance: A) {</div><div class="line-num" data-line-num="6">6</div><div class="line">    <span class="hljs-title function_ invoke__">print</span>(instance<span class="hljs-operator">.</span>field);</div><div class="line-num" data-line-num="7">7</div><div class="line">}</div><div class="line-num" data-line-num="8">8</div><div class="line"></div><div class="line-num" data-line-num="9">9</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-title function_">printMove</span>(<span class="hljs-keyword">move</span> instance: A) {</div><div class="line-num" data-line-num="10">10</div><div class="line">    <span class="hljs-title function_ invoke__">print</span>(instance<span class="hljs-operator">.</span>field);</div><div class="line-num" data-line-num="11">11</div><div class="line">}</div><div class="line-num" data-line-num="12">12</div><div class="line"></div><div class="line-num" data-line-num="13">13</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-title function_">printNum</span>(num: <span class="hljs-type">i32</span>) {</div><div class="line-num" data-line-num="14">14</div><div class="line">    <span class="hljs-title function_ invoke__">print</span>(num);</div><div class="line-num" data-line-num="15">15</div><div class="line">}</div><div class="line-num" data-line-num="16">16</div><div class="line"></div><div class="line-num" data-line-num="17">17</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-title function_">changeNum</span>(<span class="hljs-keyword">ref</span> num: <span class="hljs-type">i32</span>) {</div><div class="line-num" data-line-num="18">18</div><div class="line">    num <span class="hljs-operator">=</span> <span class="hljs-number">0</span>;</div><div class="line-num" data-line-num="19">19</div><div class="line">}</div><div class="line-num" data-line-num="20">20</div><div class="line"></div><div class="line-num" data-line-num="21">21</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-title function_">main</span> {</div><div class="line-num" data-line-num="22">22</div><div class="line">    <span class="hljs-keyword">let</span> <span class="hljs-variable">instance</span> <span class="hljs-operator">=</span> Struct {field: <span class="hljs-number">666</span>};</div><div class="line-num" data-line-num="23">23</div><div class="line"></div><div class="line-num" data-line-num="24">24</div><div class="line">    <span class="hljs-title function_ invoke__">printByRef</span>(instance); <span class="hljs-comment">// <span class="inline-code highlight-jc hljs">instance` is <span class="hljs-operator">not</span> moved here like <span class="hljs-keyword">in</span> Rust<span class="hljs-operator">&lt;</span><span class="hljs-operator">/</span>span<span class="hljs-operator">&gt;</span><span class="hljs-operator">&lt;</span><span class="hljs-operator">/</span>div<span class="hljs-operator">&gt;</span><span class="hljs-operator">&lt;</span>div class<span class="hljs-operator">=</span><span class="hljs-string">&quot;line-num&quot;</span> data<span class="hljs-operator">-</span>line<span class="hljs-operator">-</span>num<span class="hljs-operator">=</span><span class="hljs-string">&quot;25&quot;</span><span class="hljs-operator">&gt;</span><span class="hljs-number">25</span><span class="hljs-operator">&lt;</span><span class="hljs-operator">/</span>div<span class="hljs-operator">&gt;</span><span class="hljs-operator">&lt;</span>div class<span class="hljs-operator">=</span><span class="hljs-string">&quot;line&quot;</span><span class="hljs-operator">&gt;</span>    <span class="hljs-operator">&lt;</span>span class<span class="hljs-operator">=</span><span class="hljs-string">&quot;hljs-title function_ invoke__&quot;</span><span class="hljs-operator">&gt;</span>printByRef<span class="hljs-operator">&lt;</span><span class="hljs-operator">/</span>span<span class="hljs-operator">&gt;</span>(instance); <span class="hljs-operator">&lt;</span>span class<span class="hljs-operator">=</span><span class="hljs-string">&quot;hljs-comment&quot;</span><span class="hljs-operator">&gt;</span><span class="hljs-comment">// `instance` here and before is passed by reference&lt;/span&gt;&lt;/div&gt;&lt;div class=&quot;line-num&quot; data-line-num=&quot;26&quot;&gt;26&lt;/div&gt;&lt;div class=&quot;line&quot;&gt;&lt;/div&gt;&lt;div class=&quot;line-num&quot; data-line-num=&quot;27&quot;&gt;27&lt;/div&gt;&lt;div class=&quot;line&quot;&gt;    &lt;span class=&quot;hljs-title function_ invoke__&quot;&gt;printMove&lt;/span&gt;(&lt;span class=&quot;hljs-keyword&quot;&gt;move&lt;/span&gt; instance); &lt;span class=&quot;hljs-comment&quot;&gt;// `move` is explicit&lt;/span&gt;&lt;/div&gt;&lt;div class=&quot;line-num&quot; data-line-num=&quot;28&quot;&gt;28&lt;/div&gt;&lt;div class=&quot;line&quot;&gt;    &lt;span class=&quot;hljs-comment&quot;&gt;// printMove(move instance); // Error: `instance` is moved&lt;/span&gt;&lt;/div&gt;&lt;div class=&quot;line-num&quot; data-line-num=&quot;29&quot;&gt;29&lt;/div&gt;&lt;div class=&quot;line&quot;&gt;    &lt;span class=&quot;hljs-comment&quot;&gt;// printByRef(instance); // Same error: `instance` is moved&lt;/span&gt;&lt;/div&gt;&lt;div class=&quot;line-num&quot; data-line-num=&quot;30&quot;&gt;30&lt;/div&gt;&lt;div class=&quot;line&quot;&gt;&lt;/div&gt;&lt;div class=&quot;line-num&quot; data-line-num=&quot;31&quot;&gt;31&lt;/div&gt;&lt;div class=&quot;line&quot;&gt;    &lt;span class=&quot;hljs-keyword&quot;&gt;let&lt;/span&gt; &lt;span class=&quot;hljs-variable&quot;&gt;num&lt;/span&gt; &lt;span class=&quot;hljs-operator&quot;&gt;=&lt;/span&gt; &lt;span class=&quot;hljs-number&quot;&gt;1000&lt;/span&gt;;&lt;/div&gt;&lt;div class=&quot;line-num&quot; data-line-num=&quot;32&quot;&gt;32&lt;/div&gt;&lt;div class=&quot;line&quot;&gt;&lt;/div&gt;&lt;div class=&quot;line-num&quot; data-line-num=&quot;33&quot;&gt;33&lt;/div&gt;&lt;div class=&quot;line&quot;&gt;    &lt;span class=&quot;hljs-title function_ invoke__&quot;&gt;printNum&lt;/span&gt;(num);&lt;/div&gt;&lt;div class=&quot;line-num&quot; data-line-num=&quot;34&quot;&gt;34&lt;/div&gt;&lt;div class=&quot;line&quot;&gt;    &lt;span class=&quot;hljs-title function_ invoke__&quot;&gt;printNum&lt;/span&gt;(num); &lt;span class=&quot;hljs-comment&quot;&gt;// Everything is find -- `i32` is a Copy-type&lt;/span&gt;&lt;/div&gt;&lt;div class=&quot;line-num&quot; data-line-num=&quot;35&quot;&gt;35&lt;/div&gt;&lt;div class=&quot;line&quot;&gt;&lt;/div&gt;&lt;div class=&quot;line-num&quot; data-line-num=&quot;36&quot;&gt;36&lt;/div&gt;&lt;div class=&quot;line&quot;&gt;    &lt;span class=&quot;hljs-keyword&quot;&gt;let&lt;/span&gt; &lt;span class=&quot;hljs-keyword&quot;&gt;mut &lt;/span&gt;&lt;span class=&quot;hljs-variable&quot;&gt;var&lt;/span&gt; &lt;span class=&quot;hljs-operator&quot;&gt;=&lt;/span&gt; &lt;span class=&quot;hljs-number&quot;&gt;0xB16B00B5&lt;/span&gt;;&lt;/div&gt;&lt;div class=&quot;line-num&quot; data-line-num=&quot;37&quot;&gt;37&lt;/div&gt;&lt;div class=&quot;line&quot;&gt;&lt;/div&gt;&lt;div class=&quot;line-num&quot; data-line-num=&quot;38&quot;&gt;38&lt;/div&gt;&lt;div class=&quot;line&quot;&gt;    &lt;span class=&quot;hljs-title function_ invoke__&quot;&gt;print&lt;/span&gt;(var); &lt;span class=&quot;hljs-comment&quot;&gt;// Prints 2976579765&lt;/span&gt;&lt;/div&gt;&lt;div class=&quot;line-num&quot; data-line-num=&quot;39&quot;&gt;39&lt;/div&gt;&lt;div class=&quot;line&quot;&gt;    &lt;span class=&quot;hljs-title function_ invoke__&quot;&gt;changeNum&lt;/span&gt;(var);&lt;/div&gt;&lt;div class=&quot;line-num&quot; data-line-num=&quot;40&quot;&gt;40&lt;/div&gt;&lt;div class=&quot;line&quot;&gt;    &lt;span class=&quot;hljs-title function_ invoke__&quot;&gt;print&lt;/span&gt;(var); &lt;span class=&quot;hljs-comment&quot;&gt;// Prints 0&lt;/span&gt;&lt;/div&gt;&lt;div class=&quot;line-num&quot; data-line-num=&quot;41&quot;&gt;41&lt;/div&gt;&lt;div class=&quot;line&quot;&gt;    &lt;/div&gt;&lt;div class=&quot;line-num&quot; data-line-num=&quot;42&quot;&gt;42&lt;/div&gt;&lt;div class=&quot;line&quot;&gt;&lt;/div&gt;&lt;div class=&quot;line-num&quot; data-line-num=&quot;43&quot;&gt;43&lt;/div&gt;&lt;div class=&quot;line&quot;&gt;    &lt;span class=&quot;hljs-keyword&quot;&gt;let&lt;/span&gt; &lt;span class=&quot;hljs-keyword&quot;&gt;mut &lt;/span&gt;&lt;span class=&quot;hljs-variable&quot;&gt;a&lt;/span&gt; &lt;span class=&quot;hljs-operator&quot;&gt;=&lt;/span&gt; Struct {field: &lt;span class=&quot;hljs-number&quot;&gt;100&lt;/span&gt;};&lt;/div&gt;&lt;div class=&quot;line-num&quot; data-line-num=&quot;44&quot;&gt;44&lt;/div&gt;&lt;div class=&quot;line&quot;&gt;    &lt;/div&gt;&lt;div class=&quot;line-num&quot; data-line-num=&quot;45&quot;&gt;45&lt;/div&gt;&lt;div class=&quot;line&quot;&gt;    &lt;span class=&quot;hljs-keyword&quot;&gt;let&lt;/span&gt; &lt;span class=&quot;hljs-keyword&quot;&gt;mut &lt;/span&gt;&lt;span class=&quot;hljs-variable&quot;&gt;r0&lt;/span&gt; &lt;span class=&quot;hljs-operator&quot;&gt;=&lt;/span&gt; a;&lt;/div&gt;&lt;div class=&quot;line-num&quot; data-line-num=&quot;46&quot;&gt;46&lt;/div&gt;&lt;div class=&quot;line&quot;&gt;    &lt;span class=&quot;hljs-keyword&quot;&gt;let&lt;/span&gt; &lt;span class=&quot;hljs-keyword&quot;&gt;mut &lt;/span&gt;&lt;span class=&quot;hljs-variable&quot;&gt;r1&lt;/span&gt; &lt;span class=&quot;hljs-operator&quot;&gt;=&lt;/span&gt; a; &lt;span class=&quot;hljs-comment&quot;&gt;// Error: Cannot borrow `a</span></span> as mutable more than once</span></div><div class="line-num" data-line-num="47">47</div><div class="line">}</div>
        </div>

Rust revolves around an idea of owning, as *Jacy* does, thus being hardly inspired by Rust we can consider "making a
reference" not being a "usage". What this means is just all about how we see the language to take a place in world of
type theory, saying that we've got affine type, that is, value must be used one or no times, we can say that some cases
are not under these rules. That's what Rust does -- making reference to some value, we do not use the value just
immutably borrowing it. Considering this, our hands are clean 😃. Anyway, affine types in Rust give us some cleaner code
than PIR, as we make references implicitly, thus it opens a vista to do break linearity of program.

### The problems I see

I think it is actually impossible to replace Rustish "move by default" with "ref by default" and break everything. The
only problems that come up from this solution appear from the view of semantics.

#### Copy-Types borrowing

Having PIR we cannot get rid of references in semantics, as far as we don't borrow Copy-types and so need a way to pass
them by reference. E.g. we have a variable storing <span class="inline-code highlight-jc hljs"><span class="hljs-type">i32</span></span>, that is, it won't be passed as PIR, and if we need to have a
function modifying <span class="inline-code highlight-jc hljs"><span class="hljs-type">i32</span></span> we need to explicitly pass it by reference.

Thus let's imagine we have <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">ref</span></span> keyword which is used in both function signature and passing to function.

#### Lack of explicitness

E.g. in Rust when we want to slice an array, we write <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">let</span> <span class="hljs-variable">slice</span> <span class="hljs-operator">=</span> <span class="hljs-operator">&amp;</span>array[from<span class="hljs-operator">..</span>to]</span>, 'cause the size of the slice is
not known at compile-time, so we cannot allocate it on the stack. In PIR it would be <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">let</span> <span class="hljs-variable">slice</span> <span class="hljs-operator">=</span> array[from<span class="hljs-operator">..</span>to]</span>, as
far as the slice is not a Copy-Type (same in Rust). That's just an example of what we hide with PIR but not a problem.

#### Actual types

If we consider that a type which is not a Copy-Type and passed without any qualifiers -- it is a reference to type, then
this is a reference type. So, let's assume we have some intrinsic method to get type of an expression as string, what
will it print for function that accepts <span class="inline-code highlight-jc hljs">Struct {field: <span class="hljs-number">1234</span>}`? <span class="hljs-operator">-</span><span class="hljs-operator">-</span> `Struct` <span class="hljs-operator">or</span> `<span class="hljs-operator">&amp;</span>Struct</span>.

As far as we don't remove references at all (they are still required to be in the language) -- the type is... 🥁🥁🥁
<span class="inline-code highlight-jc hljs"><span class="hljs-operator">&amp;</span>Struct`<span class="hljs-operator">.</span> Yeah, user have written `Struct</span> but that's not the truth as all non-copy-types are passed by reference. And
as far as we anyway separate concepts of references and values, we need it to be a reference.

#### Generics (!important)

This is really interesting problem to solve. As we do not have GC we cannot rely on the fact that everything will be
cleared as we put <span class="inline-code highlight-jc hljs">free` at CT<span class="hljs-operator">.</span> The problem is <span class="hljs-operator">not</span> that `<span class="hljs-type">Vec</span><span class="hljs-operator">&lt;</span>Struct<span class="hljs-operator">&gt;</span>` is `<span class="hljs-operator">&amp;</span><span class="hljs-type">Vec</span><span class="hljs-operator">&lt;</span>Struct<span class="hljs-operator">&gt;</span></span>... No, the problem is that is it
<span class="inline-code highlight-jc hljs"><span class="hljs-operator">&amp;</span><span class="hljs-type">Vec</span><span class="hljs-operator">&lt;</span>Struct<span class="hljs-operator">&gt;</span>` <span class="hljs-operator">or</span> `<span class="hljs-operator">&amp;</span><span class="hljs-type">Vec</span><span class="hljs-operator">&lt;</span><span class="hljs-operator">&amp;</span>Struct<span class="hljs-operator">&gt;</span>`?! Rapidly answering this question I would say, it is a `<span class="hljs-operator">&amp;</span><span class="hljs-type">Vec</span><span class="hljs-operator">&lt;</span>Struct<span class="hljs-operator">&gt;</span></span>, because having
<span class="inline-code highlight-jc hljs"><span class="hljs-operator">&amp;</span><span class="hljs-type">Vec</span><span class="hljs-operator">&lt;</span><span class="hljs-operator">&amp;</span>Struct<span class="hljs-operator">&gt;</span>` we will require user to always have all `Struct`s alive <span class="hljs-keyword">as</span> long <span class="hljs-keyword">as</span> `<span class="hljs-type">Vec</span></span> is used, as far as it contains
references.

From the problem of generics I deduce maybe the most important rule about PIR:
> **PIR means prepending passed non-copy type with reference, but not that all types are reference-types by default**

Considering this, everything becomes more clear and I hope that I don't miss anything. 😐

#### How do I actually pass-by-value? (!important)

Same as generics this one is really complex question too. Keep in mind that we aren't talking about "How to
pass-by-value could be implemented" from view of code generation -- this is an answered question. The problem is in the
semantics and syntax. What am I talking about is that removing explicit reference types mostly everywhere we get lack of
opportunity to qualify value type. Further I'm gonna describe a list of all rules about PIR, so here won't be
comprehensive solution as it would be more understandable as if we just look at specific rules. Anyway, here it is.

<div class="code-fence highlight-jc hljs">
            <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-comment">// <span class="inline-code highlight-jc hljs">Kitty</span> is a structure declared somewhere</span></div><div class="line-num" data-line-num="2">2</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-title function_">foo</span>(kitty: Kitty) {</div><div class="line-num" data-line-num="3">3</div><div class="line">    <span class="hljs-title function_ invoke__">print</span>(kitty<span class="hljs-operator">.</span>msg);</div><div class="line-num" data-line-num="4">4</div><div class="line">}</div><div class="line-num" data-line-num="5">5</div><div class="line"></div><div class="line-num" data-line-num="6">6</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-title function_">main</span> {</div><div class="line-num" data-line-num="7">7</div><div class="line">    <span class="hljs-keyword">let</span> <span class="hljs-variable">kitty</span> <span class="hljs-operator">=</span> Kitty {msg: <span class="hljs-string">&quot;Meow, bitch&quot;</span>};</div><div class="line-num" data-line-num="8">8</div><div class="line">    <span class="hljs-title function_ invoke__">foo</span>(kitty);</div><div class="line-num" data-line-num="9">9</div><div class="line">}</div>
        </div>

Here I meant to copy <span class="inline-code highlight-jc hljs">kitty`, but because of PIR `kitty</span> is passed by reference. STOP, it is C++ and not Rust, we don't
copy by default, and we don't move by default. So... How do I make it creating a copy of <span class="inline-code highlight-jc hljs">kitty</span>?

- Overload <span class="inline-code highlight-jc hljs">Copy</span> trait?
- Overload <span class="inline-code highlight-jc hljs">Clone</span> trait? Both.
- <span class="inline-code highlight-jc hljs">Copy` <span class="hljs-operator">-</span> When <span class="hljs-keyword">type</span> <span class="hljs-title class_">overloads</span> `Copy</span> trait, it is always (forget about optimizations) copied, thus no reference
  created.
- <span class="inline-code highlight-jc hljs">Clone` <span class="hljs-operator">-</span> When <span class="hljs-keyword">type</span> <span class="hljs-title class_">overloads</span> `Clone</span> trait, it is passed by reference!

The rule about <span class="inline-code highlight-jc hljs">Clone</span> sounds right as we don't actually modify the source and we just make a copy explicitly. There's
still a problem -- why do we need a reference as we cloned source, we'll just add additional work for run-time which is
not actually required?

#### <span class="inline-code highlight-jc hljs">Clone</span> trait (!important)

<span class="inline-code highlight-jc hljs">Clone</span> trait in *Jacy* as in Rust is used to provide explicit way to copy source object.

Let's look at an example similar to one above.

<div class="code-fence highlight-jc hljs">
            <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-comment">// Assume somewhere exists the <span class="inline-code highlight-jc hljs">Kitty` <span class="hljs-keyword">type</span> <span class="hljs-title class_">and</span> it implements the `Clone</span> trait</span></div><div class="line-num" data-line-num="2">2</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-title function_">foo</span>(kitty: Kitty) {</div><div class="line-num" data-line-num="3">3</div><div class="line">    <span class="hljs-title function_ invoke__">print</span>(kitty<span class="hljs-operator">.</span>msg);</div><div class="line-num" data-line-num="4">4</div><div class="line">}</div><div class="line-num" data-line-num="5">5</div><div class="line"></div><div class="line-num" data-line-num="6">6</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-title function_">main</span> {</div><div class="line-num" data-line-num="7">7</div><div class="line">    <span class="hljs-keyword">let</span> <span class="hljs-variable">kitty</span> <span class="hljs-operator">=</span> Kitty {msg: <span class="hljs-string">&quot;Meow, bitch&quot;</span>};</div><div class="line-num" data-line-num="8">8</div><div class="line">    <span class="hljs-title function_ invoke__">foo</span>(kitty<span class="hljs-operator">.</span><span class="hljs-title function_ invoke__">clone</span>());</div><div class="line-num" data-line-num="9">9</div><div class="line">}</div>
        </div>

We made a clone, but is there any reason to pass it by reference? It is a rhetorical question, and the answer is NO, and
it forces me to describe implicit-move rules. In C++, it is common to optimize some copy cases to move, e.g., when we
return a local variable, it is moved -- it is called copy/move elision. In *Jacy* these cases are wider as we need not
only to handle copies but also references.

#### Patterns

<span class="inline-code highlight-jc hljs"><span class="hljs-keyword">let</span>` bindings <span class="hljs-operator">and</span> `<span class="hljs-keyword">func</span>` parameters are patterns, also there<span class="hljs-symbol">&#x27;re</span> `<span class="hljs-keyword">if</span> <span class="hljs-keyword">let</span>` <span class="hljs-operator">and</span> `<span class="hljs-keyword">match</span></span>. Do patterns need to be PIR or
not? -- Actually, they MUST.

Let's assume we've got.

<div class="code-fence highlight-jc hljs">
            <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">struct</span> <span class="hljs-title class_">StructType</span> {</div><div class="line-num" data-line-num="2">2</div><div class="line">    field: <span class="hljs-type">Vec</span><span class="hljs-operator">&lt;</span><span class="hljs-type">i32</span><span class="hljs-operator">&gt;</span>,</div><div class="line-num" data-line-num="3">3</div><div class="line">}</div>
        </div>

Note that <span class="inline-code highlight-jc hljs">StructType<span class="hljs-operator">.</span>field` is <span class="hljs-operator">not</span> of <span class="hljs-keyword">type</span> `<span class="hljs-operator">&amp;</span><span class="hljs-type">Vec</span><span class="hljs-operator">&lt;</span><span class="hljs-type">i32</span><span class="hljs-operator">&gt;</span></span>, it is non-reference, because PIR is only about passing values.

<div class="code-fence highlight-jc hljs">
            <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">let</span> <span class="hljs-variable">a</span>: StructType <span class="hljs-operator">=</span> structInstance; <span class="hljs-comment">// <span class="inline-code highlight-jc hljs">structInstance</span> is non-copy type</span></div><div class="line-num" data-line-num="2">2</div><div class="line"></div><div class="line-num" data-line-num="3">3</div><div class="line"><span class="hljs-comment">// Desugared to</span></div><div class="line-num" data-line-num="4">4</div><div class="line"><span class="hljs-keyword">let</span> <span class="hljs-variable">a</span>: <span class="hljs-operator">&amp;</span>StructType <span class="hljs-operator">=</span> <span class="hljs-operator">&amp;</span>structInstance;</div><div class="line-num" data-line-num="5">5</div><div class="line"><span class="hljs-comment">// or</span></div><div class="line-num" data-line-num="6">6</div><div class="line"><span class="hljs-keyword">let</span> <span class="hljs-variable">ref</span> a: <span class="hljs-operator">&amp;</span>StructType <span class="hljs-operator">=</span> structInstance;</div>
        </div>

<div class="code-fence highlight-jc hljs">
            <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-title function_">foo</span>(param: StructType);</div><div class="line-num" data-line-num="2">2</div><div class="line"><span class="hljs-title function_ invoke__">foo</span>(structInstance);</div><div class="line-num" data-line-num="3">3</div><div class="line"></div><div class="line-num" data-line-num="4">4</div><div class="line"><span class="hljs-comment">// Desugared to</span></div><div class="line-num" data-line-num="5">5</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-title function_">foo</span>(param: <span class="hljs-operator">&amp;</span>StructType);</div><div class="line-num" data-line-num="6">6</div><div class="line"><span class="hljs-title function_ invoke__">foo</span>(<span class="hljs-operator">&amp;</span>structInstance);</div>
        </div>

<div class="code-fence highlight-jc hljs">
            <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">match</span> a {</div><div class="line-num" data-line-num="2">2</div><div class="line">    StructType {field} <span class="hljs-operator">=</span><span class="hljs-operator">&gt;</span> <span class="hljs-comment">// ...</span></div><div class="line-num" data-line-num="3">3</div><div class="line">}</div><div class="line-num" data-line-num="4">4</div><div class="line"></div><div class="line-num" data-line-num="5">5</div><div class="line"><span class="hljs-comment">// Desugared to</span></div><div class="line-num" data-line-num="6">6</div><div class="line"><span class="hljs-keyword">match</span> <span class="hljs-operator">&amp;</span>a {</div><div class="line-num" data-line-num="7">7</div><div class="line">    StructType {<span class="hljs-keyword">ref</span> field} <span class="hljs-operator">=</span><span class="hljs-operator">&gt;</span> <span class="hljs-comment">// ...</span></div><div class="line-num" data-line-num="8">8</div><div class="line">}</div>
        </div>

### Examples

#### "Passes"

##### Assignment

<span class="inline-code highlight-jc hljs">a <span class="hljs-operator">=</span> b` <span class="hljs-keyword">in</span> Rust is `a <span class="hljs-operator">=</span> <span class="hljs-keyword">move</span> b` but with PIR it will become `a <span class="hljs-operator">=</span> <span class="hljs-operator">&amp;</span>b`, <span class="hljs-keyword">if</span> `b</span> is another variable of non-copy type.

Let's look at examples to grasp when variable is automatically becomes a reference and where not.

<div class="code-fence highlight-jc hljs">
            <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">let</span> <span class="hljs-variable">a</span> <span class="hljs-operator">=</span> StructType {field: Vec::<span class="hljs-title function_ invoke__">new</span>()};</div><div class="line-num" data-line-num="2">2</div><div class="line"><span class="hljs-keyword">let</span> <span class="hljs-variable">b</span> <span class="hljs-operator">=</span> a;</div>
        </div>

Here, <span class="inline-code highlight-jc hljs">a` is of <span class="hljs-keyword">type</span> `StructType` because of <span class="hljs-keyword">move</span> elision, but `b` would be `<span class="hljs-operator">&amp;</span>StructType</span> as it is automatically
borrowed.

##### Functions

When we create a function like <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">func</span> <span class="hljs-title function_">foo</span>(param: <span class="hljs-type">String</span>)`, `param` is of <span class="hljs-keyword">type</span> `<span class="hljs-operator">&amp;</span><span class="hljs-type">String</span></span>. To make it mutable type must be
prepended with <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">mut</span>`, so it gonna look like `<span class="hljs-keyword">mut</span> <span class="hljs-type">String</span>` which is actually a `<span class="hljs-operator">&amp;</span><span class="hljs-keyword">mut</span> <span class="hljs-type">String</span></span>.

Copy-types (e.g. <span class="inline-code highlight-jc hljs"><span class="hljs-type">i32</span></span>) passed by copy, that is, they are passed by value and copied. So, if we want to change the value
of some variable containing copy type we would write <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">func</span> <span class="hljs-title function_">foo</span>(param: <span class="hljs-keyword">ref</span> <span class="hljs-keyword">mut</span> <span class="hljs-type">i32</span>)</span> and must be explicitly passed with
<span class="inline-code highlight-jc hljs"><span class="hljs-keyword">ref</span> <span class="hljs-keyword">mut</span></span> prefix.

### Rules

Finally, after reviewing some cases, I'd like to reduce them to the list of rules.

#### 1. If non-copy type passed to function or assigned, it is borrowed

Examples.

<div class="code-fence highlight-jc hljs">
            <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-title function_">foo</span>(name: <span class="hljs-type">String</span>) {</div><div class="line-num" data-line-num="2">2</div><div class="line">    <span class="hljs-title function_ invoke__">print</span>(<span class="hljs-string">&quot;My name is $name&quot;</span>);</div><div class="line-num" data-line-num="3">3</div><div class="line">}</div><div class="line-num" data-line-num="4">4</div><div class="line"></div><div class="line-num" data-line-num="5">5</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-title function_">main</span> {</div><div class="line-num" data-line-num="6">6</div><div class="line">    <span class="hljs-keyword">let</span> <span class="hljs-variable">savedName</span> <span class="hljs-operator">=</span> String::<span class="hljs-title function_ invoke__">from</span>(<span class="hljs-string">&quot;Mr. Doctor&quot;</span>);</div><div class="line-num" data-line-num="7">7</div><div class="line">    <span class="hljs-keyword">let</span> <span class="hljs-variable">name</span> <span class="hljs-operator">=</span> savedName; <span class="hljs-comment">// <span class="inline-code highlight-jc hljs">savedName` is <span class="hljs-operator">not</span> either copied <span class="hljs-operator">or</span> moved <span class="hljs-operator">-</span><span class="hljs-operator">-</span> `name` is an immutable reference to `savedName`<span class="hljs-operator">&lt;</span><span class="hljs-operator">/</span>span<span class="hljs-operator">&gt;</span><span class="hljs-operator">&lt;</span><span class="hljs-operator">/</span>div<span class="hljs-operator">&gt;</span><span class="hljs-operator">&lt;</span>div class<span class="hljs-operator">=</span><span class="hljs-string">&quot;line-num&quot;</span> data<span class="hljs-operator">-</span>line<span class="hljs-operator">-</span>num<span class="hljs-operator">=</span><span class="hljs-string">&quot;8&quot;</span><span class="hljs-operator">&gt;</span><span class="hljs-number">8</span><span class="hljs-operator">&lt;</span><span class="hljs-operator">/</span>div<span class="hljs-operator">&gt;</span><span class="hljs-operator">&lt;</span>div class<span class="hljs-operator">=</span><span class="hljs-string">&quot;line&quot;</span><span class="hljs-operator">&gt;</span>    <span class="hljs-operator">&lt;</span>span class<span class="hljs-operator">=</span><span class="hljs-string">&quot;hljs-title function_ invoke__&quot;</span><span class="hljs-operator">&gt;</span>foo<span class="hljs-operator">&lt;</span><span class="hljs-operator">/</span>span<span class="hljs-operator">&gt;</span>(name); <span class="hljs-operator">&lt;</span>span class<span class="hljs-operator">=</span><span class="hljs-string">&quot;hljs-comment&quot;</span><span class="hljs-operator">&gt;</span><span class="hljs-comment">// `name</span></span> is not moved -- it is passed by immutable reference</span></div><div class="line-num" data-line-num="9">9</div><div class="line">}</div>
        </div>

#### 2. Moves are explicit in signatures and in calls

Example.

<div class="code-fence highlight-jc hljs">
            <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-title function_">foo</span>(<span class="hljs-keyword">move</span> name: <span class="hljs-type">String</span>) {</div><div class="line-num" data-line-num="2">2</div><div class="line">    <span class="hljs-title function_ invoke__">print</span>(<span class="hljs-string">&quot;My name is $name&quot;</span>);</div><div class="line-num" data-line-num="3">3</div><div class="line">}</div><div class="line-num" data-line-num="4">4</div><div class="line"></div><div class="line-num" data-line-num="5">5</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-title function_">main</span> {</div><div class="line-num" data-line-num="6">6</div><div class="line">    <span class="hljs-keyword">let</span> <span class="hljs-variable">name</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;Brendan Eich&quot;</span>;</div><div class="line-num" data-line-num="7">7</div><div class="line">    <span class="hljs-title function_ invoke__">foo</span>(<span class="hljs-keyword">move</span> name); <span class="hljs-comment">// <span class="inline-code highlight-jc hljs">name</span> must be moved explicitly</span></div><div class="line-num" data-line-num="8">8</div><div class="line">}</div>
        </div>

#### 3. Data, stored in structures must be explicitly qualified as reference

Example.

<div class="code-fence highlight-jc hljs">
            <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">struct</span> <span class="hljs-title class_">Data</span> {</div><div class="line-num" data-line-num="2">2</div><div class="line">    inner: <span class="hljs-type">Vec</span><span class="hljs-operator">&lt;</span><span class="hljs-type">i32</span><span class="hljs-operator">&gt;</span></div><div class="line-num" data-line-num="3">3</div><div class="line">}</div><div class="line-num" data-line-num="4">4</div><div class="line"></div><div class="line-num" data-line-num="5">5</div><div class="line"><span class="hljs-keyword">struct</span> <span class="hljs-title class_">Struct</span> {</div><div class="line-num" data-line-num="6">6</div><div class="line">    data: <span class="hljs-operator">&amp;</span>Data,</div><div class="line-num" data-line-num="7">7</div><div class="line">}</div><div class="line-num" data-line-num="8">8</div><div class="line"></div><div class="line-num" data-line-num="9">9</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-title function_">main</span> {</div><div class="line-num" data-line-num="10">10</div><div class="line">    <span class="hljs-keyword">let</span> <span class="hljs-variable">data</span> <span class="hljs-operator">=</span> Data {inner: Vec::<span class="hljs-title function_ invoke__">from</span>([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>])};</div><div class="line-num" data-line-num="11">11</div><div class="line">    <span class="hljs-keyword">let</span> <span class="hljs-variable">s</span> <span class="hljs-operator">=</span> Struct {data: <span class="hljs-operator">&amp;</span>data};</div><div class="line-num" data-line-num="12">12</div><div class="line"></div><div class="line-num" data-line-num="13">13</div><div class="line">    <span class="hljs-comment">// let s2 = Struct {data: data} // Error: expected <span class="inline-code highlight-jc hljs"><span class="hljs-operator">&amp;</span>amp;Data` <span class="hljs-keyword">type</span> <span class="hljs-title class_">for</span> `data</span></span></div><div class="line-num" data-line-num="14">14</div><div class="line">}</div>
        </div>

Actually, this is just an example where we omit usage of lifetimes. No-lifetimes solutions gonna be researched in
further ideas.
<div class="nav-btn-block">
    <button class="nav-btn left">
    <a class="link" href="/Jacy-Dev-Book/appendices/backlog/invert-rust-v2.html">< Invert rust v2</a>
</button>

    
</div>
