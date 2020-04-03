// import User from '@/app/models/User'

export default {
  onConnect: async (_: any) => {
    // const authToken = connectionParams.authToken

    // const user = authToken || (await new User().save())
    // console.log('HELLO ' + user)

    // return {
    //   user
    // }
    return true
  },
  onDisconnect: async (_, context) => {
    const initialContext = await context.initPromise
    console.log('BYE', initialContext.user)
    return true
  }
}
