export default items => {
  const getAndSplice = tmp => () => {
    const res = tmp.splice(Math.floor(Math.random() * tmp.length), 1)
    return res.length > 0 ? res[0].name : null
  }

  return getAndSplice(items.slice())
}
