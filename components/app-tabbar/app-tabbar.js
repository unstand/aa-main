const TAB_CONFIG = [
  {
    key: 'home',
    text: '主页',
    pagePath: '/pages/home/home',
    icon: '/images/tab-home.png',
    activeIcon: '/images/tab-home-active.png'
  },
  {
    key: 'vehicle',
    text: '车辆',
    pagePath: '/pages/vehicle/vehicle',
    icon: '/images/tab-car.png',
    activeIcon: '/images/tab-car-active.png'
  },
  {
    key: 'service',
    text: '附加服务',
    pagePath: '/pages/service/service',
    icon: '/images/tab-service.png',
    activeIcon: '/images/tab-service-active.png'
  },
  {
    key: 'schedule',
    text: '计划',
    pagePath: '/pages/schedule/schedule',
    icon: '/images/tab-calendar.png',
    activeIcon: '/images/tab-calendar-active.png'
  }
]

Component({
  properties: {
    activeKey: {
      type: String,
      value: 'home',
      observer: 'updateTabs'
    }
  },

  data: {
    tabs: []
  },

  lifetimes: {
    attached() {
      this.updateTabs()
    }
  },

  methods: {
    updateTabs() {
      const tabs = TAB_CONFIG.map((item) => ({
        key: item.key,
        text: item.text,
        pagePath: item.pagePath,
        icon: item.key === this.data.activeKey ? item.activeIcon : item.icon
      }))

      this.setData({ tabs })
    },

    onTabTap(e) {
      const { path, key } = e.currentTarget.dataset
      if (!path || key === this.data.activeKey) return

      wx.redirectTo({
        url: path
      })
    }
  }
})
