const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes)=>{
    const tech_stack=  sequelize.define('tech_stack',{
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            comment: '기술 스택 고유번호'
        },
        tech_name:{
            type: DataTypes.STRING,
            allowNull: false,
            comment: '기술 스택 이름'
        }
    }, {
      tableName: 'tech_stack',
      comment: '기술 스택',
      timestamps: false
    });

    // Foreign keys
    tech_stack.associate = (models)=> {
        tech_stack.belongsToMany(models.recruit_post, { through: 'description_tech', foreignKey: 'tech_id', otherKey: 'recruit_id' });
    }

    return tech_stack;
};