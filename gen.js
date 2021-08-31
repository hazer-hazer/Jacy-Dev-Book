const fs = require('fs')
const path = require('path')
const {
    STRUCTURE,
    SOURCE_DIR,
} = require('./config')

const capitalize = str => str[0].toUpperCase() + str.slice(1)

const nameFromFilename = filename => {
    let res = []

    const segments = filename.split('-')

    // Capitalize first word
    res.push(capitalize(segments[0]))

    // Lower rest words
    for (let el of segments.slice(1)) {
        res.push(el.toLowerCase())
    }

    return res.join(' ')
}

/// Collects all source files, auto-generates config and merges it with config described in `STRUCTURE`
const collectSources = async (p = '', struct = STRUCTURE) => {
    const result = {}
    const entities = fs.readdirSync(p)

    const parentName = path.dirname(p).split(path.sep).pop()

    for (const subPath of entities) {
        const childPath = path.join(p, subPath)
        const stat = fs.lstatSync(childPath)
        const childName = path.basename(subPath, '.md')
        const subStruct = struct[childName] || {}

        if (stat.isDirectory()) {
            result[childName] = {
                isDir: true,
                children: await collectSources(childPath, subStruct),
            }
        } else if (subPath.endsWith('.md')) {
            if ('children' in subStruct) {
                throw Error(`Invalid structure: ${p} has children but exists as file`)
            }

            result[childName] = {
                isDir: false,
                name: subStruct.name || nameFromFilename(childName),
                parentName: parentName
            }
        }

        // Ignore non-markdown files
    }
    
    return result
}

;(async () => {
    const sources = await collectSources(path.join(__dirname, SOURCE_DIR))

    console.log(`Sources:`, JSON.stringify(sources, null, 2));
})()
