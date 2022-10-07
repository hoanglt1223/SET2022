const Repository = require('./base.repository')
const { userModel } = require('../models')
const { DBCollections } = require('../datasources')

const userRepository = new Repository(DBCollections.USER, userModel)

module.exports = userRepository
