# Lowering

Lowering, i.e. IR simplifying is the process when we take one IR, remove useless information, and generalize similar units to common structures, producing the second, lowered IR.
A common example of lowering is AST to HIR lowering, which is done right after parsing and name resolution stages are complete. There are also other lowering modifications but they are atomic and done during more complex stages, whereas AST lowering is a separate stage.

## Transformations

During AST lowering bunch of AST nodes are removed completely and replaced with more common ones.

### Nodes lowered to `loop`

In the HIR there is nothing like `for` or `while` loops -- they are replaced with `loop` expression.

#### `for` loop lowering

At first, we need to establish what `for` loop can do in _Jacy_. No C-like `for` loop exists and the only one construction is using iterator. C-like loops iterating over integer values are covered with iteration over ranges.

```jc
for i in 0..100 {
    print(i);
}
```

Let's disassemble this loop into instructions that are done implicitly.
`for` loop accepts expression of type that implements the `Iterator` trait. In this case it is a integer range from `0` to `100` exclusively. So, at first we need to get an iterator of `0..100`.

```jc
let mut iter = (0..100).intoIter();
```

Here, compiler uses `intoIter` because `0..100` is moved into the `for` loop, not borrowed.

Then we need to go through all values:

```jc
let mut iter = (0..100).intoIter();

// Added
while let Some(i) = iter.next() {
    print(i);
}
```

Here we use `while let` which is a high level syntactic sugar that is in fact "while pattern on the left side matches the value on the right side do ...". `while let` loop is also lowered, read further for more information.
`iter.next` (`Iterator::next`) method returns `T?` (in this particular case `T` is `int`), that is an optional next value if some exists.

The body of the `while let` is the same as for the initial `for` loop.

In next chapters we will discuss `while let` lowering where this example will be lowered completely.

#### `while` loop lowering
