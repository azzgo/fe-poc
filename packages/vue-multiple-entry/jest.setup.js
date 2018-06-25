import api from 'src/utils/api'
import MockAdatper from 'axios-mock-adapter'

document.body.innerHTML = `
<div id="loading"></div>
`

const mockApi = new MockAdatper(api)
global.mockApi = mockApi
const mockData = require('mockServer/index')()

Object.keys(mockData).forEach((key) => {
  mockApi.onGet(`/${key}`).reply(200, mockData[key])
})
