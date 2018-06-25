import { shallowMount } from '@vue/test-utils'
import Home from './home.vue'
import flushPromises from 'flush-promises'

test('test2', async () => {
  const comp = shallowMount(Home)
  await flushPromises()
  expect(comp.html()).toMatchSnapshot()
})
