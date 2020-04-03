import AsyncStorage from '@react-native-community/async-storage'
import Emitter from '@bastienrobert/events'

class Auth extends Emitter {
  _uuid: string

  constructor() {
    super()

    this.setup()
  }

  async setup() {
    this._uuid = await this.get()
    this.emit('setup', this._uuid)
  }

  async clear() {
    return await AsyncStorage.removeItem('@uuid')
  }

  fetch(): Promise<string | null> {
    return new Promise(resolve => {
      const instance = this._uuid
      typeof instance !== 'undefined'
        ? resolve(instance)
        : this.on('setup', res => resolve(res))
    })
  }

  get uuid() {
    return this._uuid
  }

  async set(value: string): Promise<string> {
    await AsyncStorage.setItem('@uuid', value)
    this._uuid = value
    return value
  }

  protected async get() {
    return await AsyncStorage.getItem('@uuid')
  }
}

export default new Auth()
