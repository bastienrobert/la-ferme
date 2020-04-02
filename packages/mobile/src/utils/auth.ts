import AsyncStorage from '@react-native-community/async-storage'
import Emitter from '@bastienrobert/events'
import uuid from 'uuid/v4'

class Auth extends Emitter {
  _uuid: string

  constructor() {
    super()

    this.setup()
  }

  async setup() {
    this._uuid = await this.get()
    if (!this._uuid) this._uuid = this.set()
    this.emit('setup', this._uuid)
  }

  get uuid() {
    return this._uuid
  }

  async connectionParams() {
    return new Promise(resolve => {
      const authToken = this.uuid
      authToken
        ? resolve({ authToken })
        : this.on('setup', id => resolve({ authToken: id }))
    })
  }

  protected async get() {
    return await AsyncStorage.getItem('@uuid')
  }

  protected set() {
    const token = uuid()
    AsyncStorage.setItem('@uuid', token)
    return token
  }
}

export default new Auth()
