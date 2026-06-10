// pages/contract/contract.js
const app = getApp()

const STORAGE_KEY = 'contractFormDraft'

const DEFAULT_DATA = {
  contractNo: '',
  travelerName: '',
  travelerIdCard: '',
  travelerPhone: '',
  travelerAddress: '',
  companyShortName: '探索旅行',
  companyName: '探索旅行国际旅行社有限公司',
  companyCreditCode: '91650100MA7XXXXX',
  companyAddress: '新疆喀什市解放北路XX号',
  companyPhone: '4001234567',
  companyScope: '国内旅游业务',
  travelerCount: '',
  travelStartYear: '2025',
  travelStartMonth: '8',
  travelStartDay: '15',
  travelEndYear: '2025',
  travelEndMonth: '8',
  travelEndDay: '20',
  travelDays: '5',
  travelNights: '4',
  travelRoute: '',
  gatherPlace: '',
  gatherYear: '2025',
  gatherMonth: '8',
  gatherDay: '15',
  gatherHour: '10',
  totalFee: '1750',
  totalFeeUpper: '壹仟柒佰伍拾',
  feeIncludes: '交通费、住宿费、景区首道门票、正餐餐费、导游服务费、当地用车。',
  feeExcludes: '个人消费、自费项目、往返出发地交通、单人房差、意外伤病医疗费用。',
  paymentMethod: '签约当日一次性付清',
  paymentAccount: '',
  signName: '',
  signYear: '2025',
  signMonth: '8',
  signDay: '15',
  agreed: false,
  showContactPopup: false
}

Page({
  data: {
    ...DEFAULT_DATA
  },

  onLoad(options) {
    this.restoreDraft()
    this.applyOrderInfo(options)
  },

  restoreDraft() {
    try {
      const draft = wx.getStorageSync(STORAGE_KEY)
      if (draft && typeof draft === 'object') {
        this.setData({
          ...draft,
          showContactPopup: false
        })
      }
    } catch (error) {
      console.error('恢复合同草稿失败', error)
    }
  },

  saveDraft(extraData = {}) {
    try {
      wx.setStorageSync(STORAGE_KEY, {
        ...this.data,
        ...extraData,
        showContactPopup: false
      })
    } catch (error) {
      console.error('保存合同草稿失败', error)
    }
  },

  updateField(field, value) {
    this.setData({ [field]: value })
    this.saveDraft({ [field]: value })
  },

  applyOrderInfo(options = {}) {
    if (!options.vehicleId) {
      return
    }

    const vehicleId = parseInt(options.vehicleId, 10)
    const vehicles = (app.globalData && app.globalData.vehicles) || []
    const insurancePlans = (app.globalData && app.globalData.insurancePlans) || []
    const vehicle = vehicles.find((item) => item.id === vehicleId)

    if (!vehicle) {
      return
    }

    const days = parseInt(options.days, 10) || parseInt(this.data.travelDays, 10) || 5
    const quantity = parseInt(options.quantity, 10) || 1
    const insuranceId = options.insuranceId || 'basic'
    const insurance = insurancePlans.find((item) => item.id === insuranceId)
    const total = vehicle.price * quantity * days + (insurance ? insurance.price * days : 0)

    const nextData = {
      totalFee: String(total),
      travelRoute: `${vehicle.name}自驾游`,
      travelerCount: String(quantity),
      travelDays: String(days),
      travelNights: String(Math.max(days - 1, 0))
    }

    this.setData(nextData)
    this.saveDraft(nextData)
  },

  onBack() {
    wx.navigateBack({
      delta: 1,
      fail: () => {
        wx.switchTab({
          url: '/pages/home/home'
        })
      }
    })
  },

  onInputContractNo(e) {
    this.updateField('contractNo', e.detail.value)
  },

  onInputTravelerName(e) {
    this.updateField('travelerName', e.detail.value)
  },

  onInputIdCard(e) {
    this.updateField('travelerIdCard', e.detail.value)
  },

  onInputPhone(e) {
    this.updateField('travelerPhone', e.detail.value)
  },

  onInputAddress(e) {
    this.updateField('travelerAddress', e.detail.value)
  },

  onInputCount(e) {
    this.updateField('travelerCount', e.detail.value)
  },

  onInputTravelStartYear(e) {
    this.updateField('travelStartYear', e.detail.value)
  },

  onInputTravelStartMonth(e) {
    this.updateField('travelStartMonth', e.detail.value)
  },

  onInputTravelStartDay(e) {
    this.updateField('travelStartDay', e.detail.value)
  },

  onInputTravelEndYear(e) {
    this.updateField('travelEndYear', e.detail.value)
  },

  onInputTravelEndMonth(e) {
    this.updateField('travelEndMonth', e.detail.value)
  },

  onInputTravelEndDay(e) {
    this.updateField('travelEndDay', e.detail.value)
  },

  onInputTravelDays(e) {
    this.updateField('travelDays', e.detail.value)
  },

  onInputTravelNights(e) {
    this.updateField('travelNights', e.detail.value)
  },

  onInputRoute(e) {
    this.updateField('travelRoute', e.detail.value)
  },

  onInputGatherPlace(e) {
    this.updateField('gatherPlace', e.detail.value)
  },

  onInputGatherYear(e) {
    this.updateField('gatherYear', e.detail.value)
  },

  onInputGatherMonth(e) {
    this.updateField('gatherMonth', e.detail.value)
  },

  onInputGatherDay(e) {
    this.updateField('gatherDay', e.detail.value)
  },

  onInputGatherHour(e) {
    this.updateField('gatherHour', e.detail.value)
  },

  onInputTotalFee(e) {
    this.updateField('totalFee', e.detail.value)
  },

  onInputTotalFeeUpper(e) {
    this.updateField('totalFeeUpper', e.detail.value)
  },

  onInputAccount(e) {
    this.updateField('paymentAccount', e.detail.value)
  },

  onInputSignName(e) {
    this.updateField('signName', e.detail.value)
  },

  onInputSignYear(e) {
    this.updateField('signYear', e.detail.value)
  },

  onInputSignMonth(e) {
    this.updateField('signMonth', e.detail.value)
  },

  onInputSignDay(e) {
    this.updateField('signDay', e.detail.value)
  },

  onAgreeChange() {
    const agreed = !this.data.agreed
    this.setData({ agreed })
    this.saveDraft({ agreed })
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
