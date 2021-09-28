---
layout: 'default'
title: 'Name resolution'
nav_order: 104
parent: 'Name Resolution'
# No children
---

# Name resolution

If you want a brief overview of the Name Resolution internals, checkout [Name Resolution Cheatsheet](../cheatsheets/name-resolution-cheatsheet)

Now, we've got the module tree, we forward-declared everything and can resolve all names.

The first concept we need to grasp is so-called "ribs" (yeah, from Rust). "rib" is something close to the scope, but rib
is a wider thing as it is pushed onto the stack each time one of these rules can be applied:

1. We allow name shadowing
2. We enter scope which name-resolution rules are specific
3. We actually enter a new scope

So, a rib is pushed onto the rib stack not only when we enter a block `{}`, but also when `let` is met or when rib names
could collide with other names but we don't want this for reasons of possibility to make it work.

#### Name shadowing

The one important thing we need to establish -- _Jacy_ allows local names shadowing! Why? Let's look at an example where
it is practically convenient.

```rust
func strangeCheck(param: i32): i32? = // Note: `T?` is a shortcut for `Option<T>`
    if param <= 10 {None} else {Some(param)}

func main {
    let a = strangeCheck(10);
    let a = a.unwrap();
}
```

The function `strangeCheck` returns `Option` and we want to do something with this result, in other languages we either
don't in fact need this (because of lack of so many wrappers like `Option`, etc.) or we write code like that.

```rust
let maybeA = strangeCheck(10);
let a = maybeA.unwrap();
```

Which is annoying... Why do we need to add a new variable making code noisier? We've got `a` and it is logically still
`a` wrapped it or not.

One could argue that someone would write unclear code using this feature. This is why _Jacy_ has a linter warning for
these cases, and the rule not to get this warning is simple: "Only shadow variable with computations related to the
shadowed variable", for example.

```rust
// This is a good case to use variable shadowing
let a: i32? = None;
let a = a.unwrap();

// This one will produce a warning,
//  because you just lost the previous value of `param`
func foo(param: i32) {
    param = 123;
}
```

How variable shadowing is possible? Do we use multi-entry mapping for local variables at the name resolution stage? --
Actually, no, every time we meet a `let` statement -- we push a new rib onto the stack. You can think that by doing so we
can accidentally allow redeclarations of items -- again, no. All items are already defined in the module tree and, as
far as when we're building the module tree we operating with strict scopes -- redeclarations are not possible.

Example.

```rust
mod a {
    func nested() {}
    func nested() {} // Here is an error produced at "Module-tree Building" stage
}
```

As a result, what does `NameResolver` actually do from the view of defining is only local variables definitions. Thus at
the "Module-Tree Building" stage, we can use an easy concept of modules, and suppose to define the things which
can be forward-used. And when we resolve names we define the things which cannot be forward-used, these are local
variables, function/closure parameters, labels, and lifetimes, keeping name resolution simple.

### Ribs

Why do we need ribs instead of raw scopes? You've already read about `let` and how ribs solve name shadowing, but there're also some cases when ribs are helpful. Each rib has a kind and each kind has lookup restrictions, e.g. when we enter a local function (a function defined inside another function), we're unable to use the upper function locals -- this rule is described with rib kind. There's also `Raw` kind, that is, just a rib without specific restrictions.

