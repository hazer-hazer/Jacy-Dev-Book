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

##### `Namespace`

An enumeration of namespaces. Each namespace is a separate storage for definitions, thus type names are not collided with value names, etc.
There is a one special variant - `Namespace::Any`, it is not used in definition storages and mappings, by the way is used in methods, e.g. to collect definitions with the same name from all namespaces. Never store `Namespace::Any` in `DefTable`, only use it as a helper.

##### `Def`

Definition structure, holds [`DefKind`](#defkind) and [`DefId`](#defid-and-defindex). You can access particular definition via `DefTable::getDef` or get all, defined, using `DefTable::getDefinitions`

##### `DefId` and `DefIndex`

`DefIndex` is a simple index type, i.e. integer wrapper to create distinct integer type (C++ does no support).
`DefId` is a unique definition identifier, for now it only holds `DefIndex` but might be extended in the future.

`DefId::index` is the index of vector from `DefTable::defs`. You can get particular definition by `DefId` or `DefIndex` from `DefTable` via `getDef`.

##### `DefKind`

Enumeration of definitions kinds. Each kind has some properties, e.g. [namespace](#namespace) where it will be defined.
You can get [`DefKind`](#defkind) from [`Def`](#def) structure if you have one on hand.

To find out in which [namespace](#namespace) specific [`DefKind`](#defkind) must be defined call `Def::getDefKindNS`.

##### `Vis`

Visibility enumeration, for now only `Vis::Unset` and `Vis::Pub` exist.

#### `DefTable`

`DefTable` holds all data we need about definitions and relations between them.


