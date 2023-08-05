const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes)=>{
    const post_likes =  sequelize.define('post_likes',{
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        post_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        }
    }, {
        tableName: 'post_likes',
        timestamps: false,
    });

    return post_likes;
};
