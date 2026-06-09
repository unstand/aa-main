// pages/home/home.js
const app = getApp()
Page({
  data: {
    plans: [],
    centralAsiaPlans: [],
    searchKeyword: '',
    showLoginModal: false,
    showLoginBar: true,
    isLoggedIn: false,
    carouselDots: [0, 1, 2, 3, 4],
    bottomTabs: [
      { key: 'home', text: '主页', pagePath: '/pages/home/home', iconBase: '/images/tab-home-active.png', active: true },
      { key: 'vehicle', text: '车辆', pagePath: '/pages/vehicle/vehicle', iconBase: '/images/tab-car.png' },
      { key: 'service', text: '附加服务', pagePath: '/pages/service/service', iconBase: '/images/tab-service.png' },
      { key: 'schedule', text: '计划', pagePath: '/pages/schedule/schedule', 
      iconBase: '/images/tab-calendar.png',   // 底图
  iconTop: '/images/tab-calendar1.png' }
    ]
  },

  onLoad() {
    const plans = (app.globalData.plans || []).map((plan) => ({
      ...plan,
      displayTitle: plan.id === 1 ? '塔吉克恶魔之眼探秘' : plan.title,
      seasonLabel: `${plan.rating}`
    }))

    this.setData({
      plans,
      centralAsiaPlans: [
        {
          id: 3,
          title: '中亚五国探秘之旅',
          displayTitle: '塔吉克恶魔之眼探秘',
          subtitle: '一带一路·文明交汇',
          description: '与众不同的新疆人文之旅，认识了很苦热情有趣的人们，特别是在塔克拉玛干沙漠沙暴的体验，绝对称得上人生之旅！',
          price: 10828,
          unit: '人',
          days: 6,
          nights: 5,
          distance: '950KM',
          tags: ['丝绸之路', '一带一路', '车辆应急', '高原氧气', '户外摄影', '紧急通讯', '烤全羊包', '户外露营'],
          rating: 8.23,
          avatar:"/images/23.png",
          name:'匿名',
          seasonLabel: '8.23',
          image: '/images/zhongya.png',
          needLogin: true
        }
      ]
    })
  },

  onShow() {
    const isLoggedIn = app.globalData.isLoggedIn
    this.setData({ isLoggedIn })
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
    const isLoggedIn = app.globalData.isLoggedIn
    if (!isLoggedIn) {
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

  onBottomTabTap(e) {
    const pagePath = e.currentTarget.dataset.path
    if (!pagePath || pagePath === '/pages/home/home') return

    wx.redirectTo({
      url: pagePath
    })
  },

  onMoreMenu() {
    // 更多菜单
  }
})
