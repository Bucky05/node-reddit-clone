const pool = require('../db/connection')
const {saveVote,getPostById,getLastVoteOnPostByUser,updateVoteCount,deleteVote} = require('../db/queries')
const User = require('../model/User')
const authservice = require('./AuthService')

module.exports = {
    vote : async function (voteDto) {
        try {
        const currentUser = authservice.getCurrentUser()
        const post = await pool.query(getPostById,voteDto.entryId)
        if(post.length == 0) {
            throw 'Post not found with ID '+voteDto.entryId
        }
        let voteCount = post[0].vote_count
        const lastVote = await pool.query(getLastVoteOnPostByUser,[currentUser,voteDto.entryId])

        if(voteDto.voteType === 0) {
            voteCount++;
        }
        else   
            voteCount--;
       
        if(lastVote.length > 0) {
            if(lastVote[0].vote_type == voteDto.voteType) {
                let voted = 'DownVote'
                if(voteDto.voteType === 0)
                    voted = 'UpVote'
                throw 'You have already '+voted+"'d for this post"
            }
            else {
                //remove last vote if last vote is different than current vote
                await pool.query(deleteVote,[currentUser,voteDto.entryId])
            }

        }
        else 
            await pool.query(saveVote,{"entry_id":voteDto.entryId,"username":currentUser,"vote_type":voteDto.voteType})
        
        await pool.query(updateVoteCount,[voteCount,voteDto.entryId])
        return true
    }
    catch(err) {
        return err
        //console.log('Unable to add vote ',err)
    }
    }
}