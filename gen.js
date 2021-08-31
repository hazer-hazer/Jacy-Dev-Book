import fs from 'fs'
import path from 'path'

const SOURCE_DIR = 'src'

const STRUCTURE = {

}

const capitalize = str => el[0].toUpperCase() + el.slice(1)

const nameFromFilename = filename => {
    let res = ''

    const segments = filename.split('-')

    // Capitalize first word
    res += capitalize(segments[0])

    // Lower rest words
    for (let el of segments.slice(1)) {
        res += el.toLowerCase()
    }

    return res
}

const collectSources = async (p = '', struct = STRUCTURE) => {
    const result = {}
    const entities = await fs.readdir(p)

    const parentName = path.dirname(p).split(path.sep).pop()

    for (const subPath of entities) {
        const childPath = path.join(p, subPath)
        const stat = fs.lstatSync(childPath)
        const childName = path.basename(subPath)
        const subStruct = struct[childName] || {}

        if (stat.isDirectory()) {
            result[childName] = {
                isDir: true,
                children: collectSources(childPath, subStruct),
            }
        } else {
            if ('children' in struct) {
                throw Error(`Invalid structure: ${p} has children but exists as file`)
            }

            result[childName] = {
                isDir: false,
                name: struct.name || nameFromFilename(childName)
            }
        }
    }
}

;(async () => {

})()
