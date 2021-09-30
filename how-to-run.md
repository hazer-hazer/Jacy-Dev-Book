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

<span class="inline-code highlight-jc hljs">`</span>bash
./jc (.exe for windows) [source files] --boolean-argument -key-value-argument=param1, param2, ..., paramN
<span class="inline-code highlight-jc hljs">`</span>

There're two kinds of CLI arguments:

* Boolean, that is, just a flag
* Key-value that receive parameters

Also, arguments have constraints:

* Non-existent arguments leads to an error
* For key-value arguments: count of arguments (maybe any count) and allowed parameters (what you are able to write after
  <span class="inline-code highlight-jc hljs"><span class="hljs-operator">=</span></span>)
* Dependencies. It means that some arguments are not allowed if another argument is not set, e.g. you cannot use
  <span class="inline-code highlight-jc hljs"><span class="hljs-operator">-</span><span class="hljs-operator">-</span>compile<span class="hljs-operator">-</span>depth` (it controls how deep will compilation process go by w<span class="hljs-operator">or</span>kflow) without setting the `<span class="hljs-operator">-</span><span class="hljs-operator">-</span>dev</span> argument.

Example usage.

<span class="inline-code highlight-jc hljs">`</span>bash
./bin example.jc --print=ast
<span class="inline-code highlight-jc hljs">`</span>

### The actual list of options

#### Key-value options

* <span class="inline-code highlight-jc hljs"><span class="hljs-operator">-</span><span class="hljs-operator">-</span>dev<span class="hljs-operator">-</span>print</span> - (any count of parameters) - Development option that enables printing of representations of some structures on different compilation stages:
  * <span class="inline-code highlight-jc hljs">suggestions</span> - Prints suggestions as non-formatted text for each stage.
  * <span class="inline-code highlight-jc hljs">summary</span> - Prints summary table after when compilation completes (even with error).
  * <span class="inline-code highlight-jc hljs">dir<span class="hljs-operator">-</span>tree</span> - Prints directory tree where root file is placed, so we can check which files will be compiled
  * <span class="inline-code highlight-jc hljs">source</span> - Prints source for each file will be compiled
  * <span class="inline-code highlight-jc hljs">tokens</span> - Prints token stream (each on a new line) with position and length
  * <span class="inline-code highlight-jc hljs">ast</span> - Prints source code from the view of AST (does not actually print AST as a tree)
  * <span class="inline-code highlight-jc hljs">ast<span class="hljs-operator">-</span>node<span class="hljs-operator">-</span>map` <span class="hljs-operator">-</span> (Ign<span class="hljs-operator">or</span>es `ast` argument <span class="hljs-keyword">if</span> passed) <span class="hljs-operator">-</span> Prints AST <span class="hljs-keyword">in</span> the same way <span class="hljs-keyword">as</span> `<span class="hljs-operator">-</span><span class="hljs-operator">-</span>dev<span class="hljs-operator">-</span>print<span class="hljs-operator">=</span>ast</span> by also appending node id after each AST node.
  * <span class="inline-code highlight-jc hljs">ast<span class="hljs-operator">-</span>names</span> - Prints AST with color markers (connections to names) after name resolution.
  * <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">mod</span><span class="hljs-operator">-</span>tree</span> - Prints Module-Tree which, i.e. tree of items defined in scope tree.
  * <span class="inline-code highlight-jc hljs">ribs</span> - Prints ribs, i.e. scopes for local variables.
  * <span class="inline-code highlight-jc hljs">definitions</span> - Prints definition list.
  * <span class="inline-code highlight-jc hljs">resolutions</span> - Prints resolution list.
  * <span class="inline-code highlight-jc hljs">all</span> - prints everything described above
