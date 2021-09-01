const fs = require('fs')
const path = require('path')
const {
    SOURCE_PATH,
    DIST_PATH,
    INDEX_FILENAME,
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

class Generator {
    async run() {
        const sourceDir = await this._processDir(SOURCE_PATH, STRUCT, {
            navOrder: 1,
            isRootDir: true,
        })
        // console.log(JSON.stringify(sourceDir, null, 2));
        await this._genDir(sourceDir)
    }

    async _processFile(filePath, struct, {isIndex, navOrder, parentTitle, grandParentTitle, ggpTitle, parentNavOrder, isRootDir = false}) {
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

            if (!ggpTitle) {
                parentTitle = null
            }
        } else if (!grandParentTitle) {
            parentTitle = null
        }

        return {
            isDir: false,
            title,
            parent: parentTitle,
            grandParent: ggpTitle,
            src,
            navOrder,
            hasChildren,
            isIndex: filename == INDEX_FILENAME,
            relPath: path.relative(SOURCE_PATH, filePath),
        }
    }

    async _processDir(dirPath, struct, {navOrder, parentTitle = null, grandParentTitle, isRootDir = false}) {
        const children = []
        const entities = fs.readdirSync(dirPath)
        entities.sort()

        const dirName = path.basename(dirPath)
        const title = struct.title || nameFromFilename(dirName)

        // Settings for children
        const settings = {
            parentTitle: title,
            grandParentTitle: parentTitle,
            ggpTitle: grandParentTitle,
            parentNavOrder: navOrder,
        }

        let index = 100

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
            fs.mkdirSync(dirPath);
        }

        const children = Object.values(dir.children)
        for (let i = 0; i < children; i++) {
            const child = children[i]
            const previous = i > 0 ? children[i - 1] : null
            const next = i < children.length - 1 ? children[i + 1] : null
            this.gen(child, previous, next)
        }
    }

    async _genFile(file, previous, next) {
        const fileStr = earlyTmpl(file)
        const fileStrWithBtns = addNavButtons(fileStr, previous, next)
        fs.writeFileSync(path.join(DIST_PATH, file.relPath), fileStrWithBtns, 'utf8')
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
