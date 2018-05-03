import handlebars from 'handlebars'
import articleView from '../views/article.hbs'

// 初始化选择器
$('.article__categories').select2()

const template = handlebars.compile(articleView)

$('.articles__body').append(template({}))
