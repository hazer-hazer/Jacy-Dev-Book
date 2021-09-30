---
layout: 'default'
title: 'Hir'
nav_order: 100
parent: 'Lowering & HIR'
# No children
grand_parent: 'Compiler Workflow'
---

# HIR

Same as Rust (again...) _Jacy_ has HIR - High-level Intermediate Representation. It is an IR that contains flatten version of AST, i.e. not in the structure of the tree but a collection of mapping from some identifiers to objects.
For example, you cannot access a child node from the parent node directly, every node that has children only contains a list of identifiers pointing to the children nodes. This is a convenient representation for type checking, etc. because we can walk through all specific items (e.g. all function bodies) to emit some logic on them.

The structure of HIR might seem to be confusing at first sight view, but it is not.
The AST produced by parser is flatten into the collection of maps, e.g. there's a map of all function bodies, and that's all the executable code we have. If we need to walk through all function bodies, now we don't need to descend into the AST nodes ignoring nodes that aren't function bodies.

## Lowering

Lowering is a process of converting some syntactically different structures to common structures.

E.g. all kinds of loops are converted to a <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">loop</span></span> structure because every loop is considered to "do something while
something". That is, the <span class="inline-code highlight-jc hljs">f<span class="hljs-operator">or</span></span> loop iterates over data until there're some data, same for while and <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">while</span> <span class="hljs-keyword">let</span></span>.

By doing so, we reduce a large amount of AST nodes to some more common structures.

More on lowering in the next chapter...
<div class="nav-btn-block">
    <button class="nav-btn left">
    <a class="link" href="/Jacy-Dev-Book/compiler-workflow/lowering/index.html">< Lowering & HIR</a>
</button>

    <button class="nav-btn right">
    <a class="link" href="/Jacy-Dev-Book/compiler-workflow/lowering/lowering.html">Lowering ></a>
</button>

</div>
