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
      value: 'xj-roadtrip'
    },
    xiaohongshuId: {
      type: String,
      value: 'xj-roadtrip'
    },
    douyinId: {
      type: String,
      value: 'xj-roadtrip'
    }
  },

  methods: {
    noop() {},

    onClose() {
      this.triggerEvent('close')
    },

    onWechatContact() {
      wx.showToast({
        title: `WeChat: ${this.data.wechatId}`,
        icon: 'none'
      })
    },

    onXiaohongshuContact() {
      wx.showToast({
        title: `Xiaohongshu: ${this.data.xiaohongshuId}`,
        icon: 'none'
      })
    },

    onDouyinContact() {
      wx.showToast({
        title: `Douyin: ${this.data.douyinId}`,
        icon: 'none'
      })
    },

    onCallPhone() {
      this.triggerEvent('close')
      wx.makePhoneCall({
        phoneNumber: this.data.phoneNumber
      })
    }
  }
})
