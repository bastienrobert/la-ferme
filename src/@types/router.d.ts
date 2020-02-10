declare module Router {
  type RouteComponent = React.ComponentType<Page.IPageProps> & {
    load?: () => Promise<void>
  }

  type RouteContext = { [key: string]: any }

  interface IRoute {
    name: string
    component: Router.RouteComponent
  }

  interface IPage {
    uuid: string
    ctx: Router.RouteContext
    route: IRoute
  }

  interface IRouterPagesRef {
    uuid: string
    ref: Page.IPage
  }

  interface IRouterState {
    pages: Router.IPage[]
  }

  interface IRouterProps {
    base: string
    routes: Router.IRoute[]
  }
}

declare module Page {
  interface IPageProps extends React.Props<Page.IPage> {
    ctx: Router.RouteContext
    goto: (name: string) => void
  }

  interface IPage extends React.Component<Page.IPageProps> {
    load?: () => Promise<void>
    willAppear?: () => Promise<void>
    didAppear?: () => void
  }
}
