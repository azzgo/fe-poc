import { shallowMount } from '@vue/test-utils'
import AlertModal from '../AlertModal.vue'

test('AlertModal should work as expect', () => {
  const comp = shallowMount(AlertModal, {
    stubs: {
      overlay: {
        render(h) {
          return h('div', this.$slots.default)
        },
      },
    },
  })

  comp.setProps({
    visible: true,
  })

  expect(comp.html()).toMatchSnapshot()
})
