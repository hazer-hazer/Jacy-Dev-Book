# Why affine types

Affine types are a version of linear types that do allow only single use of an object as linear types but allow discarding value, i.e. not using it.

_Jacy_ supports affine types, not linear, however, linearity logic is controlled with warnings, i.e. the compiler will give a warning if you didn't use the value.

```jc
func foo() {
    let r = Rc(0);
    let r1 = Rc::clone(r);
}
```

On the code generation stage we need to create a so called "destruction scope", where we will drop the values owned by scope we exit.
The RC `r` and `r1` will be dropped when body of the function `foo` ends. `Rc` implements `Drop::drop` method which accepts `self` by move, thus you cannot `drop` the value twice.

```jc
func foo() {
    let r = Rc(0);
    let r1 = Rc::clone(r);
}
// Drop scope of the function `foo`
{
    Drop::drop(r1);
    Drop::drop(r);
}
```

In this code, if we hadn't affine types, we could drop value `r1` or value `r` twice, and some of them couldn't be dropped correctly.

This example is the reason why affine types are cool, it just presents their main advantage -- data flow control. We know where data goes, from where, and that we lose access to it as it is moved.

Of course, there is the borrowing concept that allows us not to copy or move the data, but alias it with new object.
