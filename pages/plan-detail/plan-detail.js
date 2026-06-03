// pages/plan-detail/plan-detail.js
const { getPlanDetail } = require('../../services/plan.js')

Page({
  data: {
    planId: 1,
    detail: null,
    loading: true,
    error: '',
    swiperCurrent: 0,
    activeTab: 'activity',
    guestCount: 1,
    vehicleCount: 1,
    serviceCount: 1,
    totalPrice: 0,
    scrollIntoView: ''
  },

  onLoad(options) {
    const planId = parseInt(options.id, 10) || 1
    this.setData({ planId })
    this.loadPlanDetail()
  },

  loadPlanDetail() {
    const { planId } = this.data
    this.setData({ loading: true, error: '' })

    getPlanDetail(planId)
      .then((detail) => {
        this.setData({
          detail,
          loading: false,
          guestCount: detail.booking.guestCount,
          vehicleCount: detail.vehicle.quantity,
          serviceCount: detail.service.quantity,
          totalPrice: detail.totalPrice
        })
      })
      .catch((err) => {
        this.setData({
          loading: false,
          error: (err && err.message) || '加载失败，请稍后重试'
        })
      })
  },

  onHeroSwiperChange(e) {
    this.setData({ swiperCurrent: e.detail.current })
  },

  onTabChange(e) {
    const tab = e.currentTarget.dataset.tab
    this.setData({
      activeTab: tab,
      scrollIntoView: 'tab-section'
    })
  },

  onGuestMinus() {
    if (this.data.guestCount <= 1) return
    this.setData({ guestCount: this.data.guestCount - 1 })
    this.recalculateTotal()
  },

  onGuestPlus() {
    this.setData({ guestCount: this.data.guestCount + 1 })
    this.recalculateTotal()
  },

  onVehicleMinus() {
    if (this.data.vehicleCount <= 1) return
    this.setData({ vehicleCount: this.data.vehicleCount - 1 })
    this.recalculateTotal()
  },

  onVehiclePlus() {
    this.setData({ vehicleCount: this.data.vehicleCount + 1 })
    this.recalculateTotal()
  },

  onServiceMinus() {
    if (this.data.serviceCount <= 1) return
    this.setData({ serviceCount: this.data.serviceCount - 1 })
    this.recalculateTotal()
  },

  onServicePlus() {
    this.setData({ serviceCount: this.data.serviceCount + 1 })
    this.recalculateTotal()
  },

  recalculateTotal() {
    const { detail, guestCount, vehicleCount, serviceCount } = this.data
    if (!detail) return

    const days = detail.booking.totalDays
    const base = detail.booking.price * guestCount
    const vehicleCost = detail.vehicle.price * vehicleCount * days
    const serviceCost = detail.service.price * serviceCount * days
    this.setData({ totalPrice: base + vehicleCost + serviceCost })
  },

  onModifyVehicle() {
    wx.navigateTo({
      url: `/pages/vehicle-detail/vehicle-detail?id=${this.data.detail.vehicle.id}`
    })
  },

  onModifyService() {
    wx.navigateTo({
      url: `/pages/service-detail/service-detail?id=${this.data.detail.service.id}`
    })
  },

  onAddService() {
    wx.redirectTo({
      url: '/pages/service/service'
    })
  },

  onContactUs() {
    wx.makePhoneCall({
      phoneNumber: '4001234567'
    })
  },

  onGeneratePlan() {
    wx.navigateTo({
      url: `/pages/contract/contract?planId=${this.data.planId}`
    })
  }
})
