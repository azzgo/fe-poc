import AlertModal from 'src/components/AlertModal.vue'
import Vue from 'vue';

const AlertModalClass = Vue.extend(AlertModal)


class Messagebox {
  alert(options = {}) {
    return new Promise((resolve) => {
      const alertModal = new AlertModalClass({
        propsData: {
          title: options.title || '提示框',
          alertButtonText: options.alertButtonText || '确定',
          visible: false
        },
        el: document.createElement('div')
      })
      
      alertModal.$on('close', () => {
        document.body.removeChild(alertModal.$el)
        alertModal.$destroy()
        resolve()
      })

      if (options.component) {
        // https://stackoverflow.com/questions/50150668/how-to-create-vue-js-slot-programatically
        const node = alertModal.$createElement(options.component)
        alertModal.$slots.default = [node]
      }

      document.body.appendChild(alertModal.$el)
      alertModal.$props.visible = true
    })
  }
}

const messagebox = new Messagebox()

export default messagebox
