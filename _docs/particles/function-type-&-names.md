# Function types & names

> This particle is mostly about the name resolution but also affects the type system.
> Stuff discussed here grows from the idea of the function named arguments


## Named arguments

Let's begin with what named arguments are.

In Swift parameter labels is a really important concept: labels are required by default and much of internal logic is dependent on labels (function overloading, name resolution, etc).

```swift
func NAME((LABEL | _)? PARAM_NAME: TYPE)
```

`LABEL` is optional, and if no label is given -- `PARAM_NAME` becomes a label name, as a shortcut `PARAM_NAME: TYPE` = `PARAM_NAME PARAM_NAME: TYPE`.
To disallow passing argument as named we need to place `_` instead of a label, then parameter becomes positional.

### Require labels

Swift by default requires a parameter label, and what if we invert this logic?
For example:
```jc
func foo(label! paramName: Type)
```

Here, we annotate `label` with `!` to say that the user must pass a parameter with a label, otherwise, it would be an error.

The shortcut variant would look like that:
```jc
func foo(paramName!: Type)
```

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

#### Examples of errors

##### #1. Ambiguous invocation

```jc
func doSmth(with: int);
func doSmth(from: int);

func main {
    // Error: Call to `doSmth` is ambiguous -- add argument label `with` or `from`
    doSmth(123);
}
```

The solution to disambiguate this case is the same as in Swift.
1. Function types do not have labels
2. Labels are used only for function overloading resolution (in name resolution) and nowhere else

We cannot store some function in a variable with type `(foo: T, bar: U) -> V`, it would be `(T, U) -> V`, thus when a function is assigned to a variable (or passed to function), that is, stored somewhere, it does not have labels.
Summing up, parameter labels are just name-resolution level overloading and markers for calls, nothing more.
Anyway, to disambiguate the case present above we need some mechanism to say that we're gonna use the specific `doSmth` function. It is done with Swift-like syntax `functionName(label1:label2:...)`, that is, we don't call function but resolve its overloading.

So, it looks such as:
```jc
func doSmth(with: int);
func doSmth(from: int);

func main {
    // Error: Call to `doSmth` is ambiguous -- add argument label `with` or `from`
    doSmth(with:)(123);
}
```

I need to note that type of `doSmth(with:)` is not `(with: int) -> ()`, just a `(int) -> ()`. 
So, names have gone and cannot be used after.
