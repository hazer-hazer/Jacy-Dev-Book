const crypto = require('crypto')
const highlight = require('./highlight')

const md5 = str => crypto.createHash('md5').update(str).digest('hex')

const navBtn = (next, {relPath, title}) => {
    let align
    if (next) {
        align = 'right'
        title += " >"
    } else {
        align = 'left'
        title = "< " + title
    }
    return `
<button class="nav-btn ${align}">
    <a class="link" href="/Jacy-Dev-Book/${relPath.replace('\\', '/').replace('.md', '.html')}">${title}</a>
</button>
`.trim() + '\n'
}

const navBtnBlock = (previous, next) => {
return `
<div class="nav-btn-block">
    ${previous ? navBtn(false, previous) : ''}
    ${next ? navBtn(true, next) : ''}
</div>
`.trim() + '\n'
}

const addCustomElements = src => src
    .replace(/\{:>(.*):\}\n+((>.*\n?)+)/g, (match, name, contents) => {
        contents = contents.replace(/>\s*/g, '')
        let id = `input-${md5(contents)}`
        return `
<div class="fold-block">
    <input id="${id}" type="checkbox">
    <label class="clicker" for="${id}">> ${name.trim()}</label>
    <blockquote class="content">${contents}</blockquote>
</div>
`.trim() + '\n'
    })
    .replace(/\{:@(.*):\}/g, (match, text) => {
        return `
<span class="label-highlight">${text}</span>
        `.trim()
    })

const tmpl = {
    earlyTmpl({
        src,
        layout = 'default',
        title,
        navOrder,
        parent,
        hasChildren,
        grandParent,
    }) {
        // Remove front matter if file has
        src = src.trim()
        if (src.startsWith('---')) {
            src = src.slice(src.indexOf('---', 3) + 3).trim()
        }
        
        src = highlight(src)

        src = addCustomElements(src)

        return `
---
layout: '${layout}'
title: '${title}'
${navOrder ? `nav_order: ${navOrder}` : '# No nav_order'}
${parent ? `parent: '${parent}'` : '# No parent'}
${hasChildren ? 'has_children: true' : '# No children'}
${grandParent ? `grand_parent: '${grandParent}'` : '# No grandparent'}
---

${src}
`.trimLeft()
    },

    addNavButtons(fileStr, previous, next) {
        return fileStr + navBtnBlock(previous, next)
    }
}

module.exports = tmpl
