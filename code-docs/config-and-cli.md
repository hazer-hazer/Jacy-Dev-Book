---
layout: 'default'
title: 'Config and cli'
nav_order: 100
parent: 'Code docs'
# No children
---

# Config & CLI

`Config` is a common singleton class that converts CLI options to programmer-friendly structures (`enum`s almost
always).

You can get`Config` via `getInstance` static method, all its properties are global.

#### Options

`cli::Options` is a structure that contains all info about CLI options: existent boolean and key-value options, allowed
source file extensions, options dependencies, etc.

Also, `cli::Options` acts as a storage for specified CLI options.

#### CLI

`cli::CLI` is a class that processes input `argv` and produces separate collections of boolean and key-value options. At
this step, options are stored as strings. `cli::CLI` class has an interface to work with options to check that something
specified or to find if some value passed to a key-value option.

To simplify `argv` processing we don't actually walk through all of them. At first, we split them into a vector of
string by delimiters like `=` (actually, options are already delimited by white space). By doing so we don't need to
worry about cases when a user writes `-print = all` or `-print= all` or `-print =all` -- all these variants result to
`["-print", "=", "all"]`.

#### Config

After all the options are collected we can set configurations. It's done in a pretty simple way -- all the argument
names are stored in maps with corresponding enum variants. We just need to check if some option is specified and if it
is we set the option in `Config`.

It is important to note that all default values for options inside `Config` must be set in place, that is, inited like
`PrintKind printKind{PrintKind::None}`.
<div class="nav-btn-block">
    
    <button class="nav-btn right">
    <a class="link" href="/Jacy-Dev-Book/code-docs/dev-conventions.html">Dev conventions ❯</a>
</button>

</div>
