module.exports = function waitForFrame(page, name) {
  let fulfill
  function checkFrame() {
    const frame = page.frames().find(f => f.url().match(name))
    if (frame) {
      fulfill(frame)
    } else {
      page.once('frameattached', checkFrame)
    }
  }
  const promise = new Promise((resolve) => {
    fulfill = resolve
  })
  checkFrame()
  return promise
}
