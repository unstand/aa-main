// pages/login/login.js
const app = getApp()

Page({
  onBack() {
    wx.navigateBack({
      delta: 1
    });
  },
  data: {
    agreed: false
  },
 
  onAgreeChange(e) {
    this.setData({
      agreed: !this.data.agreed
    })
  },

  onGetUserProfile(e) {
    if (!this.data.agreed) {
      wx.showToast({
        title: '请先同意服务协议',
        icon: 'none'
      })
      return
    }

    wx.getUserProfile({
      desc: '用于完善用户资料',
      success: (res) => {
        const userInfo = res.userInfo
        app.globalData.userInfo = userInfo
        app.globalData.isLoggedIn = true
        wx.setStorageSync('userInfo', userInfo)

        wx.redirectTo({
          url: '/pages/home/home'
        })
      },
      fail: () => {
        wx.showToast({
          title: '登录取消',
          icon: 'none'
        })
      }
    })
  },

  onWechatLogin() {
    if (!this.data.agreed) {
      wx.showToast({
        title: '请先同意服务协议和隐私政策',
        icon: 'none'
      })
      return
    }

    wx.login({
      success: (res) => {
        if (res.code) {
          // 模拟登录成功
          app.globalData.isLoggedIn = true
          app.globalData.userInfo = {
            nickName: '旅行者',
            avatarUrl: ''
          }
          wx.setStorageSync('userInfo', app.globalData.userInfo)

          wx.redirectTo({
            url: '/pages/home/home'
          })
        }
      }
    })
  },

  onViewServiceAgreement() {
    wx.showModal({
      title: '服务协议',
      content: '服务协议内容',
      showCancel: false
    })
  },

  onViewPrivacyPolicy() {
    wx.showModal({
      title: '隐私政策',
      content: '隐私政策内容',
      showCancel: false
    })
  }
})
