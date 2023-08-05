const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes)=>{
    const recruit_post = sequelize.define('recruit_post',{
        // id:{
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     autoIncrement: true,
        //     primaryKey: true,
        //     comment: '채용공고 고유번호'
        // },
        company_name:{
            type: DataTypes.STRING,
            allowNull: false,
            comment: '회사 이름'
        },
        description_title:{
            type: DataTypes.STRING,
            allowNull: false,
            comment: '채용공고 제목'
        },
        description_content:{
            type: DataTypes.TEXT,
            allowNull: false,
            comment: '채용공고 내용'
        },
        company_apply_link:{
            type: DataTypes.STRING,
            allowNull: false,
            comment: '회사 지원 링크'
        },
        posted_date:{
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: '채용공고 게시 날짜'
        },
        is_visa_sponsored:{
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: 0,
            comment: '비자 지원 여부'
        },
        is_remoted:{
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: 0,
            comment: '원격 근무 여부'
        },
        company_logo:{
            type: DataTypes.STRING,
            allowNull: true,
            comment: '회사 로고'
        },
        salary:{
            type: DataTypes.STRING,
            allowNull: true,
            comment: '급여'
        },
        contract_form:{
            type: DataTypes.STRING,
            allowNull: true,
            comment: '채용 형태'
        },
        company_page_link:{
            type: DataTypes.STRING,
            allowNull: true,
            comment: '회사 홈페이지 링크'
        },
        origin:{
            type: DataTypes.STRING,
            allowNull: false,
            comment: '해당 채용공고를 가져온 API사이트 출처'
        },
        tag:{
            type: DataTypes.STRING,
            allowNull: true,
            comment: '태그'
        },
        location:{
            type: DataTypes.STRING,
            allowNull: false,
            comment: '회사 위치'
        },
        is_dev:{
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: 1,
            comment: '개발자 관련 채용공고 여부'
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
    },{
        tableName: 'recruit_post',
        comment: '채용 공고',
        timestamps: false,
    });
    
    // Foreign keys
    recruit_post.associate = (models)=> {
        recruit_post.belongsToMany(models.user, { through: 'post_likes' , sourceKey: 'id', foreignKey:'post_id'});
        recruit_post.hasMany(models.description_tech, { foreignKey: 'recruit_id' , sourceKey: 'id' });
        recruit_post.belongsTo(models.user, { foreignKey: 'creator_id', targetKey:'id' });
        recruit_post.belongsTo(models.nation_continent, { foreignKey: 'nation_id', targetKey:'id' });
    }
    return recruit_post;
};