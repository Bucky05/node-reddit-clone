modules.export = class PostRequest {
    constructor(postId, postName, subredditName, url, description) {
        this.postId = postId
        this.postName = postName
        this.subredditName = subredditName
        this.url = url
        this.description = description
    }
}