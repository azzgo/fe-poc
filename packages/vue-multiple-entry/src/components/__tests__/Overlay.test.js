import Ovlerlay from '../Overlay.vue'
import { shallowMount } from '@vue/test-utils'

test('Ovlerlay should work as expect', () => {
  const comp = shallowMount(Ovlerlay, {
    propsData: {
      visible: false,
    },
  })
  comp.setProps({
    visible: true,
  })
  expect(document.body.innerHTML).toMatchSnapshot()

  comp.setProps({
    visible: false,
  })

  expect(document.body.innerHTML).toMatchSnapshot()
})
