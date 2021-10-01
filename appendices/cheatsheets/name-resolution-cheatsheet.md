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
- <span class="inline-code highlight-jc hljs">Importer</span> - this one resolves <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">use</span></span> declarations and imports new items to the module tree.
- <span class="inline-code highlight-jc hljs">NameResolver</span> - resolves names, that is, binds each usage to the definition.
- <span class="inline-code highlight-jc hljs">PathResolver</span> - helper class that unifies path resolution logic for all name resolution sub-stages.
- <span class="inline-code highlight-jc hljs">DefTable</span> - common definitions info storage

## Basic structures

### <span class="inline-code highlight-jc hljs">Symbol</span>

Identifies interned string, read more about symbols [here](../code-docs/interning.md)

### <span class="inline-code highlight-jc hljs">Namespace</span>

An enumeration of namespaces. Each namespace is a separate storage for definitions, thus type names do not collide with value names, etc.
There is one special variant - <span class="inline-code highlight-jc hljs">Namespace::Any</span>, it is not used in definition storages and mappings, by the way, is used in methods, e.g. to collect definitions with the same name from all namespaces. Never store <span class="inline-code highlight-jc hljs">Namespace::Any</span> in <span class="inline-code highlight-jc hljs">DefTable</span>, only use it as a helper.

### <span class="inline-code highlight-jc hljs">Def</span>

