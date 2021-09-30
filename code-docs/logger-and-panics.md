---
layout: 'default'
title: 'Logger and panics'
nav_order: 104
parent: 'Code docs'
# No children
# No grandparent
---

# Logger & Panics

<span class="inline-code highlight-jc hljs">Logger</span> is an important class, it has a powerful but simple interface for printing, logging, and panicking.

Logger formatting works simple, each logger method is a template function that accepts any type that overloads
<span class="inline-code highlight-jc hljs">std::ostream<span class="hljs-operator">&lt;&lt;</span></span> operator. White spaces are not placed automatically (but that's how it was before) because some
entities must be printed without white space and it's hard to implement overloading for each type which must not print
white space after or before it as we need to compare each two neighbors types in the log method parameter list.

## Logger owners

All big classes have a Logger instance inited with an owner name corresponding to the class name. Logs produced by
logger owners with non-static methods are complemented with log info: owner name and colorized log-level name.

### Logger config

An owned logger can be configured, directly in the source code or automatically by Config with CLI options.

Configurations influencing each non-static log invocation:

* <span class="inline-code highlight-jc hljs">level` <span class="hljs-operator">-</span> (default: Set by `Config`) <span class="hljs-operator">-</span> Logger instance log<span class="hljs-operator">-</span>level, set by `Config</span> default value, global CLI option
  <span class="inline-code highlight-jc hljs"><span class="hljs-operator">-</span>log<span class="hljs-operator">-</span>level</span> or by specific CLI options for owner (some logger owners have CLI-confugurable log-level)
  <span class="inline-code highlight-jc hljs"><span class="hljs-operator">-</span>{owner}<span class="hljs-operator">-</span>log<span class="hljs-operator">-</span>level</span>
* <span class="inline-code highlight-jc hljs">printOwner` <span class="hljs-operator">-</span> (default: `<span class="hljs-literal">true</span></span>) - Prints owner name
* <span class="inline-code highlight-jc hljs">printLevel` <span class="hljs-operator">-</span> (default: `<span class="hljs-literal">true</span></span>) - Prints log-level name in each non-static log invocation
* <span class="inline-code highlight-jc hljs">col<span class="hljs-operator">or</span>ize` <span class="hljs-operator">-</span> (default: `<span class="hljs-literal">true</span></span>) - Colorizes additional info (e.g. log-level name with corresponding color), each
  log-level has its own color.

## Panics

Panic is actually throwing an exception, everywhere in the compiler code we panic when some check failed which
considered a bug. For example, at the name resolution stage, we put some definition to storage and then extract it by
its id, we cannot have wrong <span class="inline-code highlight-jc hljs">defId` on the h<span class="hljs-operator">and</span>s so <span class="hljs-keyword">if</span> non<span class="hljs-operator">-</span>existent `defId</span> was requested it is actually a bug and we
must panic.

To panic, there's a static method <span class="inline-code highlight-jc hljs">Logger::devPanic</span>, it follows common format rules, that is, we can pass any types
that overload <span class="inline-code highlight-jc hljs">std::ostream<span class="hljs-operator">&lt;&lt;</span></span> operator to it delimited by commas as arguments.

## Log-levels

This is the list of log levels ordered by priority (lowest -&gt; highest):

* <span class="inline-code highlight-jc hljs">dev</span>
* <span class="inline-code highlight-jc hljs">debug</span>
* <span class="inline-code highlight-jc hljs">info</span>
* <span class="inline-code highlight-jc hljs">warn</span>
* <span class="inline-code highlight-jc hljs">err<span class="hljs-operator">or</span></span>

Each log-level Logger has a corresponding method with the same name.

Don't confuse logs with suggestions (errors, warning, notes about code given to user), logs are about compiler internals
and used mostly for development. By default, the log level is <span class="inline-code highlight-jc hljs">info</span> that is used to notify a user about something is
enabled, e.g. if a user added <span class="inline-code highlight-jc hljs"><span class="hljs-operator">-</span>print<span class="hljs-operator">=</span>ast` <span class="hljs-keyword">in</span> CLI then we print `info: Printing AST<span class="hljs-operator">..</span><span class="hljs-operator">.</span></span> before printing AST.

<span class="inline-code highlight-jc hljs">dev</span> log-level may seem confusing, but it is the most often used log-level in the code. Actually, its usage is to
produce verbose debug info that is useful when working at a specific compilation stage.

## Additional methods

These are methods that differ from log methods:

* <span class="inline-code highlight-jc hljs">print</span> - (no NL) - static method for raw formatted text printing
* <span class="inline-code highlight-jc hljs">raw` <span class="hljs-operator">-</span> (no NL) <span class="hljs-operator">-</span> same <span class="hljs-keyword">as</span> `print</span> but non-static
* <span class="inline-code highlight-jc hljs">f<span class="hljs-operator">or</span>mat</span> - receives parameters list and formats it producing a string
* <span class="inline-code highlight-jc hljs">devDebug` <span class="hljs-operator">-</span> (appends NL) <span class="hljs-operator">-</span> <span class="hljs-keyword">static</span> alternative f<span class="hljs-operator">or</span> `dev</span> method used in classes that aren't logger owners
* <span class="inline-code highlight-jc hljs">nl` <span class="hljs-operator">-</span> sh<span class="hljs-operator">or</span>tcut f<span class="hljs-operator">or</span> `std::endl</span>, convenient for logger methods chaining
* <span class="inline-code highlight-jc hljs">printTitleDev` <span class="hljs-operator">-</span> (appends NL) <span class="hljs-operator">-</span> prints text <span class="hljs-keyword">in</span> title <span class="hljs-title function_ invoke__">style</span> (sh<span class="hljs-operator">or</span>t text wrapped into repeated `<span class="hljs-operator">=</span></span>) only if dev-mode is
  enabled. Used only for compilation stage visual separation.
* <span class="inline-code highlight-jc hljs">col<span class="hljs-operator">or</span>ized` <span class="hljs-operator">-</span> (appends NL) <span class="hljs-operator">-</span> Receives `Col<span class="hljs-operator">or</span></span> as first argument and print full text colorized resetting color at the
  end. Used rarely as not so many logs should be fully colorized.
* <span class="inline-code highlight-jc hljs"><span class="hljs-operator">not</span>Implemented</span> - TODO dev-panic.
<div class="nav-btn-block">
    <button class="nav-btn left">
    <a class="link" href="/Jacy-Dev-Book/code-docs/interning.html">< Interning</a>
</button>

    
</div>
