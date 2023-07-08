module.exports = (sequelize, DataTypes)=>{
    const tech_stack=  sequelize.define('tech_stack',{
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
      tableName: 'tech_stack',
      comment: '기술 스택'
    });

    // Foreign keys
    tech_stack.associate = (models)=> {
        tech_stack.belongsTo(models.recruit_post, {foreignKey: 'recruit_id'});
        tech_stack.belongsTo(models.tech_stack, {foreignKey: 'tech_id'});
    }
    return tech_stack;
};