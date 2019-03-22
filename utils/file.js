const fs = require('fs')

fs.readFile('./index.json', 'utf8', (err, data) => {
  console.log(err)
  console.log(data)
  if (err) {
    console.log(1)
    fs.writeFileSync('./index.json', '{}')
    console.log('success')
  } else {
    console.log('读取完成')
    console.log(data)
  }
})