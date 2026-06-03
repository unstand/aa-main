function getNavLayout() {
  const systemInfo = wx.getSystemInfoSync()
  const menuButton = wx.getMenuButtonBoundingClientRect()
  const statusBarHeight = systemInfo.statusBarHeight || 20
  const menuButtonHeight = menuButton.height || 32
  const navBarHeight = menuButton.top
    ? (menuButton.top - statusBarHeight) * 2 + menuButtonHeight
    : 44
  const headerPaddingRight = menuButton.left
    ? systemInfo.windowWidth - menuButton.left + 10
    : 100
  const headerTotalHeight = statusBarHeight + navBarHeight

  return {
    statusBarHeight,
    navBarHeight,
    menuButtonHeight,
    headerPaddingRight,
    headerTotalHeight
  }
}

module.exports = {
  getNavLayout
}
