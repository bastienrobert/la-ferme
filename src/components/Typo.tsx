import React from 'react'
import { Text, StyleSheet, TextStyle } from 'react-native'

import { Colors, Fonts } from '@/config'

export interface ITypoStyleSheet {
  [key: string]: TextStyle
}

export interface ITypoProps {
  children: any
  style?: TextStyle
  [key: string]: any // styles
}

export default function Typo({ style, children, ...props }: ITypoProps): any {
  const computedStyle = [styles.default]
  if (style) computedStyle.push(style)

  for (let name in props) {
    const s = styles[name]
    if (s) computedStyle.push(s)
  }

  return <Text style={computedStyle}>{children}</Text>
}

const styles = StyleSheet.create({
  default: {
    fontSize: 14,
    fontFamily: Fonts.text,
    color: Colors.black,
    fontWeight: 'normal'
  },
  white: {
    color: Colors.white
  },
  h1: {
    fontSize: 48
  },
  h2: {
    fontSize: 28
  },
  h3: {
    fontSize: 24
  },
  h4: {
    fontSize: 21
  },
  h5: {
    fontSize: 17
  },
  h6: {
    fontSize: 15
  }
} as ITypoStyleSheet)
