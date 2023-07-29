const models = require("../../../models");
const sha256 = require("sha256");
const app = require("../../../app");

async function getReviews_pagination(req, res) {
  const pageNum = req.params.page;

  const limit = 10;
  const offset = limit * (parseInt(pageNum) - 1);
  try {
    let resp = await models.review.findAll({
      group: ["id"],
      attributes: ["id", "title", "link", "thumbnail", "created_at"],
      order: [["id", "DESC"]],
    });
    resp = resp.filter(
      (app, idx) => offset <= idx && idx <= offset + limit - 1
    );
    res.send([
      {
        Message: "Success",
        ResultCode: "ERR_OK",
        Size: 10,
        Response: resp,
      },
    ]);
  } catch (err) {
    console.log(err);
    res.status(500).send([
      {
        Message: "Internal server error",
        ResultCode: "ERR_INTERNAL_SERVER",
      },
    ]);
  }
}

async function upsertReview(req, res) {
  try {
    await models.review.upsert({
      id: req.body.id,
      title: req.body.title,         
      creator_id: req.user.id,
      thumbnail: req.body.thumbnail,
      snippet: req.body.snippet,
      updated_at: Date.now(),
      content: req.body.content,
      google_api:"0"
    });      
    res.send([
    {
      Message: "SUCCESS",
      ResultCode: "ERR_OK",          
    }]);
  }
  catch (err) {
    console.log(err);
    res.status(500).send([
      {
        Message: "Internal server error",
        ResultCode: "ERR_INTERNAL_SERVER",
      },
    ]);
  }
}

async function deleteReview(req, res) {
  try {
    await models.review.destroy({
      where: {
        id: req.params.id
      }
    })
    res.send([
    {
      Message: "SUCCESS",
      ResultCode: "ERR_OK",          
    }]);
  }
  catch (err) {
    console.log(err);
    res.status(500).send([
      {
        Message: "Internal server error",
        ResultCode: "ERR_INTERNAL_SERVER",
      },
    ]);
  }
}

module.exports = {
  getReviews_pagination,
  upsertReview,
  deleteReview
};