const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes)=>{
    const nation_continent =  sequelize.define('nation_continent',{
        // id:{
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     autoIncrement: true,
        //     primaryKey: true,
        //     comment: '국가 고유번호'
        // },
        nation:{
            type: DataTypes.STRING,            
            comment: '국가 이름'
        },
        continent:{
            type: DataTypes.STRING,
            allowNull: false,
            comment: '대륙 이름'
        }
    }, {
      tableName: 'nation_continent',
      comment: '국가',
      timestamps: false
    });

    // Foreign keys
    nation_continent.associate = (models)=> {
        nation_continent.hasMany(models.recruit_post, { foreignKey: 'nation_id', targetKey: 'id' });
    }

    return nation_continent;
};