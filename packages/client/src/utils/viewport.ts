import Emitter from '@bastienrobert/events'
import { Dimensions } from 'react-native'

class Viewport extends Emitter {
  width: number = 0
  height: number = 0

  constructor() {
    super()

    this._apply()
    Dimensions.addEventListener('change', this._onResize)
  }

  protected _apply() {
    const { width, height } = Dimensions.get('window')
    this.width = width
    this.height = height
  }

  protected _onResize = () => {
    this._apply()
    this.emit('resize')
  }
}

export default new Viewport()
