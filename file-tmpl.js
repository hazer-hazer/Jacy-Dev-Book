module.exports = {
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

    navBtn({link, title}) {
        return `
[${title}](link){: .btn .btn-outline }
        `
    },

    navBtns({previous, next}) {
        let str = ''
        if (previous) {
            str += this.navBtn(previous)
        }
        if (next) {
            str += this.navBtn(next)
        }
        return str
    }
}
