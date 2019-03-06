const about = ctx => {
  console.log('about')
  ctx.response.type = 'html'
  ctx.response.body = '<a href="/">Index Page</a>'
}
  
const main = ctx => {
  console.log('main')
  ctx.response.body = 'Hello World'
}

const signin = async (ctx, next) => {
    const req = ctx.request.body
    let name = ctx.request.body.name || ''
    let password = ctx.request.body.password || ''
    console.log(req)
    console.log(`signin with name: ${name}, password: ${password}`);
    if (name === 'koa' && password === '12345') {
        ctx.status = 200;
        ctx.body = {
          msg: 'post request!!',
          desc: 'insert success!',
          data: 'success'
        }
    } else {
      ctx.status = 401;
      ctx.body = {
        msg: 'bad meseage!!',
        desc: 'insert success!',
        data: 'error'
      }
    }
  }

module.exports = {
  about,
  main,
  signin
}