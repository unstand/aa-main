Component({
  properties: {
    visible: {
      type: Boolean,
      value: false
    },
    phoneNumber: {
      type: String,
      value: '4001234567'
    },
    wechatId: {
      type: String,
      value: 'travel_service'
    },
    xiaohongshuId: {
      type: String,
      value: '探索旅行'
    },
    douyinId: {
      type: String,
      value: 'tansuo_trip'
    }
  },

  methods: {
    noop() {},

    onClose() {
      this.triggerEvent('close')
    },

    copyToClipboard(text) {
      wx.setClipboardData({
        data: text,
        success: () => {
          wx.showToast({
            title: '已复制到剪贴板',
            icon: 'success',
            duration: 1500
          })
        },
        fail: () => {
          wx.showToast({
            title: '复制失败',
            icon: 'none',
            duration: 1500
          })
        }
      })
    },

    onWechatContact() {
      this.copyToClipboard(this.data.wechatId)
    },

    onXiaohongshuContact() {
      this.copyToClipboard(this.data.xiaohongshuId)
    },

    onDouyinContact() {
      this.copyToClipboard(this.data.douyinId)
    },

    onCallPhone() {
      this.triggerEvent('close')
      wx.makePhoneCall({
        phoneNumber: this.data.phoneNumber.replace(/[^0-9]/g, ''),
        fail: () => {
          wx.showToast({
            title: '拨打失败',
            icon: 'none'
          })
        }
      })
    }
  }
})
