import {
  NavigationHelpers,
  ParamListBase,
  EventMapBase,
  Descriptor,
  TabNavigationState,
  DefaultRouterOptions
} from '@react-navigation/native'

export type CustomNavigationEventMap = EventMapBase

export type CustomNavigationHelpers = NavigationHelpers<
  ParamListBase,
  CustomNavigationEventMap
>

export type CustomNavigationOptions = {
  /**
   * Whether this screen should be unmounted when navigating away from it.
   * Defaults to `false`.
   */
  unmountOnBlur?: boolean
}

export type CustomRouterOptions = DefaultRouterOptions

export type CustomNavigationState = TabNavigationState

export type CustomDescriptor = Descriptor<
  ParamListBase,
  string,
  CustomNavigationState,
  CustomNavigationOptions
>

export type CustomDescriptorMap = {
  [key: string]: CustomDescriptor
}

export type CustomNavigationConfig = {
  /**
   * Whether the screens should render the first time they are accessed. Defaults to `true`.
   * Set it to `false` if you want to render all screens on initial render.
   */
  lazy?: boolean
}
