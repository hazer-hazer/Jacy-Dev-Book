---
layout: 'default'
title: 'How To Run'
nav_order: 5
# No parent
# No children
# No grandparent
---

# How to run

## Basic usage

<div class="code-fence">
            <div class="copy"><i class="fas fa-copy"></i></div>
            <div class="code">./jc (.exe for windows) [source files] --boolean-argument -key-value-argument=param1, param2, ..., paramN
</div>
        </div>

There're two kinds of CLI arguments:

* Boolean, that is, just a flag
* Key-value that receive parameters

Also, arguments have constraints:

* Non-existent arguments leads to an error
* For key-value arguments: count of arguments (maybe any count) and allowed parameters (what you are able to write after
  <span class="inline-code highlight-jc hljs">=</span>)
* Dependencies. It means that some arguments are not allowed if another argument is not set, e.g. you cannot use
  <span class="inline-code highlight-jc hljs">--compile-depth</span> (it controls how deep will compilation process go by workflow) without setting the <span class="inline-code highlight-jc hljs">--dev</span> argument.

Example usage.

<div class="code-fence">
            <div class="copy"><i class="fas fa-copy"></i></div>
            <div class="code">./bin example.jc --print=ast
</div>
        </div>

### The actual list of options

#### Key-value options

* <span class="inline-code highlight-jc hljs">--dev-print</span> - (any count of parameters) - Development option that enables printing of representations of some structures on different compilation stages:
  * <span class="inline-code highlight-jc hljs">suggestions</span> - Prints suggestions as non-formatted text for each stage.
  * <span class="inline-code highlight-jc hljs">summary</span> - Prints summary table after when compilation completes (even with error).
  * <span class="inline-code highlight-jc hljs">dir-tree</span> - Prints directory tree where root file is placed, so we can check which files will be compiled
  * <span class="inline-code highlight-jc hljs">source</span> - Prints source for each file will be compiled
  * <span class="inline-code highlight-jc hljs">tokens</span> - Prints token stream (each on a new line) with position and length
  * <span class="inline-code highlight-jc hljs">ast</span> - Prints source code from the view of AST (does not actually print AST as a tree)
  * <span class="inline-code highlight-jc hljs">ast-node-map</span> - (Ignores <span class="inline-code highlight-jc hljs">ast</span> argument if passed) - Prints AST in the same way as <span class="inline-code highlight-jc hljs">--dev-print=ast</span> by also appending node id after each AST node.
  * <span class="inline-code highlight-jc hljs">ast-names</span> - Prints AST with color markers (connections to names) after name resolution.
  * <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">mod</span>-tree</span> - Prints Module-Tree which, i.e. tree of items defined in scope tree.
  * <span class="inline-code highlight-jc hljs">ribs</span> - Prints ribs, i.e. scopes for local variables.
  * <span class="inline-code highlight-jc hljs">definitions</span> - Prints definition list.
  * <span class="inline-code highlight-jc hljs">resolutions</span> - Prints resolution list.
  * <span class="inline-code highlight-jc hljs">all</span> - prints everything described above
