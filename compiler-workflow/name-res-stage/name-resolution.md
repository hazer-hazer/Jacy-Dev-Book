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

So, a rib is pushed onto the rib stack not only when we enter a block <span class="inline-code highlight-jc hljs">{}`, but also when `<span class="hljs-keyword">let</span></span> is met or when rib names
could collide with other names but we don't want this for reasons of possibility to make it work.

## Name shadowing

The one important thing we need to establish -- _Jacy_ allows local names shadowing! Why? Let's look at an example where
it is practically convenient.

<div class="code-fence highlight-jc hljs">
            <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-title function_">strangeCheck</span>(param: <span class="hljs-type">i32</span>): <span class="hljs-type">i32</span>? <span class="hljs-operator">=</span> <span class="hljs-comment">// Note: <span class="inline-code highlight-jc hljs">T?` is a sh<span class="hljs-operator">or</span>tcut f<span class="hljs-operator">or</span> `<span class="hljs-type">Option</span><span class="hljs-operator">&amp;</span>lt;T<span class="hljs-operator">&amp;</span>gt;</span></span></div><div class="line-num" data-line-num="2">2</div><div class="line">    <span class="hljs-keyword">if</span> param <span class="hljs-operator">&lt;</span><span class="hljs-operator">=</span> <span class="hljs-number">10</span> {<span class="hljs-literal">None</span>} <span class="hljs-keyword">else</span> {<span class="hljs-title function_ invoke__">Some</span>(param)}</div><div class="line-num" data-line-num="3">3</div><div class="line"></div><div class="line-num" data-line-num="4">4</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-title function_">main</span> {</div><div class="line-num" data-line-num="5">5</div><div class="line">    <span class="hljs-keyword">let</span> <span class="hljs-variable">a</span> <span class="hljs-operator">=</span> <span class="hljs-title function_ invoke__">strangeCheck</span>(<span class="hljs-number">10</span>);</div><div class="line-num" data-line-num="6">6</div><div class="line">    <span class="hljs-keyword">let</span> <span class="hljs-variable">a</span> <span class="hljs-operator">=</span> a<span class="hljs-operator">.</span><span class="hljs-title function_ invoke__">unwrap</span>();</div><div class="line-num" data-line-num="7">7</div><div class="line">}</div>
        </div>

The function <span class="inline-code highlight-jc hljs">strangeCheck` returns `<span class="hljs-type">Option</span></span> and we want to do something with this result, in other languages we either
don't need this (because of lack of so many wrappers like <span class="inline-code highlight-jc hljs"><span class="hljs-type">Option</span></span>, etc.) or we write code like that.

<div class="code-fence highlight-jc hljs">
            <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">let</span> <span class="hljs-variable">maybeA</span> <span class="hljs-operator">=</span> <span class="hljs-title function_ invoke__">strangeCheck</span>(<span class="hljs-number">10</span>);</div><div class="line-num" data-line-num="2">2</div><div class="line"><span class="hljs-keyword">let</span> <span class="hljs-variable">a</span> <span class="hljs-operator">=</span> maybeA<span class="hljs-operator">.</span><span class="hljs-title function_ invoke__">unwrap</span>();</div>
        </div>

Which is annoying... Why do we need to add a new variable making code noisier? We've got <span class="inline-code highlight-jc hljs">a</span> and it is logically still
<span class="inline-code highlight-jc hljs">a</span> wrapped it or not.

One could argue that someone would write unclear code using this feature. This is why _Jacy_ has a linter warning for
these cases, and the rule not to get this warning is simple: "Only shadow variable with computations related to the
shadowed variable", for example.

