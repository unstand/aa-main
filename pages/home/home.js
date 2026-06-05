const app = getApp()

Page({
  data: {
    plans: [],
    centralAsiaPlans: [],
    searchKeyword: '',
    showLoginModal: false,
    showLoginBar: true,
    isLoggedIn: false,
    statusBarHeight: 0,
    navBarHeight: 0,
    topShellStyle: '',
    capsuleStyle: ''
  },

  noop() {},

  onLoad() {
    this.updateCapsuleMetrics()

    this.setData({
      plans: [
        {
          id: 1,
          displayTitle: '塔吉克魔之眼探秘',
          description: '与众不同的新疆人文线，认识了很多热情有趣的异域朋友，领略了与众不同的地域文化，很喜欢这次旅程的设计，特别是在塔克拉玛干夜游沙漠的体验，绝对称得上人生之一。',
          price: 10828,
          unit: '人',
          days: 6,
          nights: 5,
          distance: '950KM',
          tags: ['地质病险', '星空摄影', '车辆应急', '高原氧气', '户外摄影', '紧急通讯', '终生羊包', '户外露营'],
          rating: '8.23',
          image: '/images/plan-evil-eye.png'
        },
        {
          id: 2,
          displayTitle: '丝路秘境漫游',
          description: '纵横山谷和峡谷秘境，串联人文古迹与风貌聚落，整体节奏舒展克制，适合首次尝试深度旅行的人。',
          price: 10828,
          unit: '人',
          days: 6,
          nights: 5,
          distance: '950KM',
          tags: ['地质病险', '星空摄影', '车辆应急', '高原氧气'],
          rating: '8.23',
          image: '/images/plan-silk-road.png'
        }
      ],
      centralAsiaPlans: [
        {
          id: 3,
          displayTitle: '塔吉克魔之眼探秘',
          subtitle: '高端商务  一带一路',
          description: '与众不同的新疆人文线，认识了很多热情有趣的异域朋友，领略了与众不同的地域文化，很喜欢这次旅程的设计，特别是在塔克拉玛干夜游沙漠的体验，绝对称得上人生之一。',
          price: 10828,
          unit: '人',
          days: 6,
          nights: 5,
          distance: '950KM',
          tags: ['高端商务', '一带一路', '车辆应急', '高原氧气', '户外摄影', '户外露营'],
          image: '/images/邀请长图（新疆自驾） 1.png'
        }
      ]
    })
  },

  updateCapsuleMetrics() {
    const systemInfo = wx.getSystemInfoSync()
    const statusBarHeight = systemInfo.statusBarHeight || 0
    const menuButton = wx.getMenuButtonBoundingClientRect
      ? wx.getMenuButtonBoundingClientRect()
      : null

    if (!menuButton || !menuButton.width) {
      this.setData({
        statusBarHeight,
        navBarHeight: 44,
        topShellStyle: `margin-top:${statusBarHeight + 12}px; padding-right:22rpx; height:44px;`,
        capsuleStyle: ''
      })
      return
    }

    const rightGap = systemInfo.windowWidth - menuButton.right
    const navBarHeight = menuButton.height
    const topShellStyle = [
      `margin-top:${menuButton.top}px`,
      `padding-right:${menuButton.width + rightGap + 18}px`,
      `height:${navBarHeight}px`
    ].join(';')

    const capsuleStyle = [
      'position:fixed',
      `top:${menuButton.top}px`,
      `right:${rightGap}px`,
      `width:${menuButton.width}px`,
      `height:${menuButton.height}px`
    ].join(';')

    this.setData({
      statusBarHeight,
      navBarHeight,
      topShellStyle,
      capsuleStyle
    })
  },

  onShow() {
    this.setData({
      isLoggedIn: !!app.globalData.isLoggedIn
    })
  },

  onSearchInput(e) {
    this.setData({
      searchKeyword: e.detail.value
    })
  },

  onPlanTap(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/plan-detail/plan-detail?id=${id}`
    })
  },

  onCentralAsiaTap(e) {
    if (!app.globalData.isLoggedIn) {
      this.setData({ showLoginModal: true })
      return
    }

    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/plan-detail/plan-detail?id=${id}`
    })
  },

  onCloseLoginModal() {
    this.setData({ showLoginModal: false })
  },

  onCloseLoginBar() {
    this.setData({ showLoginBar: false })
  },

  onGoLogin() {
    this.setData({ showLoginModal: false })
    wx.navigateTo({
      url: '/pages/login/login'
    })
  },

  onGoDIY() {
    wx.showToast({
      title: 'DIY定制功能开发中',
      icon: 'none'
    })
  },

  onMoreMenu() {}
})
