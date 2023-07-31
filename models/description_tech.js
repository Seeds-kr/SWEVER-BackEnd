const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes)=>{
    const description_tech =  sequelize.define('description_tech',{
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        recruit_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'recruit_post'
            }
        },
        tech_name: {
            type: DataTypes.STRING
        }
    }, {
        tableName: 'description_tech',
        timestamps: false
    });

    description_tech.associate = (models)=> {
        description_tech.belongsTo(models.recruit_post, { foreignKey: 'id', sourceKey: "recruit_id"});
    }
    return description_tech;
};