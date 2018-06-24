import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { shallowMount } from '@vue/test-utils'
import App from './App.vue'
import NoteList from './NoteList.vue'
import flushPromise from 'flush-promises'

// This sets the mock adapter on the default instance
const mock = new MockAdapter(axios)

test('App testing', async () => {
  mock.onPost('http://localhost:3000/graphql').reply(200, {
    data: {
      notes: [
        {
          id: '1',
          title: '今天吃什么',
          value: '豆花汤',
        },
        {
          id: '2',
          title: '今天喝什么',
          value: '白开水',
        },
      ],
    },
  })

  const comp = shallowMount(App, {
    stubs: {
      'note-list': NoteList,
    },
  })
  await flushPromise()
  expect(comp.html()).toMatchSnapshot()
})
