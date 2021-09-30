---
layout: 'default'
title: 'Module Tree Building'
nav_order: 2
parent: 'Names & Imports'
# No children
grand_parent: 'Compiler Workflow'
---

# Module-Tree building

Let's look at the code sample.

<div class="code-fence highlight-jc hljs">
            <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-title function_">main</span> {</div><div class="line-num" data-line-num="2">2</div><div class="line">    <span class="hljs-keyword">let</span> <span class="hljs-variable">var</span>: a::A <span class="hljs-operator">=</span> <span class="hljs-number">123</span>;</div><div class="line-num" data-line-num="3">3</div><div class="line">}</div><div class="line-num" data-line-num="4">4</div><div class="line"></div><div class="line-num" data-line-num="5">5</div><div class="line"><span class="hljs-keyword">mod</span> a {</div><div class="line-num" data-line-num="6">6</div><div class="line">    <span class="hljs-keyword">type</span> <span class="hljs-title class_">A</span> <span class="hljs-operator">=</span> b::B;</div><div class="line-num" data-line-num="7">7</div><div class="line">}</div><div class="line-num" data-line-num="8">8</div><div class="line"></div><div class="line-num" data-line-num="9">9</div><div class="line"><span class="hljs-keyword">mod</span> b {</div><div class="line-num" data-line-num="10">10</div><div class="line">    <span class="hljs-keyword">type</span> <span class="hljs-title class_">B</span> <span class="hljs-operator">=</span> <span class="hljs-type">i32</span>;</div><div class="line-num" data-line-num="11">11</div><div class="line">}</div>
        </div>

This is a valid code in _Jacy_, and as you can see here we use items before they actually appear in the code. To make it
possible name resolution goes in two stages, the first one is Module-Tree Building.

What is a module? Don't confuse it with function trim() { [native code] }, block
(including block expression or `func` body enclosed into `{}`) or `enum`.

What exactly happens at this stage? - We go through the whole AST and define each item in each block (we don't actually
resolve anything). All kinds of items (`type` alias, `func` or whatever else except `let`s) are forwardly declared, this
allows us to, for example, use function before it actually occurs in the code and what is more important -- we can
access nested items from current currently compiled scope.

## Involved Data Structures and Types

* `DefStorage` - Interface for definitions which presented in the form of index vector (vector where an offset is an identifier for some data) of `Def`s
* `Def` - Definition structure with specific kind (`Func`, `Enum`, etc.) common for all namespaces (e.g. types and items
  are all `Def` but with different kinds), points to the name `nodeId`
* `def_id` - `Def` identifier, numeric offset in `DefStorage` definitions collection
* `Module` - Actually a scope with different namespaces (type, value, lifetime), where each namespace is a map of
  `string -> def_id`. Also contains a map of children and anonymous blocks, child is a named submodule (e.g. a `func`
  inside `mod`) and an anonymous block is either a block expression or function body.

## Module-Tree usage

You can think about the module tree as about directory structure in the computer filesystem -- module is like a
directory and definitions are files. This analogy is also good to grasp how paths (e.g. `a::b::c`) are resolved. The
start point is the root module, that is, a module containing full Party definitions, when we see a path in the code we
process it as a relative path, e.g. if we are inside `mod a` which contains `mod b` then we resolve the path
`b::something` as `a::b::something`. Anyway, it is possible to qualify an absolute path (relative to the Party root)
with `::` prefix, in this case, we'll resolve it starting from the root module but not from the current.
<div class="nav-btn-block">
    <button class="nav-btn left">
    <a class="link" href="/Jacy-Dev-Book/compiler-workflow/name-res-stage/importation-&-module-system.html">< Imports & Module System</a>
</button>

    <button class="nav-btn right">
    <a class="link" href="/Jacy-Dev-Book/compiler-workflow/name-res-stage/name-resolution.html">Name Resolution ></a>
</button>

</div>
