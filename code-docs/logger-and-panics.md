---
layout: 'default'
title: 'Logger and panics'
nav_order: 104
parent: 'Code docs'
# No children
---

# Logger & Panics

`Logger` is an important class, it has a powerful but simple interface for printing, logging, and panicking.

Logger formatting works simple, each logger method is a template function that accepts any type that overloads
`std::ostream<<` operator. White spaces are not placed automatically (but that's how it was before) because some
entities must be printed without white space and it's hard to implement overloading for each type which must not print
white space after or before it as we need to compare each two neighbors types in the log method parameter list.

#### Logger owners

All big classes have a Logger instance inited with an owner name corresponding to the class name. Logs produced by
logger owners with non-static methods are complemented with log info: owner name and colorized log-level name.

#### Logger config

An owned logger can be configured, directly in the source code or automatically by Config with CLI options.

Configurations influencing each non-static log invocation:

* `level` - (default: Set by `Config`) - Logger instance log-level, set by `Config` default value, global CLI option
  `-log-level` or by specific CLI options for owner (some logger owners have CLI-confugurable log-level)
  `-{owner}-log-level`
* `printOwner` - (default: `true`) - Prints owner name
* `printLevel` - (default: `true`) - Prints log-level name in each non-static log invocation
* `colorize` - (default: `true`) - Colorizes additional info (e.g. log-level name with corresponding color), each
  log-level has its own color.

#### Panics

Panic is actually throwing an exception, everywhere in the compiler code we panic when some check failed which
considered a bug. For example, at the name resolution stage, we put some definition to storage and then extract it by
its id, we cannot have wrong `defId` on the hands so if non-existent `defId` was requested it is actually a bug and we
must panic.

To panic, there's a static method `Logger::devPanic`, it follows common format rules, that is, we can pass any types
that overload `std::ostream<<` operator to it delimited by commas as arguments.

#### Log-levels

This is the list of log levels ordered by priority (lowest -&gt; highest):

* `dev`
* `debug`
* `info`
* `warn`
* `error`

Each log-level Logger has a corresponding method with the same name.

Don't confuse logs with suggestions (errors, warning, notes about code given to user), logs are about compiler internals
and used mostly for development. By default, the log level is `info` that is used to notify a user about something is
enabled, e.g. if a user added `-print=ast` in CLI then we print `info: Printing AST...` before printing AST.

`dev` log-level may seem confusing, but it is the most often used log-level in the code. Actually, its usage is to
produce verbose debug info that is useful when working at a specific compilation stage.

#### Additional methods

These are methods that differ from log methods:

* `print` - (no NL) - static method for raw formatted text printing
* `raw` - (no NL) - same as `print` but non-static
* `format` - receives parameters list and formats it producing a string
* `devDebug` - (appends NL) - static alternative for `dev` method used in classes that aren't logger owners
* `nl` - shortcut for `std::endl`, convenient for logger methods chaining
* `printTitleDev` - (appends NL) - prints text in title style (short text wrapped into repeated `=`) only if dev-mode is
  enabled. Used only for compilation stage visual separation.
* `colorized` - (appends NL) - Receives `Color` as first argument and print full text colorized resetting color at the
  end. Used rarely as not so many logs should be fully colorized.
* `notImplemented` - TODO dev-panic.
<div class="nav-btn-block">
    <button class="nav-btn left">
    <a class="link" href="/Jacy-Dev-Book/code-docs/interface.html">< Interface</a>
</button>

    
</div>
