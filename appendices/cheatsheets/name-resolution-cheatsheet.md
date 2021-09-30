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

- <span class="inline-code highlight-jc hljs">ModuleTreeBuilder</span> - by the name you can see that this one builds a module tree.
- <span class="inline-code highlight-jc hljs">Imp<span class="hljs-operator">or</span>ter` <span class="hljs-operator">-</span> this one resolves `<span class="hljs-keyword">use</span></span> declarations and imports new items to the module tree.
- <span class="inline-code highlight-jc hljs">NameResolver</span> - resolves names, that is, binds each usage to the definition.
- <span class="inline-code highlight-jc hljs">PathResolver</span> - helper class that unifies path resolution logic for all name resolution sub-stages.
- <span class="inline-code highlight-jc hljs">DefTable</span> - common definitions info storage

## Basic structures

### <span class="inline-code highlight-jc hljs">Symbol</span>

Identifies interned string, read more about symbols [here](../code-docs/interning.md)

### <span class="inline-code highlight-jc hljs">Namespace</span>

An enumeration of namespaces. Each namespace is a separate storage for definitions, thus type names do not collide with value names, etc.
There is one special variant - <span class="inline-code highlight-jc hljs">Namespace::Any`, it is <span class="hljs-operator">not</span> used <span class="hljs-keyword">in</span> definition st<span class="hljs-operator">or</span>ages <span class="hljs-operator">and</span> mappings, by the way, is used <span class="hljs-keyword">in</span> methods, e<span class="hljs-operator">.</span>g<span class="hljs-operator">.</span> to collect definitions with the same name from all namespaces<span class="hljs-operator">.</span> Never st<span class="hljs-operator">or</span>e `Namespace::Any` <span class="hljs-keyword">in</span> `DefTable</span>, only use it as a helper.

### <span class="inline-code highlight-jc hljs">Def</span>

