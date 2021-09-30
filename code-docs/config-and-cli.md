---
layout: 'default'
title: 'Config and cli'
nav_order: 100
parent: 'Code docs'
# No children
# No grandparent
---

# Config & CLI [OUTDATED]

<span class="inline-code highlight-jc hljs">Config</span> is a common singleton class that converts CLI options to programmer-friendly structures (<span class="inline-code highlight-jc hljs"><span class="hljs-keyword">enum</span></span>s almost
always).

You can get<span class="inline-code highlight-jc hljs">Config</span> via <span class="inline-code highlight-jc hljs">getInstance</span> static method, all its properties are global.

## Options

<span class="inline-code highlight-jc hljs">cli::Options</span> is a structure that contains all info about CLI options: existent boolean and key-value options, allowed
source file extensions, options dependencies, etc.

Also, <span class="inline-code highlight-jc hljs">cli::Options</span> acts as a storage for specified CLI options.

## CLI

<span class="inline-code highlight-jc hljs">cli::CLI</span> is a class that processes input <span class="inline-code highlight-jc hljs">argv</span> and produces separate collections of boolean and key-value options. At
this step, options are stored as strings. <span class="inline-code highlight-jc hljs">cli::CLI</span> class has an interface to work with options to check that something
specified or to find if some value passed to a key-value option.

To simplify <span class="inline-code highlight-jc hljs">argv</span> processing we don't actually walk through all of them. At first, we split them into a vector of
string by delimiters like <span class="inline-code highlight-jc hljs">=</span> (actually, options are already delimited by white space). By doing so we don't need to
worry about cases when a user writes <span class="inline-code highlight-jc hljs">-print = all</span> or <span class="inline-code highlight-jc hljs">-print= all</span> or <span class="inline-code highlight-jc hljs">-print =all</span> -- all these variants result to
<span class="inline-code highlight-jc hljs">[<span class="hljs-string">&quot;-print&quot;</span>, <span class="hljs-string">&quot;=&quot;</span>, <span class="hljs-string">&quot;all&quot;</span>]</span>.

## Config

After all the options are collected we can set configurations. It's done in a pretty simple way -- all the argument
names are stored in maps with corresponding enum variants. We just need to check if some option is specified and if it
is we set the option in <span class="inline-code highlight-jc hljs">Config</span>.

It is important to note that all default values for options inside <span class="inline-code highlight-jc hljs">Config</span> must be set in place, that is, inited like
<span class="inline-code highlight-jc hljs">PrintKind printKind{PrintKind::<span class="hljs-literal">None</span>}</span>.
<div class="nav-btn-block">
    <button class="nav-btn left">
    <a class="link" href="/Jacy-Dev-Book/code-docs/index.html">< Code docs</a>
</button>

    <button class="nav-btn right">
    <a class="link" href="/Jacy-Dev-Book/code-docs/dev-conventions.html">Dev conventions ></a>
</button>

</div>
