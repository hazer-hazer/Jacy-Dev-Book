# Goal

This is a list of features and examples I wish would be possible in *Jacy*.

#### References
```
let a = 123;
let b = &a; // Borrow `a`

let mut value = 0;
let bor = &mut value;
*bor = 1000;
print(value); // Prints `1000`
```

#### *Jacy* supports structural sub-typing with tuples

```
let t = ("abcdef", 2.0, 123);

func foo(tup: (str, ))
```

### *Jacy* is functional

#### Pattern matching
```
let a = (1, 2, 3);
let (f, s, t) = a;

match a {
    (f, s, t) => // Do something with `f`, `s` and `t`
}
```

##### It is possible to ignore non-important fields
```
match a {
    (f, ...) => // Do something with `f` only
}
```

##### Matched expression can be borrowed
```
match a {
    (ref f, ...) => // Do something with `f` as reference to `a.0`
}
```
