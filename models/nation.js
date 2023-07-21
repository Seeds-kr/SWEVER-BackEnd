module.exports = (sequelize, DataTypes)=>{
    const nation=  sequelize.define('nation',{
        nation_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: '국가 고유번호'
        },
        nation_name:{
            type: DataTypes.STRING,
            allowNull: true,
            comment: '국가 이름'
        }
    }, {
      tableName: 'nation',
      comment: '국가'
    });

    // Foreign keys
    nation.associate = (models)=> {
        nation.hasMany(models.recruit_post, {foreignKey: 'nation_id',sourceKey:'nation_id'});
    }
    return nation;
};