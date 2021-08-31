module.exports = (src, {
    layout = 'default',
    title = 'Untitled',
    nav_order = 1,
    parent,
}) => `
---
layout: '${layout}'
title: '${title}'
nav_order: ${nav_order}
parent: ${parent}
---

${src}
`