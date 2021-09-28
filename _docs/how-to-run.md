# How to run

CLI tool needs improvements, anyway, it works, and here's the syntax.

```
./jc (.exe for windows) [source files] --boolean-argument -key-value-argument=param1, param2, ..., paramN
```

There're two kinds of CLI arguments:

* Boolean, that is, just a flag
* Key-value that receive parameters

Also, arguments have constraints:

* Non-existent arguments leads to an error
* For key-value arguments: count of arguments (maybe any count) and allowed parameters (what you are able to write after
  `=`)
* Dependencies. It means that some arguments are not allowed if another argument is not set, e.g. you cannot use
  `-compile-depth` (it controls how deep will compilation process go by workflow) without setting the `--dev` argument.

Example usage.

```
./bin example.jc -print=ast
```

**The actual list of options**

**Key-value options**

* `--dev-print` - (any count of parameters) - Development option that enables printing of representations of some structures on different compilation stages:
  * `suggestions` - Prints suggestions as non-formatted text for each stage.
  * `summary` - Prints summary table after when compilation completes (even with error).
  * `dir-tree` - Prints directory tree where root file is placed, so we can check which files will be compiled
  * `source` - Prints source for each file will be compiled
  * `tokens` - Prints token stream (each on a new line) with position and length
  * `ast` - Prints source code from the view of AST (does not actually print AST as a tree)
  * `ast-node-map` - (Ignores `ast` argument if passed) - Prints AST in the same way as `--dev-print=ast` by also appending node id after each AST node.
  * `ast-names` - Prints AST with color markers (connections to names) after name resolution.
  * `mod-tree` - Prints Module-Tree which, i.e. tree of items defined in scope tree.
  * `ribs` - Prints ribs, i.e. scopes for local variables.
  * `definitions` - Prints definition list.
  * `resolutions` - Prints resolution list.
  * `all` - prints everything described above
* `--log-level` - (1 parameter; default: `info`) - Global log level. The level is checked by precedence where `dev` has the lowest one and `error` the higher.
  * `debug`
  * `info` - (Default)
  * `warn` - (Don't confuse with warnings in the context of suggestions)
  * `error`
* `--lexer-log-level` - (1 parameter) - Lexer log level
  * (Same parameters as in `-log-level`)
* `--parser-log-level` - (1 parameter) - Parser log level
  * (Same parameters as in `-log-level`)
* `--name-resolver-log-level` - (1 parameter) - NameResolver log level
  * (Same parameters as in `-log-level`)
* `--compile-depth` - (1 parameter, depends on `dev`) - controls how deep will compilation process go by workflow (each
  next argument implicitly includes all previous arguments):
  * `parser` - stops after parsing files
  * `name-resolution` - stops after name resolution
* `--dev-stages` - (multiple parameters) - Enables dev-mode for specific stages, includes logs and additional info.
  * `lexer` - Lexing stage
  * `parser` - Parser stage
  * `name-res` - Name resolution stage (includes "module tree building", "importation" and "name resolution")
  * `lowering` - Lowering stage
* `--dev-log` - Enables development logs for specific objects and storages.
  * `lexer` - Enable dev logs for `Lexer`
  * `parser` - Enable dev logs for `Parser`
  * `mod-tree-builder` - Enable dev logs for `ModuleTreeBuilder`
  * `importer` - Enable dev logs for `Importer`
  * `name-resolver` - Enable dev logs for `NameResolver`
  * `lowering` - Enable dev logs for `Lowering`
* `--parser-extra-debug` (depends on `dev`) - enables additional debug logs in parser
  * `no` - (default) - No extra debug info
  * `entries` - Prints what syntax units parser enters and leave
  * `all` - Prints `entries` and also special much info about skipping, etc.

{:> Toggle key-value option arguments:}
> If you want to disable specific argument of key-value option, e.g. passing `--dev-print=all` to exclude `tokens` you need to write `--dev-print all=no` or `--dev-print=all=no`, but first form is more readable.
> You can use any boolean value to toggle arguments, allowed boolean values described below.

**Boolean options**

* `--dev` - enables dev mode: all logs will be printed including `dev`-level logs and new logs will be added. Generally just produces more debug info everywhere.
* `--dev-full` - (depends on `--dev`) - Enable all development logs and (maybe) some additional info emitting. You still can disable something using specific option, e.g. `--dev-full --dev-print source=no`. `--dev-full` does not enable "extra" options like `--parser-extra-debug`.

**Explicit Boolean option value**

What if you want to set bool-arg to `false`? Let's imagine that `--dev` is set by default (it is not anyway). There is
the pretty same syntax for bool-args as for key-value args.

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

_This values are case insensitive, so you are able to write `Y` or `tRue` or `False`, etc._.
