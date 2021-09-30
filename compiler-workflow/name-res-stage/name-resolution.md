---
layout: 'default'
title: 'Name Resolution'
nav_order: 6
parent: 'Names & Imports'
# No children
grand_parent: 'Compiler Workflow'
---

# Name resolution

If you want a brief overview of the Name Resolution internals, checkout [Name Resolution Cheatsheet](../cheatsheets/name-resolution-cheatsheet)

Now, we've got the module tree, we forward-declared everything and can resolve all names.

The first concept we need to grasp is so-called "ribs" (yeah, from Rust). "rib" is something close to the scope, but rib
is a wider thing as it is pushed onto the stack each time one of these rules can be applied:

1. We allow name shadowing
2. We enter scope which name-resolution rules are specific
3. We actually enter a new scope

So, a rib is pushed onto the rib stack not only when we enter a block <span class="inline-code highlight-jc hljs">{}</span>, but also when <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">let</span></span> is met or when rib names
could collide with other names but we don't want this for reasons of possibility to make it work.

## Name shadowing

The one important thing we need to establish -- _Jacy_ allows local names shadowing! Why? Let's look at an example where
it is practically convenient.

<div class="code-fence highlight-jc hljs">
            <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-title function_">strangeCheck</span>(param: <span class="hljs-type">i32</span>): <span class="hljs-type">i32</span>? = <span class="hljs-comment">// Note: <span class="inline-code highlight-jc hljs">T?</span> is a shortcut for <span class="inline-code highlight-jc hljs"><span class="hljs-type">Option</span>&amp;lt;T&amp;gt;</span></span></div><div class="line-num" data-line-num="2">2</div><div class="line">    <span class="hljs-keyword">if</span> param &lt;= <span class="hljs-number">10</span> {<span class="hljs-literal">None</span>} <span class="hljs-keyword">else</span> {<span class="hljs-title function_ invoke__">Some</span>(param)}</div><div class="line-num" data-line-num="3">3</div><div class="line"></div><div class="line-num" data-line-num="4">4</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-title function_">main</span> {</div><div class="line-num" data-line-num="5">5</div><div class="line">    <span class="hljs-keyword">let</span> <span class="hljs-variable">a</span> = <span class="hljs-title function_ invoke__">strangeCheck</span>(<span class="hljs-number">10</span>);</div><div class="line-num" data-line-num="6">6</div><div class="line">    <span class="hljs-keyword">let</span> <span class="hljs-variable">a</span> = a.<span class="hljs-title function_ invoke__">unwrap</span>();</div><div class="line-num" data-line-num="7">7</div><div class="line">}</div>
        </div>

The function <span class="inline-code highlight-jc hljs">strangeCheck</span> returns <span class="inline-code highlight-jc hljs"><span class="hljs-type">Option</span></span> and we want to do something with this result, in other languages we either
don't need this (because of lack of so many wrappers like <span class="inline-code highlight-jc hljs"><span class="hljs-type">Option</span></span>, etc.) or we write code like that.

<div class="code-fence highlight-jc hljs">
            <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">let</span> <span class="hljs-variable">maybeA</span> = <span class="hljs-title function_ invoke__">strangeCheck</span>(<span class="hljs-number">10</span>);</div><div class="line-num" data-line-num="2">2</div><div class="line"><span class="hljs-keyword">let</span> <span class="hljs-variable">a</span> = maybeA.<span class="hljs-title function_ invoke__">unwrap</span>();</div>
        </div>

Which is annoying... Why do we need to add a new variable making code noisier? We've got <span class="inline-code highlight-jc hljs">a</span> and it is logically still
<span class="inline-code highlight-jc hljs">a</span> wrapped it or not.

One could argue that someone would write unclear code using this feature. This is why _Jacy_ has a linter warning for
these cases, and the rule not to get this warning is simple: "Only shadow variable with computations related to the
shadowed variable", for example.

