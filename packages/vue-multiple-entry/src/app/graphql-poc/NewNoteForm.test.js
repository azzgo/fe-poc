import { shallowMount } from '@vue/test-utils'
import NewNewForm from './NewNoteForm.vue'

test('simple render', () => {
  const comp = shallowMount(NewNewForm)
  expect(comp.html()).toMatchSnapshot()
})
