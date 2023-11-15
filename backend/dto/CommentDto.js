const { use } = require("../controller/AuthController")

class CommentDto {
    constructor(id,postId,createdDate,text,username) {
        this.id = id
        this.postId = postId
        this.createdDate = createdDate
        this.text = text
        this.username = username
    }
}