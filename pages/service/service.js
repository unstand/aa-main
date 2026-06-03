// pages/service/service.js
const categories = [
  { id: 'vehicle-kit', name: '车辆应急包', price: 38 },
  { id: 'oxygen', name: '高原氧气包', price: 38 },
  { id: 'food', name: '应急食品包', price: 38 },
  { id: 'medical', name: '医疗急救包', price: 38 },
  { id: 'camping', name: '户外烤全羊包', price: 38 }
]

const baseService = {
  name: '车辆应急包',
  items: '拖车绳 | 脱困板/防沙板 | 充气泵 | 工具铲 | 搭电线/应急电源 | 补胎工具包 | 三角警示牌 | 灭火器',
  dimensions: '50cm*30cm*40cm',
  price: 38,
  unit: '包/日',
  image: '/images/bj-car.png',
  hasVideo: true
}

const services = [
  { ...baseService, id: 1, edition: '标准版', category: '车辆应急包' },
  { ...baseService, id: 2, edition: '升级版', category: '车辆应急包' },
  {
    ...baseService,
    id: 3,
    name: '高原氧气包',
    edition: '标准版',
    category: '高原氧气包',
    items: '便携氧气瓶 | 血氧仪 | 葡萄糖口服液 | 高原反应应急卡',
    dimensions: '42cm*26cm*32cm'
  },
  {
    ...baseService,
    id: 4,
    name: '应急食品包',
    edition: '标准版',
    category: '应急食品包',
    items: '压缩饼干 | 能量棒 | 矿泉水 | 自热米饭 | 盐丸 | 独立餐具',
    dimensions: '45cm*28cm*30cm'
  },
  {
    ...baseService,
    id: 5,
    name: '医疗急救包',
    edition: '标准版',
    category: '医疗急救包',
    items: '绷带 | 消毒棉片 | 创可贴 | 止血带 | 冰袋 | 常用应急药品',
    dimensions: '35cm*24cm*22cm'
  },
  {
    ...baseService,
    id: 6,
    name: '户外烤全羊包',
    edition: '豪华版',
    category: '户外烤全羊包',
    items: '烤架 | 调味料 | 炭火工具 | 防烫手套 | 一次性餐具 | 户外清洁套装',
    dimensions: '70cm*42cm*36cm'
  }
]

Page({
  data: {
    categories,
    activeCategory: 0,
    filteredServices: [],
    searchKeyword: '',
    caseSlots: [0, 1, 2, 3, 4, 5, 6, 7],
    bottomTabs: [
      { key: 'home', text: '主页', pagePath: '/pages/home/home', icon: '/images/tab-home.png' },
      { key: 'vehicle', text: '车辆', pagePath: '/pages/vehicle/vehicle', icon: '/images/tab-car.png' },
      { key: 'service', text: '附加服务', pagePath: '/pages/service/service', icon: '/images/tab-service-active.png', active: true },
      { key: 'schedule', text: '计划', pagePath: '/pages/schedule/schedule', icon: '/images/tab-calendar.png' }
    ]
  },

  onLoad() {
    this.filterServices()
  },

  filterServices() {
    const { activeCategory, searchKeyword } = this.data
    const category = categories[activeCategory].name
    const keyword = searchKeyword.trim()
    const filteredServices = services.filter((service) => {
      const matchesCategory = service.category === category
      const searchText = [
        service.name,
        service.edition,
        service.category,
        service.items,
        service.dimensions
      ].join(' ')
      const matchesKeyword = !keyword || searchText.includes(keyword)
      return matchesCategory && matchesKeyword
    })

    this.setData({ filteredServices })
  },

  onCategoryTap(e) {
    const index = e.currentTarget.dataset.index
    this.setData({ activeCategory: index })
    this.filterServices()
  },

  onSearchInput(e) {
    this.setData({ searchKeyword: e.detail.value })
    this.filterServices()
  },

  onBottomTabTap(e) {
    const pagePath = e.currentTarget.dataset.path
    if (!pagePath || pagePath === '/pages/service/service') return

    wx.redirectTo({
      url: pagePath
    })
  },

  onServiceTap(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/service-detail/service-detail?id=${id}`
    })
  }
})
