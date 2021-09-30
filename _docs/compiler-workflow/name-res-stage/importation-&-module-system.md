# Importation and the Module system

The importation process is what the compiler does when a user writes `use`.

## Modules

In _Jacy_ each file and each directory is a module, of course, including user-defined modules (`mod` items).
The module system is similar to Rust, the root file is the root of the module tree, and nested modules paths are related to it.

## Importation

## The problem with overloads

Function overloading via labels might seem to be easy-implemented and it's true as we don't deal with types, anyway, there's a problem with importation and exportation.
Example:

```jc
mod m {
    pub func foo(label1: int, label2: int);
}

mod n {
    pub use m::foo;

    pub func foo(label3: int, label4: int);
}
```

Here, module `m` exports overload `foo(label1:label2:)` and module `n` imports it and exports as well.

The module tree before the importation process will look so:

```text
[ROOT]: {
    `mod` 'm': {
        FOS#someID
          - `func` 'foo': 'foo(label1:label2:)'
    }

    `mod` 'n': {
        FOS#someID
          - `func` 'foo': 'foo(label3:label4:)'
    }
}
```

After importation, module `n` must contain alias to function `foo(label1:label2)` and locally defined `foo(label3:label4)`.
When the module tree is building we create FOSes (Function Overload Sets) each of those has a unique index id.
So, when we importing a function with the same name should we update existent FOS?

```jc
mod m {
    func foo(private: int); // #1
    pub func foo(public: int); // #2
} // #0

mod n {
    use m::foo;

    func foo(nested: int); // #4
} // #3
```

The `DefTable`:

```jon
FOSes: [
    {
        '(private:)': #1
        '(public:)': #2
    }
    {
        '(nested:)': #4
    }
]
```

Module Tree:

```jon
{
    'm': {
        kind: 'mod'
        defId: 0
        defs: {
            foo: {
                funcOverloadId: 0
            }
        }
    }
    'n': {
        kind: 'mod'
        defId: 1
        defs: {
            foo: {
                funcOverloadId: 1
            }
        }
    }
}
```

After importation, if FOSes updated.

The `DefTable`:

```jon
FOSes: [
    {
        '(private:)': #1
        '(public:)': #2
    }
    {
        '(private:)': 'Alias to #1'
        '(public:)': 'Alias to #2'
        '(nested:)': #4
    }
]
```

So, let's establish how overloads importation works:

- We never modify FOS which we import into the module
- On importation, FOS of the module where `use`-declaration present is modified -- imported overloads added
- Each FOS is unique per module, never redefine the same FOS in different modules
