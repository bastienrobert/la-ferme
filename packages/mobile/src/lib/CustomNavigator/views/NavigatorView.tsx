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
    const { state, descriptors } = this.props
    const { routes, index } = state

    const route = routes[index]
    const descriptor = descriptors[route.key]

    return (
      <View style={styles.container}>
        <ScreenContainer style={styles.pages}>
          <ResourceSavingScene
            key={route.key}
            style={StyleSheet.absoluteFill}
            isVisible={true}>
            <SceneContent isFocused={true}>{descriptor.render()}</SceneContent>
          </ResourceSavingScene>
        </ScreenContainer>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  pages: {
    flex: 1
  },
  content: {
    flex: 1
  }
})
