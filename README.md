# _Jacy_ DevBook

This is not real documentation so far. It mostly contains a large number of notes about everything: things that matter and trifles.

## How to use

Jacy-Dev-Book is integrated with GitHub actions, some DevOps magic 😅.
When a new commit appears, workflow in master/specific branch runs `gen.js` script which builds pages inside `_docs` directory, producing `build` directory which is moved to `gh-pages` branch where Jekyll does his stuff.

### Writing markdown

#### Code blocks

For now, there's no _Jacy_ highlighting support in HTML generation, anyway, use ` ```jc ` for code blocks. `gen.js` script will replace `jc` code blocks with `rust` as syntaxes are pretty common.
