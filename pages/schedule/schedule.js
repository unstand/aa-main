Page({
  data: {
    activeTab: 0,
    bottomTabs: [
      { key: 'home', text: '主页', pagePath: '/pages/home/home', icon: '/images/tab-home.png' },
      { key: 'vehicle', text: '车辆', pagePath: '/pages/vehicle/vehicle', icon: '/images/tab-car.png' },
      { key: 'service', text: '附加服务', pagePath: '/pages/service/service', icon: '/images/tab-service.png' },
      { key: 'schedule', text: '计划', pagePath: '/pages/schedule/schedule', icon: '/images/tab-calendar-active.png', active: true }
    ],
    user: {
      name: '老蒯',
      id: '123545678'
    },
    plans: [
      {
        id: 1,
        title: '塔吉克恶魔之眼探秘',
        cover: '/images/邀请长图（新疆自驾） 1.png',
        priceLabel: '计划金额 ¥53720',
        tags: ['6天5晚', '950KM'],
        createDate: '2026.08.11',
        startDate: '2026.09.11',
        endDate: '2026.09.15',
        departure: '喀什',
        vehicle: '无',
        status: 0  // 0=待预定, 1=已预定
      },
      {
        id: 2,
        title: '塔吉克恶魔之眼探秘',
        cover: '/images/邀请长图（新疆自驾） 1.png',
        priceLabel: '计划金额 ¥53720',
        tags: ['6天5晚', '950KM'],
        createDate: '2026.08.11',
        startDate: '2026.09.11',
        endDate: '2026.09.15',
        departure: '喀什',
        vehicle: '无',
        status: 1  // 已预定
      }
    ]
  },

  onLoad() {},

  onShow() {},

  onTabTap(e) {
    const tab = parseInt(e.currentTarget.dataset.tab)
    this.setData({ activeTab: tab })
  },

  onContactUs() {
    this.setData({ activeTab: 1 })
    wx.makePhoneCall({
      phoneNumber: '4001234567'
    })
  },

  onModifyPlan(e) {
    const id = e.currentTarget.dataset.id || 1
    wx.navigateTo({
      url: `/pages/plan-detail/plan-detail?id=${id}`
    })
  },

  onViewPlan(e) {
    const id = e.currentTarget.dataset.id || 1
    wx.navigateTo({
      url: `/pages/plan-detail/plan-detail?id=${id}`
    })
  },

  onViewContract(e) {
    const id = e.currentTarget.dataset.id || 1
    wx.navigateTo({
      url: `/pages/contract/contract?planId=${id}`
    })
  },

  onBottomTabTap(e) {
    const pagePath = e.currentTarget.dataset.path
    if (!pagePath || pagePath === '/pages/schedule/schedule') return

    wx.redirectTo({
      url: pagePath
    })
  },

  onBookNow(e) {
    const id = e.currentTarget.dataset.id || 1
    wx.navigateTo({
      url: `/pages/plan-detail/plan-detail?id=${id}`
    })
  }
})
