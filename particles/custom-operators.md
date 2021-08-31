# Custom Operators

There are three ways I see:
1. Do nothing 😐
2. Fully customizable operators such as what Swift does
3. Operator sets


Skipping the first option let's talk about 1. and 2.

## Full customization

Pros:
- User can defined any operator (s)he wants (nice for math)

Cons:
- Highly increases lexing and parsing
- Possibly makes parsing context-dependent (I don't respect it)
- Or, instead of context-dependent parsing we need post AST transformations
- Requires special

## Operators sets

This conception may be not popular, as I've never seen an idea like that. Anyway, for me it sounds not really weird. 

The idea is not to allow creating a custom operators, but instead allow to use one of predefined. This predefined operators are not common and should not be used in std, instead, user is free to use them in a library.

Pros:
- No additional complexity in parsing
- More specific practices of usage
- Don't need DSL

Cons:
- Static precedence (predefined operators cannot change precedence)
- Worse for "primary" _Jacy_

## Specs

This is the specs proposed for second way -- fully customizable operators. Operator sets do not need any specification as they just use common way with traits and implementations. 

### What do we need?

To prepare compiler for custom operators we need to establish some things required for it.

From the view of syntax we need:
- Literal tokens or solution to tokenize operators
- Syntax for operator information description

From the view of working with AST:
- AST transformations to unflatten operators

#### AST transformations

I see two ways to solve problem with obscurity of information about operators on parsing stage:
1. Require user to write operator declarations before usage and make parsing context-dependent
2. Make operator declarations items and transform AST right after parsing

Why not 1. way? - I don't want to make new C or C++, requiring user to declare everything before use to disambiguate parsing, etc.
Operator declarations must be same as function, struct, ... declarations -- in _Jacy_ they called "items". 
Before name resolution all items are declared, it gives compiler opportunity to resolve items that haven't appear in code so far.
I consider making operator declarations items as a good solution.


#### Syntax

For now, I propose this syntax:
```jc
// Operator type declaration
operator type Assignment {
    higherThan: Pipe
    lowerThan: Additive
    associativity: left
}

// Operator declaration
infix operator `×=`: Assignment;

struct S {
    field: int

    mut func `×=`(rhs: &Self): &mut self {
        self.field *= rhs.field
        return self
    }
}
```

`operator type` pair is used to reduce count of keywords against Swift solution with `precedencegroup`.
`operator` might be a soft keyword in the future, anyway as all of current keywords now it gonna be hard keyword.



### Lexing

Lexing can be hard with custom operators.
Let's at first describe what symbols can operators contain, start/end with, as these rules needed to avoid breaking the entire language syntax.

These symbols considered white-spaces (in sense of operator lexing):
- `(`/`)`, `[`/`]`, `{`/`}`, `,`, `:`, `;`

I would start with punctuation symbols/sequences which are disallowed in operators at all:
- Reserved sequences: `//`, `/*`/`*/`, `=`
- Prefix operators: `<` (used for generics), `&` (used for borrowing), `?` (reserved for some use)
- Postfix operators: `>` (used for generics)

Operators can begin with: `=`, `+`, `-`, `*`, `/`, `%`, `<`, `>`, `&`, `|`, `^`, `?`, `~`.

Regardless the fact that operators cannot contain `:`, there's one special case -- `:=` operator which is overloadable.

