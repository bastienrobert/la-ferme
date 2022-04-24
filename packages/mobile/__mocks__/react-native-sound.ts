export default class SoundMock {
  static setCategory = jest.fn()

  constructor() {}

  setVolume = jest.fn()
  setNumberOfLoops = jest.fn()
  play = jest.fn()
  stop = jest.fn()
}
