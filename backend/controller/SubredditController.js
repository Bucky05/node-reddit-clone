const SubredditService = require("../service/SubredditService");

module.exports = {
  createSubreddit: async (req, res) => {
    const newSubreddit = await SubredditService.saveSubredditFunction(req.body);
    res.status(201);
    res.send(newSubreddit);
  },
  getAllSubreddit: async (req, res) => {
    const list = await SubredditService.getAll();
    res.send(list);
  },
  getSingleSubreddit: async (req, res) => {
    const subreddit = await SubredditService.getSubreddit(req.params.subredditId);
    res.send(subreddit);
  },
};

///use of controller is to get request and pass it on to the service fit for that request. so avoid
//business code in the controller files
