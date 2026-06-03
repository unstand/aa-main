const { request } = require('../utils/request.js')
const { useMock } = require('../config/api.js')

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
      { url: '/images/plan-evil-eye.png', alt: '恶魔之眼' },
      { url: '/images/plan-silk-road.png', alt: '丝路风光' },
      { url: '/images/home-bj.png', alt: '帕米尔高原' }
    ],
    booking: {
      price: 5980,
      unit: '人',
      guestCount: 1,
      startDate: '08月15日',
      endDate: '08月20日',
      totalDays: 5,
      city: '喀什',
      departurePoint: '喀什机场T1航站楼'
    },
    map: {
      image: '/images/plan-evil-eye.png',
      pinLabel: '喀什'
    },
    vehicle: {
      id: 1,
      name: '丰田普拉多 2025款',
      specs: '8挡手自一体 | 2.4T 双擎 | 4门5座',
      features: '全时四驱 | 360°全景影像 | 可放4个28寸行李箱',
      price: 598,
      unit: '车/日',
      quantity: 1,
      images: [
        '/images/car-prado.png',
        '/images/car-prado.png',
        '/images/car-prado.png',
        '/images/car-prado.png'
      ]
    },
    service: {
      id: 3,
      name: '高原氧气包 标准版 4人',
      specs: '便携氧气瓶×2 | 血氧仪 | 葡萄糖口服液 | 高原反应应急指南',
      price: 58,
      unit: '包/日',
      quantity: 1
    },
    activity: {
      image: '/images/plan-silk-road.png',
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
          { time: '上午', type: 'ring', items: ['酒店早餐', '办理边防证', '喀什古城自由漫步'] },
          { time: '中午', type: 'dot', items: ['本地特色午餐'] },
          { time: '下午', type: 'dot', items: ['艾提尕尔清真寺', '百年老茶馆'] },
          { time: '夜', type: 'dot', items: ['古城夜景', '入住喀什酒店'] }
        ],
        transport: { duration: '1H', distance: '50KM' }
      },
      {
        day: 2,
        title: '帕米尔高原',
        periods: [
          { time: '上午', type: 'ring', items: ['出发前往帕米尔', '奥依塔克冰川'] },
          { time: '中午', type: 'dot', items: ['路餐'] },
          { time: '下午', type: 'dot', items: ['慕士塔格峰观景台', '卡拉库里湖'] },
          { time: '夜', type: 'dot', items: ['塔县入住', '高原适应休息'] }
        ],
        transport: { duration: '6H', distance: '300KM' }
      }
    ],
    feeSections: [
      {
        title: '活动说明',
        items: ['本活动由新疆探索旅行有限公司组织，查看许可证>>']
      },
      {
        title: '适宜人群',
        items: ['6-65周岁身体健康者', '无心脏病、高血压等不适宜高原活动的疾病', '孕妇及行动不便者请勿报名']
      },
      {
        title: '费用包含',
        items: [
          '1. 全程住宿：酒店标准间及露营装备',
          '2. 全程交通：越野车及油费、过路费、司机食宿',
          '3. 门票：行程所列景点首道门票',
          '4. 领队：专业领队全程陪同'
        ]
      },
      {
        title: '费用不含',
        items: [
          '1. 往返大交通（飞机/火车）',
          '2. 个人消费及单房差',
          '3. 未列入行程的餐饮及其他费用'
        ]
      },
      {
        title: '附加服务',
        items: ['赠送旅游意外险（最高保额50万）']
      },
      {
        title: '活动成行',
        items: ['本活动最少4人成行，未满4人活动取消并全额退款。']
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
      totalDays: 8,
      city: '乌鲁木齐',
      departurePoint: '地窝堡机场T2'
    },
    map: {
      image: '/images/plan-silk-road.png',
      pinLabel: '乌鲁木齐'
    },
    vehicle: {
      id: 2,
      name: '丰田兰德酷路泽 2024款',
      specs: '6挡手自一体 | 4.0L V6 | 5门8座',
      features: '全时四驱 | 差速锁 | 越野模式选择',
      price: 898,
      unit: '车/日',
      quantity: 1,
      images: ['/images/car-lc.png']
    },
    service: {
      id: 1,
      name: '车辆应急包 标准版',
      specs: '拖车绳 | 防困板 | 充气泵 | 工兵铲 | 搭电线',
      price: 38,
      unit: '包/日',
      quantity: 1
    },
    activity: {
      image: '/images/plan-silk-road.png',
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
    totalPrice: 35800
  }
}

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

module.exports = {
  getPlanDetail
}
