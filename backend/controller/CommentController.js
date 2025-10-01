const commentService = require("../service/CommentService");

module.exports = {
  saveComment: async (req, res) => {
    const comment = await commentService.save({...req.body,"username":req.username});
    res.status(201).send(comment);
  },
  getAllCommentsForPost: async (req, res) => {
    const comments = await commentService.getAllComments(req.query.postId);
    res.status(200).send([...comments]);
  },
  getAllCommentsForUser: async (req, res) => {
    const comments = await commentService.getAllCommentsForUser(
      req.query.username
    );
    res.status(200).send(comments);
  },
};
