class ProgressLoading {
  /**
   * @property {HTMLElement} el
   */
  el

  constructor() {
    this.el = document.createElement('div')
    document.body.append(el)
  }

  destroy() {
    document.body.removeChild(this.el)
    this.el && this.el.remove()
  }

  checkAlive() {
    if (!this.el) {
      throw new Error('Progress Instance is not available now!')
    }
  }
}

export default {
  show() {
    return new ProgressLoading()
  }
}