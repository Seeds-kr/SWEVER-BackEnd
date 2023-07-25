const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes)=>{
    const user=  sequelize.define('user',{
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            comment: '사용자 고유번호'
        },
        user_authority: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
            comment: '사용자 권한'
        },
        user_email:{
            type: DataTypes.STRING(40),
            allowNull: true,
            unique: true,
            comment: '사용자 이메일'
        },
        user_name:{
            type: DataTypes.STRING(15),
            allowNull: false,
            comment: '사용자 이름'
        },
        user_password: {
            type:DataTypes.STRING(255),
            allowNull: true,
            comment: '사용자 비밀번호'
        },
        user_provider: {
            type: DataTypes.ENUM('local', 'gmail', 'kakao'),
            allowNull: false,
            defaultValue: 'local',
            comment: '가입 방식'
        },
        user_snsId: {
            type: DataTypes.STRING(40),
            allowNull: true,
            comment: 'snsId'
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
        }
    }, {
        sequelize,
        timestamps: false,
        underscored: false,
        tableName: 'user',
        comment: '사용자',
    });

    // Foreign keys
    user.associate = (models)=> {
        user.hasMany(models.recruit_post, { foreignKey: 'creator_id', sourceKey: 'id' });
        user.hasMany(models.review, { foreignKey: 'creator_id', sourceKey: 'id' });
    }

    return user;
};