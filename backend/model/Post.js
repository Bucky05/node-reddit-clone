const Subreddit = require('./Subreddit')
const User = require('./User')
class Post {
    postId = Number
    url = String
    postName = String
    description = String
    voteCount = String
    user = User
    createdDate = Date
    subreddit = Subreddit

    constructor(postId, url, postName, description, voteCount, user, createdDate, subreddit) {
        this.postId = postId
        this.url = url
        this.postName = postName
        this.description = description
        this.voteCount = voteCount
        this.user = user
        this.createdDate = createdDate
        this.subreddit = subreddit
    }


}