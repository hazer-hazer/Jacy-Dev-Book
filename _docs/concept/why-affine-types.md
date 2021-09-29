# Why affine types

Affine types are a version of linear types that do allow only single use of an object as linear types but allows discarding value, i.e. not using it.

_Jacy_ supports affine types, not linear, however, linearity logic is controlled with warnings, i.e. the compiler will give a warning if you didn't use the value.


```jc
func foo() {
    let r = Rc()
}
```
