const path = require('path')

const SOURCE_DIR = 'src'
const DIST_DIR = 'dist'

const INDEX_FILENAME = 'index'
const SOURCE_PATH = path.join(__dirname, SOURCE_DIR)
const DIST_PATH = path.join(__dirname, DIST_DIR)

module.exports = {
    SOURCE_PATH,
    DIST_PATH,
    INDEX_FILENAME,
}
