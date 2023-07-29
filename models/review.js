const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes)=>{
    const review = sequelize.define('review',{
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,       
            autoIncrement: true,
            primaryKey: true,
            comment: '리뷰 고유번호',     
        },
        creator_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            comment: '생성자 고유번호'
        },
        title:{
            type: DataTypes.STRING,
            comment: '제목'
        },
        link:{
            type: DataTypes.STRING,
            comment: '후기 오리진 링크'
        },
        snippet:{
            type: DataTypes.STRING,
            comment: '미리보기 글'
        },
        thumbnail:{
            type: DataTypes.STRING,
            comment: '썸네일'
        },
        created_at:{
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW(),
            comment: '데이터 삽입 날짜'
        },
        updated_at:{
            type: DataTypes.DATE,
            allowNull: true,
            comment: '데이터 수정 날짜'
        },
    },{
        tableName: 'review',
        comment: '해외 취업 후기',
        timestamps: false,
    });

    // Foreign keys
    review.associate = (models)=> {
        review.belongsTo(models.user, { foreignKey: 'creator_id', targetKey:'id' });
    }
    
    return review;
};