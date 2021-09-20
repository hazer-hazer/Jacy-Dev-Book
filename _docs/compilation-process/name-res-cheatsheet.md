# Name Resolution Cheatsheet

Name Resolution is not that difficult stage of compilation, anyway tricky one.
Here I tried to collect workflows for different resolution cases and connections between them.

Okay, what classes do we have:
- `ModuleTreeBuilder` - by the name you can see that this one builds module tree.
- `Importer` - this one resolves `use` declarations and imports new items to module tree.
- `NameResolver` - resolves names, that is, binds each usage to definition.
- `PathResolver` - helper class which unifies path resolution logic for all name resolution sub-stages.
- `DefTable` - common definitions info storage

#### Basic structures

##### `Symbol`

Identifies interned string, read more about symbols [here](../code-docs/interning.md)

##### `Namespace`

An enumeration of namespaces. Each namespace is a separate storage for definitions, thus type names are not collided with value names, etc.
There is a one special variant - `Namespace::Any`, it is not used in definition storages and mappings, by the way is used in methods, e.g. to collect definitions with the same name from all namespaces. Never store `Namespace::Any` in `DefTable`, only use it as a helper.

##### `Def`

Definition structure, holds [`DefKind`](#defkind) and [`DefId`](#defid-and-defindex). You can access particular definition via `DefTable::getDef` or get all, defined, using `DefTable::getDefinitions`

##### `DefId` and `DefIndex`

`DefIndex` is a simple index type, i.e. integer wrapper to create distinct integer type (C++ does no support).
`DefId` is a unique definition identifier, for now it only holds `DefIndex` but might be extended in the future.

`DefId::index` is the index of vector from `DefTable::defs`. You can get particular definition by `DefId` or `DefIndex` from `DefTable` via `getDef`.

###### `ROOT_DEF_ID`

The constant for root module definition, used in many places for validations and logic checks.

##### `DefKind`

Enumeration of definitions kinds. Each kind has some properties, e.g. [namespace](#namespace) where it will be defined.
You can get [`DefKind`](#defkind) from [`Def`](#def) structure if you have one on hand.

To find out in which [namespace](#namespace) specific [`DefKind`](#defkind) must be defined call `Def::getDefKindNS`.

##### `Vis`

Visibility enumeration, for now only `Vis::Unset` and `Vis::Pub` exist.

##### `PerNS<T>`

A helper template structure that stores value of some type for each namespace.

##### `PrimTypeSet`

##### `Module`

Module is a single node of Module Tree.
Fields:
- _kind_  - Kind of module, i.e. `Def` (named module bound to some definition) or `Block` (anonymous module). Type is the `ModuleKind` enumeration.
- _id_ - Identifier of module - either `DefId` (for `ModuleKind::Def`) or `NodeId` (for `ModuleKind::Block`).
- _parent_ - Optional parent that is an another module (only root module does not have parent).
- _nearestModDef_ - Nearest definition of kind `DefKind::Mod`, always present. For modules which are `DefKind::Mod` by themselves _nearestModDef_ point to the same modules (root module is also of kind `DefKind`, thus _nearestModDef_ of root module is the same as [`ROOT_DEF_ID`](#root_def_id)).
- _perNS_ - [`PerNS<map<Symbol, NameBinding>>`](#pernst). A per-namespace collection of mappings __Symbol__ (some name) __->__ __DefId__ (some definition).
- _shadowedPrimTypes_ - module [`PrimTypeSet`](#primtypeset), i.e. flags showing which primitive types (e.g. `int`, `f32`) are shadowed in the module.


#### `DefTable`

`DefTable` holds all data we need about definitions and relations between them.

##### Fields, Storages

> _Direct storage_ mark means that this field is the final storage, i.e. it is not a mapping and other items map to it, _Indirect storage_ is an opposite.

- _defs_ - `vector<Def>` - _Direct storage_ - Definition collection, `DefIndex` points to index in _defs_.
- _modules_ - `DefMap<Module::Ptr>` - _Direct storage_ - Maps definitions to modules -- _Named modules_. Used everywhere, filled in the `ModuleTreeBuilder`.
- _blocks_ - `NodeMap<Module::Ptr>` - _Direct storage_ - Maps block nodes to modules -- _Anonymous modules_. Used everywhere, filled in the `ModuleTreeBuilder`.
- _useDeclModules_ - `NodeMap<Module::Ptr>` - _Indirect storage_ - Maps node id of `use` item to module it defined it. Used by `Importer`, filled in the `ModuleTreeBuilder`.
- _defVisMap_ - `DefMap<Vis>` - Maps definition to its visibility.
- _nodeIdDefIdMap_ -  - Maps definition node id to its [`DefId`](#defid-and-defindex)
- _defIdNodeIdMap_ - Maps [`DefId`](#defid-and-defindex) to definition node id
- _importAliases_ - Maps [`DefId`](#defid-and-defindex) of import alias, i.e. definition appeared from `use` declaration, to another definition (that also might be an import alias).

##### Basic API

This API is almost a list of helpers to retrieve items form fields described above.

- Working with definitions:
  - _getDef([DefId/DefIndex](#defid-and-defindex)) -> [Def](#def)_ - get definition by `DefId` or `DefIndex`
  - _getDefUnwind([DefId](#defid-and-defindex)) -> [Def](#def)_ - get definition unwinding aliases (if definition is an `ImportAlias`)
  - _getDefVis([DefId](#defid-and-defindex)) -> [Vis](#vis)_ - get definition visibility
  - _getNodeIdByDefId([DefId](#defid-and-defindex)) -> NodeId_ - get node id of definition node by definition id
  - _getDefIdByNodeId(NodeId) -> [DefId](#defid-and-defindex)_ - get definition id by node id
  - _getDefNameSpan([DefId](#defid-and-defindex)) -> Span_ - get span of definition identifier (e.g. in `func foo() {}` it returns span for `foo`)

- Working with modules:
  - _getModule([DefId](#defid-and-defindex)) -> [Module::Ptr](#module)_ - get module by definition id
  - _getBlock(NodeId) -> [Module::Ptr](#module)_ - get block (anonymous module) by node id
