const Post = require('./Post')
const User = require('./User')
module.exports = class Subreddit {
    id = Number
    name = String
    description = String
    posts = [Post]
    createdDate = Date
    user = User

    constructor(id, name, description, post, createdDate, user) {
        this.id = id
        this.name = name
        this.description = description
        this.post = post
        this.createdDate = createdDate
        this.user = user
    }


}