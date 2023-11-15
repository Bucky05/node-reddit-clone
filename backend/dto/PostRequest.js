modules.export = class PostRequest {
    constructor(postId, postName, subredditName, url, description) {
        this.post_id = postId
        this.post_name = postName
        this.subreddit_name = subredditName
        this.url = url
        this.description = description
        this.username = username
    }
}