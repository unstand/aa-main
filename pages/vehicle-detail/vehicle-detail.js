// pages/vehicle-detail/vehicle-detail.js
const app = getApp()

Page({
  data: {
    vehicle: null,
    quantity: 1,
    startDate: '08月15日 周四 10:00',
    endDate: '08月20日 周二 10:00',
    totalDays: 5,
    city: '喀什',
    pickupPoint: '喀什机场T1航站楼',
    insurancePlans: [],
    selectedInsurance: 'basic',
    drivers: [],
    totalPrice: 0
  },

  onLoad(options) {
    const id = parseInt(options.id) || 1
    const vehicles = app.globalData.vehicles
    const vehicle = vehicles.find(v => v.id === id) || vehicles[0]
    const insurancePlans = app.globalData.insurancePlans

    this.setData({
      vehicle,
      insurancePlans
    })
    this.calculateTotal()
  },

  onQuantityMinus() {
    if (this.data.quantity > 1) {
      this.setData({ quantity: this.data.quantity - 1 })
      this.calculateTotal()
    }
  },

  onQuantityPlus() {
    this.setData({ quantity: this.data.quantity + 1 })
    this.calculateTotal()
  },

  onSelectInsurance(e) {
    const id = e.currentTarget.dataset.id
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
      title: '查看全部驾驶员',
      icon: 'none'
    })
  },

  onViewInsuranceDetail() {
    wx.showModal({
      title: '保障说明',
      content: '太平洋保险为您的行程提供全方位保障，具体条款以保险合同为准。',
      showCancel: false
    })
  },

  onContactUs() {
    wx.makePhoneCall({
      phoneNumber: '4001234567'
    })
  },

  onGeneratePlan() {
    wx.navigateTo({
      url: `/pages/contract/contract?vehicleId=${this.data.vehicle.id}&insuranceId=${this.data.selectedInsurance}&days=${this.data.totalDays}&quantity=${this.data.quantity}`
    })
  },

  calculateTotal() {
    const { vehicle, quantity, totalDays, insurancePlans, selectedInsurance } = this.data
    const insurance = insurancePlans.find(p => p.id === selectedInsurance)
    const vehicleCost = vehicle.price * quantity * totalDays
    const insuranceCost = insurance.price * totalDays
    const total = vehicleCost + insuranceCost
    this.setData({ totalPrice: total })
  }
})
