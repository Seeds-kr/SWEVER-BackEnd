module.exports = (sequelize, DataTypes)=>{
    const user=  sequelize.define('user',{
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
            type:DataTypes.STRING(100),
            allowNull: false,
            comment: '사용자 비밀번호'
        },
        user_provider: {
            type: DataTypes.ENUM('local', 'gmail'),
            allowNull: false,
            defaultValue: 'local',
            comment: '가입 방식'
        },
        user_snsId: {
            type: DataTypes.STRING(40),
            allowNull: true,
            comment: 'snsId'
        }
    }, {
        sequelize,
        timestamps: true, // createdAt, updatedAt
        underscored: false,
        tableName: 'user',
        comment: '사용자',
        paranoid: true, // deletedAt 유저 삭제일 - soft delete
    });

    return user;
};