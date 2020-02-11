# Router

## Types

Definitions are located in the `@types` folder. **Router** definitions are Router core interfaces and **Page** are needed in the router but are used in every page too.

## Create a new page

Each page should extends `Component<Page.IPageProps, any>` and should `implements Page.IPage`.

You can then add the _optional_ following methods in your class:

- `static load(void) => Promise<void>`: is a static method triggered before the component instanciation, it should return a Promise
- `willAppear(void) => Promise<void>`: is an instance method triggered on component mount, before the previous component unmount, it should return a Promise
- `didAppear(void) => void`: is an instance method triggered just before the previous component unmount, it doesn't wait and is running in parallel

## Routes

You should add your routes to `App/routes.js` like the following exemple:

```
import Home from '@/pages/Home'

export default {
  base: 'home', // router first page on mount
  pages: [
    {
      name: 'home', // route name
      component: Home // route component
    },
    ...
  ]
}
```

## Page props

Each page receive 2 props:

- **ctx**: the page context, containing the whole page options and uuid
- **goto**: router method to change the current route to another, it starts automaticly transitions and take the next route name as only argument
