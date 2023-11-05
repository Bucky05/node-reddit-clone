const { subscribe } = require("../controller/AuthController");
//these naming conventions will be as per sql table columns if using in pool.query
class SubredditDto {
    constructor(id,subredditName,description,numberOfPosts) {
        this.subreddit_id = id
        this.subreddit_name = subredditName
        this.description = description
        this.number_of_posts = numberOfPosts
    }
}
module.exports = SubredditDto