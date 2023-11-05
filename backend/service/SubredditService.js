const {saveSubreddit,getAllSubreddit} = require('../db/queries')
const pool = require('../db/connection')
const SubredditDto = require('../dto/SubredditDto')
const {v4 : uuidv4} = require('uuid')

module.exports  = { 
    saveSubredditFunction : async (subredditDto) => {
        try {
            const uuid = uuidv4()
            const subreddit = new SubredditDto(uuid, subredditDto.name,subredditDto.description,0)
            await pool.query(saveSubreddit,subreddit)
            return subreddit
        }
        catch(err) {
            console.log("Unable to create subreddit ",err)
        }
    },
    getAll : async ()=> {
        return await pool.query(getAllSubreddit)
    }
}
