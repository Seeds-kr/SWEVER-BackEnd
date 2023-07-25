const models = require("../../../models");
const sha256 = require("sha256");
const app = require("../../../app");

async function getReviews_pagination(req, res) {
  const pageNum = req.params.page;

  const limit = 10;
  const offset = limit * (parseInt(pageNum) - 1);
  try {
    let resp = await models.review.findAll({
      group: ["review_id"],
      attributes: ["review_id", "title", "link", "thumbnail", "created_at"],
      order: [["review_id", "DESC"]],
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
    const review = await models.review.findOne({
      where: {
        review_id: req.body.rid
      }
    });
    console.log(review);
    if (!review) {
      await models.review.create({
        //review_id: req.body.rid,
        title: req.body.title,
        link: req.body.link,
        created_at: now(),
        create_by: req.body.user,
        thumbnail: req.body.thumbnail,
        snippet: req.body.snippet,
      });
    } else {
      await models.review.update(
        {
          title: req.body.title,
          link: req.body.link,
          updated_at: now(),
          updated_by: req.body.user,
          thumbnail: req.body.thumbnail,
          snippet: req.body.snippet,
        },
        {
          where: {
            review_id: req.body.rid
          },
        }
      );

    //   req.session.user = await models.user.findOne({
    //     where: {
    //       user_id: req.body.uid,
    //     },
    //     attributes: ["user_id", "name"],
    //   });
      res.send([
        {
          Message: "Success",
          ResultCode: "ERR_OK",          
        },
      ]);
    }
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

module.exports = {
  getReviews_pagination,
  upsertReview,
};