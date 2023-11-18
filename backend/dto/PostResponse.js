modules.export = class PostResponse {
    constructor(postId, postName, subredditName, url, description, voteCount, commentCount, duration) {
        this.post_id = postId
        this.post_name = postName
        this.subreddit_name = subredditName
        this.url = url
        this.description = description
        this.username = username
        this.voteCount = voteCount
        this.commentCount = commentCount
        this.duration = duration
    }
}