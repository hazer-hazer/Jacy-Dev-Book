module.exports = ({
    src,
    layout = 'default',
    title = 'Untitled',
    navOrder = 1,
    parent,
}) => {
    src = src.trim()
    if (src.startsWith('---')) {
        src = src.slice(src.indexOf('---', 3) + 3).trim()
    }

    return `
---
layout: '${layout}'
title: '${title}'
nav_order: ${navOrder}
parent: ${parent}
---

${src}
`.trimLeft()
}
