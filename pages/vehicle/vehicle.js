const categories = [
  { id: 'suv', name: 'SUV', price: 356 },
  { id: 'electric', name: '新能源', price: 199 },
  { id: 'business', name: '商务车', price: 399 },
  { id: 'economy', name: '经济型', price: 199 },
  { id: 'luxury', name: '豪华型', price: 699 }
]

const baseVehicle = {
  name: '丰田普拉多',
  year: '2025款',
  specs: '8挡手自一体 | 2.4T | 4门5座',
  features: '全时四驱 | 360全景影像 | 可放4个28寸行李箱',
  tags: ['豪华SUV', '硬派越野'],
  price: 598,
  unit: '车/日',
  image: '/images/bj-car.png',
  hasVideo: true
}

const vehicles = [
  { ...baseVehicle, id: 1, category: 'SUV' },
  { ...baseVehicle, id: 2, category: 'SUV' },
  { ...baseVehicle, id: 3, category: 'SUV' },
  {
    ...baseVehicle,
    id: 4,
    name: '极氪001',
    year: '2025款',
    specs: '单电机后驱 | 长续航 | 5门5座',
    features: '智能座舱 | 全景天幕 | 可放3个28寸行李箱',
    tags: ['新能源', '长续航'],
    price: 428,
    category: '新能源'
  },
  {
    ...baseVehicle,
    id: 5,
    name: '别克GL8',
    year: '2025款',
    specs: '2.0T | 7座 | 商务接待',
    features: '电动侧滑门 | 独立座椅 | 大空间',
    tags: ['商务车', '舒适大空间'],
    price: 698,
    category: '商务车'
  },
  {
    ...baseVehicle,
    id: 6,
    name: '大众朗逸',
    year: '2025款',
    specs: '1.5T | 4门5座 | 城市通勤',
    features: '省油耐用 | 高性价比 | 适合代步',
    tags: ['经济型', '高性价比'],
    price: 268,
    category: '经济型'
  },
  {
    ...baseVehicle,
    id: 7,
    name: '奔驰V级',
    year: '2025款',
    specs: '2.0T | 7座 | 高端接待',
    features: '航空座椅 | 宽适空间 | 尊享出行',
    tags: ['豪华型', '尊享出行'],
    price: 998,
    category: '豪华型'
  }
]

Page({
  data: {
    categories,
    activeCategory: 0,
    filteredVehicles: [],
    searchKeyword: '',
    searchBarStyle: '',
    capsuleStyle: ''
  },

  onLoad() {
    this.updateCapsuleMetrics()
    this.filterVehicles()
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

  filterVehicles() {
    const { activeCategory, searchKeyword } = this.data
    const category = categories[activeCategory].name
    const keyword = searchKeyword.trim()
    const filteredVehicles = vehicles.filter((vehicle) => {
      const matchesCategory = vehicle.category === category
      const searchText = [vehicle.name, vehicle.year, vehicle.category, vehicle.specs, vehicle.features, ...vehicle.tags].join(' ')
      return matchesCategory && (!keyword || searchText.includes(keyword))
    })

    this.setData({ filteredVehicles })
  },

  onCategoryTap(e) {
    this.setData({ activeCategory: e.currentTarget.dataset.index })
    this.filterVehicles()
  },

  onSearchInput(e) {
    this.setData({ searchKeyword: e.detail.value })
    this.filterVehicles()
  },

  onVehicleTap(e) {
    wx.navigateTo({
      url: `/pages/vehicle-detail/vehicle-detail?id=${e.currentTarget.dataset.id}`
    })
  }
})
