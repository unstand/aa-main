// pages/vehicle/vehicle.js
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
  specs: '8挡手自一体 | 2.4T 双擎 | 4门5座',
  features: '全时四驱 | 360°全景影像 | 可放4个28寸行李箱',
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
    specs: '9挡手自一体 | 2.0T | 5门7座',
    features: '电动侧滑门 | 独立座椅 | 适合商务接待',
    tags: ['商务车', '舒适大空间'],
    price: 698,
    category: '商务车'
  },
  {
    ...baseVehicle,
    id: 6,
    name: '大众朗逸',
    year: '2025款',
    specs: '7挡双离合 | 1.5T | 4门5座',
    features: '省油耐用 | 城市通勤 | 可放2个24寸行李箱',
    tags: ['经济型', '高性价比'],
    price: 268,
    category: '经济型'
  },
  {
    ...baseVehicle,
    id: 7,
    name: '奔驰V级',
    year: '2025款',
    specs: '9挡手自一体 | 2.0T | 5门7座',
    features: '航空座椅 | 高端接待 | 大容量行李空间',
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
    bottomTabs: [
      { key: 'home', text: '主页', pagePath: '/pages/home/home', iconBase: '/images/tab-home.png' },
      { key: 'vehicle', text: '车辆', pagePath: '/pages/vehicle/vehicle', iconBase: '/images/tab-car-active.png' , active: true},
      { key: 'service', text: '附加服务', pagePath: '/pages/service/service', iconBase: '/images/tab-service.png' },
      { key: 'schedule', text: '计划', pagePath: '/pages/schedule/schedule', 
      iconBase: '/images/tab-calendar.png',   // 底图
  iconTop: '/images/tab-calendar1.png' }
    ]
  },

  onLoad() {
    this.filterVehicles()
  },

  onShow() {},

  filterVehicles() {
    const { activeCategory, searchKeyword } = this.data
    const category = categories[activeCategory].name
    const keyword = searchKeyword.trim()
    const filteredVehicles = vehicles.filter((vehicle) => {
      const matchesCategory = vehicle.category === category
      const searchText = [
        vehicle.name,
        vehicle.year,
        vehicle.category,
        vehicle.specs,
        vehicle.features,
        ...vehicle.tags
      ].join(' ')
      const matchesKeyword = !keyword || searchText.includes(keyword)
      return matchesCategory && matchesKeyword
    })

    this.setData({ filteredVehicles })
  },

  onCategoryTap(e) {
    const index = e.currentTarget.dataset.index
    this.setData({ activeCategory: index })
    this.filterVehicles()
  },

  onSearchInput(e) {
    this.setData({ searchKeyword: e.detail.value })
    this.filterVehicles()
  },

  onBottomTabTap(e) {
    const pagePath = e.currentTarget.dataset.path
    if (!pagePath || pagePath === '/pages/vehicle/vehicle') return

    wx.redirectTo({
      url: pagePath
    })
  },

  onVehicleTap(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/vehicle-detail/vehicle-detail?id=${id}`
    })
  }
})
