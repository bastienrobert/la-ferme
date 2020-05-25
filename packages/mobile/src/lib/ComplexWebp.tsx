import React, { Component } from 'react'
import {
  Image,
  ImageProps,
  NativeSyntheticEvent,
  ImageLoadEventData
} from 'react-native'

export interface ComplexWebpProps extends ImageProps {
  // duration in milliseconds
  duration?: number
  // play animation once loaded
  autoPlay?: boolean
  // play animation only once
  playOnce?: boolean
}

/**
 * /!\ You probably should not use this component
 *
 * This component should be use only for videos which don't loop and have a transparent background
 * This is not optimized, please use the RN <Image /> component instead
 */
class ComplexWebp extends Component<ComplexWebpProps> {
  loaded = false
  state = {
    visible: true
  }

  static defaultProps = {
    autoPlay: true,
    playOnce: false,
    style: {}
  }

  play = () => {
    this.setState({ visible: true })
    if (this.props.playOnce) {
      setTimeout(this.stop, this.props.duration)
    }
  }

  stop = () => {
    this.setState({ visible: false })
  }

  onLoad = (e: NativeSyntheticEvent<ImageLoadEventData>) => {
    if (this.loaded) return
    this.loaded = true
    if (this.props.onLoad) this.props.onLoad(e)
    if (this.props.autoPlay) this.play()
    else this.stop()
  }

  render() {
    return this.state.visible ? (
      <Image {...this.props} onLoad={this.onLoad} />
    ) : null
  }
}

export default ComplexWebp
