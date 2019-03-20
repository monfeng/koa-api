const User_col = require("../models/student");

const about = ctx => {
  console.log(ctx.request.body);
  ctx.body = "666666";
};

const main = async ctx => {
  console.log("main接口");
  // 获取用户的 userId
  const user = await User_col.findOne({
    userId: ctx.userId
  });
  console.log(user);
  ctx.status = 200;
  ctx.body = {
    code: 0,
    data: user,
    userId: ctx.userId
  };
};

// 错误处理
const err = ctx => {
  ctx.throw(500);
};

const nofound = ctx => {
  ctx.response.status = 404;
  ctx.response.body = "Page Not Found";
};

module.exports = {
  about,
  main,
  err,
  nofound
};
