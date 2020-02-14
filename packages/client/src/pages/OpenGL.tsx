import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { GLView, ExpoWebGLRenderingContext } from 'expo-gl'

import viewport from '@/utils/viewport'

const vertSrc = `
void main(void) {
  gl_Position = vec4(0., 0., 0., 1.);
  gl_PointSize = 100.;
}
`

const fragSrc = `
void main(void) {
  gl_FragColor = vec4(0., 0., 0., 1.);
}
`

export default class OpenGL extends Component<Page.IPageProps, any>
  implements Page.IPage {
  gl: any

  onContextCreate = (gl: any) => {
    this.gl = gl
    this.init()
  }

  init() {
    this.onResize()
    this.gl.clearColor(0, 1, 1, 1)

    const vert = this.gl.createShader(this.gl.VERTEX_SHADER)
    this.gl.shaderSource(vert, vertSrc)
    this.gl.compileShader(vert)
    const frag = this.gl.createShader(this.gl.FRAGMENT_SHADER)
    this.gl.shaderSource(frag, fragSrc)
    this.gl.compileShader(frag)

    const program = this.gl.createProgram()
    this.gl.attachShader(program, vert)
    this.gl.attachShader(program, frag)
    this.gl.linkProgram(program)
    this.gl.useProgram(program)

    this.gl.clear(this.gl.COLOR_BUFFER_BIT)
    this.gl.drawArrays(this.gl.POINTS, 0, 1)

    this.gl.flush()
    this.gl.endFrameEXP()
  }

  onResize = () => {
    this.gl.viewport(
      0,
      0,
      this.gl.drawingBufferWidth,
      this.gl.drawingBufferHeight
    )
  }

  render() {
    return (
      <View style={styles.OpenGL}>
        <GLView style={styles.GLView} onContextCreate={this.onContextCreate} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  OpenGL: {
    flex: 1,
    backgroundColor: '#fff'
  },
  GLView: {
    flex: 1
  }
})
