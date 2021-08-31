const fs = require('fs')
const path = require('path')
const {
    SOURCE_PATH,
    DIST_PATH,
} = require('./config')
const STRUCT = require('./struct')
const fileTmpl = require('./file-tmpl')

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

class Generator {
    async run() {
        await this.gen(await this.collectSources(SOURCE_PATH))
    }

    /// Collects all source files, auto-generates config and merges it with config described in `struct.js`
    async collectSources(p = SOURCE_PATH, struct = STRUCT) {
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
                    children: await this.collectSources(childPath, subStruct),
                }
            } else if (subPath.endsWith('.md')) {
                if ('children' in subStruct) {
                    throw Error(`Invalid structure: ${p} has children but exists as file`)
                }
    
                const src = fs.readFileSync(childPath, 'utf8')
    
                result[childName] = {
                    isDir: false,
                    name: subStruct.name || nameFromFilename(childName),
                    parent: parentName,
                    src,
                    path: path.relative(SOURCE_PATH, childPath),
                }
            }
    
            // Ignore non-markdown files
        }
    
        return result
    }

    async _genDir(dir) {
        for (const child of dir.children) {
            this.gen(child)
        }
    }

    async _genFile(file) {
        fs.writeFileSync(path.join(DIST_PATH, file.path), fileTmpl(file), 'utf8')
    }

    async gen(entity) {
        if (entity.isDir) {
            await this._genDir(entity)
        } else {
            await this._genFile(entity)
        }
    }
}

;(async () => {
    await (new Generator).run()
})()
