import { shallowMount } from '@vue/test-utils'
import NoteList from './NoteList.vue'

test('Note List render on empty', () => {
  const comp = shallowMount(NoteList, { propsData: { notes: [] } })
  expect(comp.html()).toMatchSnapshot()
})

test('Note List render on some data', () => {
  const comp = shallowMount(NoteList, {
    propsData: {
      notes: [
        {
          id: '1',
          title: '今天吃什么',
          value: '豆花汤',
        },
        {
          id: '2',
          title: '今天看什么',
          value: '公路竞技赛',
        },
      ],
    },
  })
  expect(comp.html()).toMatchSnapshot()

  comp.find('.icon').trigger('click')
  expect(comp.emitted().onCheckNote).toBeTruthy()
  expect(comp.emitted().onCheckNote[0]).toEqual([{ id: '1', title: '今天吃什么', value: '豆花汤' }])
})