<div class="code-fence highlight-jc hljs">
            <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-comment">// This is a good case to use variable shadowing</span></div><div class="line-num" data-line-num="2">2</div><div class="line"><span class="hljs-keyword">let</span> <span class="hljs-variable">a</span>: <span class="hljs-type">i32</span>? <span class="hljs-operator">=</span> <span class="hljs-literal">None</span>;</div><div class="line-num" data-line-num="3">3</div><div class="line"><span class="hljs-keyword">let</span> <span class="hljs-variable">a</span> <span class="hljs-operator">=</span> a<span class="hljs-operator">.</span><span class="hljs-title function_ invoke__">unwrap</span>();</div><div class="line-num" data-line-num="4">4</div><div class="line"></div><div class="line-num" data-line-num="5">5</div><div class="line"><span class="hljs-comment">// This one will produce a warning,</span></div><div class="line-num" data-line-num="6">6</div><div class="line"><span class="hljs-comment">//  because you just lost the previous value of <span class="inline-code highlight-jc hljs">param</span></span></div><div class="line-num" data-line-num="7">7</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-title function_">foo</span>(param: <span class="hljs-type">i32</span>) {</div><div class="line-num" data-line-num="8">8</div><div class="line">    param <span class="hljs-operator">=</span> <span class="hljs-number">123</span>;</div><div class="line-num" data-line-num="9">9</div><div class="line">}</div>
        </div>

How variable shadowing is possible? Do we use multi-entry mapping for local variables at the name resolution stage? --
Actually, no, every time we meet a <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">let</span></span> statement -- we push a new rib onto the stack. You can think that by doing so we
can accidentally allow redeclarations of items -- again, no. All items are already defined in the module tree and, as
far as when we're building the module tree we operating with strict scopes -- redeclarations are not possible.

Example.

<div class="code-fence highlight-jc hljs">
            <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">mod</span> a {</div><div class="line-num" data-line-num="2">2</div><div class="line">    <span class="hljs-keyword">func</span> <span class="hljs-title function_">nested</span>() {}</div><div class="line-num" data-line-num="3">3</div><div class="line">    <span class="hljs-keyword">func</span> <span class="hljs-title function_">nested</span>() {} <span class="hljs-comment">// Here is an error produced at &quot;Module-tree Building&quot; stage</span></div><div class="line-num" data-line-num="4">4</div><div class="line">}</div>
        </div>

As a result, what does <span class="inline-code highlight-jc hljs">NameResolver</span> actually do from the view of defining is only local variables definitions. Thus at
the "Module-Tree Building" stage, we can use an easy concept of modules and suppose to define the things which
can be forward-used. And when we resolve names we define the things which cannot be forward-used, these are local
variables, function/closure parameters, labels, and lifetimes, keeping name resolution simple.

### Ribs

Why do we need ribs instead of raw scopes? You've already read about <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">let</span>` <span class="hljs-operator">and</span> how ribs solve name shadowing, but there<span class="hljs-symbol">&#x27;re</span> also some cases when ribs are helpful<span class="hljs-operator">.</span> Each rib has a kind <span class="hljs-operator">and</span> each kind has lookup restrictions, e<span class="hljs-operator">.</span>g<span class="hljs-operator">.</span> when we enter a local <span class="hljs-title function_ invoke__">function</span> (a function defined inside a<span class="hljs-operator">not</span>her function), we<span class="hljs-symbol">&#x27;re</span> unable to <span class="hljs-keyword">use</span> the upper function locals <span class="hljs-operator">-</span><span class="hljs-operator">-</span> this rule is described with rib kind<span class="hljs-operator">.</span> There<span class="hljs-symbol">&#x27;s</span> also `Raw</span> kind, that is, just a rib without specific restrictions.

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

We don't have raw identifiers in the code, even in types. So, if we write <span class="inline-code highlight-jc hljs">a <span class="hljs-operator">+</span> <span class="hljs-number">1</span></span> from the view of AST, it is
"PathExpr(A) ...". There're some exceptions like labels (e.g. <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">break</span><span class="hljs-operator">@</span>myLoop</span>) and lifetimes, but their resolution is
much simpler and will be discussed further.

All paths, including type paths, are pointing to some definition in the module tree, and as we've already defined
everything at the previous stage, resolving paths is mostly a simple process.

