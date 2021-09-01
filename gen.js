const fs = require('fs')
const path = require('path')
const {
    SOURCE_PATH,
    DIST_PATH,
    INDEX_FILENAME,
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
        const sourceDir = await this._processDir(SOURCE_PATH, STRUCT, {
            navOrder: 1,
            isRootDir: true,
        })
        // console.log(JSON.stringify(sourceDir, null, 2));
        await this._genDir(sourceDir)
    }

    async _processFile(filePath, struct, {isIndex, navOrder, parentTitle, grandParentTitle, parentNavOrder, isRootDir = false}) {
        if (!filePath.endsWith('.md')) {
            return null
        }

        const filename = path.basename(filePath, '.md')

        let title = struct.title || nameFromFilename(filename)

        if ('children' in struct) {
            throw Error(`Invalid structure: ${filePath} has children but exists as file`)
        }

        const src = fs.readFileSync(filePath, 'utf8')

        let hasChildren = isIndex
        if (isIndex) {
            title = parentTitle
            parentTitle = grandParentTitle
            navOrder = parentNavOrder
            if (isRootDir) {
                hasChildren = false
                parentTitle = null
            }
        }

        return {
            isDir: false,
            title,
            parent: parentTitle,
            src,
            navOrder,
            hasChildren,
            isIndex: filename == INDEX_FILENAME,
            relPath: path.relative(SOURCE_PATH, filePath),
        }
    }

    async _processDir(dirPath, struct, {navOrder, parentTitle = null, isRootDir = false}) {
        const children = []
        const entities = fs.readdirSync(dirPath)
        entities.sort()

        const dirName = path.basename(dirPath)
        const title = struct.title || nameFromFilename(dirName)

        // Settings for children
        const settings = {
            parentTitle: title,
            grandParentTitle: parentTitle,
            parentNavOrder: navOrder,
        }

        let index = 1

        for (const subPath of entities) {
            const childPath = path.join(dirPath, subPath)
            const childIsDir = fs.lstatSync(childPath).isDirectory()
            const childFilename = path.basename(subPath, '.md')
            const isIndex = childFilename === INDEX_FILENAME

            let childStruct = {}
            if (isIndex) {
                childStruct = struct
            } else {
                childStruct = struct?.children?.[childFilename] || {}
            }

            settings.navOrder = childStruct.order || index

            if (childIsDir) {
                children.push(await this._processDir(childPath, childStruct, {
                    ...settings,
                    isIndex
                }))
            } else {
                const file = await this._processFile(childPath, childStruct, {
                    ...settings,
                    isRootDir,
                    isIndex,
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
            // console.log(`mkdir ${dirPath}`);
            fs.mkdirSync(dirPath);
        }

        for (const child of Object.values(dir.children)) {
            this.gen(child)
        }
    }

    async _genFile(file) {
        // console.log(`file path: ${path.join(DIST_PATH, file.relPath)}`);
        fs.writeFileSync(path.join(DIST_PATH, file.relPath), fileTmpl(file), 'utf8')
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
