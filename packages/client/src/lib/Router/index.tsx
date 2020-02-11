import React, { Component } from 'react'
import generateUUID from 'uuid/v4'

export default class Router extends Component<
  Router.IRouterProps,
  Router.IRouterState
> {
  static defaultProps = { routes: [], opts: {}, base: undefined }

  pages: Router.IRouterPagesRef[] = []
  state: Router.IRouterState = {
    pages: []
  }

  constructor(props: Router.IRouterProps) {
    super(props)

    this.use(this.props.base)
  }

  getRouteObject(name: string): Router.IRoute | null {
    return this.props.routes.find(route => route.name === name) || null
  }

  use = async (name: string) => {
    const pageData = await this.getPageData(name, this.state)
    this.setState(pageData, this.startTransition)
  }

  async getPageData(
    name: string,
    state: Router.IRouterState
  ): Promise<Router.IRouterState> {
    const newPage = this.createPage(name)
    if (!newPage) return state

    const newComponent = newPage.route.component
    if (newComponent.load) await newComponent.load()

    return {
      pages: state.pages.concat(newPage)
    }
  }

  async startTransition() {
    const length = this.state.pages.length

    if (length > 1) {
      const previousIndex = this.state.pages.length - 2
      const currentIndex = this.state.pages.length - 1

      if (previousIndex === currentIndex) return

      const currentComponent = this.pages[currentIndex].ref
      const previousComponent = this.pages[previousIndex].uuid
      if (!currentComponent) return

      if (currentComponent.willAppear) await currentComponent.willAppear()
      if (currentComponent.didAppear) currentComponent.didAppear()

      this.destroyPage(previousComponent)
    } else {
      const currentIndex = this.state.pages.length - 1
      const currentComponent = this.pages[currentIndex].ref
      if (!currentComponent) return

      if (currentComponent.willAppear) await currentComponent.willAppear()
      if (currentComponent.didAppear) currentComponent.didAppear()
    }
  }

  createPage(name: string): Router.IPage | null {
    const route = this.getRouteObject(name)

    if (!route) {
      console.error(`route ${name} does not exists`)
      return null
    }

    const uuid = generateUUID()
    return {
      uuid,
      route,
      ctx: {
        uuid
      }
    }
  }

  destroyPage(uuid: string) {
    this.setState(state => ({
      pages: state.pages.filter(page => page.uuid !== uuid)
    }))
  }

  savePageRef = (ref: Page.IPage, uuid: string) => {
    if (ref) this.pages.push({ ref, uuid })
  }

  render() {
    this.pages = []

    return (
      <>
        {this.state.pages.map((page: Router.IPage) => (
          <page.route.component
            key={page.uuid}
            ctx={page.ctx}
            goto={this.use}
            ref={(el: Page.IPage) => this.savePageRef(el, page.uuid)}
          />
        ))}
      </>
    )
  }
}