More about path resolution read [the further chapter](#path-resolution).

#### Namespaces

In _Jacy_, you can define type <span class="inline-code highlight-jc hljs"><span class="hljs-type">i32</span>`, function `<span class="hljs-type">i32</span>`, <span class="hljs-operator">or</span> a lifetime with the name `<span class="hljs-type">i32</span></span>.
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

- <span class="inline-code highlight-jc hljs">foo` <span class="hljs-keyword">type</span> <span class="hljs-title class_">for</span> local variable `f</span>, looking up for it in _type_ namespace (doesn't even try to find it in _value_ namespace).

What namespace does each item belong to?

- Value namespace
  - <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">func</span></span>
  - <span class="inline-code highlight-jc hljs">init</span> (initializers, aka constructors)
  - <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">const</span>` items <span class="hljs-operator">and</span> `<span class="hljs-keyword">const</span></span> generic parameters
  - <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">static</span></span>
  - Pattern bindings in <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">let</span>` locals, `f<span class="hljs-operator">or</span>` loops, `<span class="hljs-keyword">match</span>` (`<span class="hljs-keyword">if</span> <span class="hljs-keyword">let</span>`, `<span class="hljs-keyword">while</span> <span class="hljs-keyword">let</span></span>), function parameters and lambda parameters. Just all pattern bindings.
- Type namespace
  - <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">mod</span></span> (modules)
  - <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">struct</span></span>
  - <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">enum</span></span>
  - <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">type</span></span> (aliases and associated types too)
  - <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">trait</span></span>
  - Generic types

There are also Lifetime, macro, and label namespaces, but I'll write about them after (especially, macros is not a fully developed idea).

#### Result -- Resolutions

As a result, we've got filled <span class="inline-code highlight-jc hljs">ResSt<span class="hljs-operator">or</span>age` which contains mapped values `name nodeId <span class="hljs-operator">-</span><span class="hljs-operator">&gt;</span> Res`, <span class="hljs-keyword">where</span> `Res</span> is a structure
containing info about a resolved name.

<span class="inline-code highlight-jc hljs">Res</span> can be of different kinds as far as some names could point to definitions, some to local variables, etc. Also
<span class="inline-code highlight-jc hljs">Res` can be ill<span class="hljs-operator">-</span><span class="hljs-title function_ invoke__">formed</span> (of kind `<span class="hljs-literal">Err</span><span class="hljs-operator">or</span></span>) that is an unresolved name.

An important thing that I need to establish is that resolution (<span class="inline-code highlight-jc hljs">Res</span>) points to the identifier node (either to an
identifier of name in <span class="inline-code highlight-jc hljs">Def` <span class="hljs-operator">or</span> to a local variable identifier) but key <span class="hljs-keyword">in</span> `ResSt<span class="hljs-operator">or</span>age</span> map is a node id of a resolved
path (<span class="inline-code highlight-jc hljs">TypePath` <span class="hljs-operator">or</span> `PathExpr</span>), except labels and lifetimes which are not paths.

#### Patterns

What about patterns? We talked about the <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">let</span>` statement <span class="hljs-operator">and</span> `<span class="hljs-keyword">func</span></span> parameters, but they are patterns. There's
nothing hard in pattern name resolution -- mostly every identifier, except PathExpr, that appeared in the pattern is
a binding.

#### Labels and lifetimes

TODO

#### <span class="inline-code highlight-jc hljs">lang</span> items

Some items are required for internal logic, e.g. when we write <span class="inline-code highlight-jc hljs"><span class="hljs-type">int</span>?`, it is an `<span class="hljs-type">Option</span><span class="hljs-operator">&lt;</span><span class="hljs-type">int</span><span class="hljs-operator">&gt;</span>` <span class="hljs-keyword">type</span>, <span class="hljs-operator">and</span> the compiler must at first find the `<span class="hljs-type">Option</span>` ADT to lower `<span class="hljs-type">int</span>?</span>.

<span class="inline-code highlight-jc hljs">lang` is an attribute of the f<span class="hljs-operator">or</span>m `<span class="hljs-operator">@</span><span class="hljs-title function_ invoke__">lang</span>(name: &#x27;[NAME]&#x27;)`, <span class="hljs-keyword">where</span> `name</span> is an optional label and should be used to avoid problems if in the future new parameters will be added.

### Path resolution

Here the interesting things come up.
In _Jacy_, a path is actually "any name", just an <span class="inline-code highlight-jc hljs">a` is a path, `path::to::something</span> is a path too.

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
- Function overloading - in _value_ namespace instead of having pair <span class="inline-code highlight-jc hljs">Name: DefId` it can be `Name: FuncOverloadId</span>, which points to, possibly multiple, function definitions
- Only items from _type_ namespace export items outside

Even though resolution source code might look hard to comprehend, it's pretty straightforward, however complex.
Assume we have path <span class="inline-code highlight-jc hljs">path::to::something</span>, these steps are included in the workflow:
0. At the start point we know:

- What namespace look for an item in. It is known from context, for example in <span class="inline-code highlight-jc hljs"><span class="hljs-number">1</span> <span class="hljs-operator">+</span> foo` we are <span class="hljs-number">100</span><span class="hljs-operator">%</span> sure that `foo</span> is from the _value_ namespace because it is used in an expression. Having a target namespace is not required for all resolution cases though.
- Suffix (option). E.g. if user has written <span class="inline-code highlight-jc hljs">path::to::<span class="hljs-title function_ invoke__">function</span>(a: <span class="hljs-number">123</span>, b: <span class="hljs-number">123</span>)` the suffix is `(a:b:)</span>.

1. Lookup for a module that has a <span class="inline-code highlight-jc hljs">path</span> item starting from the current module and going up until the root module
   - If the root module is reached and nothing is found -- report an error
2. When the first "search-module" is found we don't repeat step one as only the first segment is resolved relatively and subsequent segments relative to it.
3. Lookup for a <span class="inline-code highlight-jc hljs">to</span> item in the current "search-module".
4. After the <span class="inline-code highlight-jc hljs">path::to` <span class="hljs-title function_ invoke__">prefix</span> (this is how I call all segments going bef<span class="hljs-operator">or</span>e the last one) is successfully resolved <span class="hljs-operator">and</span> we are now searching inside the `path::to</span> module, we apply specific rules for the last segment, depending on resolution case.
5. __read further__

There are three common resolution cases:

1. Resolve specific item (usage of some item)
2. Resolve single name import (<span class="inline-code highlight-jc hljs"><span class="hljs-keyword">use</span> <span class="hljs-operator">..</span><span class="hljs-operator">.</span></span>)
3. Descend to the module and apply custom logic (specific for some <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">use</span> <span class="hljs-operator">..</span><span class="hljs-operator">.</span></span> cases)

> Some terminology:
>
> - <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">use</span> <span class="hljs-operator">*</span></span> is called use-all import
> - <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">use</span> {<span class="hljs-operator">..</span><span class="hljs-operator">.</span>}</span> is called use-specific import
> - "target" namespace is the namespace context requires (e.g. in expression _value_ namespace is used). "target" segment is the last segment of the path, that in some cases is resolved inside a specific namespace, sometimes in all.
> - "path prefix" or "prefix of the path" is a part of the path that includes all segments begin the last one.
> - "import (-s)" one or more <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">use</span></span> declarations.

#### 1. Resolving specific items

This way is how the resolver works most of the time. When a user writes <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">let</span> <span class="hljs-variable">a</span> <span class="hljs-operator">=</span> b` <span class="hljs-operator">and</span> `b` is <span class="hljs-operator">not</span> a local, we need to resolve `b</span> as some item.

As described above, we resolved the <span class="inline-code highlight-jc hljs">path::to` prefix part, now having the `something</span> part on hand we lookup for a specific item in the target namespace.
<span class="inline-code highlight-jc hljs">path::` <span class="hljs-operator">and</span> `to::</span> parts were found in the _type_ namespace because only items from _type_ namespace can be looked into via path.

1. Search for an item in the current "search-module"
2. If found, now we have either <span class="inline-code highlight-jc hljs">DefId` <span class="hljs-operator">or</span> `FuncOverloadId</span>
   - In the case of <span class="inline-code highlight-jc hljs">DefId` we reached the target <span class="hljs-operator">and</span> just set the resolution binding `path<span class="hljs-operator">.</span>node_id <span class="hljs-operator">-</span><span class="hljs-operator">&gt;</span> found DefId</span>
   - In the case of <span class="inline-code highlight-jc hljs">FuncOverloadId</span> we need to get overloads
     - If there is a single overload -- just use it
     - If there is a single overload and it is private -- report an error
     - If there are no overloads -- it is a resolution error (actually, having <span class="inline-code highlight-jc hljs">FuncOverloadId` pointing to empty overloads list is considered a bug <span class="hljs-keyword">as</span> we don<span class="hljs-symbol">&#x27;t</span> create `FuncOverloadId</span> unless some function appeared)
     - If there are multiple overloads we need to disambiguate usage of function with suffix, if no suffix is present it is an "ambiguous use of the function"
     - If there are multiple overloads and all of them are not public -- report an error
     - If we have a suffix and no matter how many overloads -- we lookup for an overload by <span class="inline-code highlight-jc hljs">suffix <span class="hljs-operator">-</span><span class="hljs-operator">&gt;</span> DefId</span> map
3. We always end up with either an error resolution or a __single__ definition id.

##### 2. Resolving single name imports

When a user writes <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">use</span> path::to::something` <span class="hljs-operator">or</span> `<span class="hljs-keyword">use</span> path::to::something <span class="hljs-keyword">as</span> rebinding` we need to resolve the whole path, but, <span class="hljs-keyword">in</span> contrast with [<span class="hljs-string">&quot;specific resolution&quot;</span>](#<span class="hljs-number">1</span><span class="hljs-operator">-</span>resolving<span class="hljs-operator">-</span>specific<span class="hljs-operator">-</span>items), we collect all the items with the name `something</span>.
As a result, we got an error or a list of definitions ids.

More about importing items read [Importation & Module System](importation-&-module-system).

##### 3. Descending to module (<span class="inline-code highlight-jc hljs"><span class="hljs-keyword">use</span> <span class="hljs-operator">*</span>` <span class="hljs-operator">and</span> `<span class="hljs-keyword">use</span> {}</span>)

Resolution of <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">use</span> path::to::something::<span class="hljs-operator">*</span>` <span class="hljs-operator">and</span> `<span class="hljs-keyword">use</span> {<span class="hljs-operator">..</span><span class="hljs-operator">.</span>}</span> differ from single name imports resolution -- in these cases we import multiple names.

###### <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">use</span> <span class="hljs-operator">*</span></span>

<span class="inline-code highlight-jc hljs"><span class="hljs-keyword">use</span> path::to::something::<span class="hljs-operator">*</span></span> is a bad decision for general use in your code, anyway it is useful, for example, in the prelude.

The logic of collecting names is following:

- For each namespace in <span class="inline-code highlight-jc hljs">path::to::something</span> module
  - Collect each definition
  - Collect all definitions of function overloads
    - Only if definition is public
- If no definitions inside <span class="inline-code highlight-jc hljs">path::to::something</span> module -- do nothing
- Apply [Importation & Module System](importation-&-module-system) logic

###### <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">use</span> {}</span>

This kind of <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">use</span>` is called <span class="hljs-string">&quot;specific&quot;</span>, what it does is imp<span class="hljs-operator">or</span>ting multiple paths relatively to prefix one, i<span class="hljs-operator">.</span>e<span class="hljs-operator">.</span> <span class="hljs-keyword">in</span> `<span class="hljs-keyword">use</span> path::to::something::{<span class="hljs-operator">..</span><span class="hljs-operator">.</span>}` all imp<span class="hljs-operator">or</span>ts inside `{}` are resolved relatively to `path::to::something`<span class="hljs-operator">.</span> That<span class="hljs-symbol">&#x27;s</span> it, <span class="hljs-operator">not</span>hing complex, we just descend into the module `path::to::something` <span class="hljs-operator">and</span> then resolve each imp<span class="hljs-operator">or</span>t inside `{}` starting the search from `path::to::something</span>.
<div class="nav-btn-block">
    <button class="nav-btn left">
    <a class="link" href="/Jacy-Dev-Book/compiler-workflow/name-res-stage/module-tree-building.html">< Module Tree Building</a>
</button>

    
</div>
