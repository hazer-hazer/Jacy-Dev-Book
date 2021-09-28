const fs = require('fs')
const path = require('path')
const {
    SOURCE_PATH,
    DIST_PATH,
    INDEX_FILENAME,
    APPENDICES,
} = require('./config')
const STRUCT = require('./struct')
const {earlyTmpl, addNavButtons} = require('./file-tmpl')

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

const copyRecSync = (src, dest) => {
    const exists = fs.existsSync(dest)
    const isDir = fs.lstatSync(src).isDirectory()
    if (isDir) {
        if (!exists) {
            fs.mkdirSync(dest)
        }
        for (const el of fs.readdirSync(src)) {
            copyRecSync(path.join(src, el), path.join(dest, el))
        }
    } else {
        if (exists) {
            fs.rmSync(dest)
        }
        fs.copyFileSync(src, dest)
    }
}

class Generator {
    async run() {
        await this._cleanup()
        await this._prepare()
        const sourceDir = await this._processDir(SOURCE_PATH, STRUCT, {
            navOrder: 1,
            isRootDir: true,
        })
        // console.log(JSON.stringify(sourceDir, null, 2));
        await this._genDir(sourceDir)
    }

    async _cleanup(p = DIST_PATH) {
        const exists = fs.existsSync(p)

        if (!exists) {
            return
        }

        const isDir = fs.lstatSync(p).isDirectory()
        if (isDir) {
            for (const el of fs.readdirSync(p)) {
                this._cleanup(path.join(p, el))
            }
        } else if (p.endsWith('.md')) {
            fs.rmSync(p)
        }
    }

    async _prepare() {
        !fs.existsSync(DIST_PATH) && fs.mkdirSync(DIST_PATH)
        for (const apx of APPENDICES) {
            copyRecSync(apx, path.join(DIST_PATH, apx))
        }
    }

    async _processFile(filePath, struct, {isIndex, navOrder, title, parentTitle, grandParentTitle, hasChildren}) {
        if (!filePath.endsWith('.md')) {
            return null
        }

        const filename = path.basename(filePath, '.md')

        title = struct.title || title || nameFromFilename(filename)

        if ('children' in struct && !isIndex) {
            throw Error(`Invalid structure: ${filePath} has children but exists as file`)
        }

        const src = fs.readFileSync(filePath, 'utf8')

        return {
            isDir: false,
            title,
            parent: parentTitle,
            grandParent: grandParentTitle,
            src,
            navOrder,
            hasChildren,
            isIndex: filename == INDEX_FILENAME,
            relPath: path.relative(SOURCE_PATH, filePath),
        }
    }

    async _processDir(dirPath, struct, {navOrder, parentTitle = null, grandParentTitle = null}) {
        const entities = fs.readdirSync(dirPath)
        entities.sort((lhs, rhs) => lhs.toLowerCase().localeCompare(rhs.toLowerCase()))

        const dirName = path.basename(dirPath)
        const title = struct.title || nameFromFilename(dirName)

        const children = []

        const childrenCount = entities.filter(en => en.endsWith('.md') && path.basename(en, '.md') !== 'index').length

        const indexFile = entities.filter(en => path.basename(en, '.md') === 'index')[0]
        children.push(await this._processFile(path.join(dirPath, indexFile), struct, {
            title,
            parentTitle,
            grandParentTitle,
            isIndex: true,
            navOrder,
            hasChildren: childrenCount > 1,
        }))

        const childSettings = {
            parentTitle: title,
            grandParentTitle: parentTitle,
        }

        let index = 100

        for (const subPath of entities) {
            if (path.basename(subPath, '.md') === 'index') {
                continue
            }

            const childPath = path.join(dirPath, subPath)
            const childIsDir = fs.lstatSync(childPath).isDirectory()
            const childFilename = path.basename(subPath, '.md')

            let childStruct = struct?.children?.[childFilename] || {}

            const navOrder = childStruct.order || index

            if (childIsDir) {
                children.push(await this._processDir(childPath, childStruct, {
                    ...childSettings,
                    navOrder,
                }))
            } else {
                const file = await this._processFile(childPath, childStruct, {
                    ...childSettings,
                    navOrder,
                })
                if (file) {
                    children.push(file)
                }
            }

            index++

            // if ('after' in childStruct) {
            //     childStruct.sortFactor = childStruct.after + '_'
            // } else {
            //     childStruct.sortFactor = childName
            // }
        }

        let relPath = null
        if (!title) {
            relPath = ''
        } else {
            relPath = path.relative(SOURCE_PATH, dirPath)
        }

        return {
            isDir: true,
            title,
            children,
            relPath,
        }
    }

    async _genDir(dir) {
        const dirPath = path.join(DIST_PATH, dir.relPath)
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath);
        }

        const children = Object.values(dir.children)
        for (let i = 0; i < children.length; i++) {
            const child = children[i]
            const previous = i > 0 ? children[i - 1] : null
            const next = i < children.length - 1 ? children[i + 1] : null

            await this.gen(child, previous, next)
        }
    }

    async _genFile(file, previous, next) {
        const fileStr = earlyTmpl(file)
        const fileStrWithBtns = addNavButtons(fileStr, previous, next)
        fs.writeFileSync(path.join(DIST_PATH, file.relPath), fileStrWithBtns, 'utf8')
    }

    async gen(entity, previous, next) {
        if (entity.isDir) {
            await this._genDir(entity, previous, next)
        } else {
            await this._genFile(entity, previous, next)
        }
    }
}

;(async () => {
    await (new Generator).run()
})()
