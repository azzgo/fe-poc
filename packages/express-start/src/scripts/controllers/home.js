const handlebars = require('handlebars')
const fs = require('fs')
const path = require('path')

// 初始化选择器
$('.article__categories').select2()
const template = handlebars.compile(fs.readFileSync(
  path.resolve(__dirname, '../views/article.hbs'), {encoding: 'utf-8'})
)

$('.articles__body').append(template({}))
