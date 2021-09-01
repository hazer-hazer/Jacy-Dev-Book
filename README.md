# _Jacy_ development docs

This is not a real documentation so far. It mostly contains a large amount of notes about everything: things that really matter and trifles.


### How to use

This site is supposed to be hosted on GitHub pages, thus needs to be static.
I use Just-The-Docs theme (customized a little bit) but it is not really flexible and easy-to-use.

The `gen.js` is a dependency-free simple script that prepares pages and automatically adds Jekyll's Front Matter to each page.
`gen.js` requires NodeJS >= 14 (13 might also work)

Rules:
- Every `index.md` becomes parent of sibling files and is used to set up directory it is located in.


#### Problems script solves

Just-The-Docs (JTD further) requires Front Matter in each page to connect it with parent page.
The script builds connections automatically by simple rule: every directory is a parent, and it works recursively, thus dir/dir is possible.

