# Suggestions structure

Here, I'm going to describe what kinds of suggestions (should) exist and how they are structured.

## Suggestions update

Currently (29.09.2021), suggestion system is pretty powerful for WIP language, however not that ideal and extensible -- all suggestions are structured in the same way, and the only additional feature is the "hint" messages support.

What I want:

- Header message, i.e. the actual "error/warning" message, the most essential part
- Span highlighting styles

## The structure

Each suggestion must have a base, i.e. the main message and span (currently required and likely non-spanned suggestions will be implemented differently).
Each suggestion can have any count of children.