<div class="code-fence highlight-jc hljs">
            <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-comment">// This is a good case to use variable shadowing</span></div><div class="line-num" data-line-num="2">2</div><div class="line"><span class="hljs-keyword">let</span> <span class="hljs-variable">a</span>: <span class="hljs-type">i32</span>? = <span class="hljs-literal">None</span>;</div><div class="line-num" data-line-num="3">3</div><div class="line"><span class="hljs-keyword">let</span> <span class="hljs-variable">a</span> = a.<span class="hljs-title function_ invoke__">unwrap</span>();</div><div class="line-num" data-line-num="4">4</div><div class="line"></div><div class="line-num" data-line-num="5">5</div><div class="line"><span class="hljs-comment">// This one will produce a warning,</span></div><div class="line-num" data-line-num="6">6</div><div class="line"><span class="hljs-comment">//  because you just lost the previous value of <span class="inline-code highlight-jc hljs">param</span></span></div><div class="line-num" data-line-num="7">7</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-title function_">foo</span>(param: <span class="hljs-type">i32</span>) {</div><div class="line-num" data-line-num="8">8</div><div class="line">    param = <span class="hljs-number">123</span>;</div><div class="line-num" data-line-num="9">9</div><div class="line">}</div>
        </div>

How variable shadowing is possible? Do we use multi-entry mapping for local variables at the name resolution stage? --
Actually, no, every time we meet a <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">let</span></span> statement -- we push a new rib onto the stack. You can think that by doing so we
can accidentally allow redeclarations of items -- again, no. All items are already defined in the module tree and, as
far as when we're building the module tree we operating with strict scopes -- redeclarations are not possible.

Example.

<div class="code-fence highlight-jc hljs">
            <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">mod</span> <span class="hljs-title class_">a</span> {</div><div class="line-num" data-line-num="2">2</div><div class="line">    <span class="hljs-keyword">func</span> <span class="hljs-title function_">nested</span>() {}</div><div class="line-num" data-line-num="3">3</div><div class="line">    <span class="hljs-keyword">func</span> <span class="hljs-title function_">nested</span>() {} <span class="hljs-comment">// Here is an error produced at &quot;Module-tree Building&quot; stage</span></div><div class="line-num" data-line-num="4">4</div><div class="line">}</div>
        </div>

As a result, what does <span class="inline-code highlight-jc hljs">NameResolver</span> actually do from the view of defining is only local variables definitions. Thus at
the "Module-Tree Building" stage, we can use an easy concept of modules and suppose to define the things which
can be forward-used. And when we resolve names we define the things which cannot be forward-used, these are local
variables, function/closure parameters, labels, and lifetimes, keeping name resolution simple.

### Ribs

Why do we need ribs instead of raw scopes? You've already read about <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">let</span></span> and how ribs solve name shadowing, but there're also some cases when ribs are helpful. Each rib has a kind and each kind has lookup restrictions, e.g. when we enter a local function (a function defined inside another function), we're unable to use the upper function locals -- this rule is described with rib kind. There's also <span class="inline-code highlight-jc hljs">Raw</span> kind, that is, just a rib without specific restrictions.

