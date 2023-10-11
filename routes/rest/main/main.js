const models = require('../../../models');
const sha256 = require('sha256');
const app = require('../../../app');
const redisClient = require('../../../redis/redisClient')

async function getMain(req, res) {
    try {
        let remote;
        let visa;
        const cachedRemote = await redisClient.get('remoteData');
        const cachedVisa = await redisClient.get('visaData');

        if (cachedRemote && cachedVisa) {
            console.log("여기 캐시 있어요");
            remote = JSON.parse(cachedRemote);
            visa = JSON.parse(cachedVisa);
        } else {
            console.log("여기 캐시 없어요")
            remote = await models.recruit_post.findAll({
                attributes: 
                    ['id', 'company_name', 'company_logo','description_title',
                    'is_visa_sponsored','is_remoted','location', 'posted_date',
                ],
                where: {
                    is_remoted: 1,
                    is_visa_sponsored: 0,
                    is_dev: 1,
                },
                limit: 6,
                order: [
                    ['posted_date', 'DESC']
                ],
                include: [
                    {
                        model: models.nation_continent,
                        attributes: []
                        
                    }
                ]
            });
            visa = await models.recruit_post.findAll({
                attributes: 
                    ['id', 'company_name', 'company_logo','description_title',
                    'is_visa_sponsored','is_remoted','location', 'posted_date',
                ],
                where: {
                    is_remoted: 0,
                    is_visa_sponsored: 1,
                    is_dev: 1,
                },
                limit: 6,
                order: [
                    ['posted_date', 'DESC']
                ],
                include: [
                    {
                        model: models.nation_continent,
                        attributes: []
                        
                    }
                ]
            });
            redisClient.set('remoteData', JSON.stringify(remote));
            redisClient.expire('remoteData', 21600); // 6시간 뒤 expire
            redisClient.set('visaData', JSON.stringify(visa));
            redisClient.expire('visaData', 21600);
        }
        
        res.send({
            Message: "Success", 
            ResultCode: "ERR_OK",            
            Size: 12,
            Remote: remote,
            Visa: visa
        })
    }
    catch (err) {
        console.log(err);        
        res.status(500).send({            
            Message: "Internal server error", 
            ResultCode: "ERR_INTERNAL_SERVER"
        });
    }
}

module.exports = {    
    getMain
};