# Name Resolution Cheatsheet

Name Resolution is not that difficult stage of compilation, anyway tricky one.
Here I tried to collect workflows for different resolution cases and connections between them.

Okay, what classes do we have:
- `ModuleTreeBuilder` - by the name you can see that this one builds module tree.
- `Importer` - this one resolves `use` declarations and imports new items to module tree.
- `NameResolver` - resolves names, that is, binds each usage to definition.
- `PathResolver` - helper class which unifies path resolution logic for all name resolution sub-stages.


