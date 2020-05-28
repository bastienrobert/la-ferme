import React, { FC } from 'react'
import { Platform, StyleSheet, View } from 'react-native'
import { Screen, screensEnabled } from 'react-native-screens'

type Props = {
  isVisible: boolean
  children: React.ReactNode
  style?: any
}

const FAR_FAR_AWAY = 30000 // this should be big enough to move the whole view out of its container

const ResourceSavingScene: FC<Props> = props => {
  // react-native-screens is buggy on web
  if (screensEnabled?.() && Platform.OS !== 'web') {
    const { isVisible, ...rest } = props

    // @ts-ignore
    return <Screen active={isVisible ? 1 : 0} {...rest} />
  }

  const { isVisible, children, style, ...rest } = props

  const viewStyle = [styles.container, style]
  if (Platform.OS === 'web') {
    viewStyle.push({
      display: isVisible ? 'flex' : 'none'
    })
  }

  return (
    <View
      style={viewStyle}
      collapsable={false}
      removeClippedSubviews={
        // On iOS, set removeClippedSubviews to true only when not focused
        // This is an workaround for a bug where the clipped view never re-appears
        Platform.OS === 'ios' ? !isVisible : true
      }
      pointerEvents={isVisible ? 'auto' : 'none'}
      {...rest}>
      <View style={isVisible ? styles.attached : styles.detached}>
        {children}
      </View>
    </View>
  )
}

export default ResourceSavingScene

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  attached: {
    flex: 1
  },
  detached: {
    flex: 1,
    top: FAR_FAR_AWAY
  }
})