* <span class="inline-code highlight-jc hljs">--log-level</span> - (1 parameter; default: <span class="inline-code highlight-jc hljs">info</span>) - Global log level. The level is checked by precedence where <span class="inline-code highlight-jc hljs">dev</span> has the lowest one and <span class="inline-code highlight-jc hljs">error</span> the higher.
  * <span class="inline-code highlight-jc hljs">debug</span>
  * <span class="inline-code highlight-jc hljs">info</span> - (Default)
  * <span class="inline-code highlight-jc hljs">warn</span> - (Don't confuse with warnings in the context of suggestions)
  * <span class="inline-code highlight-jc hljs">error</span>
* <span class="inline-code highlight-jc hljs">--lexer-log-level</span> - (1 parameter) - Lexer log level
  * (Same parameters as in <span class="inline-code highlight-jc hljs">-log-level</span>)
* <span class="inline-code highlight-jc hljs">--parser-log-level</span> - (1 parameter) - Parser log level
  * (Same parameters as in <span class="inline-code highlight-jc hljs">-log-level</span>)
* <span class="inline-code highlight-jc hljs">--name-resolver-log-level</span> - (1 parameter) - NameResolver log level
  * (Same parameters as in <span class="inline-code highlight-jc hljs">-log-level</span>)
* <span class="inline-code highlight-jc hljs">--compile-depth</span> - (1 parameter, depends on <span class="inline-code highlight-jc hljs">dev</span>) - controls how deep will compilation process go by workflow (each
  next argument implicitly includes all previous arguments):
  * <span class="inline-code highlight-jc hljs">parser</span> - stops after parsing files
  * <span class="inline-code highlight-jc hljs">name-resolution</span> - stops after name resolution
* <span class="inline-code highlight-jc hljs">--dev-stages</span> - (multiple parameters) - Enables dev-mode for specific stages, includes logs and additional info.
  * <span class="inline-code highlight-jc hljs">lexer</span> - Lexing stage
  * <span class="inline-code highlight-jc hljs">parser</span> - Parser stage
  * <span class="inline-code highlight-jc hljs">name-res</span> - Name resolution stage (includes "module tree building", "importation" and "name resolution")
  * <span class="inline-code highlight-jc hljs">lowering</span> - Lowering stage
* <span class="inline-code highlight-jc hljs">--dev-log</span> - Enables development logs for specific objects and storages.
  * <span class="inline-code highlight-jc hljs">lexer</span> - Enable dev logs for <span class="inline-code highlight-jc hljs">Lexer</span>
  * <span class="inline-code highlight-jc hljs">parser</span> - Enable dev logs for <span class="inline-code highlight-jc hljs">Parser</span>
  * <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">mod</span>-tree-builder</span> - Enable dev logs for <span class="inline-code highlight-jc hljs">ModuleTreeBuilder</span>
  * <span class="inline-code highlight-jc hljs">importer</span> - Enable dev logs for <span class="inline-code highlight-jc hljs">Importer</span>
  * <span class="inline-code highlight-jc hljs">name-resolver</span> - Enable dev logs for <span class="inline-code highlight-jc hljs">NameResolver</span>
  * <span class="inline-code highlight-jc hljs">lowering</span> - Enable dev logs for <span class="inline-code highlight-jc hljs">Lowering</span>
* <span class="inline-code highlight-jc hljs">--parser-extra-debug</span> (depends on <span class="inline-code highlight-jc hljs">dev</span>) - enables additional debug logs in parser
  * <span class="inline-code highlight-jc hljs">no</span> - (default) - No extra debug info
  * <span class="inline-code highlight-jc hljs">entries</span> - Prints what syntax units parser enters and leave
  * <span class="inline-code highlight-jc hljs">all</span> - Prints <span class="inline-code highlight-jc hljs">entries</span> and also special much info about skipping, etc.

<div class="fold-block">
    <input id="input-5e5febd670c2af019948b526b64539ac" type="checkbox">
    <label class="clicker" for="input-5e5febd670c2af019948b526b64539ac">> Toggle key-value option arguments</label>
    <blockquote class="content">If you want to disable specific argument of key-value option, e.g. passing <span class="inline-code highlight-jc hljs"--dev-print=all</spanto exclude <span class="inline-code highlight-jc hljs"tokens</spanyou need to write <span class="inline-code highlight-jc hljs"--dev-print all=no</spanor <span class="inline-code highlight-jc hljs"--dev-print=all=no</span, but first form is more readable.
You can use any boolean value to toggle arguments, allowed boolean values described below.
</blockquote>
</div>

#### Boolean options

* <span class="inline-code highlight-jc hljs">--dev</span> - enables dev mode: all logs will be printed including <span class="inline-code highlight-jc hljs">dev</span>-level logs and new logs will be added. Generally just produces more debug info everywhere.
* <span class="inline-code highlight-jc hljs">--dev-full</span> - (depends on <span class="inline-code highlight-jc hljs">--dev</span>) - Enable all development logs and (maybe) some additional info emitting. You still can disable something using specific option, e.g. <span class="inline-code highlight-jc hljs">--dev-full --dev-print source=no</span>. <span class="inline-code highlight-jc hljs">--dev-full</span> does not enable "extra" options like <span class="inline-code highlight-jc hljs">--parser-extra-debug</span>.

##### Explicit Boolean option value

What if you want to set bool-arg to <span class="inline-code highlight-jc hljs"><span class="hljs-literal">false</span></span>? Let's imagine that <span class="inline-code highlight-jc hljs">--dev</span> is set by default (it is not anyway). There is
the pretty same syntax for bool-args as for key-value args.

<div class="code-fence">
            <div class="copy"><i class="fas fa-copy"></i></div>
            <div class="code">--dev=no
</div>
        </div>

There's a bunch of allowed bool values:

| (Truthy) | (Falsy) |
| :--- | :--- |
| yes | no |
| y | n |
| true | false |
| 1 | 0 |
| on | off |

_This values are case insensitive, so you are able to write <span class="inline-code highlight-jc hljs">Y</span> or <span class="inline-code highlight-jc hljs">tRue</span> or <span class="inline-code highlight-jc hljs">False</span>, etc._.
<div class="nav-btn-block">
    <button class="nav-btn left">
    <a class="link" href="/Jacy-Dev-Book/concept">< Concept</a>
</button>

    <button class="nav-btn right">
    <a class="link" href="/Jacy-Dev-Book/ideas">Ideas [α RFCs] ></a>
</button>

</div>
