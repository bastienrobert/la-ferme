import * as React from 'react'
import {
  useNavigationBuilder,
  createNavigatorFactory,
  DefaultNavigatorOptions,
  TabRouterOptions,
  TabNavigationState
} from '@react-navigation/native'

import CustomRouter from '../routers/CustomRouter'
import NavigatorView from '../views/NavigatorView'

import {
  CustomNavigationConfig,
  CustomNavigationOptions,
  CustomNavigationEventMap
} from '../types'

type Props = DefaultNavigatorOptions<CustomNavigationOptions> &
  TabRouterOptions &
  CustomNavigationConfig

function CustomNavigator({
  initialRouteName,
  backBehavior,
  children,
  screenOptions,
  ...rest
}: Props) {
  const { state, descriptors, navigation } = useNavigationBuilder<
    TabNavigationState,
    TabRouterOptions,
    CustomNavigationOptions,
    CustomNavigationEventMap
  >(CustomRouter, {
    initialRouteName,
    backBehavior,
    children,
    screenOptions
  })

  return (
    <NavigatorView
      {...rest}
      state={state}
      navigation={navigation}
      descriptors={descriptors}
    />
  )
}

export default createNavigatorFactory<
  TabNavigationState,
  CustomNavigationOptions,
  CustomNavigationEventMap,
  typeof CustomNavigator
>(CustomNavigator)
