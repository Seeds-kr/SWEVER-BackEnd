const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes)=>{
    const review = sequelize.define('review',{
        review_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: '리뷰 고유번호',
            primaryKey: true
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
        css_thumbnail:{
            type: DataTypes.STRING,
            comment: '썸네일'
        },
        created_at:{
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW(),
            comment: '데이터 삽입 날짜'
        },
        created_by:{
            type: DataTypes.STRING,
            allowNull: false,
            comment: '데이터 삽입자 이름'
        },
        updated_at:{
            type: DataTypes.DATE,
            allowNull: true,
            comment: '데이터 수정 날짜'
        },
        updated_by:{
            type: DataTypes.STRING,
            allowNull: true,
            comment: '데이터 수정자 이름'
        }
    },{
        tableName: 'review',
        comment: '해외 취업 후기',
        timestamps: false,
    });
    return review;
};