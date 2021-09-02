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

const tmpl = {
    earlyTmpl({
        src,
        layout = 'default',
        title = 'Untitled',
        navOrder,
        parent,
        hasChildren,
    }) {
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
${parent ? `parent: '${parent}'` : '# No parent'}
${hasChildren ? 'has_children: true' : '# No children'}
---

${src}
`.trimLeft()
    },

    addNavButtons(fileStr, previous, next) {
        return fileStr + navBtnBlock(previous, next)
    }
}

module.exports = tmpl
