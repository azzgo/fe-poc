import apiClient from './api'

beforeEach(() => {
  global.mockApi.reset()
})

test('api work as expected', async () => {
  global.mockApi.onAny().reply(500)

  const request = () => apiClient.get('/some-things')
  expect(Promise.all([request(), request()])).rejects.toThrowErrorMatchingSnapshot()
})

test('api work as expected 2', async () => {
  global.mockApi
    .onAny()
    .replyOnce(200, { data: 'data1' })
    .onAny()
    .replyOnce(200, { data: 'data2' })

  const request = () => apiClient.get('/some-things')

  expect(Promise.all([request(), request()])).resolves.toMatchSnapshot()
})
