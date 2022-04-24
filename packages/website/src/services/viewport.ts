import Emitter from '@bastienrobert/events'

export const MOBILE_BREAKPOINT = 768

class Viewport extends Emitter {
  width: number = 0
  height: number = 0
  mobile: boolean = false

  constructor() {
    super()

    if (typeof document !== 'undefined') {
      this.width = window.innerWidth
      this.height = window.innerHeight
      this.mobile = this.width < MOBILE_BREAKPOINT

      this.onResize()
      this.listen()
    }
  }

  listen() {
    window.addEventListener('resize', this.onResize)
  }

  unlisten() {
    if (typeof document !== 'undefined') {
      window.removeEventListener('resize', this.onResize)
    }
  }

  onResize = () => {
    this.width = window.innerWidth
    this.height = window.innerHeight

    this.emit('resize')

    const mobile = this.width < MOBILE_BREAKPOINT
    if (mobile !== this.mobile) {
      this.mobile = mobile
      this.emit('mobile')
    }
  }
}

export default new Viewport()
