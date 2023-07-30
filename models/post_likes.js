const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes)=>{
    const post_likes =  sequelize.define('post_likes',{
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        post_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'recruit_post',
                key: 'id'
            }
        }
    }, {
        tableName: 'post_likes',
        timestamps: false
    });

    return post_likes;
};