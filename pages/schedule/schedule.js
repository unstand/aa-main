// pages/schedule/schedule.js
const { request } = require('../../utils/request.js')
const { useMock, baseUrl } = require('../../config/api.js')

// ===================== Mock 数据 =====================

const mockUser = {
  id: '123545678',
  name: '老蒯',
  avatar: '/images/avatar-default.png',
  phone: '138****5678'
}

const mockPlans = [
  {
    id: 1,
    title: '塔吉克恶魔之眼探秘',
    cover: '/images/aa.png',
    priceLabel: '计划金额 ¥53720',
    tags: ['6天5晚', '950KM'],
    createDate: '2026.08.11',
    startDate: '2026.09.11',
    endDate: '2026.09.15',
    departure: '喀什',
    vehicle: '无',
    status: 0
  },
  {
    id: 2,
    title: '塔吉克恶魔之眼探秘',
    cover: '/images/yan.png',
    priceLabel: '计划金额 ¥53720',
    tags: ['6天5晚', '950KM'],
    createDate: '2026.08.11',
    startDate: '2026.09.11',
    endDate: '2026.09.15',
    departure: '喀什',
    vehicle: '无',
    status: 1
  }
]

// 联系我们 - 四个矢量图按钮
const mockContactOptions = [
  {
    id: 1,
    title: '微信',
    type: 'wechat',
    value: 'travel_service',
    desc: '添加好友咨询',
    color: '#07c160'
  },
  {
    id: 2,
    title: '小红书',
    type: 'xiaohongshu',
    value: '探索旅行',
    desc: '查看旅行笔记',
    color: '#fe2c55'
  },
  {
    id: 3,
    title: '抖音',
    type: 'douyin',
    value: 'tansuo_trip',
    desc: '观看旅行视频',
    color: '#fe2c55'
  },
  {
    id: 4,
    title: '电话',
    type: 'phone',
    value: '400-888-8888',
    desc: '7x24小时服务',
    color: '#4ecdc4'
  }
]

// ===================== API 方法 =====================

function getUserInfo() {
  if (useMock) {
    return Promise.resolve({ ...mockUser })
  }
  return request({ url: '/user/info' })
}

function getPlans(params = {}) {
  if (useMock) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          list: [...mockPlans],
          total: mockPlans.length,
          page: params.page || 1,
          pageSize: params.pageSize || 10
        })
      }, 300)
    })
  }
  return request({
    url: '/plans/list',
    data: params
  })
}

function getPlanDetail(id) {
  if (useMock) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const plan = mockPlans.find(p => p.id === id)
        if (plan) {
          resolve({ ...plan })
        } else {
          reject({ message: '计划不存在' })
        }
      }, 200)
    })
  }
  return request({ url: `/plans/${id}` })
}

function getContactOptions() {
  if (useMock) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...mockContactOptions])
      }, 200)
    })
  }
  return request({ url: '/contact/options' })
}

function copyToClipboard(text) {
  wx.setClipboardData({
    data: text,
    success: () => {
      wx.showToast({ title: '已复制到剪贴板', icon: 'success', duration: 1500 })
    },
    fail: () => {
      wx.showToast({ title: '复制失败', icon: 'none', duration: 1500 })
    }
  })
}

function handleContactAction(option) {
  switch (option.type) {
    case 'phone':
      wx.makePhoneCall({
        phoneNumber: option.value.replace(/[^0-9]/g, ''),
        fail: () => {
          wx.showToast({ title: '拨打失败', icon: 'none' })
        }
      })
      break
    case 'wechat':
    case 'xiaohongshu':
    case 'douyin':
      copyToClipboard(option.value)
      break
    default:
      break
  }
}

// ===================== Page =====================
Page({
  data: {
    activeTab: 0,
    user: {
      name: '加载中...',
      id: '',
      avatar: '/images/avatar-default.png'
    },
    plans: [],
    contactOptions: [],
    bottomTabs: [
      { key: 'home', text: '主页', pagePath: '/pages/home/home', iconBase: '/images/tab-home.png' },
      { key: 'vehicle', text: '车辆', pagePath: '/pages/vehicle/vehicle', iconBase: '/images/tab-car.png' },
      { key: 'service', text: '附加服务', pagePath: '/pages/service/service', iconBase: '/images/tab-service.png' },
      {
        key: 'schedule',
        text: '计划',
        pagePath: '/pages/schedule/schedule',
        iconBase: '/images/tab-calendar-active.png',
        iconTop: '/images/tab-calendar1-active.png',
        active: true
      }
    ]
  },

  onLoad() {
    this.initData()
  },

  onShow() {
    if (this.data.activeTab === 0) {
      this.loadPlans()
    }
  },

  initData() {
    this.loadUserInfo()
    this.loadPlans()
    this.loadContactOptions()
  },

  loadUserInfo() {
    getUserInfo().then(user => {
      this.setData({ user })
    }).catch(err => {
      console.error('获取用户信息失败', err)
    })
  },

  loadPlans() {
    getPlans().then(result => {
      this.setData({ plans: result.list || [] })
    }).catch(err => {
      console.error('获取计划列表失败', err)
      wx.showToast({ title: '加载失败', icon: 'none' })
    })
  },

  loadContactOptions() {
    getContactOptions().then(options => {
      this.setData({ contactOptions: options })
    }).catch(err => {
      console.error('获取联系方式失败', err)
    })
  },

  onTabTap(e) {
    const tab = parseInt(e.currentTarget.dataset.tab)
    this.setData({ activeTab: tab })
  },

  onContactTap(e) {
    const option = e.currentTarget.dataset.option
    handleContactAction(option)
  },

  onPlanAction(e) {
    const { action, id, status } = e.currentTarget.dataset
    const planId = id || 1

    switch (action) {
      case 'modify':
        wx.navigateTo({ url: `/pages/plan-detail/plan-detail?id=${planId}` })
        break
      case 'view':
        wx.navigateTo({ url: `/pages/plan-detail/plan-detail?id=${planId}` })
        break
      case 'book':
        wx.navigateTo({ url: `/pages/plan-detail/plan-detail?id=${planId}` })
        break
      case 'contract':
        wx.navigateTo({ url: `/pages/contract/contract?planId=${planId}` })
        break
      default:
        break
    }
  },

  onBottomTabTap(e) {
    const pagePath = e.currentTarget.dataset.path
    if (!pagePath || pagePath === '/pages/schedule/schedule') return
    wx.redirectTo({ url: pagePath })
  }
})