* <span class="inline-code highlight-jc hljs"><span class="hljs-operator">-</span><span class="hljs-operator">-</span>log<span class="hljs-operator">-</span>level` <span class="hljs-operator">-</span> (<span class="hljs-number">1</span> parameter; default: `info`) <span class="hljs-operator">-</span> Global log level<span class="hljs-operator">.</span> The level is checked by precedence <span class="hljs-keyword">where</span> `dev` has the lowest one <span class="hljs-operator">and</span> `err<span class="hljs-operator">or</span></span> the higher.
  * <span class="inline-code highlight-jc hljs">debug</span>
  * <span class="inline-code highlight-jc hljs">info</span> - (Default)
  * <span class="inline-code highlight-jc hljs">warn</span> - (Don't confuse with warnings in the context of suggestions)
  * <span class="inline-code highlight-jc hljs">err<span class="hljs-operator">or</span></span>
* <span class="inline-code highlight-jc hljs"><span class="hljs-operator">-</span><span class="hljs-operator">-</span>lexer<span class="hljs-operator">-</span>log<span class="hljs-operator">-</span>level</span> - (1 parameter) - Lexer log level
  * (Same parameters as in <span class="inline-code highlight-jc hljs"><span class="hljs-operator">-</span>log<span class="hljs-operator">-</span>level</span>)
* <span class="inline-code highlight-jc hljs"><span class="hljs-operator">-</span><span class="hljs-operator">-</span>parser<span class="hljs-operator">-</span>log<span class="hljs-operator">-</span>level</span> - (1 parameter) - Parser log level
  * (Same parameters as in <span class="inline-code highlight-jc hljs"><span class="hljs-operator">-</span>log<span class="hljs-operator">-</span>level</span>)
* <span class="inline-code highlight-jc hljs"><span class="hljs-operator">-</span><span class="hljs-operator">-</span>name<span class="hljs-operator">-</span>resolver<span class="hljs-operator">-</span>log<span class="hljs-operator">-</span>level</span> - (1 parameter) - NameResolver log level
  * (Same parameters as in <span class="inline-code highlight-jc hljs"><span class="hljs-operator">-</span>log<span class="hljs-operator">-</span>level</span>)
* <span class="inline-code highlight-jc hljs"><span class="hljs-operator">-</span><span class="hljs-operator">-</span>compile<span class="hljs-operator">-</span>depth` <span class="hljs-operator">-</span> (<span class="hljs-number">1</span> parameter, depends on `dev</span>) - controls how deep will compilation process go by workflow (each
  next argument implicitly includes all previous arguments):
  * <span class="inline-code highlight-jc hljs">parser</span> - stops after parsing files
  * <span class="inline-code highlight-jc hljs">name<span class="hljs-operator">-</span>resolution</span> - stops after name resolution
* <span class="inline-code highlight-jc hljs"><span class="hljs-operator">-</span><span class="hljs-operator">-</span>dev<span class="hljs-operator">-</span>stages</span> - (multiple parameters) - Enables dev-mode for specific stages, includes logs and additional info.
  * <span class="inline-code highlight-jc hljs">lexer</span> - Lexing stage
  * <span class="inline-code highlight-jc hljs">parser</span> - Parser stage
  * <span class="inline-code highlight-jc hljs">name<span class="hljs-operator">-</span>res</span> - Name resolution stage (includes "module tree building", "importation" and "name resolution")
  * <span class="inline-code highlight-jc hljs">lowering</span> - Lowering stage
* <span class="inline-code highlight-jc hljs"><span class="hljs-operator">-</span><span class="hljs-operator">-</span>dev<span class="hljs-operator">-</span>log</span> - Enables development logs for specific objects and storages.
  * <span class="inline-code highlight-jc hljs">lexer` <span class="hljs-operator">-</span> Enable dev logs f<span class="hljs-operator">or</span> `Lexer</span>
  * <span class="inline-code highlight-jc hljs">parser` <span class="hljs-operator">-</span> Enable dev logs f<span class="hljs-operator">or</span> `Parser</span>
  * <span class="inline-code highlight-jc hljs"><span class="hljs-keyword">mod</span><span class="hljs-operator">-</span>tree<span class="hljs-operator">-</span>builder` <span class="hljs-operator">-</span> Enable dev logs f<span class="hljs-operator">or</span> `ModuleTreeBuilder</span>
  * <span class="inline-code highlight-jc hljs">imp<span class="hljs-operator">or</span>ter` <span class="hljs-operator">-</span> Enable dev logs f<span class="hljs-operator">or</span> `Imp<span class="hljs-operator">or</span>ter</span>
  * <span class="inline-code highlight-jc hljs">name<span class="hljs-operator">-</span>resolver` <span class="hljs-operator">-</span> Enable dev logs f<span class="hljs-operator">or</span> `NameResolver</span>
  * <span class="inline-code highlight-jc hljs">lowering` <span class="hljs-operator">-</span> Enable dev logs f<span class="hljs-operator">or</span> `Lowering</span>
