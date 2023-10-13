class Comment {

    /// you can also comment code before constructor it is just assigning data types to the property in constructor
    id = Number;
    text = String;
    post = {
        name: 'postId',
        referencedCloumnName: 'postId'
    }
    createdDate = Date;

    constructor(id, text, post, createdDate) {
        this.id = id
        this.text = text
        this.post = post
        this.createdDate = createdDate
    }
}
module.exports = Comment