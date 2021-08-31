module.exports = ({
    src,
    layout = 'default',
    title = 'Untitled',
    navOrder = 1,
    parent,
}) => {
    src = src.trim()
    if (src.startsWith('---')) {
        src = src.slice(3, src.indexOf('---', 3))
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
