const categories = [
  { id: 'vehicle-kit', name: '车辆应急包', price: 38 },
  { id: 'oxygen', name: '高原氧气包', price: 38 },
  { id: 'food', name: '应急食品包', price: 38 },
  { id: 'medical', name: '医疗急救包', price: 38 },
  { id: 'camping', name: '户外烤全羊包', price: 38 }
]

const baseService = {
  name: '车辆应急包',
  items: '拖车绳 | 脱困板 | 防沙板 | 充气泵 | 工具锤 | 搭电线 | 应急电源 | 补胎工具包 | 三角警示牌 | 灭火器',
  dimensions: '50cm*30cm*40cm',
  price: 38,
  unit: '包/日',
  image: '/images/bj-car.png',
  hasVideo: true
}

const services = [
  { ...baseService, id: 1, edition: '标准款', category: '车辆应急包' },
  { ...baseService, id: 2, edition: '升级款', category: '车辆应急包' },
  { ...baseService, id: 3, name: '高原氧气包', edition: '标准款', category: '高原氧气包', items: '便携氧气瓶 | 血氧仪 | 葡萄糖口服液 | 高原应急卡', dimensions: '42cm*26cm*32cm' },
  { ...baseService, id: 4, name: '应急食品包', edition: '标准款', category: '应急食品包', items: '压缩饼干 | 能量棒 | 矿泉水 | 自热米饭 | 盐丸 | 独立餐具', dimensions: '45cm*28cm*30cm' },
  { ...baseService, id: 5, name: '医疗急救包', edition: '标准款', category: '医疗急救包', items: '绷带 | 消毒棉片 | 创可贴 | 止血带 | 冰袋 | 常用药品', dimensions: '35cm*24cm*22cm' },
  { ...baseService, id: 6, name: '户外烤全羊包', edition: '豪华款', category: '户外烤全羊包', items: '烤架 | 调味料 | 点火工具 | 防烫手套 | 一次性餐具 | 户外清洁套装', dimensions: '70cm*42cm*36cm' }
]

Page({
  data: {
    categories,
    activeCategory: 0,
    filteredServices: [],
    searchKeyword: '',
    caseSlots: [0, 1, 2, 3, 4, 5, 6, 7],
    searchBarStyle: '',
    capsuleStyle: ''
  },

  onLoad() {
    this.updateCapsuleMetrics()
    this.filterServices()
  },

  updateCapsuleMetrics() {
    const systemInfo = wx.getSystemInfoSync()
    const statusBarHeight = systemInfo.statusBarHeight || 0
    const menuButton = wx.getMenuButtonBoundingClientRect ? wx.getMenuButtonBoundingClientRect() : null

    if (!menuButton || !menuButton.width) {
      this.setData({
        searchBarStyle: `margin-top:${statusBarHeight + 12}px; padding-right:40rpx; height:44px;`,
        capsuleStyle: ''
      })
      return
    }

    const rightGap = systemInfo.windowWidth - menuButton.right
    this.setData({
      searchBarStyle: [
        `margin-top:${menuButton.top}px`,
        `padding-right:${menuButton.width + rightGap + 18}px`,
        `height:${menuButton.height}px`
      ].join(';'),
      capsuleStyle: [
        'position:fixed',
        `top:${menuButton.top}px`,
        `right:${rightGap}px`,
        `width:${menuButton.width}px`,
        `height:${menuButton.height}px`
      ].join(';')
    })
  },

  filterServices() {
    const { activeCategory, searchKeyword } = this.data
    const category = categories[activeCategory].name
    const keyword = searchKeyword.trim()
    const filteredServices = services.filter((service) => {
      const matchesCategory = service.category === category
      const searchText = [service.name, service.edition, service.category, service.items, service.dimensions].join(' ')
      return matchesCategory && (!keyword || searchText.includes(keyword))
    })

    this.setData({ filteredServices })
  },

  onCategoryTap(e) {
    this.setData({ activeCategory: e.currentTarget.dataset.index })
    this.filterServices()
  },

  onSearchInput(e) {
    this.setData({ searchKeyword: e.detail.value })
    this.filterServices()
  },

  onServiceTap(e) {
    wx.navigateTo({
      url: `/pages/service-detail/service-detail?id=${e.currentTarget.dataset.id}`
    })
  }
})
