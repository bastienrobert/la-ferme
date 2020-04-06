import React, { FC } from 'react'
import { NavigationContainer } from '@react-navigation/native'

import { createCustomNavigator } from '@/lib/CustomNavigator'

export interface Page {
  name: string
  component: React.ComponentType<any>
}

export interface Routes {
  base: string
  pages: Page[]
}

export interface Props {
  routes: Routes
}

const Navigation: FC<Props> = ({ routes }) => {
  const CustomNav = createCustomNavigator()

  return (
    <NavigationContainer>
      <CustomNav.Navigator initialRouteName={routes.base}>
        {routes.pages.map((page, i) => (
          <CustomNav.Screen key={`screen-${i}`} {...page} />
        ))}
      </CustomNav.Navigator>
    </NavigationContainer>
  )
}

export default Navigation
