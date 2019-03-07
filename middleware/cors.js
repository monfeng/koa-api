const whiteList = ['http://localhost:8080'] // 白名单允许跨域的

// Options需要：
// Access-Control-Allow-Headers: Content-Type, Authorization // 额外的头部
// Access-Control-Allow-Methods: PUT,DELETE,POST,GET // 非简单请求
// Access-Control-Allow-Origin: http://localhost:8080 // 跨域


// get,post不需要认证方法
// Access-Control-Allow-Headers: Content-Type, Authorization // 额外的头部
// Access-Control-Allow-Origin: http://localhost:8080 // 跨域

// 减少option的请求和允许非简单请求
const setOptions = async (ctx, next) => {
  if (ctx.method === 'OPTIONS') {
    // 头部信息与服务器进行协商，看是否符合服务器应答条件，主要是用了put等方法设置的
    // ctx.set('Access-Control-Allow-Methods', 'PUT,DELETE,POST,GET');

    // 减少option的请求次数
    // ctx.set('Access-Control-Max-Age', 3600 * 24);
    // 并给出响应使得这个预检能够通过。
    ctx.body = '';
  }
  await next();
}

// 减少非简单请求的option数量
const setCors = async (ctx, next) => {
  console.log(ctx.request.header.origin)
  console.log('options也会这里')
  if (ctx.request.header.origin !== ctx.origin && whiteList.includes(ctx.request.header.origin)) {
    // 非option请求只需要允许头部，以及header就可以了
    ctx.set('Access-Control-Allow-Origin', ctx.request.header.origin);
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    // ctx.set('Access-Control-Allow-Credentials', true); // cookie的
  }
  await next();
}

module.exports = {
  setCors,
  setOptions
}


// 所有请求跨域都要有，get， post， option都要
// Access-Control-Allow-Origin

// 所有请求带json或者额外的头部
// Access-Control-Allow-Headers


// 跨域的时候存在的
// 针对预请求的是头部信息与服务器进行协商，看是否符合服务器应答条件，主要是用了put等方法设置的（options）
// Access-Control-Allow-Methods


// 减少option的请求次数（options）
// Access-Control-Max-Age

// cookie
// Access-Control-Allow-Credentials
