# Dev Mode

This is a plan (I'm going to implement it now 😇) for `jc` CLI dev-mode enhancement and documentation for dev-mode at all.

### What is dev-mode

Dev mode is nothing more than just a controller taking root all over the _Jacy_ compiler.
Currently, dev-mode can be enabled via `--dev` boolean option (flag), but I'm going to make it more tunable.

## Functionality

This is what I want dev-mode to help me with:
- Logging only if I need.
- Producing debug info (I'm talking about logged debug info, not about executable debug info) only when I want.

And to that all for each stage only when I want.

## CLI Options

__--dev option MUST be passed to cli to enable all other dev options__

