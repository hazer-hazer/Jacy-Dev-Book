module.exports = ({
    src,
    layout = 'default',
    title = 'Untitled',
    navOrder,
    parent,
    hasChildren,
}) => {
    // Remove front matter if file has
    src = src.trim()
    if (src.startsWith('---')) {
        src = src.slice(src.indexOf('---', 3) + 3).trim()
    }

    return `
---
layout: '${layout}'
title: '${title}'
${navOrder ? `nav_order: ${navOrder}` : '# No nav_order'}
${parent ? `parent: ${parent}` : '# No parent'}
has_children: ${hasChildren.toString()}
---

${src}
`.trimLeft()
}
