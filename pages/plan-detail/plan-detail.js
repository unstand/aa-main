// pages/plan-detail/plan-detail.js
const { request } = require('../../utils/request.js')
const { useMock } = require('../../config/api.js')

// ===================== Mock 数据 =====================
const MOCK_PLAN_DETAILS = {
  1: {
    id: 1,
    title: '塔吉克恶魔之眼探秘',
    description: [
      '慕士塔格峰下，恶魔之眼凝视着帕米尔高原的苍茫。',
      '穿越塔克拉玛干沙漠，在沙暴中感受生命的壮阔。',
      '奥依塔克冰川前，时间仿佛凝固在万年冰河之间。'
    ],
    images: [
      { url: '/images/yan.png', alt: '恶魔之眼' },
      { url: '/images/plan-silk-road.png', alt: '丝路风光' },
      { url: '/images/home-bj.png', alt: '帕米尔高原' }
    ],
    booking: {
      price: 5980,
      unit: '人',
      guestCount: 1,
      startDate: '08月15日',
      endDate: '08月20日',
      startWeekday: '周四',
    endWeekday: '周二',
    startTime: '10:00',
    endTime: '10:00',
      totalDays: 5,
      city: '喀什',
      departurePoint: '喀什机场T1航站楼'
    },
    map: {
      image: '/images/yan.png',
      pinLabel: '喀什'
    },
    vehicle: {
      id: 1,
      name: '丰田普拉多 ',
      year:"2025款",
      specs: '8挡手自一体 | 2.4T 双擎 | 4门5座',
      features: '全时四驱 | 360°全景影像 | 可放4个28寸行李箱',
      price: 598,
      unit: '车/日',
      quantity: 1,
      images: [
        '/images/car.png',
        '/images/car.png',
        '/images/car.png',
        '/images/car.png'
      ]
    },
    service: {
      id: 3,
      name: '高原氧气包',
      sub:'标准版 4人',
      specs: '便携氧气瓶×2 | 血氧仪 | 葡萄糖口服液 | 高原反应应急指南',
      price: 58,
      unit: '包/日',
      quantity: 1
    },
    activity: {
      image: '/images/activities.png',
      features: [
        { icon: '/images/icon-culture.png', label: '人文风情' },
        { icon: '/images/icon-drive.png', label: '自驾之旅' },
        { icon: '/images/icon-food.png', label: '吃喝玩乐' },
        { icon: '/images/icon-camp.png', label: '星空营地' },
        { icon: '/images/icon-heart.png', label: '体验至上' }
      ]
    },
    schedule: [
      {
        day: 1,
        title: '喀什古城',
        periods: [
          {
            time: '上午',
            type: 'ring',
            items: [
              '酒店早餐 + 办理边防证',
              '提前准备身份证，在喀什政务大厅办理（免费，约20分钟）',
              '古城东门开城仪式',
              '提前15分钟占位，免费观赏维族歌舞入城仪式，感受西域风情',
              '古城东区逛玩',
              '逛花盆巴扎、彩虹巷、布袋巷，打卡彩色土陶、手工花帽，体验喀什人文'
            ]
          },
          {
            time: '中午',
            type: 'dot',
            items: [
              '午餐：百年老茶馆',
              '点一壶药茶 + 馕，听热瓦普弹唱，品尝手抓饭 / 烤羊肉串，感受慢生活'
            ]
          },
          {
            time: '下午',
            type: 'dot',
            items: [
              '艾提尕尔清真寺 + 古街巷',
              '参观新疆最大清真寺，漫步闹孜贝亚巷，拍光影氛围感照片',
              '吾斯唐博依 / 手工市集',
              '逛土陶作坊或巴扎，体验手工打馕 / 铜器，购买非遗小纪念品'
            ]
          },
          {
            time: '夜',
            type: 'dot',
            items: [
              '汗巴扎夜市晚餐',
              '打卡烤包子、缸子肉、烤蛋，感受古城夜生活',
              '返回酒店休息',
              '早睡调整作息，为第二天高原行程储备体力'
            ]
          }
        ],
        transport: { duration: '1H', distance: '50KM' }
      },
      {
        day: 2,
        title: '喀什·奥依塔克红山·白沙湖北岸｜红山徒步·白沙湖全景',
        periods: [
          {
            time: '上午',
            type: 'ring',
            items: [
              '酒店早餐 + 办理边防证',
              '提前准备身份证，在喀什政务大厅办理（免费，约20分钟）',
              '古城东门开城仪式',
              '提前15分钟占位，免费观赏维族歌舞入城仪式，感受西域风情',
              '古城东区逛玩',
              '逛花盆巴扎、彩虹巷、布袋巷，打卡彩色土陶、手工花帽，体验喀什人文'
            ]
          },
          {
            time: '中午',
            type: 'dot',
            items: [
              '午餐：百年老茶馆',
              '点一壶药茶 + 馕，听热瓦普弹唱，品尝手抓饭 / 烤羊肉串，感受慢生活'
            ]
          },
          {
            time: '下午',
            type: 'dot',
            items: [
              '艾提尕尔清真寺 + 古街巷',
              '参观新疆最大清真寺，漫步闹孜贝亚巷，拍光影氛围感照片',
              '吾斯唐博依 / 手工市集',
              '逛土陶作坊或巴扎，体验手工打馕 / 铜器，购买非遗小纪念品'
            ]
          },
          {
            time: '夜',
            type: 'dot',
            items: [
              '汗巴扎夜市晚餐',
              '打卡烤包子、缸子肉、烤蛋，感受古城夜生活',
              '返回酒店休息',
              '早睡调整作息，为第二天高原行程储备体力'
            ]
          }
        ],
        transport: { duration: '5H', distance: '50KM' }
      }
    ],
    feeSections: [
      {
        title: '活动说明',
        items: [
          '本活动由新疆疆域博寰野旅行有限公司运营',
          '旅行社许可证: X-XXXXXXXXX（若行中证）'
        ]
      },
      {
        title: '适宜人群',
        items: [
          '本活动请在9岁含参加；',
          '本活动请确保已由监护人知悉活动；',
          '本活动拒绝酗酒醉酒者参加活动；',
          '本活动请提前购买高反应急物资；',
          '本活动适合身体健康、可独立完成基础徒步人群。',
          '本活动可报名年龄范围为6-65岁。'
        ]
      },
      {
        title: '费用包含',
        items: [
          '1、全程夜住住宿',
          '喀什精选酒店5晚；',
          '塔县精选酒店2晚',
          '红牛星空营地1晚',
          '沙漠星空营地1晚',
          '2、当地交通：',
          '当地全程正规手续旅行用车的包车费用，包含全程路桥费、油费、司机食宿费用',
          '3、景区门票体验项目：',
          '帕米尔景区门票（石头城、金草滩、白沙文、讲解）',
          '白沙湖门票',
          '卡拉库里湖门票',
          '慕士塔格冰川公园门票+景交',
          '红色里古门票+民俗体验',
          '塔县土陶体验费用',
          '驼中王国门票及讲解',
          '4、活动组织及领队费',
          '5、全程专业摄影跟队服务'
        ]
      },
      {
        title: '费用不含',
        items: [
          '1、各地往返喀什集合地、往返大交通费用（活动成行后大交通尽可能提早预订）',
          '2、个人房差：正常单人报名安排同性拼房，落单不同性别需补房差；不同意拼房或要求单住则需补全程单房差。',
          '3、景区内小交通以及行程以外的保险项目（如沙车、帆船升空自由移动切费用自理）',
          '4、行程中个人消费以及娱乐体验项目或装备租赁费用',
          '5、除酒店含早以外未标注明已含的简餐'
        ]
      },
      {
        title: '附加服务',
        items: [
          '客服话术接待咨询小助手一份，活动出行期间主领、保障经理全程在线提供。'
        ]
      },
      {
        title: '活动成行',
        items: [
          '本活动2人成行，若出现天气、路况、景区政策变化等不可抗因素，组织方有权对行程顺序做安全调整。',
          '若因人数不足未成团，将提前通知并协商改期或全额退款。'
        ]
      },
      {
        title: '服务约定',
        items: [
          '1.支付旅游费用即视为已知悉、已阅读活动须知并确认合同全部内容。',
          '2.行程开始后不支持自由脱团，若因个人原因退出，未发生费用将按规则核算退回。',
          '3.边境、高原、沙漠地区请严格遵守领队安排，不得擅自离队。',
          '4.如遇政策、道路、天气原因造成延误或调整，费用以实际发生为准。'
        ]
      },
      {
        title: '报名须知',
        items: [
          '1.请如实填写个人信息与身体状况，严重心脑血管疾病、呼吸系统疾病、孕妇等不适宜高原活动人群请勿报名。',
          '2.报名成功后请保持手机畅通，活动群内会同步集合时间、装备建议与成团进度。',
          '3.高原地区昼夜温差大，请准备冲锋衣、抓绒、防晒、墨镜、保温杯等基础装备。',
          '4.咨询服务电话:12345；活动质量监督电话:4001132032。'
        ]
      }
    ],
    totalPrice: 9260
  },
  2: {
    id: 2,
    title: '丝路探秘之旅',
    description: [
      '沿着古老的丝绸之路，探寻千年的文明遗迹。',
      '从天山脚下到戈壁深处，感受多元文化的交融。',
      '在壮美的自然风光中，书写属于你的丝路故事。'
    ],
    images: [
      { url: '/images/plan-silk-road.png', alt: '丝路探秘' },
      { url: '/images/plan-evil-eye.png', alt: '自然风光' }
    ],
    booking: {
      price: 12800,
      unit: '人',
      guestCount: 1,
      startDate: '09月01日',
      endDate: '09月08日',
      startWeekday: '周四',
    endWeekday: '周二',
    startTime: '10:00',
    endTime: '10:00',
      totalDays: 8,
      city: '乌鲁木齐',
      departurePoint: '地窝堡机场T2'
    },
    map: {
      image: '/images/ditu.png',
      pinLabel: '乌鲁木齐'
    },
    vehicle: {
      id: 2,
      name: '丰田兰德酷路泽',
      year:'2024款',
      specs: '6挡手自一体 | 4.0L V6 | 5门8座',
      features: '全时四驱 | 差速锁 | 越野模式选择',
      price: 898,
      unit: '车/日',
      quantity: 1,
      images: ['/images/car.png',
      '/images/car.png']
    },
    service: {
      id: 1,
      name: '车辆应急包 ',
      sub:'标准版',
      specs: '拖车绳 | 防困板 | 充气泵 | 工兵铲 | 搭电线',
      price: 38,
      unit: '包/日',
      quantity: 1
    },
    activity: {
      image: '/images/activities.png',
      features: [
        { icon: '', label: '人文风情' },
        { icon: '', label: '自驾之旅' },
        { icon: '', label: '吃喝玩乐' },
        { icon: '', label: '星空营地' },
        { icon: '', label: '体验至上' }
      ]
    },
    schedule: [
      {
        day: 1,
        title: '乌鲁木齐集合',
        periods: [
          { time: '上午', type: 'ring', items: ['机场接机', '行前说明会'] },
          { time: '下午', type: 'dot', items: ['新疆博物馆', '国际大巴扎'] }
        ],
        transport: { duration: '2H', distance: '80KM' }
      }
    ],
    feeSections: [
      { title: '费用包含', items: ['全程住宿', '全程交通', '景点门票'] },
      { title: '费用不含', items: ['往返大交通', '个人消费'] }
    ],
    totalPrice: 20288
  }
}

// ===================== API 方法 =====================

function getPlanDetail(id) {
  const planId = Number(id) || 1

  if (useMock) {
    return Promise.resolve(MOCK_PLAN_DETAILS[planId] || MOCK_PLAN_DETAILS[1])
  }

  return request({
    url: `/api/plans/${planId}`,
    method: 'GET'
  })
}

// ===================== Page =====================
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
  onBack() {
    if (getCurrentPages().length > 1) {
      wx.navigateBack()
      return
    }

    wx.redirectTo({
      url: '/pages/home/home'
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
