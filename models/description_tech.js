module.exports = (sequelize, DataTypes)=>{
    const description_tech=  sequelize.define('description_tech',{
        tech_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: '기술 스택 고유번호'
        },
        recruit_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: '채용공고 고유번호'
        }
    }, {
      tableName: 'description_tech',
      comment: '공고 스택'
    });

    // Foreign keys
    description_tech.associate = (models)=> {
        description_tech.belongsTo(models.recruit_post, {foreignKey: 'recruit_id'});
        description_tech.belongsTo(models.tech_stack, {foreignKey: 'tech_id'});
    }
    return description_tech;
};