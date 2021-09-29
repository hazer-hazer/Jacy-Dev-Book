# Attributes for extended tools

Attributes are pretty distant feature from view of first working version. Anyway, no one can prohibit me dream about nice future.

This particle is not about the design of attributes and specification. Here, I want to research an ability to implement some stuff that is not actually important for compiler but can be used by plugins for humans. For example: is it a good idea to use attributes for `TODO` items?

## Comments vs Attributes

Putting external info in comments is widely used way to implement type annotations in dynamic languages like JS, writing TODO annotations in comments, etc.

The power of attributes is that they are:

- Namespaced (you can use same names for features in different extensions)
- They are first-class citizens thus have stronger syntax and rules, I appreciate it

As far as attributes are namespaced we can build a huge "official" ecosystem for _Jacy_ with no loss for user to build his/her own.
