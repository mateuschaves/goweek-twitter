const Tweet = require("../models/Tweet");
const NaturalLanguageUnderstandingV1 = require("ibm-watson/natural-language-understanding/v1.js");

module.exports = {
  async index(_, res) {
    const tweets = await Tweet.find({}).sort("-createdAt");

    return res.json(tweets);
  },

  async store(req, res) {
    const emotions = [];
    const tags = ["sadness", "joy", "fear", "anger"];

    const nlu = new NaturalLanguageUnderstandingV1({
      iam_apikey: process.env.NATURAL_LANGUAGE_UNDERSTANDING_IAM_APIKEY,
      version: "2018-04-05",
      url: process.env.NATURAL_LANGUAGE_UNDERSTANDING_URL
    });
    nlu
      .analyze({
        html: req.body.content,
        features: {
          emotion: {}
        }
      })
      .then(result => {
        const {
          emotion: {
            document: {
              emotion: { sadness, joy, fear, anger }
            }
          }
        } = result;

        [sadness, joy, fear, anger].map((emotion, i) => {
          if (emotion > 0.3) emotions.push(tags[i]);
        });

        console.log(emotions);
      })
      .catch(err => {
        console.log("error:", err);
      });
    const tweet = await Tweet.create(req.body);

    req.io.emit("tweet", tweet);

    return res.json(tweet);
  }
};
