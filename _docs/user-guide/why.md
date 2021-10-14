# Why?

This is a collection of answers to all "Why's?", it contains obvious question I'd like to include to user-guide to help newcomers, but also here would likely be complex question about how the compiler works.
You can think of it as of FAQs and you don't need to read this -- I'll use the answers from here to include them into user-guide or dev-guide when needed.

## Q1 Why tuples are not indexed with brackets `[]`?

This might a popular question from programmers with experience in dynamic programming languages.
You likely know that listing collections, e.g. array or vector, can be indexed with `collection[index]` syntax.
And syntax for tuple indexing is `tuple.index` where `index` is a natural number, this might seem to be a strange syntax, but it has a clear explanation.

`[]` is used for dynamic indexing, i.e. the index inside `[]` can be an any expression, not required to be known at compile-time. Also, listing collections are homogeneous, that is, each element in, for example, vector is of the same type. When you index `vec<int>` you always get `int` as a result.
On the other hand, tuples are heterogeneous, opposite to homogeneous, it means that each element in tuple can be of different type (any element can be of any type), so if we index a tuple, the compiler needs to know what type will we get as a result.

Summing up, `[]` is for dynamic "get", `.` is for static "get".

I'd like to also give you an example:
```jc
let arr: [int; 3] = [1, 2, 3];
let tup: (int, &str, f32) = (123, "Hello", 22.101);

arr[0]; // The result is `1`

let index = 2;
arr[index]; // The result is `3`

tup.0; // The result is `123`

// This won't compile
// tup[index];

// Let's assume we a `callComplexMethod` function which computes index by really complex logic
let computedIndex = callComplexMethod();

arr[computedIndex]; // This will give us an element from `arr` by the `computedIndex`

// This won't compile
// What is the type of `tupleElement`? 😰
// let tupleElement = tup[computedIndex]; 

```
