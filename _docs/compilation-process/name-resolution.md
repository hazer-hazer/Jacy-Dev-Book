---
layout: default
title: Name resolution
nav_order: 10
parent: Compilation Process

# description: This stage is where name resolution begins.
---

# Name resolution

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

```jc
func strangeCheck(param: i32): i32? = // Note: `T?` is a shortcut for `Option<T>`
    if param <= 10 {None} else {Some(param)}

func main {
    let a = strangeCheck(10);
    let a = a.unwrap();
}
```

The function `strangeCheck` returns `Option` and we want to do something with this result, in other languages we either
don't actually need this (because of lack of so many wrappers like `Option`, etc.) or we write code like that.

```rust
let maybeA = strangeCheck(10);
let a = maybeA.unwrap();
```

Which is annoying... Why do we need to add a new variable making code noisier? We've got `a` and it is logically still
`a` wrapped it or not.

One could argue that someone would write unclear code using this feature. This is why _Jacy_ has a linter warning for
these cases, and the rule not to get this warning is simple: "Only shadow variable with computations related to the
shadowed variable", for example.

```jc
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
Actually, no, every time we meet `let` statement -- we push a new rib onto the stack. You can think that by doing so we
can accidentally allow redeclarations of items -- again, no. All items are already defined in the module tree and, as
far as when we're building the module tree we operating with strict scopes -- redeclarations are not possible.

Example.

```jc
mod a {
    func nested() {}
    func nested() {} // Here is an error produced at "Module-tree Building" stage
}
```

As a result, what does `NameResolver` actually do from the view of defining is only local variables definitions. Thus at
the "Module-Tree Building" stage, we are able to use an easy concept of modules, and suppose to define the things which
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

#### Path resolution

We don't have raw identifiers in the code, even in types. So, if we write `a + 1` from the view of AST, it is
"PathExpr(A) ...". There're some exceptions like labels (e.g. `break@myLoop`) and lifetimes, but their resolution is
much simpler and will be discussed further.

All paths, including type paths, are pointing to some definition in the module tree, and as we've already defined
everything at the previous stage, resolving paths is mostly a simple process. 

#### Result -- Resolutions

As a result, we've got filled `ResStorage` which contains mapped values `name nodeId -> Res`, where `Res` is a structure
containing info about a resolved name.

`Res` can be of different kinds as far as some names could point to definitions, some to local variables, etc. Also
`Res` can be ill-formed (of kind `Error`) that is an unresolved name.

An important thing that I need to establish is that resolution (`Res`) points to the identifier node (either to an
identifier of name in `Def` or to a local variable identifier) but key in `ResStorage` map is a node id of a resolved
path (`TypePath` or `PathExpr`), except labels and lifetimes which are not paths.

#### Patterns

What about patterns? We talked about `let` statement and `func` parameters, but they are patterns. There's
nothing hard in pattern name resolution -- mostly every identifier, except PathExpr, that appeared in the pattern is
a binding.

#### Labels and lifetimes

__TODO__


#### `lang` items

Some items are required for internal logic, e.g. when we write `int?`, it is an `Option<int>` type, and the compiler must at first find the `Option` ADT to lower `int?`.

`lang` is an attribute of the form `@lang(name: '[NAME]')`, where `name` is an optional label and should be used to avoid problems if in the future new parameters will be added.



