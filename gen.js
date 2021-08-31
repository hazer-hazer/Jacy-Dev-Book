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
        const sourceDir = await this._processDir(SOURCE_PATH, STRUCT, null, null)
        await this._genDir(sourceDir)
    }

    async _processFile(filePath, struct, title, parentTitle) {
        if (!filePath.endsWith('.md')) {
            return null
        }

        if ('children' in struct) {
            throw Error(`Invalid structure: ${filePath} has children but exists as file`)
        }

        const src = fs.readFileSync(filePath, 'utf8')

        return {
            isDir: false,
            title,
            parent: parentTitle,
            src,
            relPath: path.relative(SOURCE_PATH, filePath),
        }
    }

    async _processDir(dirPath, struct, title, parentTitle) {
        const children = []
        const entities = fs.readdirSync(dirPath)

        for (const subPath of entities) {
            const childPath = path.join(dirPath, subPath)
            const childIsDir = fs.lstatSync(childPath).isDirectory()
            const childFilename = path.basename(subPath, '.md')

            const childStruct = struct[childFilename] || {}
            const childName = childStruct.name || nameFromFilename(childFilename)

            if (childIsDir) {
                children.push(await this._processDir(childPath, childStruct, childName, title))
            } else {
                const file = await this._processFile(childPath, childStruct, childName, title)
                if (file) {
                    children.push(file)
                }
            }

            // Ignore non-markdown files
        }

        let relPath = null
        if (!title) {
            relPath = DIST_PATH
        } else {
            relPath = path.relative(SOURCE_PATH, dirPath)
        }

        return {
            isDir: true,
            name: title,
            children,
            path: dirPath,
            relPath,
        }
    }

    async _genDir(dir) {
        const dirPath = path.join(DIST_PATH, dir.absPath)
        if (!fs.existsSync(dirPath)){
            console.log(`mkdir ${dirPath}`);
            // fs.mkdirSync(dir.absPath);
        }

        for (const child of Object.values(dir.children)) {
            this.gen(child)
        }
    }

    async _genFile(file) {
        console.log(`write file: ${path.join(DIST_PATH, file.relPath)}`);
        // fs.writeFileSync(path.join(DIST_PATH, file.path), fileTmpl(file), 'utf8')
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
