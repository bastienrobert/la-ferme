export default {
  onConnect: (connectionParams: any) => {
    if (connectionParams.authToken) {
      console.log('HELLO ' + connectionParams.authToken)
      return true
    }
  },
  onDisconnect: () => {
    console.log('BYE')
    return true
  }
}
