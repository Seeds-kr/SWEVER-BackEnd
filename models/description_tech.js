const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes)=>{
    const description_tech =  sequelize.define('description_tech',{
        recruit_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'recruit_post',
                key: 'id'
            }
        },
        tech_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'tech_stack',
                key: 'id'
            }
        }
    }, {
        tableName: 'description_tech',
        timestamps: false
    });

    return description_tech;
};