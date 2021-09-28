const path = require('path')

const SOURCE_DIR = '_docs'
const DIST_DIR = 'build'

const INDEX_FILENAME = 'index'
const SOURCE_PATH = path.join(process.cwd(), SOURCE_DIR)
const DIST_PATH = path.join(process.cwd(), DIST_DIR)

const APPENDICES = [
    '_sass',
    'assets',
    '_config.yml'
]

module.exports = {
    APPENDICES,
    SOURCE_PATH,
    DIST_PATH,
    INDEX_FILENAME,
}
