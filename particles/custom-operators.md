# Custom Operators

There are three ways I see:
1. Do nothing 😐
2. Fully customizable operators such as what Swift does
3. Operator sets


Skipping the first option let's talk about 1. and 2.

# Full customization

Pros:
- User can defined any operator (s)he wants (nice for math)

Cons:
- Highly increases lexing and parsing
- Possibly makes parsing context-dependent (I don't respect it)
- Or, instead of context-dependent parsing we need post AST transformations
- Requires special

# Operators sets

This conception may be not popular, as I've never seen an idea like that. Anyway, for me it sounds not really weird. 

The idea is not to allow creating a custom operators, but instead allow to use one of predefined. This predefined operators are not common and should not be used in std, instead, user is free to use them in a library.

Pros:
- No additional complexity in parsing
- More specific practices of usage
- Don't need DSL

Cons:
- Static precedence (predefined operators cannot change precedence)
- Worse for "primary" _Jacy_


