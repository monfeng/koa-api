const whiteList = [] // 白名单允许跨域的

// 减少option的请求和允许非简单请求
const setOptions = async (ctx, next) => {
  if (ctx.method === 'OPTIONS') {
    // 头部信息与服务器进行协商，看是否符合服务器应答条件
    ctx.set('Access-Control-Allow-Methods', 'PUT,DELETE,POST,GET');
    ctx.set('Access-Control-Max-Age', 3600 * 24);
    // 并给出响应使得这个预检能够通过。
    ctx.body = '';
  }
  await next();
}

// 减少非简单请求的option数量
const setCors = async (ctx, next) => {
  if (ctx.request.header.origin !== ctx.origin && whiteList.includes(ctx.request.header.origin)) {
    // 允许访问的
    ctx.set('Access-Control-Allow-Origin', ctx.request.header.origin);
    ctx.set('Access-Control-Allow-Credentials', true);
  }
  await next();
}

module.exports = {
  setCors,
  setOptions
}