---
description: >-
  This chapter is the beginning of something that kinda looks like a
  documentation of compiler internals.
---

# Workflow

#### Workflow overview

##### Lexing
At this step we run through the whole source code and split into smallest meaningful for compiler units -- tokens.

> In the future this step will follow pre-lexing \(when code is converted into UTF-8 code points\), but now UTF-8 support is in backlog.

##### Parsing
At the parsing stage will build AST from list of tokens produced by the lexer. The parser is primarily LL\(1\), but for example, it uses the left-corner feature for precedence parsing which can be considered LR parsing style.

##### AST Validation
As far as we trying not to overload parser with correctness checks we need to validate the AST parser built. It is really simpler to parse when we don't need to check some special cases which we allow/disallow, and it is more convenient for developers to update these rules when language design changes if they all are placed at a separate stage.

> The weird think I need to note is that historically AST validator is named `Linter` and likely it would be renamed in the future.

##### Module-Tree Building
Here the name resolution begins -- "Module tree building" is an important stage at which we perform forward declaration before binding names to definitions. Don't confuse Module with `mod` -- these are different things but at the same time strongly connected. 

Module-tree is an extremely simple thing -- it is just a tree of nodes \(modules\) and each node contains maps `{name: node_id}` where `name` is just a string and `node_id` is a unique identifier to the definition of `name`. 

#### Name Resolution
We've got everything to finally connect paths, identifiers, etc. to their definitions.

At this step we implement conception of ribs, that is, scopes but pushed more often than `{}` appears in the code. Name resolution is tricky, sometimes, but we've greatly simplified our life with "Module tree building".



