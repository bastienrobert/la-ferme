import Emitter from '@bastienrobert/events'

class Menu extends Emitter {
  _section: string

  set section(section: string) {
    this._section = section
    this.emit('change', section)
  }

  get section() {
    return this._section
  }
}

export default new Menu()
