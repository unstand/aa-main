Page({
  data: {
    vehicle: {
      id: 1,
      name: '丰田普拉多',
      year: '2025款',
      specs: '8 挡手自一体 | 2.4T 双擎 | 4 门 5 座',
      price: 598,
      unit: '车/日',
      image: '/images/bj-car.png'
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
    activeSlide: 2,
    carouselDots: [0, 1, 2, 3, 4],
    insuranceRows: [
      { key: 'damage', label: '车损保障' },
      { key: 'thirdParty', label: '三者保障' },
      { key: 'depreciation', label: '折旧费' },
      { key: 'operationLoss', label: '停运费' },
      { key: 'costDisplay', label: '费用' }
    ],
    insurancePlans: [
      {
        id: 'basic',
        name: '基本保障',
        price: 0,
        selectedText: '¥1/日\n已含',
        features: {
          damage: '1500元以内自付\n不含轮胎轮毂',
          thirdParty: '50万',
          depreciation: '车损\n5000以下免收',
          operationLoss: '不免收',
          costDisplay: '¥1/日\n已含'
        }
      },
      {
        id: 'upgrade',
        name: '升级服务',
        price: 50,
        selectedText: '选择',
        features: {
          damage: '全额赔付\n不含轮胎轮毂',
          thirdParty: '100万',
          depreciation: '车损\n5000以下免收',
          operationLoss: '不免收',
          costDisplay: '+¥50/日'
        }
      },
      {
        id: 'premium',
        name: '尊享服务',
        price: 80,
        selectedText: '选择',
        features: {
          damage: '全额赔付',
          thirdParty: '200万',
          depreciation: '车损\n3万以下免收',
          operationLoss: '租金损失\n1万以下免收',
          costDisplay: '+¥80/日'
        }
      }
    ],
    selectedInsurance: 'basic',
    totalPrice: 1750,
    showContactPopup: false
  },

  onLoad(options) {
    if (options && options.id) {
      this.setData({
        'vehicle.id': Number(options.id) || 1
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
      url: '/pages/vehicle/vehicle'
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

  onSelectInsurance(e) {
    const { id } = e.currentTarget.dataset
    if (!id) return
    this.setData({ selectedInsurance: id })
    this.calculateTotal()
  },

  onAddDriver() {
    wx.showToast({
      title: '新增驾驶员功能开发中',
      icon: 'none'
    })
  },

  onViewAllDrivers() {
    wx.showToast({
      title: '全部驾驶员功能开发中',
      icon: 'none'
    })
  },

  onViewInsuranceDetail() {
    wx.showModal({
      title: '保障说明',
      content: '车辆保障由合作保险服务商提供，最终保障范围以实际出单条款为准。',
      showCancel: false
    })
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
    wx.navigateTo({
      url: `/pages/contract/contract?vehicleId=${this.data.vehicle.id}&insuranceId=${this.data.selectedInsurance}&days=${this.data.totalDays}&quantity=${this.data.quantity}`
    })
  },

  calculateTotal() {
    const { quantity, totalDays, insurancePlans, selectedInsurance } = this.data
    const insurance = insurancePlans.find((item) => item.id === selectedInsurance) || insurancePlans[0]
    const baseDailyTotal = 350
    const total = baseDailyTotal * quantity * totalDays + insurance.price * totalDays
    this.setData({
      totalPrice: total
    })
  }
})
