const models = require("../../../models");
const sha256 = require("sha256");
const app = require("../../../app");
const { Op } = require('sequelize');

async function getReviews_pagination(req, res) {
  const pageNum = req.query.page || 1; // 기본 페이지 번호는 1

  const limit = 5;
  const offset = limit * (parseInt(pageNum) - 1);
  try {
    let resp1 = await models.review.findAll({      
      attributes: ["id", "title", "content", "thumbnail", "created_at", "creator_id"],
      order: [["id", "DESC"]],
      where:{
        [Op.and]: [
          {google_api: "0"},
          {is_showed: "1"}
        ]
      }
    });
    resp1 = resp1.filter(
      (app, idx) => offset <= idx && idx <= offset + limit - 1
    );

    let resp2 = await models.review.findAll({      
      attributes: ["id", "title", "link", "thumbnail", "created_at"],
      order: [["id", "DESC"]],
      where:{
        [Op.and]: [
          {google_api: "1"},
          {is_showed: "1"}
        ]
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

async function getReview(req, res){
  const reviewId = Number(req.params.id);
  try {
    const resp = await models.review.findOne({
    attributes: null,
    where: {
      id: reviewId      
    }
    });
    if (resp == null){
      res.status(404).send([
      {
        "Message": "Resource not found",
        "ResultCode": "ERR_RESOURCE_NOT_FOUND"
      }]);
    }
    else {
      res.send([{
        Message: "SUCCESS",
        ResultCode: "ERR_OK",
        Response: resp
      }]);
    }
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
    console.log(123);
    await models.review.destroy({
      where: {
        id: req.params.id
      }
    })
    console.log(4324324);
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
  getReview,
  upsertReview,
  deleteReview
};