const models = require("../../../models");
const sha256 = require("sha256");
const app = require("../../../app");

async function getReviews_pagination(req, res) {
  const pageNum = req.params.page;

  const limit = 5;
  const offset = limit * (parseInt(pageNum) - 1);
  try {
    let resp1 = await models.review.findAll({      
      attributes: ["id", "title", "content", "thumbnail", "created_at"],
      order: [["id", "DESC"]],
      where:{
        'google_api':'0'
      }
    });
    resp1 = resp1.filter(
      (app, idx) => offset <= idx && idx <= offset + limit - 1
    );

    let resp2 = await models.review.findAll({      
      attributes: ["id", "title", "link", "thumbnail", "created_at"],
      order: [["id", "DESC"]],
      where:{
        'google_api':'1'
      }
    });
    resp2 = resp2.filter(
      (app, idx) => offset <= idx && idx <= offset + limit - 1
    );

    res.send({
        Message: "Success",
        ResultCode: "ERR_OK",
        Size: 10,
        Response: {
          'user_data':resp1,
          'crawling_data':resp2
        }          
      });
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