const FileSystemDataSource = require('./file-system.datasource')

const database = './database'

const DBCollections = {
  USER: 'users'
}

const fileSystemDataSource = new FileSystemDataSource(database)

module.exports = { DBCollections, fileSystemDataSource }
