module.exports = (sequelize, DataTypes)=>{
    const tech_stack=  sequelize.define('tech_stack',{
        id:{
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: '기술 스택 고유번호'
        },
        tech_name:{
            type: DataTypes.STRING,
            allowNull: false,
            comment: '기술 스택 이름'
        }
    }, {
      tableName: 'tech_stack',
      comment: '기술 스택'
    });

    // Foreign keys
    tech_stack.associate = (models)=> {
        tech_stack.belongsToMany(models.recruit_post, { through: 'description_tech' });
    }
    
    return tech_stack;
};