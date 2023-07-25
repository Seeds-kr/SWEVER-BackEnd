const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes)=>{
    const nation =  sequelize.define('nation',{
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
<<<<<<< HEAD
            autoIncrement: true,
            primaryKey: true,
            comment: '국가 고유번호'
=======
            comment: '국가 고유번호',           
            autoIncrement: true,
            primaryKey: true
>>>>>>> edd45f230cb888743dbde3d1833e13aee66dcd6e
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
        nation.hasMany(models.recruit_post, { foreignKey: 'nation_id', targetKey: 'id' });
    }

    return nation;
};