* <span class="inline-code highlight-jc hljs"><span class="hljs-operator">-</span><span class="hljs-operator">-</span>parser<span class="hljs-operator">-</span>extra<span class="hljs-operator">-</span>debug` (depends on `dev</span>) - enables additional debug logs in parser
  * <span class="inline-code highlight-jc hljs">no</span> - (default) - No extra debug info
  * <span class="inline-code highlight-jc hljs">entries</span> - Prints what syntax units parser enters and leave
  * <span class="inline-code highlight-jc hljs">all` <span class="hljs-operator">-</span> Prints `entries</span> and also special much info about skipping, etc.

<div class="fold-block">
    <input id="input-6cde7356c66d9ca29d5da9d7bc4dd07d" type="checkbox">
    <label class="clicker" for="input-6cde7356c66d9ca29d5da9d7bc4dd07d">> Toggle key-value option arguments</label>
    <blockquote class="content">If you want to disable specific argument of key-value option, e.g. passing <span class="inline-code highlight-jc hljs"<span class="hljs-operator"-</span<span class="hljs-operator"-</spandev<span class="hljs-operator"-</spanprint<span class="hljs-operator"=</spanall` to exclude `tokens` you need to write `<span class="hljs-operator"-</span<span class="hljs-operator"-</spandev<span class="hljs-operator"-</spanprint all<span class="hljs-operator"=</spanno` <span class="hljs-operator"or</span`<span class="hljs-operator"-</span<span class="hljs-operator"-</spandev<span class="hljs-operator"-</spanprint<span class="hljs-operator"=</spanall<span class="hljs-operator"=</spanno</span, but first form is more readable.
You can use any boolean value to toggle arguments, allowed boolean values described below.
</blockquote>
</div>

#### Boolean options

* <span class="inline-code highlight-jc hljs"><span class="hljs-operator">-</span><span class="hljs-operator">-</span>dev` <span class="hljs-operator">-</span> enables dev mode: all logs will be printed including `dev</span>-level logs and new logs will be added. Generally just produces more debug info everywhere.
* <span class="inline-code highlight-jc hljs"><span class="hljs-operator">-</span><span class="hljs-operator">-</span>dev<span class="hljs-operator">-</span>full` <span class="hljs-operator">-</span> (depends on `<span class="hljs-operator">-</span><span class="hljs-operator">-</span>dev`) <span class="hljs-operator">-</span> Enable all development logs <span class="hljs-operator">and</span> (maybe) some additional info emitting<span class="hljs-operator">.</span> You still can disable something using specific option, e<span class="hljs-operator">.</span>g<span class="hljs-operator">.</span> `<span class="hljs-operator">-</span><span class="hljs-operator">-</span>dev<span class="hljs-operator">-</span>full <span class="hljs-operator">-</span><span class="hljs-operator">-</span>dev<span class="hljs-operator">-</span>print source<span class="hljs-operator">=</span>no`<span class="hljs-operator">.</span> `<span class="hljs-operator">-</span><span class="hljs-operator">-</span>dev<span class="hljs-operator">-</span>full` does <span class="hljs-operator">not</span> enable <span class="hljs-string">&quot;extra&quot;</span> options like `<span class="hljs-operator">-</span><span class="hljs-operator">-</span>parser<span class="hljs-operator">-</span>extra<span class="hljs-operator">-</span>debug</span>.

##### Explicit Boolean option value

What if you want to set bool-arg to <span class="inline-code highlight-jc hljs"><span class="hljs-literal">false</span>`? Let<span class="hljs-symbol">&#x27;s</span> imagine that `<span class="hljs-operator">-</span><span class="hljs-operator">-</span>dev</span> is set by default (it is not anyway). There is
the pretty same syntax for bool-args as for key-value args.

<span class="inline-code highlight-jc hljs">`</span>bash
--dev=no
<span class="inline-code highlight-jc hljs">`</span>

There's a bunch of allowed bool values:

| (Truthy) | (Falsy) |
| :--- | :--- |
| yes | no |
| y | n |
| true | false |
| 1 | 0 |
| on | off |

_This values are case insensitive, so you are able to write <span class="inline-code highlight-jc hljs">Y` <span class="hljs-operator">or</span> `tRue` <span class="hljs-operator">or</span> `False</span>, etc._.
<div class="nav-btn-block">
    <button class="nav-btn left">
    <a class="link" href="/Jacy-Dev-Book/concept">< Concept</a>
</button>

    <button class="nav-btn right">
    <a class="link" href="/Jacy-Dev-Book/ideas">Ideas [α RFCs] ></a>
</button>

</div>
