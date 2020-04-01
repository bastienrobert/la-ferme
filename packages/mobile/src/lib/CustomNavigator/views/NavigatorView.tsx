import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'

import { TabNavigationState } from '@react-navigation/native'
import { ScreenContainer } from 'react-native-screens'

import ResourceSavingScene from './ResourceSavingScene'
import {
  CustomNavigationConfig,
  CustomDescriptorMap,
  CustomNavigationHelpers
} from '../types'

type Props = CustomNavigationConfig & {
  state: TabNavigationState
  navigation: CustomNavigationHelpers
  descriptors: CustomDescriptorMap
}

type State = {
  loaded: number[]
}

function SceneContent({
  isFocused,
  children
}: {
  isFocused: boolean
  children: React.ReactNode
}) {
  return (
    <View
      accessibilityElementsHidden={!isFocused}
      importantForAccessibility={isFocused ? 'auto' : 'no-hide-descendants'}
      style={styles.content}>
      {children}
    </View>
  )
}

export default class BottomTabView extends Component<Props, State> {
  static defaultProps = {
    lazy: true
  }

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    const { index } = nextProps.state

    return {
      // Set the current tab to be loaded if it was not loaded before
      loaded: prevState.loaded.includes(index)
        ? prevState.loaded
        : [...prevState.loaded, index]
    }
  }

  state = {
    loaded: [this.props.state.index]
  }

  render() {
    const { state, descriptors, lazy } = this.props
    const { routes } = state
    const { loaded } = this.state

    return (
      <View style={styles.container}>
        <ScreenContainer style={styles.pages}>
          {routes.map((route, index) => {
            const descriptor = descriptors[route.key]
            const { unmountOnBlur } = descriptor.options
            const isFocused = state.index === index

            if (unmountOnBlur && !isFocused) {
              return null
            }

            if (lazy && !loaded.includes(index) && !isFocused) {
              // Don't render a screen if we've never navigated to it
              return null
            }

            return (
              <ResourceSavingScene
                key={route.key}
                style={StyleSheet.absoluteFill}
                isVisible={isFocused}>
                <SceneContent isFocused={isFocused}>
                  {descriptor.render()}
                </SceneContent>
              </ResourceSavingScene>
            )
          })}
        </ScreenContainer>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden'
  },
  pages: {
    flex: 1
  },
  content: {
    flex: 1
  }
})
