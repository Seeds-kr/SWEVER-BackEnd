const models = require('../../../models');
const sha256 = require('sha256');
const app = require('../../../app');

async function getRecruits(req, res) {
    try {
        const pid = req.params.page;

        const resp = await models.recruit_post.findAll({
            attributes: 
                ['recruit_id','nation_id','company_name','company_city','description_title','description_content','company_apply_link',
                'posted_date','is_visa_sponsored','is_remoted','company_logo','salary','contract_form',
                'company_page_link','origin','tag','location','is_dev','created_at','created_by',
                'updated_at','updated_by'
            ],        
            order: [
                ['posted_date', 'DESC']
            ],
            include: [
                {
                    model: models.nation,
                    attributes: []
                    
                },                
                {
                    model: models.description_tech,
                    attributes: []                    
                }
            ]
        });
        res.send([{
            Message: "Success", 
            ResultCode: "ERR_OK",            
            Size: 10,
            Response: resp
        }])
    }
    catch (err) {
        console.log(err);        
        res.status(500).send([{            
            Message: "Internal server error", 
            ResultCode: "ERR_INTERNAL_SERVER"
        }]);
    }
}

// async function getRecruits_pagination(req, res) {
//     const pageNum = req.query.page;
//     const limit = 8;
//     const offset = limit * (parseInt(pageNum) - 1);
//     try {
//         let resp = await models.application.findAll({
//             group: ['application.id'],
//             order: [
//                 ['startTime', 'DESC']
//             ],
//             attributes: {
//                  include: [[models.Sequelize.fn("COUNT", models.Sequelize.col("requests.id")), "requestCount"]]
//             },
//             include: [
//                 {
//                     model: models.user,
//                     attributes: {
//                         exclude: ['password']
//                     }
//                 },
//                 {
//                     model: models.request,
//                     attributes: []
//                 }
//             ],
          

//         });
//         resp=resp.filter((app, idx) => (offset <= idx && idx <= offset + limit - 1));        
//         res.send(resp);
//     }
    
//     catch (err) {
//         //bad request
//         console.log(err);
//         res.status(400).send({
//             result: false,
//             msg: err.toString()
//         });
//     }
// }

module.exports = {    
    getRecruits
    //getRecruits_pagination
};