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
like it more than C++ where we need to write `const &` or `std::move` always everywhere.

Anyway, most of the time we pass non-Copy types as immutable references, that is, we rarely need to get a reference to
modify its underlying value. Moves, as I think, used more often than `&mut` but not as often as immutable references.

The solution is to have immutable references by default, that is, we replace "Move or Copy" with "Borrow or Copy". I'll
call this PIR (Pass by Immutable Reference) further.

I want to note that I don't really like the idea of dividing all programming languages to groups like "pass-by-value" or
"pass-by-reference", etc. Because most of the languages mix it, or "pass-by-reference" in case means "make a reference
and pass-by-value", anyway I'll use PIR as it is simple to describe common cases. Just keep in mind that it mostly about
assignment and passing to functions.

Doing so requires "move" to be a first-class operation, it can be a specific operator, e.g. prefix `^` to move or just
the `move` keyword.

Example.

<div class="code-fence highlight-jc hljs">
            <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">struct</span> <span class="hljs-title class_">Struct</span> {</div><div class="line-num" data-line-num="2">2</div><div class="line">    field: <span class="hljs-type">i32</span>,</div><div class="line-num" data-line-num="3">3</div><div class="line">}</div><div class="line-num" data-line-num="4">4</div><div class="line"></div><div class="line-num" data-line-num="5">5</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-title function_">printByRef</span>(instance: A) {</div><div class="line-num" data-line-num="6">6</div><div class="line">    <span class="hljs-title function_ invoke__">print</span>(instance.field);</div><div class="line-num" data-line-num="7">7</div><div class="line">}</div><div class="line-num" data-line-num="8">8</div><div class="line"></div><div class="line-num" data-line-num="9">9</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-title function_">printMove</span>(<span class="hljs-keyword">move</span> instance: A) {</div><div class="line-num" data-line-num="10">10</div><div class="line">    <span class="hljs-title function_ invoke__">print</span>(instance.field);</div><div class="line-num" data-line-num="11">11</div><div class="line">}</div><div class="line-num" data-line-num="12">12</div><div class="line"></div><div class="line-num" data-line-num="13">13</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-title function_">printNum</span>(num: <span class="hljs-type">i32</span>) {</div><div class="line-num" data-line-num="14">14</div><div class="line">    <span class="hljs-title function_ invoke__">print</span>(num);</div><div class="line-num" data-line-num="15">15</div><div class="line">}</div><div class="line-num" data-line-num="16">16</div><div class="line"></div><div class="line-num" data-line-num="17">17</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-title function_">changeNum</span>(<span class="hljs-keyword">ref</span> num: <span class="hljs-type">i32</span>) {</div><div class="line-num" data-line-num="18">18</div><div class="line">    num = <span class="hljs-number">0</span>;</div><div class="line-num" data-line-num="19">19</div><div class="line">}</div><div class="line-num" data-line-num="20">20</div><div class="line"></div><div class="line-num" data-line-num="21">21</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-title function_">main</span> {</div><div class="line-num" data-line-num="22">22</div><div class="line">    <span class="hljs-keyword">let</span> <span class="hljs-variable">instance</span> = Struct {field: <span class="hljs-number">666</span>};</div><div class="line-num" data-line-num="23">23</div><div class="line"></div><div class="line-num" data-line-num="24">24</div><div class="line">    <span class="hljs-title function_ invoke__">printByRef</span>(instance); <span class="hljs-comment">// `instance` is not moved here like in Rust</span></div><div class="line-num" data-line-num="25">25</div><div class="line">    <span class="hljs-title function_ invoke__">printByRef</span>(instance); <span class="hljs-comment">// `instance` here and before is passed by reference</span></div><div class="line-num" data-line-num="26">26</div><div class="line"></div><div class="line-num" data-line-num="27">27</div><div class="line">    <span class="hljs-title function_ invoke__">printMove</span>(<span class="hljs-keyword">move</span> instance); <span class="hljs-comment">// `move` is explicit</span></div><div class="line-num" data-line-num="28">28</div><div class="line">    <span class="hljs-comment">// printMove(move instance); // Error: `instance` is moved</span></div><div class="line-num" data-line-num="29">29</div><div class="line">    <span class="hljs-comment">// printByRef(instance); // Same error: `instance` is moved</span></div><div class="line-num" data-line-num="30">30</div><div class="line"></div><div class="line-num" data-line-num="31">31</div><div class="line">    <span class="hljs-keyword">let</span> <span class="hljs-variable">num</span> = <span class="hljs-number">1000</span>;</div><div class="line-num" data-line-num="32">32</div><div class="line"></div><div class="line-num" data-line-num="33">33</div><div class="line">    <span class="hljs-title function_ invoke__">printNum</span>(num);</div><div class="line-num" data-line-num="34">34</div><div class="line">    <span class="hljs-title function_ invoke__">printNum</span>(num); <span class="hljs-comment">// Everything is find -- `i32` is a Copy-type</span></div><div class="line-num" data-line-num="35">35</div><div class="line"></div><div class="line-num" data-line-num="36">36</div><div class="line">    <span class="hljs-keyword">let</span> <span class="hljs-keyword">mut </span><span class="hljs-variable">var</span> = <span class="hljs-number">0xB16B00B5</span>;</div><div class="line-num" data-line-num="37">37</div><div class="line"></div><div class="line-num" data-line-num="38">38</div><div class="line">    <span class="hljs-title function_ invoke__">print</span>(var); <span class="hljs-comment">// Prints 2976579765</span></div><div class="line-num" data-line-num="39">39</div><div class="line">    <span class="hljs-title function_ invoke__">changeNum</span>(var);</div><div class="line-num" data-line-num="40">40</div><div class="line">    <span class="hljs-title function_ invoke__">print</span>(var); <span class="hljs-comment">// Prints 0</span></div><div class="line-num" data-line-num="41">41</div><div class="line">    </div><div class="line-num" data-line-num="42">42</div><div class="line"></div><div class="line-num" data-line-num="43">43</div><div class="line">    <span class="hljs-keyword">let</span> <span class="hljs-keyword">mut </span><span class="hljs-variable">a</span> = Struct {field: <span class="hljs-number">100</span>};</div><div class="line-num" data-line-num="44">44</div><div class="line">    </div><div class="line-num" data-line-num="45">45</div><div class="line">    <span class="hljs-keyword">let</span> <span class="hljs-keyword">mut </span><span class="hljs-variable">r0</span> = a;</div><div class="line-num" data-line-num="46">46</div><div class="line">    <span class="hljs-keyword">let</span> <span class="hljs-keyword">mut </span><span class="hljs-variable">r1</span> = a; <span class="hljs-comment">// Error: Cannot borrow `a` as mutable more than once</span></div><div class="line-num" data-line-num="47">47</div><div class="line">}</div>
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
them by reference. E.g. we have a variable storing `i32`, that is, it won't be passed as PIR, and if we need to have a
function modifying `i32` we need to explicitly pass it by reference.

Thus let's imagine we have `ref` keyword which is used in both function signature and passing to function.

#### Lack of explicitness

E.g. in Rust when we want to slice an array, we write `let slice = &array[from..to]`, 'cause the size of the slice is
not known at compile-time, so we cannot allocate it on the stack. In PIR it would be `let slice = array[from..to]`, as
far as the slice is not a Copy-Type (same in Rust). That's just an example of what we hide with PIR but not a problem.

#### Actual types

If we consider that a type which is not a Copy-Type and passed without any qualifiers -- it is a reference to type, then
this is a reference type. So, let's assume we have some intrinsic method to get type of an expression as string, what
will it print for function that accepts `Struct {field: 1234}`? -- `Struct` or `&Struct`.

As far as we don't remove references at all (they are still required to be in the language) -- the type is... 🥁🥁🥁
`&Struct`. Yeah, user have written `Struct` but that's not the truth as all non-copy-types are passed by reference. And
as far as we anyway separate concepts of references and values, we need it to be a reference.

#### Generics (!important)

This is really interesting problem to solve. As we do not have GC we cannot rely on the fact that everything will be
cleared as we put `free` at CT. The problem is not that `Vec<Struct>` is `&Vec<Struct>`... No, the problem is that is it
`&Vec<Struct>` or `&Vec<&Struct>`?! Rapidly answering this question I would say, it is a `&Vec<Struct>`, because having
`&Vec<&Struct>` we will require user to always have all `Struct`s alive as long as `Vec` is used, as far as it contains
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
            <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-comment">// `Kitty` is a structure declared somewhere</span></div><div class="line-num" data-line-num="2">2</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-title function_">foo</span>(kitty: Kitty) {</div><div class="line-num" data-line-num="3">3</div><div class="line">    <span class="hljs-title function_ invoke__">print</span>(kitty.msg);</div><div class="line-num" data-line-num="4">4</div><div class="line">}</div><div class="line-num" data-line-num="5">5</div><div class="line"></div><div class="line-num" data-line-num="6">6</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-title function_">main</span> {</div><div class="line-num" data-line-num="7">7</div><div class="line">    <span class="hljs-keyword">let</span> <span class="hljs-variable">kitty</span> = Kitty {msg: <span class="hljs-string">&quot;Meow, bitch&quot;</span>};</div><div class="line-num" data-line-num="8">8</div><div class="line">    <span class="hljs-title function_ invoke__">foo</span>(kitty);</div><div class="line-num" data-line-num="9">9</div><div class="line">}</div>
        </div>

Here I meant to copy `kitty`, but because of PIR `kitty` is passed by reference. STOP, it is C++ and not Rust, we don't
copy by default, and we don't move by default. So... How do I make it creating a copy of `kitty`?

- Overload `Copy` trait?
- Overload `Clone` trait? Both.
- `Copy` - When type overloads `Copy` trait, it is always (forget about optimizations) copied, thus no reference
  created.
- `Clone` - When type overloads `Clone` trait, it is passed by reference!

The rule about `Clone` sounds right as we don't actually modify the source and we just make a copy explicitly. There's
still a problem -- why do we need a reference as we cloned source, we'll just add additional work for run-time which is
not actually required?

#### `Clone` trait (!important)

`Clone` trait in *Jacy* as in Rust is used to provide explicit way to copy source object.

Let's look at an example similar to one above.

<div class="code-fence highlight-jc hljs">
            <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-comment">// Assume somewhere exists the `Kitty` type and it implements the `Clone` trait</span></div><div class="line-num" data-line-num="2">2</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-title function_">foo</span>(kitty: Kitty) {</div><div class="line-num" data-line-num="3">3</div><div class="line">    <span class="hljs-title function_ invoke__">print</span>(kitty.msg);</div><div class="line-num" data-line-num="4">4</div><div class="line">}</div><div class="line-num" data-line-num="5">5</div><div class="line"></div><div class="line-num" data-line-num="6">6</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-title function_">main</span> {</div><div class="line-num" data-line-num="7">7</div><div class="line">    <span class="hljs-keyword">let</span> <span class="hljs-variable">kitty</span> = Kitty {msg: <span class="hljs-string">&quot;Meow, bitch&quot;</span>};</div><div class="line-num" data-line-num="8">8</div><div class="line">    <span class="hljs-title function_ invoke__">foo</span>(kitty.<span class="hljs-title function_ invoke__">clone</span>());</div><div class="line-num" data-line-num="9">9</div><div class="line">}</div>
        </div>

We made a clone, but is there any reason to pass it by reference? It is a rhetorical question, and the answer is NO, and
it forces me to describe implicit-move rules. In C++, it is common to optimize some copy cases to move, e.g., when we
return a local variable, it is moved -- it is called copy/move elision. In *Jacy* these cases are wider as we need not
only to handle copies but also references.

#### Patterns

`let` bindings and `func` parameters are patterns, also there're `if let` and `match`. Do patterns need to be PIR or
not? -- Actually, they MUST.

Let's assume we've got.

<div class="code-fence highlight-jc hljs">
            <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">struct</span> <span class="hljs-title class_">StructType</span> {</div><div class="line-num" data-line-num="2">2</div><div class="line">    field: <span class="hljs-type">Vec</span>&lt;<span class="hljs-type">i32</span>&gt;,</div><div class="line-num" data-line-num="3">3</div><div class="line">}</div>
        </div>

Note that `StructType.field` is not of type `&Vec<i32>`, it is non-reference, because PIR is only about passing values.

<div class="code-fence highlight-jc hljs">
            <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">let</span> <span class="hljs-variable">a</span>: StructType = structInstance; <span class="hljs-comment">// `structInstance` is non-copy type</span></div><div class="line-num" data-line-num="2">2</div><div class="line"></div><div class="line-num" data-line-num="3">3</div><div class="line"><span class="hljs-comment">// Desugared to</span></div><div class="line-num" data-line-num="4">4</div><div class="line"><span class="hljs-keyword">let</span> <span class="hljs-variable">a</span>: &amp;StructType = &amp;structInstance;</div><div class="line-num" data-line-num="5">5</div><div class="line"><span class="hljs-comment">// or</span></div><div class="line-num" data-line-num="6">6</div><div class="line"><span class="hljs-keyword">let</span> <span class="hljs-variable">ref</span> a: &amp;StructType = structInstance;</div>
        </div>

<div class="code-fence highlight-jc hljs">
            <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-title function_">foo</span>(param: StructType);</div><div class="line-num" data-line-num="2">2</div><div class="line"><span class="hljs-title function_ invoke__">foo</span>(structInstance);</div><div class="line-num" data-line-num="3">3</div><div class="line"></div><div class="line-num" data-line-num="4">4</div><div class="line"><span class="hljs-comment">// Desugared to</span></div><div class="line-num" data-line-num="5">5</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-title function_">foo</span>(param: &amp;StructType);</div><div class="line-num" data-line-num="6">6</div><div class="line"><span class="hljs-title function_ invoke__">foo</span>(&amp;structInstance);</div>
        </div>

<div class="code-fence highlight-jc hljs">
            <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">match</span> a {</div><div class="line-num" data-line-num="2">2</div><div class="line">    StructType {field} =&gt; <span class="hljs-comment">// ...</span></div><div class="line-num" data-line-num="3">3</div><div class="line">}</div><div class="line-num" data-line-num="4">4</div><div class="line"></div><div class="line-num" data-line-num="5">5</div><div class="line"><span class="hljs-comment">// Desugared to</span></div><div class="line-num" data-line-num="6">6</div><div class="line"><span class="hljs-keyword">match</span> &amp;a {</div><div class="line-num" data-line-num="7">7</div><div class="line">    StructType {<span class="hljs-keyword">ref</span> field} =&gt; <span class="hljs-comment">// ...</span></div><div class="line-num" data-line-num="8">8</div><div class="line">}</div>
        </div>

### Examples

#### "Passes"

##### Assignment

`a = b` in Rust is `a = move b` but with PIR it will become `a = &b`, if `b` is another variable of non-copy type.

Let's look at examples to grasp when variable is automatically becomes a reference and where not.

<div class="code-fence highlight-jc hljs">
            <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">let</span> <span class="hljs-variable">a</span> = StructType {field: Vec::<span class="hljs-title function_ invoke__">new</span>()};</div><div class="line-num" data-line-num="2">2</div><div class="line"><span class="hljs-keyword">let</span> <span class="hljs-variable">b</span> = a;</div>
        </div>

Here, `a` is of type `StructType` because of move elision, but `b` would be `&StructType` as it is automatically
borrowed.

##### Functions

When we create a function like `func foo(param: String)`, `param` is of type `&String`. To make it mutable type must be
prepended with `mut`, so it gonna look like `mut String` which is actually a `&mut String`.

Copy-types (e.g. `i32`) passed by copy, that is, they are passed by value and copied. So, if we want to change the value
of some variable containing copy type we would write `func foo(param: ref mut i32)` and must be explicitly passed with
`ref mut` prefix.

### Rules

Finally, after reviewing some cases, I'd like to reduce them to the list of rules.

#### 1. If non-copy type passed to function or assigned, it is borrowed

Examples.

<div class="code-fence highlight-jc hljs">
            <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-title function_">foo</span>(name: <span class="hljs-type">String</span>) {</div><div class="line-num" data-line-num="2">2</div><div class="line">    <span class="hljs-title function_ invoke__">print</span>(<span class="hljs-string">&quot;My name is $name&quot;</span>);</div><div class="line-num" data-line-num="3">3</div><div class="line">}</div><div class="line-num" data-line-num="4">4</div><div class="line"></div><div class="line-num" data-line-num="5">5</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-title function_">main</span> {</div><div class="line-num" data-line-num="6">6</div><div class="line">    <span class="hljs-keyword">let</span> <span class="hljs-variable">savedName</span> = String::<span class="hljs-title function_ invoke__">from</span>(<span class="hljs-string">&quot;Mr. Doctor&quot;</span>);</div><div class="line-num" data-line-num="7">7</div><div class="line">    <span class="hljs-keyword">let</span> <span class="hljs-variable">name</span> = savedName; <span class="hljs-comment">// `savedName` is not either copied or moved -- `name` is an immutable reference to `savedName`</span></div><div class="line-num" data-line-num="8">8</div><div class="line">    <span class="hljs-title function_ invoke__">foo</span>(name); <span class="hljs-comment">// `name` is not moved -- it is passed by immutable reference</span></div><div class="line-num" data-line-num="9">9</div><div class="line">}</div>
        </div>

#### 2. Moves are explicit in signatures and in calls

Example.

<div class="code-fence highlight-jc hljs">
            <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-title function_">foo</span>(<span class="hljs-keyword">move</span> name: <span class="hljs-type">String</span>) {</div><div class="line-num" data-line-num="2">2</div><div class="line">    <span class="hljs-title function_ invoke__">print</span>(<span class="hljs-string">&quot;My name is $name&quot;</span>);</div><div class="line-num" data-line-num="3">3</div><div class="line">}</div><div class="line-num" data-line-num="4">4</div><div class="line"></div><div class="line-num" data-line-num="5">5</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-title function_">main</span> {</div><div class="line-num" data-line-num="6">6</div><div class="line">    <span class="hljs-keyword">let</span> <span class="hljs-variable">name</span> = <span class="hljs-string">&quot;Brendan Eich&quot;</span>;</div><div class="line-num" data-line-num="7">7</div><div class="line">    <span class="hljs-title function_ invoke__">foo</span>(<span class="hljs-keyword">move</span> name); <span class="hljs-comment">// `name` must be moved explicitly</span></div><div class="line-num" data-line-num="8">8</div><div class="line">}</div>
        </div>

#### 3. Data, stored in structures must be explicitly qualified as reference

Example.

<div class="code-fence highlight-jc hljs">
            <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">struct</span> <span class="hljs-title class_">Data</span> {</div><div class="line-num" data-line-num="2">2</div><div class="line">    inner: <span class="hljs-type">Vec</span>&lt;<span class="hljs-type">i32</span>&gt;</div><div class="line-num" data-line-num="3">3</div><div class="line">}</div><div class="line-num" data-line-num="4">4</div><div class="line"></div><div class="line-num" data-line-num="5">5</div><div class="line"><span class="hljs-keyword">struct</span> <span class="hljs-title class_">Struct</span> {</div><div class="line-num" data-line-num="6">6</div><div class="line">    data: &amp;Data,</div><div class="line-num" data-line-num="7">7</div><div class="line">}</div><div class="line-num" data-line-num="8">8</div><div class="line"></div><div class="line-num" data-line-num="9">9</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-title function_">main</span> {</div><div class="line-num" data-line-num="10">10</div><div class="line">    <span class="hljs-keyword">let</span> <span class="hljs-variable">data</span> = Data {inner: Vec::<span class="hljs-title function_ invoke__">from</span>([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>])};</div><div class="line-num" data-line-num="11">11</div><div class="line">    <span class="hljs-keyword">let</span> <span class="hljs-variable">s</span> = Struct {data: &amp;data};</div><div class="line-num" data-line-num="12">12</div><div class="line"></div><div class="line-num" data-line-num="13">13</div><div class="line">    <span class="hljs-comment">// let s2 = Struct {data: data} // Error: expected `&amp;Data` type for `data`</span></div><div class="line-num" data-line-num="14">14</div><div class="line">}</div>
        </div>

Actually, this is just an example where we omit usage of lifetimes. No-lifetimes solutions gonna be researched in
further ideas.
<div class="nav-btn-block">
    <button class="nav-btn left">
    <a class="link" href="/Jacy-Dev-Book/appendices/backlog/invert-rust-v2.html">< Invert rust v2</a>
</button>

    
</div>
