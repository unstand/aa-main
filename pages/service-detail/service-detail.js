Page({
  data: {
    service: {
      id: 1,
      name: '应急车辆包标准包',
      price: 58,
      unit: '包/日',
      image: '/images/bj-car.png',
      items: '拖车绳 | 脱困板/防沙板 | 充气泵 | 工兵铲\n搭电线/应急电源 | 补胎工具包 | 三角警示牌\n灭火器'
    },
    quantity: 1,
    startDateText: '08月15日',
    endDateText: '08月20日',
    startWeekday: '周四',
    endWeekday: '周二',
    startTime: '10:00',
    endTime: '10:00',
    totalDays: 5,
    city: '喀什',
    pickupPoint: '喀什机场T1航站楼',
    selectedPackage: 'standard',
    activeSlide: 0,
    carouselDots: [0],
    showContactPopup: false,
    packageOptions: [
      {
        id: 'standard',
        name: '标准包',
        priceAdd: 0,
        priceLabel: '+¥0',
        items: '拖车绳 | 脱困板/防沙板 | 充气泵 | 工兵铲 | 搭电线/应急电源 | 补胎工具包 | 三角警示牌 | 灭火器'
      },
      {
        id: 'upgrade',
        name: '升级包',
        priceAdd: 15,
        priceLabel: '+¥15',
        items: '拖车绳 | 脱困板/防沙板 | 充气泵 | 工兵铲 | 搭电线/应急电源 | 补胎工具包 | 三角警示牌 | 灭火器'
      },
      {
        id: 'premium',
        name: '升级包',
        priceAdd: 15,
        priceLabel: '+¥15',
        items: '拖车绳 | 脱困板/防沙板 | 充气泵 | 工兵铲 | 搭电线/应急电源 | 补胎工具包 | 三角警示牌 | 灭火器'
      }
    ],
    totalPrice: 1750
  },

  onLoad(options) {
    if (options && options.id) {
      this.setData({
        'service.id': Number(options.id) || 1
      })
    }
    this.calculateTotal()
  },

  onBack() {
    if (getCurrentPages().length > 1) {
      wx.navigateBack()
      return
    }

    wx.redirectTo({
      url: '/pages/service/service'
    })
  },

  onQuantityMinus() {
    if (this.data.quantity <= 1) return
    this.setData({ quantity: this.data.quantity - 1 })
    this.calculateTotal()
  },

  onQuantityPlus() {
    this.setData({ quantity: this.data.quantity + 1 })
    this.calculateTotal()
  },

  onSelectPackage(e) {
    const { id } = e.currentTarget.dataset
    if (!id) return
    this.setData({ selectedPackage: id })
    this.calculateTotal()
  },

  onContactUs() {
    this.setData({
      showContactPopup: true
    })
  },

  onCloseContactPopup() {
    this.setData({
      showContactPopup: false
    })
  },

  onGeneratePlan() {
    wx.showToast({
      title: '已加入生成计划',
      icon: 'success'
    })
  },

  calculateTotal() {
    const { quantity, totalDays, packageOptions, selectedPackage } = this.data
    const selected = packageOptions.find((item) => item.id === selectedPackage) || packageOptions[0]
    const baseDailyTotal = 350
    const total = baseDailyTotal * quantity * totalDays + selected.priceAdd * totalDays
    this.setData({
      totalPrice: total
    })
  }
})
