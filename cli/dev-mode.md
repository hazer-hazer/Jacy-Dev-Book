---
layout: 'default'
title: 'Dev mode'
nav_order: 100
parent: 'CLI'
# No children
# No grandparent
---

# Dev Mode

This is a plan (I'm going to implement it now 😇) for <span class="inline-code highlight-jc hljs">jc</span> CLI dev-mode enhancement and documentation for dev-mode at all.

## What is dev-mode

Dev mode is nothing more than just a controller taking root all over the _Jacy_ compiler.
Currently, dev-mode can be enabled via <span class="inline-code highlight-jc hljs">--dev</span> boolean option (flag), but I'm going to make it more tunable.

## Functionality

This is what I want dev-mode to help me with:

- Logging only if I need.
- Producing debug info (I'm talking about logged debug info, not about executable debug info), i.e. printing IRs and storages data, only when I want.

And to that all for each stage only when I want.

## CLI Options

> __--dev option MUST be passed to cli to enable all other dev options__

The main point is to make dev-mode tuning as simple as possible.
My view is following: "I'm working on {STAGE} stage, so turn on logs for {STAGE} - <span class="inline-code highlight-jc hljs">--dev-log={STAGE}</span>, print debug info related to {STAGE} - <span class="inline-code highlight-jc hljs">--dev-print={STAGE}</span>, etc."
And then, if I want to see logs for {ANOTHER_STAGE} stage, I would pass <span class="inline-code highlight-jc hljs">--dev-log={ANOTHER_STAGE}</span> or by adding <span class="inline-code highlight-jc hljs">{ANOTHER_STAGE}</span> to the already passed <span class="inline-code highlight-jc hljs">--dev-log</span> option after <span class="inline-code highlight-jc hljs">,</span>.

- <span class="inline-code highlight-jc hljs">--dev-print={STAGE}</span> - single value - Enable stage-related IRs and storages pretty printing.
- <span class="inline-code highlight-jc hljs">--dev-log={STAGE}</span> - single value - Enable dev-logs for specific stage <span class="inline-code highlight-jc hljs">{STAGE}</span>.
- <span class="inline-code highlight-jc hljs">--dev-full</span> - boolean - Enable all <span class="inline-code highlight-jc hljs">dev</span> options for all stages.
<div class="nav-btn-block">
    <button class="nav-btn left">
    <a class="link" href="/Jacy-Dev-Book/cli/index.md">< CLI</a>
</button>

    
</div>