Rib does not have to contain any definitions except local variables (actually function parameters too) because
everything is already defined in the module tree. When a new rib is pushed onto the rib stack specific module from the
current module children can be bound, it happens all the time except these cases: `let` statement rib, function
parameters rib (parameter names could collide with `const` generic parameters but we don't want this).

#### Module vs Rib

The module is a node in the module tree, that is, a scope containing definitions, whereas rib is kind of a part of an
elongating sword that we poke into the module tree. At first, we start with one rib and root the module, then build up a
stack of ribs checking the first child of the module until we reach a module without nested modules after that pop the
current rib and check the next child of the module, and repeat that till we resolve the whole AST.

### NameResolver

`NameResolver` is the main class of this stage -- it resolves each name in the _party_ and reports errors if failed to
resolve.

#### Paths

We don't have raw identifiers in the code, even in types. So, if we write `a + 1` from the view of AST, it is
"PathExpr(A) ...". There're some exceptions like labels (e.g. `break@myLoop`) and lifetimes, but their resolution is
much simpler and will be discussed further.

All paths, including type paths, are pointing to some definition in the module tree, and as we've already defined
everything at the previous stage, resolving paths is mostly a simple process. 

More about path resolution read [the further chapter](#path-resolution).

#### Namespaces

In _Jacy_, you can define type `i32`, function `i32`, or a lifetime with the name `i32`.
It is possible because all these items are context-dependent -- you cannot use function as a type and cannot use type alias as a value in an expression.
At the module-tree-building stage, we define all items, each in the namespace it belongs to, at the name resolution stage, we lookup for a name in a specific namespace in a module.

For example:
```rust
struct foo {}

func foo() {
    let f: foo;
}
```

By convention, this code is not a good one, as we use a lower-case name for `struct`, but this code is valid from the view of name resolution.

`ModuleTreeBuilder` defines:
- `foo` in ROOT module in _type_ namespace
- `foo` in ROOT module in _value_ namespace

`NameResolver` goes inside the ROOT module and resolves:
- `foo` type for local variable `f`, looking up for it in _type_ namespace (doesn't even try to find it in _value_ namespace).

What namespace does each item belong to?

- Value namespace
  - `func`
  - `init` (initializers, aka constructors)
  - `const` items and `const` generic parameters
  - `static`
  - Pattern bindings in `let` locals, `for` loops, `match` (`if let`, `while let`), function parameters and lambda parameters. Just all pattern bindings.
- Type namespace
  - `mod` (modules)
  - `struct`
  - `enum`
  - `type` (aliases and associated types too)
  - `trait`
  - Generic types

There are also Lifetime, macro, and label namespaces, but I'll write about them after (especially, macros is not a fully developed idea).

#### Result -- Resolutions

As a result, we've got filled `ResStorage` which contains mapped values `name nodeId -> Res`, where `Res` is a structure
containing info about a resolved name.

`Res` can be of different kinds as far as some names could point to definitions, some to local variables, etc. Also
`Res` can be ill-formed (of kind `Error`) that is an unresolved name.

An important thing that I need to establish is that resolution (`Res`) points to the identifier node (either to an
identifier of name in `Def` or to a local variable identifier) but key in `ResStorage` map is a node id of a resolved
path (`TypePath` or `PathExpr`), except labels and lifetimes which are not paths.

#### Patterns

What about patterns? We talked about the `let` statement and `func` parameters, but they are patterns. There's
nothing hard in pattern name resolution -- mostly every identifier, except PathExpr, that appeared in the pattern is
a binding.

#### Labels and lifetimes

__TODO__


#### `lang` items

Some items are required for internal logic, e.g. when we write `int?`, it is an `Option<int>` type, and the compiler must at first find the `Option` ADT to lower `int?`.

`lang` is an attribute of the form `@lang(name: '[NAME]')`, where `name` is an optional label and should be used to avoid problems if in the future new parameters will be added.


### Path resolution

Here the interesting things come up.
In _Jacy_, a path is actually "any name", just an `a` is a path, `path::to::something` is a path too.

For name resolution, we look at the path as at following structure:
`path::to::something`
- `path` is a prefix segment, which is always "something from type namespace"
- `to` is also a prefix segment
- `something` is, so-called, _target_ segment, this is what the user wants

All prefix segments are items from the _type_ namespace because only items from the _type_ namespace can export something outside.

One special, but the most popular case is a single-segment path. In that case, we need to think of a path not only as a possible path to an item but also as a local variable.
In single-segment paths, local variables have higher precedence, that is, if we see a single-segment path we need at first check if there's a local variable with this name and only if it does not exists -- check for items.


The work for resolving items in the module tree is implemented inside `PathResolver`.
When resolving items we need to keep in mind some concepts:
- Multiple namespaces - _type_, _value_, etc. namespaces have pretty different logic
- Function overloading - in _value_ namespace instead of having pair `Name: DefId` it can be `Name: FuncOverloadId`, which points to, possibly multiple, function definitions
- Only items from _type_ namespace export items outside

Even though resolution source code might look hard to comprehend, it's pretty straightforward, however complex.
Assume we have path `path::to::something`, these steps are included in the workflow:
0. At the start point we know:
   - What namespace look for an item in. It is known from context, for example in `1 + foo` we are 100% sure that `foo` is from the _value_ namespace because it is used in an expression. Having a target namespace is not required for all resolution cases though.
   - Suffix (option). E.g. if user has written `path::to::function(a: 123, b: 123)` the suffix is `(a:b:)`.
1. Lookup for a module that has a `path` item starting from the current module and going up until the root module
   - If the root module is reached and nothing is found -- report an error
2. When the first "search-module" is found we don't repeat step one as only the first segment is resolved relatively and subsequent segments relative to it.
3. Lookup for a `to` item in the current "search-module".
4. After the `path::to` prefix (this is how I call all segments going before the last one) is successfully resolved and we are now searching inside the `path::to` module, we apply specific rules for the last segment, depending on resolution case.
5. __read further__

There are three common resolution cases:
1. Resolve specific item (usage of some item)
2. Resolve single name import (`use ...`)
3. Descend to the module and apply custom logic (specific for some `use ...` cases)

> Some terminology:
> - `use *` is called use-all import
> - `use {...}` is called use-specific import
> - "target" namespace is the namespace context requires (e.g. in expression _value_ namespace is used). "target" segment is the last segment of the path, that in some cases is resolved inside a specific namespace, sometimes in all.
> - "path prefix" or "prefix of the path" is a part of the path that includes all segments begin the last one.
> - "import (-s)" one or more `use` declarations.

##### 1. Resolving specific items

This way is how the resolver works most of the time. When a user writes `let a = b` and `b` is not a local, we need to resolve `b` as some item.

As described above, we resolved the `path::to` prefix part, now having the `something` part on hand we lookup for a specific item in the target namespace.
`path::` and `to::` parts were found in the _type_ namespace because only items from _type_ namespace can be looked into via path.

1. Search for an item in the current "search-module"
2. If found, now we have either `DefId` or `FuncOverloadId`
   - In the case of `DefId` we reached the target and just set the resolution binding `path.node_id -> found DefId`
   - In the case of `FuncOverloadId` we need to get overloads
     - If there is a single overload -- just use it
     - If there is a single overload and it is private -- report an error
     - If there are no overloads -- it is a resolution error (actually, having `FuncOverloadId` pointing to empty overloads list is considered a bug as we don't create `FuncOverloadId` unless some function appeared)
     - If there are multiple overloads we need to disambiguate usage of function with suffix, if no suffix is present it is an "ambiguous use of the function"
     - If there are multiple overloads and all of them are not public -- report an error
     - If we have a suffix and no matter how many overloads -- we lookup for an overload by `suffix -> DefId` map
3. We always end up with either an error resolution or a __single__ definition id.


##### 2. Resolving single name imports

When a user writes `use path::to::something` or `use path::to::something as rebinding` we need to resolve the whole path, but, in contrast with ["specific resolution"](#1-resolving-specific-items), we collect all the items with the name `something`.
As a result, we got an error or a list of definitions ids.

More about importing items read [Importation & Module System](importation-&-module-system).

##### 3. Descending to module (`use *` and `use {}`)

Resolution of `use path::to::something::*` and `use {...}` differ from single name imports resolution -- in these cases we import multiple names.

###### `use *`

`use path::to::something::*` is a bad decision for general use in your code, anyway it is useful, for example, in the prelude.

The logic of collecting names is following:
- For each namespace in `path::to::something` module
  - Collect each definition
  - Collect all definitions of function overloads
    - Only if definition is public
- If no definitions inside `path::to::something` module -- do nothing
- Apply [Importation & Module System](importation-&-module-system) logic


###### `use {}`

This kind of `use` is called "specific", what it does is importing multiple paths relatively to prefix one, i.e. in `use path::to::something::{...}` all imports inside `{}` are resolved relatively to `path::to::something`. That's it, nothing complex, we just descend into the module `path::to::something` and then resolve each import inside `{}` starting the search from `path::to::something`.
<div class="nav-btn-block">
    <button class="nav-btn left">
    <a class="link" href="/Jacy-Dev-Book/compiler-workflow/name-res-stage/module-tree-building.html">< Module tree building</a>
</button>

    
</div>
