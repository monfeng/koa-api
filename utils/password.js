//导入加密模块,导入node自带的加密模块(不需要安装)
const crypto = require("crypto");

const encrypt = async (password) => {
  let md5 = crypto.createHash("md5");
  let newPas = md5.update(password).digest("hex");
  return newPas; 
};

const validate = async (password, dataBasePassword) => {
  let md5 = crypto.createHash("md5");
  let newPas = md5.update(password).digest("hex");
  return newPas === dataBasePassword
};

module.exports = {
  encrypt,
  validate
}