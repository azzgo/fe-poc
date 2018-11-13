class ProgressLoading {
  /**
   * @property {HTMLElement} el
   */
  el

  /**
   * @property {HTMLElement} el
   */
  path

  /**
   * @param {HTMLElement} container 
   */
  constructor(container) {
    const fragment = document.createDocumentFragment()
    /**
     * @type {SVGAElement}
     */
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.setAttribute('height', '10px')
    svg.setAttribute('width', '200px')
    svg.setAttribute('viewBox', '0 0 200 10')
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    path.setAttribute('d', 'M 0 0 L 200 0')
    path.setAttribute('stroke', '#40b883')
    path.setAttribute('stroke-dasharray', '200')
    path.setAttribute('stroke-dashoffset', '50')
    path.setAttribute('stroke-width', '10')
    path.style.transition = 'stroke-dashoffset 0.3s linear'
    svg.appendChild(path)
    this.el = svg
    this.path = path
    fragment.appendChild(this.el)

    if (container) {
      container.appendChild(fragment)
    } else {
      document.body.append(fragment)
    }
  }

  setProgress(persent) {
    const offset = persent * 200 / 100
    this.path.setAttribute('stroke-dashoffset', 200 - offset)
  }

  destroy() {
    this.path && this.path.remove()
    this.el && this.el.remove()
    this.path = null
    this.el = null
  }

  checkAlive() {
    if (!this.el || !this.path) {
      throw new Error('Progress Instance is not available now!')
    }
  }
}

export default {
  /**
   * @param {HTMLElement} container 
   */
  show(container) {
    return new ProgressLoading(container)
  }
}