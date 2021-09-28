---
layout: 'default'
title: 'Name resolution cheatsheet'
nav_order: 100
parent: 'Appendices'
# No children
grand_parent: 'Appendices'
---

# Name Resolution Cheatsheet

The Name Resolution stage is not that difficult stage of compilation, anyway tricky one.
Here I tried to collect workflows for different resolution cases and connections between them.

Okay, what classes do we have:
- `ModuleTreeBuilder` - by the name you can see that this one builds a module tree.
- `Importer` - this one resolves `use` declarations and imports new items to the module tree.
- `NameResolver` - resolves names, that is, binds each usage to the definition.
- `PathResolver` - helper class that unifies path resolution logic for all name resolution sub-stages.
- `DefTable` - common definitions info storage

### Basic structures

#### `Symbol`

Identifies interned string, read more about symbols [here](../code-docs/interning.md)

#### `Namespace`

An enumeration of namespaces. Each namespace is a separate storage for definitions, thus type names do not collide with value names, etc.
There is one special variant - `Namespace::Any`, it is not used in definition storages and mappings, by the way, is used in methods, e.g. to collect definitions with the same name from all namespaces. Never store `Namespace::Any` in `DefTable`, only use it as a helper.

#### `Def`

Definition structure, holds [`DefKind`](#defkind) and [`DefId`](#defid-and-defindex). You can access particular definition via `DefTable::getDef` or get all, defined, using `DefTable::getDefinitions`

#### `DefId` & `DefIndex`

`DefIndex` is a simple index type, i.e. integer wrapper to create a distinct integer type (C++ does not support it).
`DefId` is a unique definition identifier, currently, it only holds `DefIndex` but might be extended in the future.

`DefId::index` is the index of vector from `DefTable::defs`. You can get particular definition by `DefId` or `DefIndex` from `DefTable` via `getDef`.

##### `ROOT_DEF_ID`

The constant for root module definition, used in many places for validations and logic checks.

#### `DefKind`

Enumeration of definitions kinds. Each kind has some properties, e.g. [namespace](#namespace) where it will be defined.
You can get [`DefKind`](#defkind) from [`Def`](#def) structure if you have one on hand.

To find out in which [namespace](#namespace) specific [`DefKind`](#defkind) must be defined call `Def::getDefKindNS`.

#### `Vis`

Visibility enumeration, for now only `Vis::Unset` and `Vis::Pub` exist.

#### `PerNS<T>`

A helper template structure that stores a value of some type for each namespace.

#### `PrimTypeSet`

Bits-optimized collection of primitive types flags. It can be used to mark specific primitive types used/shadowed, etc.
Used by the module to save shadowed primitive types.

#### `Module`

The `Module` is a single node of the Module Tree.
Fields:
- _kind_  - Kind of module, i.e. `Def` (named module bound to some definition) or `Block` (anonymous module). Type is the `ModuleKind` enumeration.
- _id_ - Identifier of module - either `DefId` (for `ModuleKind::Def`) or `NodeId` (for `ModuleKind::Block`).
- _parent_ - Optional parent that is another module (only root module does not have a parent).
- _nearestModDef_ - Nearest definition of a kind `DefKind::Mod`, always present. For modules which are `DefKind::Mod` by themselves _nearestModDef_ point to the same modules (root module is also of a kind `DefKind`, thus _nearestModDef_ of root module is the same as [`ROOT_DEF_ID`](#root_def_id)).
- _perNS_ - [PerNS<map<Symbol, [NameBinding](#namebinding)>>](#pernst). A per-namespace collection of mappings __Symbol__ (some name) __->__ __DefId__ (some definition).
- _shadowedPrimTypes_ - module [`PrimTypeSet`](#primtypeset), i.e. flags showing which primitive types (e.g. `int`, `f32`) are shadowed in the module.

#### `NameBinding`

The `Module` binds names either to [`FOS`](#fosid) or to some [definition](#defid-and-defindex).
This is why `NameBinding` exists, it is an ADT for `FOS` and `DefId`.

#### `FOSId`

FOS stands for "Function Overload Set". In _Jacy_ you can overload functions via different label names, i.e. not by types but `func foo(from: int)` and `func foo(to: int)` can exist together.

`FOSId` is a unique identifier for one FOS -- a collection of functions with the same name, defined in the same module.

For example, in:
<div class="code-fence highlight-jc hljs">
            <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">mod</span> m {</div><div class="line-num" data-line-num="2">2</div><div class="line">    <span class="hljs-keyword">func</span> <span class="hljs-title function_">foo</span>(from: <span class="hljs-type">int</span>) {}</div><div class="line-num" data-line-num="3">3</div><div class="line"></div><div class="line-num" data-line-num="4">4</div><div class="line">    <span class="hljs-keyword">func</span> <span class="hljs-title function_">foo</span>(to: <span class="hljs-type">int</span>) {}</div><div class="line-num" data-line-num="5">5</div><div class="line">}</div>
        </div>

`mod m` only holds [`NameBinding`](#namebinding) with name `foo` (base name of FOS) which points to `FOSId` of FOS `foo` in [`DefTable`](#deftable).
To access a specific function, at first, you need to get `FOSId` from the module and then go to the [`DefTable`](#deftable) to search for a suffix.

Function suffix is an interned string such as `(from:)` or `(to:)`, i.e. function label list.

### `DefTable`

`DefTable` holds all data, we need, about definitions and relations between them.

#### Fields, Storages

> _Direct storage_ mark means that this field is the final storage, i.e. it is not a mapping and other items map to it, _Indirect storage_ is an opposite.

- _defs_ - `vector<Def>` - _Direct storage_ - Definition collection, `DefIndex` points to index in _defs_.
- _modules_ - `DefMap<Module::Ptr>` - _Direct storage_ - Maps definitions to modules -- _Named modules_. Used everywhere, filled in the `ModuleTreeBuilder`.
- _blocks_ - `NodeMap<Module::Ptr>` - _Direct storage_ - Maps block nodes to modules -- _Anonymous modules_. Used everywhere, filled in the `ModuleTreeBuilder`.
- _useDeclModules_ - `NodeMap<Module::Ptr>` - _Indirect storage_ - Maps node id of `use` item to module it defined it. Used by `Importer`, filled in the `ModuleTreeBuilder`.
- _defVisMap_ - `DefMap<Vis>` - Maps definition to its visibility.
- _nodeIdDefIdMap_ -  - Maps definition node id to its [`DefId`](#defid-and-defindex).
- _defIdNodeIdMap_ - Maps [`DefId`](#defid-and-defindex) to definition node id.
- _importAliases_ - Maps [`DefId`](#defid-and-defindex) of import alias, i.e. definition appeared from `use` declaration to another definition (that also might be an import alias).

#### Basic API

This API is almost a list of helpers to retrieve items from the fields described above.

- Working with definitions:
  - _getDef([DefId/DefIndex](#defid-and-defindex)) -> [Def](#def)_ - get definition by `DefId` or `DefIndex`.
  - _getDefUnwind([DefId](#defid-and-defindex)) -> [Def](#def)_ - get definition unwinding aliases (if definition is an `ImportAlias`).
  - _getDefVis([DefId](#defid-and-defindex)) -> [Vis](#vis)_ - get definition visibility.
  - _getNodeIdByDefId([DefId](#defid-and-defindex)) -> NodeId_ - get node id of definition node by definition id.
  - _getDefIdByNodeId(NodeId) -> [DefId](#defid-and-defindex)_ - get definition id by node id.
  - _getDefNameSpan([DefId](#defid-and-defindex)) -> Span_ - get span of definition identifier (e.g. in `func foo() {}` it returns span for `foo`).

- Working with modules:
  - _getModule([DefId](#defid-and-defindex)) -> [Module::Ptr](#module)_ - get module by definition id.
  - _getBlock(NodeId) -> [Module::Ptr](#module)_ - get block (anonymous module) by node id.
  - _getFuncModule([FOSId](#fosid), Symbol) -> [Module::Ptr](#module)_ - get function module by `FOSId` and specific suffix, together they non-ambiguously specify some function.
  - _addModule([DefId](#defid-and-defindex), [Module::Ptr](#module))_ - Add named module, binding it by `DefId`.
  - _addBlock(NodeId, [Module::Ptr](#module))_ - Add block (anonymous module), binding it by NodeId.
<div class="nav-btn-block">
    <button class="nav-btn left">
    <a class="link" href="/Jacy-Dev-Book/appendices/cheatsheets/index.html">< Appendices</a>
</button>

    
</div>