Definition structure, holds [<span class="inline-code highlight-jc hljs">DefKind</span>](#defkind) and [<span class="inline-code highlight-jc hljs">DefId</span>](#defid-and-defindex). You can access particular definition via <span class="inline-code highlight-jc hljs">DefTable::getDef</span> or get all, defined, using <span class="inline-code highlight-jc hljs">DefTable::getDefinitions</span>

### <span class="inline-code highlight-jc hljs">DefId</span> & <span class="inline-code highlight-jc hljs">DefIndex</span>

<span class="inline-code highlight-jc hljs">DefIndex</span> is a simple index type, i.e. integer wrapper to create a distinct integer type (C++ does not support it).
<span class="inline-code highlight-jc hljs">DefId</span> is a unique definition identifier, currently, it only holds <span class="inline-code highlight-jc hljs">DefIndex</span> but might be extended in the future.

<span class="inline-code highlight-jc hljs">DefId::index</span> is the index of vector from <span class="inline-code highlight-jc hljs">DefTable::defs</span>. You can get particular definition by <span class="inline-code highlight-jc hljs">DefId</span> or <span class="inline-code highlight-jc hljs">DefIndex</span> from <span class="inline-code highlight-jc hljs">DefTable</span> via <span class="inline-code highlight-jc hljs">getDef</span>.

#### <span class="inline-code highlight-jc hljs">ROOT_DEF_ID</span>

The constant for root module definition, used in many places for validations and logic checks.

### <span class="inline-code highlight-jc hljs">DefKind</span>

Enumeration of definitions kinds. Each kind has some properties, e.g. [namespace](#namespace) where it will be defined.
You can get [<span class="inline-code highlight-jc hljs">DefKind</span>](#defkind) from [<span class="inline-code highlight-jc hljs">Def</span>](#def) structure if you have one on hand.

To find out in which [namespace](#namespace) specific [<span class="inline-code highlight-jc hljs">DefKind</span>](#defkind) must be defined call <span class="inline-code highlight-jc hljs">Def::getDefKindNS</span>.

### <span class="inline-code highlight-jc hljs">Vis</span>

Visibility enumeration, for now only <span class="inline-code highlight-jc hljs">Vis::Unset</span> and <span class="inline-code highlight-jc hljs">Vis::Pub</span> exist.

### <span class="inline-code highlight-jc hljs">PerNS&lt;T&gt;</span>

A helper template structure that stores a value of some type for each namespace.

### <span class="inline-code highlight-jc hljs">PrimTypeSet</span>

Bits-optimized collection of primitive types flags. It can be used to mark specific primitive types used/shadowed, etc.
Used by the module to save shadowed primitive types.

### <span class="inline-code highlight-jc hljs">Module</span>

The <span class="inline-code highlight-jc hljs">Module</span> is a single node of the Module Tree.
Fields:

- _kind_  - Kind of module, i.e. <span class="inline-code highlight-jc hljs">Def</span> (named module bound to some definition) or <span class="inline-code highlight-jc hljs">Block</span> (anonymous module). Type is the <span class="inline-code highlight-jc hljs">ModuleKind</span> enumeration.
- _id_ - Identifier of module - either <span class="inline-code highlight-jc hljs">DefId</span> (for <span class="inline-code highlight-jc hljs">ModuleKind::Def</span>) or <span class="inline-code highlight-jc hljs">NodeId</span> (for <span class="inline-code highlight-jc hljs">ModuleKind::Block</span>).
- _parent_ - Optional parent that is another module (only root module does not have a parent).
- _nearestModDef_ - Nearest definition of a kind <span class="inline-code highlight-jc hljs">DefKind::Mod</span>, always present. For modules which are <span class="inline-code highlight-jc hljs">DefKind::Mod</span> by themselves _nearestModDef_ point to the same modules (root module is also of a kind <span class="inline-code highlight-jc hljs">DefKind</span>, thus _nearestModDef_ of root module is the same as [<span class="inline-code highlight-jc hljs">ROOT_DEF_ID</span>](#root_def_id)).
- _perNS_ - [PerNS<map<Symbol, [NameBinding](#namebinding)>>](#pernst). A per-namespace collection of mappings __Symbol__ (some name) __->__ __DefId__ (some definition).
- _shadowedPrimTypes_ - module [<span class="inline-code highlight-jc hljs">PrimTypeSet</span>](#primtypeset), i.e. flags showing which primitive types (e.g. <span class="inline-code highlight-jc hljs"><span class="hljs-type">int</span></span>, <span class="inline-code highlight-jc hljs"><span class="hljs-type">f32</span></span>) are shadowed in the module.

### <span class="inline-code highlight-jc hljs">NameBinding</span>

The <span class="inline-code highlight-jc hljs">Module</span> binds names either to [<span class="inline-code highlight-jc hljs">FOS</span>](#fosid) or to some [definition](#defid-and-defindex).
This is why <span class="inline-code highlight-jc hljs">NameBinding</span> exists, it is an ADT for <span class="inline-code highlight-jc hljs">FOS</span> and <span class="inline-code highlight-jc hljs">DefId</span>.

### <span class="inline-code highlight-jc hljs">FOSId</span>

FOS stands for "Function Overload Set". In _Jacy_ you can overload functions via different label names, i.e. not by types but <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">func</span> <span class="hljs-title function_">foo</span>(from: <span class="hljs-type">int</span>)</span> and <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">func</span> <span class="hljs-title function_">foo</span>(to: <span class="hljs-type">int</span>)</span> can exist together.

<span class="inline-code highlight-jc hljs">FOSId</span> is a unique identifier for one FOS -- a collection of functions with the same name, defined in the same module.

For example, in:

<div class="code-fence">
            <div class="code line-numbers highlight-jc hljs">
                <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">mod</span> <span class="hljs-title class_">m</span> {</div><div class="line-num" data-line-num="2">2</div><div class="line">    <span class="hljs-keyword">func</span> <span class="hljs-title function_">foo</span>(from: <span class="hljs-type">int</span>) {}</div><div class="line-num" data-line-num="3">3</div><div class="line"></div><div class="line-num" data-line-num="4">4</div><div class="line">    <span class="hljs-keyword">func</span> <span class="hljs-title function_">foo</span>(to: <span class="hljs-type">int</span>) {}</div><div class="line-num" data-line-num="5">5</div><div class="line">}</div>
            </div>
        </div>

<span class="inline-code highlight-jc hljs"><span class="hljs-keyword">mod</span> <span class="hljs-title class_">m</span></span> only holds [<span class="inline-code highlight-jc hljs">NameBinding</span>](#namebinding) with name <span class="inline-code highlight-jc hljs">foo</span> (base name of FOS) which points to <span class="inline-code highlight-jc hljs">FOSId</span> of FOS <span class="inline-code highlight-jc hljs">foo</span> in [<span class="inline-code highlight-jc hljs">DefTable</span>](#deftable).
To access a specific function, at first, you need to get <span class="inline-code highlight-jc hljs">FOSId</span> from the module and then go to the [<span class="inline-code highlight-jc hljs">DefTable</span>](#deftable) to search for a suffix.

Function suffix is an interned string such as <span class="inline-code highlight-jc hljs">(from:)</span> or <span class="inline-code highlight-jc hljs">(to:)</span>, i.e. function label list.

### <span class="inline-code highlight-jc hljs">DefTable</span>

<span class="inline-code highlight-jc hljs">DefTable</span> holds all data, we need, about definitions and relations between them.

#### Fields, Storages

> _Direct storage_ mark means that this field is the final storage, i.e. it is not a mapping and other items map to it, _Indirect storage_ is an opposite.

- _defs_ - <span class="inline-code highlight-jc hljs">vector&lt;Def&gt;</span> - _Direct storage_ - Definition collection, <span class="inline-code highlight-jc hljs">DefIndex</span> points to index in _defs_.
- _modules_ - <span class="inline-code highlight-jc hljs">DefMap&lt;Module::Ptr&gt;</span> - _Direct storage_ - Maps definitions to modules -- _Named modules_. Used everywhere, filled in the <span class="inline-code highlight-jc hljs">ModuleTreeBuilder</span>.
- _blocks_ - <span class="inline-code highlight-jc hljs">NodeMap&lt;Module::Ptr&gt;</span> - _Direct storage_ - Maps block nodes to modules -- _Anonymous modules_. Used everywhere, filled in the <span class="inline-code highlight-jc hljs">ModuleTreeBuilder</span>.
- _useDeclModules_ - <span class="inline-code highlight-jc hljs">NodeMap&lt;Module::Ptr&gt;</span> - _Indirect storage_ - Maps node id of <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">use</span></span> item to module it defined it. Used by <span class="inline-code highlight-jc hljs">Importer</span>, filled in the <span class="inline-code highlight-jc hljs">ModuleTreeBuilder</span>.
- _defVisMap_ - <span class="inline-code highlight-jc hljs">DefMap&lt;Vis&gt;</span> - Maps definition to its visibility.
- _nodeIdDefIdMap_ -  - Maps definition node id to its [<span class="inline-code highlight-jc hljs">DefId</span>](#defid-and-defindex).
- _defIdNodeIdMap_ - Maps [<span class="inline-code highlight-jc hljs">DefId</span>](#defid-and-defindex) to definition node id.
- _importAliases_ - Maps [<span class="inline-code highlight-jc hljs">DefId</span>](#defid-and-defindex) of import alias, i.e. definition appeared from <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">use</span></span> declaration to another definition (that also might be an import alias).

#### Basic API

This API is almost a list of helpers to retrieve items from the fields described above.

- Working with definitions:
  - _getDef([DefId/DefIndex](#defid-and-defindex)) -> [Def](#def)_ - get definition by <span class="inline-code highlight-jc hljs">DefId</span> or <span class="inline-code highlight-jc hljs">DefIndex</span>.
  - _getDefUnwind([DefId](#defid-and-defindex)) -> [Def](#def)_ - get definition unwinding aliases (if definition is an <span class="inline-code highlight-jc hljs">ImportAlias</span>).
  - _getDefVis([DefId](#defid-and-defindex)) -> [Vis](#vis)_ - get definition visibility.
  - _getNodeIdByDefId([DefId](#defid-and-defindex)) -> NodeId_ - get node id of definition node by definition id.
  - _getDefIdByNodeId(NodeId) -> [DefId](#defid-and-defindex)_ - get definition id by node id.
  - _getDefNameSpan([DefId](#defid-and-defindex)) -> Span_ - get span of definition identifier (e.g. in <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">func</span> <span class="hljs-title function_">foo</span>() {}</span> it returns span for <span class="inline-code highlight-jc hljs">foo</span>).

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
