const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(module.filename);
const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname,'..','config','config.json'))[env].db;
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.log('Unable to connect to the database:', err);
  });

fs.readdirSync(__dirname).filter(file => (file.indexOf('.') !== 0) && (file !== basename)).forEach((file) => {
    const model = require(path.join(__dirname, file))(
        sequelize,
        Sequelize.DataTypes
      );
    db[model.name] = model;
});

Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;