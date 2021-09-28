const hljs = require('highlight.js/lib/core')
const jacyLang = require('./jacy-lang')
hljs.registerLanguage('jc', jacyLang);

const getSourceLines = src => src.split(/\r\n|\r|\n/g)

const addLineNum = (num, line) => {
    return `
        <tr><td class="line-num-col"><div class="line-num" data-line-num="${num}"></div></td><td class="line-col"><div class="line-content">${line}</div></td></tr>
    `.trim()
}

const addLineNumbers = src => {
    const lines = getSourceLines(src.trim())

    let result = ''
    for (let i = 0; i < lines.length; i++) {
        result += addLineNum(i + 1, lines[i])
    }

    return `
        <table class="code-table">${result}</table>
    `.trim()
}

module.exports = src => {
    return src.replace(/```jc([\s\S]*?)```/g, (match, code) => {
        return `
        <pre class="code-fence highlight-jc hljs">
            ${addLineNumbers(hljs.highlight(code, {language: 'jc'}).value)}
        </pre>
        `.trim()
    })
}


