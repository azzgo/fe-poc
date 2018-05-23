import { shallowMount } from '@vue/test-utils'
import Home from './home.vue'
import axios from 'axios'
import flushPromises from 'flush-promises'

test('test', () => {
  expect(1).toBe(1)
})

test('test2', async () => {
  axios.get.mockReturnValue(
    Promise.resolve({
      data: [
        {
          title: '测试title',
          body: '测试body',
        },
      ],
    })
  )
  const comp = shallowMount(Home)
  await flushPromises()
  expect(comp.html()).toMatchSnapshot()
})
