// pages/contract/contract.js
const app = getApp()

Page({
  data: {
    // 甲方（旅游者）信息
    travelerName: '',
    travelerIdCard: '',
    travelerPhone: '',
    travelerAddress: '',
    // 乙方（旅行社）信息
    companyShortName: '探索旅行',
    companyName: '探索旅行国际旅行社有限公司',
    companyCreditCode: '91650100MA7XXXXX',
    companyAddress: '新疆喀什市解放北路XX号',
    companyPhone: '4001234567',
    companyScope: '国内旅游业务',
    // 行程信息
    travelerCount: '',
    travelStartDate: '2025年8月15日',
    travelEndDate: '2025年8月20日',
    travelDays: '5',
    travelNights: '4',
    travelRoute: '',
    gatherPlace: '',
    gatherTime: '2025年8月15日10点',
    // 费用信息
    totalFee: 1750,
    totalFeeUpper: '壹仟柒佰伍拾',
    feeIncludes: '交通费、住宿费、景区首道门票、正餐餐费、导游服务费、当地用车。',
    feeExcludes: '个人消费、自费项目、往返出发地交通、单人房差、意外伤病医疗费用。',
    paymentMethod: '签约当日一次性付清',
    paymentAccount: '',
    // 甲方权利义务
    partyARights: [
      '提供真实有效身份信息',
      '遵守景区规章制度',
      '按照约定时间集合出行',
      '自行承担个人消费费用',
      '对行程安排提出合理建议',
      '有权了解行程安全注意事项',
      '尊重当地风俗习惯',
      '爱护旅游环境'
    ],
    // 乙方权利义务
    partyBRights: [
      '安排预约行程，住宿，餐饮标准提供服务',
      '提供合格的旅游车辆及驾驶员',
      '为甲方购买旅游意外保险',
      '保障甲方人身财产安全',
      '及时处理甲方投诉',
      '告知旅游安全注意事项'
    ],
    agreed: false
  },

  onLoad(options) {
    if (options.vehicleId) {
      const vehicleId = parseInt(options.vehicleId)
      const vehicle = app.globalData.vehicles.find(v => v.id === vehicleId)
      if (vehicle) {
        const days = parseInt(options.days) || 5
        const quantity = parseInt(options.quantity) || 1
        const insuranceId = options.insuranceId || 'basic'
        const insurance = app.globalData.insurancePlans.find(p => p.id === insuranceId)
        const total = vehicle.price * quantity * days + (insurance ? insurance.price * days : 0)
        this.setData({
          totalFee: total,
          travelRoute: vehicle.name + '自驾游'
        })
      }
    }
  },

  onInputTravelerName(e) {
    this.setData({ travelerName: e.detail.value })
  },

  onInputIdCard(e) {
    this.setData({ travelerIdCard: e.detail.value })
  },

  onInputPhone(e) {
    this.setData({ travelerPhone: e.detail.value })
  },

  onInputAddress(e) {
    this.setData({ travelerAddress: e.detail.value })
  },

  onInputCount(e) {
    this.setData({ travelerCount: e.detail.value })
  },

  onInputRoute(e) {
    this.setData({ travelRoute: e.detail.value })
  },

  onInputGatherPlace(e) {
    this.setData({ gatherPlace: e.detail.value })
  },

  onInputAccount(e) {
    this.setData({ paymentAccount: e.detail.value })
  },

  onAgreeChange() {
    this.setData({ agreed: !this.data.agreed })
  },

  onContactUs() {
    wx.makePhoneCall({
      phoneNumber: '4001234567'
    })
  },

  onSignAndPay() {
    const { travelerName, travelerIdCard, travelerPhone, agreed } = this.data
    if (!travelerName || !travelerIdCard || !travelerPhone) {
      wx.showToast({
        title: '请填写完整个人信息',
        icon: 'none'
      })
      return
    }
    if (!agreed) {
      wx.showToast({
        title: '请先阅读并同意合同条款',
        icon: 'none'
      })
      return
    }

    wx.showModal({
      title: '确认签署',
      content: `确认签署国内旅游服务合同，支付¥${this.data.totalFee}？`,
      success: (res) => {
        if (res.confirm) {
          wx.showToast({
            title: '合同签署成功！',
            icon: 'success',
            duration: 2000
          })
          setTimeout(() => {
            wx.redirectTo({
              url: '/pages/schedule/schedule'
            })
          }, 2000)
        }
      }
    })
  }
})
