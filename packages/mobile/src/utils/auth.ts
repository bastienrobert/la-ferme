import AsyncStorage from '@react-native-community/async-storage'
import Emitter from '@bastienrobert/events'

class Auth extends Emitter {
  _local: string
  _uuid: string
  _ready: boolean = false

  constructor() {
    super()

    this.setup()
  }

  get uuid() {
    return this._uuid
  }

  protected async setup() {
    this._local = await this.get()
    this.emit('_setup', this._local)
  }

  async get() {
    return await AsyncStorage.getItem('@uuid')
  }

  async set(value: string): Promise<void> {
    if (this._local !== value) {
      await AsyncStorage.setItem('@uuid', value)
    }
    this._uuid = value
  }

  async clear() {
    return await AsyncStorage.removeItem('@uuid')
  }

  local(): Promise<string | null> {
    return new Promise(resolve => {
      typeof this._local !== 'undefined'
        ? resolve(this._local)
        : this.on('_setup', resolve)
    })
  }

  ready() {
    this._ready = true
    this.emit('uuid', this._uuid)
  }
}

export default new Auth()
