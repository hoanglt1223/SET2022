const { DBCollections, fileSystemDataSource } = require('../datasources')
const { validateEntityFields, validateEntityUniqueness } = require('./helpers')
const { handleError } = require('../helpers')

function Repository(name, schema) {
  this.schema = schema

  this.find = function find(where) {
    return fileSystemDataSource.readCollection(DBCollections.USER)
      .then(data => {
        if (where && Array.isArray(data) && data.length > 0) {
          const filteredData = data.filter(item =>
            Object.keys(where).every(field => where[field] === item[field])
          )
          return filteredData
        }
        return data
      })
      .catch(err => {
        handleError(err, 'repositories/base.repository.js', 'find')
        return []
      })
  }

  this.findById = function findById(id) {
    return fileSystemDataSource.readCollection(DBCollections.USER)
      .then(data => {
        const foundEntity = data.find(entity => entity.id === id)
        return foundEntity
      })
      .catch(err => {
        handleError(err, 'repositories/base.repository.js', 'findById')
        return undefined
      })
  }

  this.createOne = function createOne(newItem) {
    return new Promise((resolve, reject) => {
      let validationError = validateEntityFields(this.schema, newItem)
      if (validationError) {
        reject(validationError)
      } else {
        this.find().then(existingItems => {
          validationError = validateEntityUniqueness(this.schema, newItem, existingItems)
          if (validationError) {
            reject(new Error(validationError))
          } else {
            const entity = {
              ...newItem,
              id: existingItems.length + 1
            }
            existingItems.push(entity)
            fileSystemDataSource.updateCollection(DBCollections.USER, existingItems)
              .then(() => resolve(entity))
              .catch(err => {
                handleError(err, 'repositories/base.repository.js', 'createOne')
                reject(err)
              })
          }
        })
      }
    })
  }
}

module.exports = Repository
