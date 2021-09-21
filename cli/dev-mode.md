---
layout: 'default'
title: 'Dev mode'
nav_order: 100
parent: 'Cli'
# No children
---

# Dev Mode

This is a plan (I'm going to implement it now 😇) for `jc` CLI dev-mode enhancement and documentation for dev-mode at all.

### What is dev-mode

Dev mode is nothing more than just a controller taking root all over the _Jacy_ compiler.
Currently, dev-mode can be enabled via `--dev` boolean option (flag), but I'm going to make it more tunable.

## Functionality

This is what I want dev-mode to help me with:
- Logging only if I need.
- Producing debug info (I'm talking about logged debug info, not about executable debug info), i.e. printing IRs and storages data, only when I want.

And to that all for each stage only when I want.

## CLI Options

__--dev option MUST be passed to cli to enable all other dev options__

The main point is to make dev-mode tuning as simple as possible.
My view is following: "I'm working on {STAGE} stage, so turn on logs for {STAGE} - `--dev-log={STAGE}`, print debug info related to {STAGE} - `--dev-print={STAGE}`, etc."
And then, if I want to see logs for {ANOTHER_STAGE} stage, I would pass `--dev-log={ANOTHER_STAGE}` or by adding `{ANOTHER_STAGE}` to the already passed `--dev-log` option after `,`.

- `--dev-print={STAGE}` - single value - Enable stage-related IRs and storages pretty printing.
- `--dev-log={STAGE}` - single value - Enable dev-logs for specific stage `{STAGE}`.
- `--dev-full` - boolean - Enable all `dev` options for all stages.
<div class="nav-btn-block">
    
    <button class="nav-btn right">
    <a class="link" href="/Jacy-Dev-Book/cli/index.html">Cli ></a>
</button>

</div>
