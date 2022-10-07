const user = {
    id: {
        type: 'number',
        required: true
    },
    username: {
        type: 'string',
        required: true,
        unique: true
    },
    password: {
        type: 'string',
        required: true
    }
}

module.exports = user