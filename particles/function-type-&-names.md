---
layout: 'default'
title: 'Function type & names'
nav_order: 104
parent: 'Particles [β RFCs]'
# No children
# No grandparent
---

# Function types & names

> This particle is mostly about the name resolution but also affects the type system.
> Stuff discussed here grows from the idea of the function named arguments

## Named arguments

Let's begin with what named arguments are.

In Swift parameter labels is a really important concept: labels are required by default and much of internal logic is dependent on labels (function overloading, name resolution, etc).

function trim() { [native code] }swift
func NAME((LABEL | _)? PARAM_NAME: TYPE)
```

`LABEL` is optional, and if no label is given -- `PARAM_NAME` becomes a label name, as a shortcut `PARAM_NAME: TYPE` = `PARAM_NAME PARAM_NAME: TYPE`.
To disallow passing argument as named we need to place `_` instead of a label, then parameter becomes positional.

### Require labels

Swift by default requires a parameter label, and what if we invert this logic?
For example:

<div class="code-fence highlight-jc hljs">
            <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-title function_">foo</span>(label! paramName: Type)</div>
        </div>

Here, we annotate `label` with `!` to say that the user must pass a parameter with a label, otherwise, it would be an error.

The shortcut variant would look like that:

<div class="code-fence highlight-jc hljs">
            <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-title function_">foo</span>(paramName!: Type)</div>
        </div>

Here, the parameter name is `paramName` and the label is `paramName` too, also it is required.

## Label function overloading

Thanks to Swift for the idea of overloading without type checking.
Swift supports overloading by parameter labels, e.g.:

```swift
func do(with: Int)
func do(from: Int)
```

Why this is a really cool feature:

- We don't need to know the types
- We can have the same types but depend on label names.
- Overloading's are resolved at the name resolution stage and don't require type check

Anyway, there're some cons from the view of additional complexity in the compiler.

### Examples of errors

#### #1. Ambiguous invocation

<div class="code-fence highlight-jc hljs">
            <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-title function_">doSmth</span>(with: <span class="hljs-type">int</span>);</div><div class="line-num" data-line-num="2">2</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-title function_">doSmth</span>(from: <span class="hljs-type">int</span>);</div><div class="line-num" data-line-num="3">3</div><div class="line"></div><div class="line-num" data-line-num="4">4</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-title function_">main</span> {</div><div class="line-num" data-line-num="5">5</div><div class="line">    <span class="hljs-comment">// Error: Call to `doSmth` is ambiguous -- add argument label `with` or `from`</span></div><div class="line-num" data-line-num="6">6</div><div class="line">    <span class="hljs-title function_ invoke__">doSmth</span>(<span class="hljs-number">123</span>);</div><div class="line-num" data-line-num="7">7</div><div class="line">}</div>
        </div>

The solution to disambiguate this case is the same as in Swift.

1. Function types do not have labels
2. Labels are used only for function overloading resolution (in name resolution) and nowhere else

We cannot store some function in a variable with type `(foo: T, bar: U) -> V`, it would be `(T, U) -> V`, thus when a function is assigned to a variable (or passed to function), that is, stored somewhere, it does not have labels.
Summing up, parameter labels are just name-resolution level overloading and markers for calls, nothing more.
Anyway, to disambiguate the case present above we need some mechanism to say that we're gonna use the specific `doSmth` function. It is done with Swift-like syntax `functionName(label1:label2:...)`, that is, we don't call function but resolve its overloading.

So, it looks such as:

<div class="code-fence highlight-jc hljs">
            <div class="line-num" data-line-num="1">1</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-title function_">doSmth</span>(with: <span class="hljs-type">int</span>);</div><div class="line-num" data-line-num="2">2</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-title function_">doSmth</span>(from: <span class="hljs-type">int</span>);</div><div class="line-num" data-line-num="3">3</div><div class="line"></div><div class="line-num" data-line-num="4">4</div><div class="line"><span class="hljs-keyword">func</span> <span class="hljs-title function_">main</span> {</div><div class="line-num" data-line-num="5">5</div><div class="line">    <span class="hljs-comment">// Error: Call to `doSmth` is ambiguous -- add argument label `with` or `from`</span></div><div class="line-num" data-line-num="6">6</div><div class="line">    <span class="hljs-title function_ invoke__">doSmth</span>(with:)(<span class="hljs-number">123</span>);</div><div class="line-num" data-line-num="7">7</div><div class="line">}</div>
        </div>

I need to note that type of `doSmth(with:)` is not `(with: int) -> ()`, just a `(int) -> ()`.
So, names have gone and cannot be used after.

Anyway, parameter names in function types are allowed, but they just markers for user and do not affect real function type. That is to say, parameter names in types are used for documentation purposes.
<div class="nav-btn-block">
    <button class="nav-btn left">
    <a class="link" href="/Jacy-Dev-Book/particles/custom-operators.html">< Custom operators</a>
</button>

    <button class="nav-btn right">
    <a class="link" href="/Jacy-Dev-Book/particles/memory-leaks.html">Memory leaks ></a>
</button>

</div>
