const faker = require('faker')
const _ = require('lodash')

faker.locale = 'zh_CN'

faker.seed(100)

module.exports = () => {
  return {
    posts: _.range(200).map((id) => {
      return {
        id,
        author: faker.name.findName(),
        title: faker.name.title(),
        content: faker.lorem.paragraphs(),
      }
    }),
  }
}
