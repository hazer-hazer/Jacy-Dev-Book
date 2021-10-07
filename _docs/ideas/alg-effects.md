# Algebraic Effects

Ooh, that's gonna be cool.

I'm still not really in Algebraic Effects (algeff or AE further), same for the programming world mainstream.
Anyway, here I want to discuss the ability to add ae to the language similar to Rust.

## Little Glossary

To simplify reading this idea, I'll describe the words used here.
The better explanation for algebraic effects I see is from the view of `try/catch` as these are pretty similar concepts.

To _perform_ an effect is like `throw` for exceptions -- we pause function execution and waiting for the handler.
To _handle_ an effect means "doing something with the data __performer__ passed.

## Syntax

At first, what do we need to know is what effects does particular function perform.
Effects should not be inferred for raw functions (`func`), for closures it's okay.

From the view of syntax we need to express effects handling, typing and performing.

The keywords I think pretty to use for ae:

- `perform` - For effect performing.
- `with` - For effects annotations (in `func` signatures, etc).
- `handle` - For blocks that handles effects, much like the `match` expression.
- `effect` - Declares a new effect item.

### `perform` syntax

The keyword `perform` is similar to `break` expression with a value (optional too, though).

```jc
// Let's imagine we are somewhere in a function
{
    if something {
        perform effect1.
    }
}
```
