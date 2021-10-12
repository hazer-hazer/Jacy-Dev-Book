# Range Operators

Here, I'm going to explain why `..` and `..=` operators were chosen as range operators instead of other variants.

At first, I'd like to say that the idea of having all 4 options, i.e. range operators "from to both inclusive", "from to left exclusive", "from to right exclusive" and "from to both exclusive", considered bad options for me even though I thought it's could be a nice feature.

The range operators I want to see are from-to-inclusive and from-to-right-exclusive, because all-inclusive option is obviously needed in many places, but from-to-right-exclusive is kind of required as it is a way to iterate over indices, e.g. `for i in 0..size`.

Why not `..<` like in Swift? - The problem is that `..<` is a very popular construction and it looks awkward for me. Yes, just a personal opinion.
Why not `...` like many other languages do? - I see `...` as better option for spread operator or rest pattern (such as in `Struct {a, b, ...}`), and also it would be more familiar to JavaScript programmers.

This exclusions leave us with two options `..` and `..=`, where `..` is likely to be the most popular usage of range operators at all, thus has the simplest construction.
That's all.
