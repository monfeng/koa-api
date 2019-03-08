
const koaCors = async (ctx, next) => {
  console.log(ctx.request.header.origin)
  if (ctx.method === 'OPTIONS') {
    // 该字段必需，它的值是逗号分隔的一个字符串，表明服务器支持的所有跨域请求的方法。注意，返回的是所有支持的方法，而不单是浏览器请求的那个方法。这是为了避免多次"预检"请求。
    ctx.set('Access-Control-Allow-Methods', 'PUT,DELETE,POST,GET');

    // 减少option的请求次数,该字段可选，用来指定本次预检请求的有效期，单位为秒。上面结果中，有效期是20天（1728000秒），即允许缓存该条回应1728000秒（即20天），在此期间，不用发出另一条预检请求
    ctx.set('Access-Control-Max-Age', 3600 * 24); // 1d

    // 并给出响应使得这个预检能够通过。
    ctx.body = '';
  }

  // 通用的cors
  if (ctx.request.header.origin !== ctx.origin) {
    // 每次回应都必定包含的
    ctx.set('Access-Control-Allow-Origin', ctx.request.header.origin);

    // 如果浏览器请求包括Access-Control-Request-Headers字段，则Access-Control-Allow-Headers字段是必需的。它也是一个逗号分隔的字符串，表明服务器支持的所有头信息字段，不限于浏览器在"预检"中请求的字段
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')

    // 如果要发送Cookie，Access-Control-Allow-Origin就不能设为星号，必须指定明确的、与请求网页一致的域名。同时，Cookie依然遵循同源政策，只有用服务器域名设置的Cookie才会上传，其他域名的Cookie并不会上传，且（跨源）原网页代码中的document.cookie也无法读取服务器域名下的Cookie
    // ctx.set('Access-Control-Allow-Credentials', true); // cookie必须设置同源origin，*是不行的
  }
  await next();
}

module.exports = koaCors


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
