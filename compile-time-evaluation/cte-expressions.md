# CTE Expressions

Compile-Time Evaluable Expressions \(CTEE further\) syntactically are the same as raw expressions \(run-time\). It means that when you look at some complex expression in the code you cannot always be sure that it is CTEE, but you always can find if it is by yourself. To do that you need to check that every CTEE rule followed -- this is what the compiler does.

#### CTEE Rules

Expression is CTEE if:

* It is a literal \(e.g. `1`, `123.45`, `"Hello, Jacy"`, etc.\)
* It is a struct whose fields are all CTEE types
* It is an enum whose variants are all CTEE types
* It is a result of `const func` 
* 
> More on CTE structs and enums in next chapters