Definition structure, holds [<span class="inline-code highlight-jc hljs">DefKind`](#defkind) <span class="hljs-operator">and</span> [`DefId`](#defid<span class="hljs-operator">-</span><span class="hljs-operator">and</span><span class="hljs-operator">-</span>defindex)<span class="hljs-operator">.</span> You can access particular definition via `DefTable::getDef` <span class="hljs-operator">or</span> get all, defined, using `DefTable::getDefinitions</span>

### <span class="inline-code highlight-jc hljs">DefId` <span class="hljs-operator">&amp;</span> `DefIndex</span>

<span class="inline-code highlight-jc hljs">DefIndex</span> is a simple index type, i.e. integer wrapper to create a distinct integer type (C++ does not support it).
<span class="inline-code highlight-jc hljs">DefId` is a unique definition identifier, currently, it only holds `DefIndex</span> but might be extended in the future.

<span class="inline-code highlight-jc hljs">DefId::index` is the index of vect<span class="hljs-operator">or</span> from `DefTable::defs`<span class="hljs-operator">.</span> You can get particular definition by `DefId` <span class="hljs-operator">or</span> `DefIndex` from `DefTable` via `getDef</span>.

#### <span class="inline-code highlight-jc hljs">ROOT_DEF_ID</span>

The constant for root module definition, used in many places for validations and logic checks.

### <span class="inline-code highlight-jc hljs">DefKind</span>

Enumeration of definitions kinds. Each kind has some properties, e.g. [namespace](#namespace) where it will be defined.
You can get [<span class="inline-code highlight-jc hljs">DefKind`](#defkind) from [`Def</span>](#def) structure if you have one on hand.

To find out in which [namespace](#namespace) specific [<span class="inline-code highlight-jc hljs">DefKind`](#defkind) must be defined call `Def::getDefKindNS</span>.

### <span class="inline-code highlight-jc hljs">Vis</span>

Visibility enumeration, for now only <span class="inline-code highlight-jc hljs">Vis::Unset` <span class="hljs-operator">and</span> `Vis::Pub</span> exist.

### <span class="inline-code highlight-jc hljs">PerNS<span class="hljs-operator">&lt;</span>T<span class="hljs-operator">&gt;</span></span>

A helper template structure that stores a value of some type for each namespace.

### <span class="inline-code highlight-jc hljs">PrimTypeSet</span>

Bits-optimized collection of primitive types flags. It can be used to mark specific primitive types used/shadowed, etc.
Used by the module to save shadowed primitive types.

### <span class="inline-code highlight-jc hljs">Module</span>

The <span class="inline-code highlight-jc hljs">Module</span> is a single node of the Module Tree.
Fields:

- _kind_  - Kind of module, i.e. <span class="inline-code highlight-jc hljs">Def` (named module bound to some definition) <span class="hljs-operator">or</span> `Block` (anonymous module)<span class="hljs-operator">.</span> Type is the `ModuleKind</span> enumeration.
- _id_ - Identifier of module - either <span class="inline-code highlight-jc hljs">DefId` (f<span class="hljs-operator">or</span> `ModuleKind::Def`) <span class="hljs-operator">or</span> `NodeId` (f<span class="hljs-operator">or</span> `ModuleKind::Block</span>).
- _parent_ - Optional parent that is another module (only root module does not have a parent).
- _nearestModDef_ - Nearest definition of a kind <span class="inline-code highlight-jc hljs">DefKind::Mod`, always present<span class="hljs-operator">.</span> F<span class="hljs-operator">or</span> modules which are `DefKind::Mod` by themselves _nearestModDef_ point to the same <span class="hljs-title function_ invoke__">modules</span> (root module is also of a kind `DefKind`, thus _nearestModDef_ of root module is the same <span class="hljs-keyword">as</span> [`ROOT_DEF_ID</span>](#root_def_id)).
- _perNS_ - [PerNS<map<Symbol, [NameBinding](#namebinding)>>](#pernst). A per-namespace collection of mappings __Symbol__ (some name) __->__ __DefId__ (some definition).
- _shadowedPrimTypes_ - module [<span class="inline-code highlight-jc hljs">PrimTypeSet`](#primtypeset), i<span class="hljs-operator">.</span>e<span class="hljs-operator">.</span> flags showing which primitive <span class="hljs-title function_ invoke__">types</span> (e<span class="hljs-operator">.</span>g<span class="hljs-operator">.</span> `<span class="hljs-type">int</span>`, `<span class="hljs-type">f32</span></span>) are shadowed in the module.

### <span class="inline-code highlight-jc hljs">NameBinding</span>

The <span class="inline-code highlight-jc hljs">Module` binds names either to [`FOS</span>](#fosid) or to some [definition](#defid-and-defindex).
This is why <span class="inline-code highlight-jc hljs">NameBinding` exists, it is an ADT f<span class="hljs-operator">or</span> `FOS` <span class="hljs-operator">and</span> `DefId</span>.

### <span class="inline-code highlight-jc hljs">FOSId</span>

FOS stands for "Function Overload Set". In _Jacy_ you can overload functions via different label names, i.e. not by types but <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">func</span> <span class="hljs-title function_">foo</span>(from: <span class="hljs-type">int</span>)` <span class="hljs-operator">and</span> `<span class="hljs-keyword">func</span> <span class="hljs-title function_">foo</span>(to: <span class="hljs-type">int</span>)</span> can exist together.

<span class="inline-code highlight-jc hljs">FOSId</span> is a unique identifier for one FOS -- a collection of functions with the same name, defined in the same module.

For example, in:

<div class="code-fence highlight-jc hljs">
            <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">mod</span> m {</div><div class="line-num" data-line-num="2">2</div><div class="line">    <span class="hljs-keyword">func</span> <span class="hljs-title function_">foo</span>(from: <span class="hljs-type">int</span>) {}</div><div class="line-num" data-line-num="3">3</div><div class="line"></div><div class="line-num" data-line-num="4">4</div><div class="line">    <span class="hljs-keyword">func</span> <span class="hljs-title function_">foo</span>(to: <span class="hljs-type">int</span>) {}</div><div class="line-num" data-line-num="5">5</div><div class="line">}</div>
        </div>

<span class="inline-code highlight-jc hljs"><span class="hljs-keyword">mod</span> m` only holds [`NameBinding`](#namebinding) with name `foo` (base name of FOS) which points to `FOSId` of FOS `foo` <span class="hljs-keyword">in</span> [`DefTable</span>](#deftable).
To access a specific function, at first, you need to get <span class="inline-code highlight-jc hljs">FOSId` from the module <span class="hljs-operator">and</span> then go to the [`DefTable</span>](#deftable) to search for a suffix.

Function suffix is an interned string such as <span class="inline-code highlight-jc hljs">(from:)` <span class="hljs-operator">or</span> `(to:)</span>, i.e. function label list.

### <span class="inline-code highlight-jc hljs">DefTable</span>

<span class="inline-code highlight-jc hljs">DefTable</span> holds all data, we need, about definitions and relations between them.

#### Fields, Storages

> _Direct storage_ mark means that this field is the final storage, i.e. it is not a mapping and other items map to it, _Indirect storage_ is an opposite.

- _defs_ - <span class="inline-code highlight-jc hljs">vect<span class="hljs-operator">or</span><span class="hljs-operator">&lt;</span>Def<span class="hljs-operator">&gt;</span>` <span class="hljs-operator">-</span> _Direct st<span class="hljs-operator">or</span>age_ <span class="hljs-operator">-</span> Definition collection, `DefIndex</span> points to index in _defs_.
- _modules_ - <span class="inline-code highlight-jc hljs">DefMap<span class="hljs-operator">&lt;</span>Module::Ptr<span class="hljs-operator">&gt;</span>` <span class="hljs-operator">-</span> _Direct st<span class="hljs-operator">or</span>age_ <span class="hljs-operator">-</span> Maps definitions to modules <span class="hljs-operator">-</span><span class="hljs-operator">-</span> _Named modules_<span class="hljs-operator">.</span> Used everywhere, filled <span class="hljs-keyword">in</span> the `ModuleTreeBuilder</span>.
- _blocks_ - <span class="inline-code highlight-jc hljs">NodeMap<span class="hljs-operator">&lt;</span>Module::Ptr<span class="hljs-operator">&gt;</span>` <span class="hljs-operator">-</span> _Direct st<span class="hljs-operator">or</span>age_ <span class="hljs-operator">-</span> Maps block nodes to modules <span class="hljs-operator">-</span><span class="hljs-operator">-</span> _Anonymous modules_<span class="hljs-operator">.</span> Used everywhere, filled <span class="hljs-keyword">in</span> the `ModuleTreeBuilder</span>.
- _useDeclModules_ - <span class="inline-code highlight-jc hljs">NodeMap<span class="hljs-operator">&lt;</span>Module::Ptr<span class="hljs-operator">&gt;</span>` <span class="hljs-operator">-</span> _Indirect st<span class="hljs-operator">or</span>age_ <span class="hljs-operator">-</span> Maps node id of `<span class="hljs-keyword">use</span>` item to module it defined it<span class="hljs-operator">.</span> Used by `Imp<span class="hljs-operator">or</span>ter`, filled <span class="hljs-keyword">in</span> the `ModuleTreeBuilder</span>.
- _defVisMap_ - <span class="inline-code highlight-jc hljs">DefMap<span class="hljs-operator">&lt;</span>Vis<span class="hljs-operator">&gt;</span></span> - Maps definition to its visibility.
- _nodeIdDefIdMap_ -  - Maps definition node id to its [<span class="inline-code highlight-jc hljs">DefId</span>](#defid-and-defindex).
- _defIdNodeIdMap_ - Maps [<span class="inline-code highlight-jc hljs">DefId</span>](#defid-and-defindex) to definition node id.
- _importAliases_ - Maps [<span class="inline-code highlight-jc hljs">DefId`](#defid<span class="hljs-operator">-</span><span class="hljs-operator">and</span><span class="hljs-operator">-</span>defindex) of imp<span class="hljs-operator">or</span>t alias, i<span class="hljs-operator">.</span>e<span class="hljs-operator">.</span> definition appeared from `<span class="hljs-keyword">use</span></span> declaration to another definition (that also might be an import alias).

#### Basic API

This API is almost a list of helpers to retrieve items from the fields described above.

- Working with definitions:
  - _getDef([DefId/DefIndex](#defid-and-defindex)) -> [Def](#def)_ - get definition by <span class="inline-code highlight-jc hljs">DefId` <span class="hljs-operator">or</span> `DefIndex</span>.
  - _getDefUnwind([DefId](#defid-and-defindex)) -> [Def](#def)_ - get definition unwinding aliases (if definition is an <span class="inline-code highlight-jc hljs">Imp<span class="hljs-operator">or</span>tAlias</span>).
  - _getDefVis([DefId](#defid-and-defindex)) -> [Vis](#vis)_ - get definition visibility.
  - _getNodeIdByDefId([DefId](#defid-and-defindex)) -> NodeId_ - get node id of definition node by definition id.
  - _getDefIdByNodeId(NodeId) -> [DefId](#defid-and-defindex)_ - get definition id by node id.
  - _getDefNameSpan([DefId](#defid-and-defindex)) -> Span_ - get span of definition identifier (e.g. in <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">func</span> <span class="hljs-title function_">foo</span>() {}` it returns span f<span class="hljs-operator">or</span> `foo</span>).

- Working with modules:
  - _getModule([DefId](#defid-and-defindex)) -> [Module::Ptr](#module)_ - get module by definition id.
  - _getBlock(NodeId) -> [Module::Ptr](#module)_ - get block (anonymous module) by node id.
  - _getFuncModule([FOSId](#fosid), Symbol) -> [Module::Ptr](#module)_ - get function module by <span class="inline-code highlight-jc hljs">FOSId</span> and specific suffix, together they non-ambiguously specify some function.
  - _addModule([DefId](#defid-and-defindex), [Module::Ptr](#module))_ - Add named module, binding it by <span class="inline-code highlight-jc hljs">DefId</span>.
  - _addBlock(NodeId, [Module::Ptr](#module))_ - Add block (anonymous module), binding it by NodeId.
<div class="nav-btn-block">
    <button class="nav-btn left">
    <a class="link" href="/Jacy-Dev-Book/appendices/cheatsheets/index.html">< Appendices</a>
</button>

    
</div>
