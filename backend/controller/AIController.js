const AIService = require("../service/AIService")

module.exports = {
  enhance: async (req, res) => {
    try {
      const { content, prompt } = req.body;

      const aiText = await AIService.enhance( content, prompt );

      res.json({ enhanced: aiText });
    } catch (err) {
        console.error("AI Error: ",err)
        res.status(500).json({"error":"AI enhancement failed. Please try again after some time."})
    }
  },
};
