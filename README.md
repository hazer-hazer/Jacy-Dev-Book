# _Jacy_ development docs

This is not a real documentation so far. It mostly contains a large amount of notes about everything: things that really matter and trifles.


### How to use

Jacy-Dev-Book is integrated with GitHub actions, some DevOps magic 😅.
When a new commit appears, workflow in master/specific branch runs `gen.js` script which builds pages inside `_docs` directory, producing `build` directory which is moved to `gh-pages` branch where Jekyll does his stuff.