Rib does not have to contain any definitions except local variables (actually function parameters too) because
everything is already defined in the module tree. When a new rib is pushed onto the rib stack specific module from the
current module children can be bound, it happens all the time except these cases: <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">let</span></span> statement rib, function
parameters rib (parameter names could collide with <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">const</span></span> generic parameters but we don't want this).

#### Module vs Rib

The module is a node in the module tree, that is, a scope containing definitions, whereas rib is kind of a part of an
elongating sword that we poke into the module tree. At first, we start with one rib and root the module, then build up a
stack of ribs checking the first child of the module until we reach a module without nested modules after that pop the
current rib and check the next child of the module, and repeat that till we resolve the whole AST.

### NameResolver

<span class="inline-code highlight-jc hljs">NameResolver</span> is the main class of this stage -- it resolves each name in the _party_ and reports errors if failed to
resolve.

#### Paths

We don't have raw identifiers in the code, even in types. So, if we write <span class="inline-code highlight-jc hljs">a + <span class="hljs-number">1</span></span> from the view of AST, it is
"PathExpr(A) ...". There're some exceptions like labels (e.g. <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">break</span>@myLoop</span>) and lifetimes, but their resolution is
much simpler and will be discussed further.

All paths, including type paths, are pointing to some definition in the module tree, and as we've already defined
everything at the previous stage, resolving paths is mostly a simple process.

More about path resolution read [the further chapter](#path-resolution).

#### Namespaces

In _Jacy_, you can define type <span class="inline-code highlight-jc hljs"><span class="hljs-type">i32</span></span>, function <span class="inline-code highlight-jc hljs"><span class="hljs-type">i32</span></span>, or a lifetime with the name <span class="inline-code highlight-jc hljs"><span class="hljs-type">i32</span></span>.
It is possible because all these items are context-dependent -- you cannot use function as a type and cannot use type alias as a value in an expression.
At the module-tree-building stage, we define all items, each in the namespace it belongs to, at the name resolution stage, we lookup for a name in a specific namespace in a module.

For example:

<div class="code-fence highlight-jc hljs">
            <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">struct</span> <span class="hljs-title class_">foo</span> {}</div><div class="line-num" data-line-num="2">2</div><div class="line"></div><div class="line-num" data-line-num="3">3</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-title function_">foo</span>() {</div><div class="line-num" data-line-num="4">4</div><div class="line">    <span class="hljs-keyword">let</span> <span class="hljs-variable">f</span>: foo;</div><div class="line-num" data-line-num="5">5</div><div class="line">}</div>
        </div>

By convention, this code is not a good one, as we use a lower-case name for <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">struct</span></span>, but this code is valid from the view of name resolution.

<span class="inline-code highlight-jc hljs">ModuleTreeBuilder</span> defines:

- <span class="inline-code highlight-jc hljs">foo</span> in ROOT module in _type_ namespace
- <span class="inline-code highlight-jc hljs">foo</span> in ROOT module in _value_ namespace

<span class="inline-code highlight-jc hljs">NameResolver</span> goes inside the ROOT module and resolves:

- <span class="inline-code highlight-jc hljs">foo</span> type for local variable <span class="inline-code highlight-jc hljs">f</span>, looking up for it in _type_ namespace (doesn't even try to find it in _value_ namespace).

What namespace does each item belong to?

- Value namespace
  - <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">func</span></span>
  - <span class="inline-code highlight-jc hljs">init</span> (initializers, aka constructors)
  - <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">const</span></span> items and <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">const</span></span> generic parameters
  - <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">static</span></span>
  - Pattern bindings in <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">let</span></span> locals, <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">for</span></span> loops, <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">match</span></span> (<span class="inline-code highlight-jc hljs"><span class="hljs-keyword">if</span> <span class="hljs-keyword">let</span></span>, <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">while</span> <span class="hljs-keyword">let</span></span>), function parameters and lambda parameters. Just all pattern bindings.
- Type namespace
  - <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">mod</span></span> (modules)
  - <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">struct</span></span>
  - <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">enum</span></span>
  - <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">type</span></span> (aliases and associated types too)
  - <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">trait</span></span>
  - Generic types

There are also Lifetime, macro, and label namespaces, but I'll write about them after (especially, macros is not a fully developed idea).

#### Result -- Resolutions

As a result, we've got filled <span class="inline-code highlight-jc hljs">ResStorage</span> which contains mapped values <span class="inline-code highlight-jc hljs">name nodeId <span class="hljs-punctuation">-&gt;</span> Res</span>, where <span class="inline-code highlight-jc hljs">Res</span> is a structure
containing info about a resolved name.

<span class="inline-code highlight-jc hljs">Res</span> can be of different kinds as far as some names could point to definitions, some to local variables, etc. Also
<span class="inline-code highlight-jc hljs">Res</span> can be ill-formed (of kind <span class="inline-code highlight-jc hljs">Error</span>) that is an unresolved name.

An important thing that I need to establish is that resolution (<span class="inline-code highlight-jc hljs">Res</span>) points to the identifier node (either to an
identifier of name in <span class="inline-code highlight-jc hljs">Def</span> or to a local variable identifier) but key in <span class="inline-code highlight-jc hljs">ResStorage</span> map is a node id of a resolved
path (<span class="inline-code highlight-jc hljs">TypePath</span> or <span class="inline-code highlight-jc hljs">PathExpr</span>), except labels and lifetimes which are not paths.

#### Patterns

What about patterns? We talked about the <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">let</span></span> statement and <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">func</span></span> parameters, but they are patterns. There's
nothing hard in pattern name resolution -- mostly every identifier, except PathExpr, that appeared in the pattern is
a binding.

#### Labels and lifetimes

TODO

#### <span class="inline-code highlight-jc hljs">lang</span> items

Some items are required for internal logic, e.g. when we write <span class="inline-code highlight-jc hljs"><span class="hljs-type">int</span>?</span>, it is an <span class="inline-code highlight-jc hljs"><span class="hljs-type">Option</span>&lt;<span class="hljs-type">int</span>&gt;</span> type, and the compiler must at first find the <span class="inline-code highlight-jc hljs"><span class="hljs-type">Option</span></span> ADT to lower <span class="inline-code highlight-jc hljs"><span class="hljs-type">int</span>?</span>.

<span class="inline-code highlight-jc hljs">lang</span> is an attribute of the form <span class="inline-code highlight-jc hljs">@<span class="hljs-title function_ invoke__">lang</span>(name: &#x27;[NAME]&#x27;)</span>, where <span class="inline-code highlight-jc hljs">name</span> is an optional label and should be used to avoid problems if in the future new parameters will be added.

### Path resolution

Here the interesting things come up.
In _Jacy_, a path is actually "any name", just an <span class="inline-code highlight-jc hljs">a</span> is a path, <span class="inline-code highlight-jc hljs">path::to::something</span> is a path too.

For name resolution, we look at the path as at following structure:
<span class="inline-code highlight-jc hljs">path::to::something</span>

- <span class="inline-code highlight-jc hljs">path</span> is a prefix segment, which is always "something from type namespace"
- <span class="inline-code highlight-jc hljs">to</span> is also a prefix segment
- <span class="inline-code highlight-jc hljs">something</span> is, so-called, _target_ segment, this is what the user wants

All prefix segments are items from the _type_ namespace because only items from the _type_ namespace can export something outside.

One special, but the most popular case is a single-segment path. In that case, we need to think of a path not only as a possible path to an item but also as a local variable.
In single-segment paths, local variables have higher precedence, that is, if we see a single-segment path we need at first check if there's a local variable with this name and only if it does not exists -- check for items.

The work for resolving items in the module tree is implemented inside <span class="inline-code highlight-jc hljs">PathResolver</span>.
When resolving items we need to keep in mind some concepts:

- Multiple namespaces - _type_, _value_, etc. namespaces have pretty different logic
- Function overloading - in _value_ namespace instead of having pair <span class="inline-code highlight-jc hljs">Name: DefId</span> it can be <span class="inline-code highlight-jc hljs">Name: FuncOverloadId</span>, which points to, possibly multiple, function definitions
- Only items from _type_ namespace export items outside

Even though resolution source code might look hard to comprehend, it's pretty straightforward, however complex.
Assume we have path <span class="inline-code highlight-jc hljs">path::to::something</span>, these steps are included in the workflow:
0. At the start point we know:

- What namespace look for an item in. It is known from context, for example in <span class="inline-code highlight-jc hljs"><span class="hljs-number">1</span> + foo</span> we are 100% sure that <span class="inline-code highlight-jc hljs">foo</span> is from the _value_ namespace because it is used in an expression. Having a target namespace is not required for all resolution cases though.
- Suffix (option). E.g. if user has written <span class="inline-code highlight-jc hljs">path::to::<span class="hljs-title function_ invoke__">function</span>(a: <span class="hljs-number">123</span>, b: <span class="hljs-number">123</span>)</span> the suffix is <span class="inline-code highlight-jc hljs">(a:b:)</span>.

1. Lookup for a module that has a <span class="inline-code highlight-jc hljs">path</span> item starting from the current module and going up until the root module
   - If the root module is reached and nothing is found -- report an error
2. When the first "search-module" is found we don't repeat step one as only the first segment is resolved relatively and subsequent segments relative to it.
3. Lookup for a <span class="inline-code highlight-jc hljs">to</span> item in the current "search-module".
4. After the <span class="inline-code highlight-jc hljs">path::to</span> prefix (this is how I call all segments going before the last one) is successfully resolved and we are now searching inside the <span class="inline-code highlight-jc hljs">path::to</span> module, we apply specific rules for the last segment, depending on resolution case.
5. __read further__

There are three common resolution cases:

1. Resolve specific item (usage of some item)
2. Resolve single name import (<span class="inline-code highlight-jc hljs"><span class="hljs-keyword">use</span> ...</span>)
3. Descend to the module and apply custom logic (specific for some <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">use</span> ...</span> cases)

> Some terminology:
>
> - <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">use</span> *</span> is called use-all import
> - <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">use</span> {...}</span> is called use-specific import
> - "target" namespace is the namespace context requires (e.g. in expression _value_ namespace is used). "target" segment is the last segment of the path, that in some cases is resolved inside a specific namespace, sometimes in all.
> - "path prefix" or "prefix of the path" is a part of the path that includes all segments begin the last one.
> - "import (-s)" one or more <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">use</span></span> declarations.

#### 1. Resolving specific items

This way is how the resolver works most of the time. When a user writes <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">let</span> <span class="hljs-variable">a</span> = b</span> and <span class="inline-code highlight-jc hljs">b</span> is not a local, we need to resolve <span class="inline-code highlight-jc hljs">b</span> as some item.

As described above, we resolved the <span class="inline-code highlight-jc hljs">path::to</span> prefix part, now having the <span class="inline-code highlight-jc hljs">something</span> part on hand we lookup for a specific item in the target namespace.
<span class="inline-code highlight-jc hljs">path::</span> and <span class="inline-code highlight-jc hljs">to::</span> parts were found in the _type_ namespace because only items from _type_ namespace can be looked into via path.

1. Search for an item in the current "search-module"
2. If found, now we have either <span class="inline-code highlight-jc hljs">DefId</span> or <span class="inline-code highlight-jc hljs">FuncOverloadId</span>
   - In the case of <span class="inline-code highlight-jc hljs">DefId</span> we reached the target and just set the resolution binding <span class="inline-code highlight-jc hljs">path.node_id <span class="hljs-punctuation">-&gt;</span> found DefId</span>
   - In the case of <span class="inline-code highlight-jc hljs">FuncOverloadId</span> we need to get overloads
     - If there is a single overload -- just use it
     - If there is a single overload and it is private -- report an error
     - If there are no overloads -- it is a resolution error (actually, having <span class="inline-code highlight-jc hljs">FuncOverloadId</span> pointing to empty overloads list is considered a bug as we don't create <span class="inline-code highlight-jc hljs">FuncOverloadId</span> unless some function appeared)
     - If there are multiple overloads we need to disambiguate usage of function with suffix, if no suffix is present it is an "ambiguous use of the function"
     - If there are multiple overloads and all of them are not public -- report an error
     - If we have a suffix and no matter how many overloads -- we lookup for an overload by <span class="inline-code highlight-jc hljs">suffix <span class="hljs-punctuation">-&gt;</span> DefId</span> map
3. We always end up with either an error resolution or a __single__ definition id.

##### 2. Resolving single name imports

When a user writes <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">use</span> path::to::something</span> or <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">use</span> path::to::something <span class="hljs-keyword">as</span> rebinding</span> we need to resolve the whole path, but, in contrast with ["specific resolution"](#1-resolving-specific-items), we collect all the items with the name <span class="inline-code highlight-jc hljs">something</span>.
As a result, we got an error or a list of definitions ids.

More about importing items read [Importation & Module System](importation-&-module-system).

##### 3. Descending to module (<span class="inline-code highlight-jc hljs"><span class="hljs-keyword">use</span> *</span> and <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">use</span> {}</span>)

Resolution of <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">use</span> path::to::something::*</span> and <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">use</span> {...}</span> differ from single name imports resolution -- in these cases we import multiple names.

###### <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">use</span> *</span>

<span class="inline-code highlight-jc hljs"><span class="hljs-keyword">use</span> path::to::something::*</span> is a bad decision for general use in your code, anyway it is useful, for example, in the prelude.

The logic of collecting names is following:

- For each namespace in <span class="inline-code highlight-jc hljs">path::to::something</span> module
  - Collect each definition
  - Collect all definitions of function overloads
    - Only if definition is public
- If no definitions inside <span class="inline-code highlight-jc hljs">path::to::something</span> module -- do nothing
- Apply [Importation & Module System](importation-&-module-system) logic

###### <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">use</span> {}</span>

This kind of <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">use</span></span> is called "specific", what it does is importing multiple paths relatively to prefix one, i.e. in <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">use</span> path::to::something::{...}</span> all imports inside <span class="inline-code highlight-jc hljs">{}</span> are resolved relatively to <span class="inline-code highlight-jc hljs">path::to::something</span>. That's it, nothing complex, we just descend into the module <span class="inline-code highlight-jc hljs">path::to::something</span> and then resolve each import inside <span class="inline-code highlight-jc hljs">{}</span> starting the search from <span class="inline-code highlight-jc hljs">path::to::something</span>.
<div class="nav-btn-block">
    <button class="nav-btn left">
    <a class="link" href="/Jacy-Dev-Book/compiler-workflow/name-res-stage/module-tree-building.html">< Module Tree Building</a>
</button>

    
</div>
