# Importation and the Module system

The importation process is what the compiler does when a user writes `use`.

## Modules

In _Jacy_ each file and each directory is a module, of course, including user-defined modules (`mod` items).
Module system is similar to Rust, root file is the root of module tree and


## Importation


## The problem with overloads

Function overloading via labels might seem to be easy-implemented and its true as we don't deal with types, anyway there's a problem with importation and exportation.
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

The module-tree before importation process will look so:
```
[ROOT]: {
    `mod` 'm': {
        FOS#someID
          - `func` 'foo': 'foo(label1:label2:)'
    }

    `mod 'n': {
        FOS#someID
          - `func` 'foo': 'foo(label3:label4:)'
    }
}
```

After importation, module `n` must contain alias to function `foo(label1:label2)` and locally defined `foo(label3:label4)`.
When module tree is building we create FOSes (Function Overload Sets) each of those has a unique index id.
So, when we importing a function with the same name should we update existent FOS? 
