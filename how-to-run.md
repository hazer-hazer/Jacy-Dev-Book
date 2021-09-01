---
layout: 'default'
title: 'How to run'
nav_order: 108
# No parent
# No children
---

# How to run

CLI tool needs improvements, anyway it works and here's the syntax.

```
./jc (.exe for windows) [source files] --boolean-argument -key-value-argument=param1, param2, ..., paramN
```

There're two kinds of cli arguments:

* Boolean, that is, just a flag
* Key-value that receive parameters

Also arguments have constraints:

* Non-existent arguments, obviously, leads to an error
* For key-value arguments: count of arguments (may be any count) and allowed parameters (what you able to write after
  `=`)
* Dependencies. It means that some arguments are not allowed if other argument is not set, e.g. you cannot use
  `-compile-depth` (it controls how deep will compilation process go by workflow) without setting `--dev` argument.

Example usage.

```
./bin example.jc -print=ast
```

**The actual list of arguments**

**Key-value arguments**

* `-print` - (any count of parameters) - debug argument that allows to print representations of some structures on
  different compilation stages:
  * `all` - prints everything described below
  * `dir-tree` - prints directory tree where root file is placed, so we can check which files will be compiled
  * `source` - prints source for each file will be compiled
  * `tokens` - prints token stream (each on a new line) with position and length
  * `ast` - prints source code from the view of AST (does not actually print AST as a tree)
  * `sugg` - prints generated suggestions after each compilation stage (if it generates any)
  * `names` - (not working) - prints AST with markers (connections to names) after name resolution
* `-log-level` - (1 parameter) - Global log level
  * `dev` - Prints all logs and adds dev-logs
  * `debug`
  * `info` - (Default)
  * `warn` - (Don't confuse with warnings in the context of suggestions)
  * `error`
* `-lexer-log-level` - (1 parameter) - Lexer log level
  * (Same parameters as in `-log-level`)
* `-parser-log-level` - (1 parameter) - Parser log level
  * (Same parameters as in `-log-level`)
* `-name-resolver-log-level` - (1 parameter) - NameResolver log level
  * (Same parameters as in `-log-level`)
* `-compile-depth` - (1 parameter, depends on `dev`) - controls how deep will compilation process go by workflow (each
  next argument implicitly includes all previous arguments):
  * `parser` - stops after parsing files
  * `name-resolution` - stops after name resolution
* `-benchmark` - (1 parameter) - controls benchmarks printing kind
  * `final` - only one benchmark for the whole compilation process
  * `each-stage` - benches each stage of the compilation process
* `-parser-extra-debug` (depends on `dev`) - enables additional debug logs in parser
  * `no` - (default) - No extra debug info
  * `entries` - Prints what syntax units parser enters and leave
  * `all` - Prints `entries` and also special much info about skipping, etc.

**Boolean arguments**

* `--dev` - enables dev mode: all logs will be printed including `dev`-level logs and new logs will be added. Generally
  just produces more debug info everywhere.

**Explicit Boolean argument value**

What if you want to set bool-arg to `false`? Let's imagine that `--dev` is set by default (it is not anyway). There is
pretty same syntax for bool-args as for key-value args.

```
--dev=no
```

There's a bunch of allowed bool values:

| (Truthy) | (Falsy) |
| :--- | :--- |
| yes | no |
| y | n |
| true | false |
| 1 | 0 |
| on | off |

Also, they're case insensitive (alpha-values of course):

| (Truthy) | (Falsy) |
| :--- | :--- |
| Yes | No |
| Y | N |
| True | False |
| On | Off |
[Goal](goal.md){: .btn .btn-outline }[Ideas](ideas){: .btn .btn-outline }