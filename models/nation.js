const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes)=>{
    const nation =  sequelize.define('nation',{
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            comment: '국가 고유번호'
        },
        nation_name:{
            type: DataTypes.STRING,
            allowNull: false,
            comment: '국가 이름'
        }
    }, {
      tableName: 'nation',
      comment: '국가',
      timestamps: false
    });

    // Foreign keys
    nation.associate = (models)=> {
<<<<<<< HEAD
        nation.hasMany(models.recruit_post, {foreignKey: 'nation_id',sourceKey:'nation_id'});
=======
        nation.hasMany(models.recruit_post, { foreignKey: 'nation_id', targetKey: 'id' });
>>>>>>> a9e0e30c126015cae0623c40bdbb5de4eb59672d
    }

    return nation;
};