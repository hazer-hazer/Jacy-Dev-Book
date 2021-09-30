const hljs = require('highlight.js/lib/core')
const jacyLang = require('@jacy-lang/jacy.highlight.js')
hljs.registerLanguage('jc', jacyLang);

const getSourceLines = src => src.split(/\r\n|\r|\n/g)

const addLineNum = (num, line) => {
    return `
        <div class="line-num" data-line-num="${num}">${num}</div><div class="line">${line}</div>
    `.trim()
}

const addLineNumbers = src => {
    const lines = getSourceLines(src.trim())

    let result = ''
    for (let i = 0; i < lines.length; i++) {
        result += addLineNum(i + 1, lines[i])
    }

    return result
}

module.exports = src => {
    let highlighted = src.replace(/```jc([\s\S]*?)```/g, (match, code) => {
        return `
        <div class="code-fence highlight-jc hljs">
            ${addLineNumbers(hljs.highlight(code, {language: 'jc'}).value)}
        </div>
        `.trim()
    })

    highlighted = highlighted.replace(/`([^`]*?)`/g, (match, code) => {
        return `
        <span class="inline-code highlight-jc hljs">${hljs.highlight(code, {language: 'jc'}).value}</span>
        `.trim()
    })

    return highlighted
}


