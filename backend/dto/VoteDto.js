class VoteDto {
    constructor(voteType, entryId) {
        //upvote is 1, downvote is -1
        this.voteType = voteType
        this.entryId = entryId
    }
}