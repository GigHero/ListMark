const path = require('path');

const config = {
  "development": {
    "storage": path.join(path.dirname(__dirname), 'data', 'db.sqlite'),
    "dialect": "sqlite",
  }
};
module.exports = config;