// app.js
App({
  onLaunch() {
    // 检查登录状态
    const userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.globalData.userInfo = userInfo
      this.globalData.isLoggedIn = true
    }
  },

  globalData: {
    userInfo: null,
    isLoggedIn: false,
    // 车辆数据
    vehicles: [
      {
        id: 1,
        name: '丰田普拉多 2025款',
        specs: '8挡手自一体 | 2.4T 双擎 | 4门5座',
        features: '全时四驱 | 360°全景影像 | 可放4个28寸行李箱',
        tags: ['豪华SUV', '臻品越野'],
        price: 598,
        unit: '车/日',
        category: 'SUV',
        image: '/images/car-prado.png'
      },
      {
        id: 2,
        name: '丰田普拉多 2025款',
        specs: '8挡手自一体 | 2.4T 双擎 | 4门5座',
        features: '全时四驱 | 360°全景影像 | 可放4个28寸行李箱',
        tags: ['豪华SUV', '臻品越野'],
        price: 598,
        unit: '车/日',
        category: 'SUV',
        image: '/images/car-prado.png'
      },
      {
        id: 3,
        name: '丰田普拉多 2025款',
        specs: '8挡手自一体 | 2.4T 双擎 | 4门5座',
        features: '全时四驱 | 360°全景影像 | 可放4个28寸行李箱',
        tags: ['豪华SUV', '臻品越野'],
        price: 598,
        unit: '车/日',
        category: 'SUV',
        image: '/images/car-prado.png'
      },
      {
        id: 4,
        name: '丰田兰德酷路泽 2024款',
        specs: '6挡手自一体 | 4.0L V6 | 5门8座',
        features: '全时四驱 | 差速锁 | 越野模式选择',
        tags: ['豪华SUV', '长途利器'],
        price: 898,
        unit: '车/日',
        category: '豪华型',
        image: '/images/car-lc.png'
      },
      {
        id: 5,
        name: '坦克300 2024款',
        specs: '9挡手自一体 | 2.0T | 4门5座',
        features: '分时四驱 | 前后桥差速锁 | 越野蠕行',
        tags: ['硬派越野', '高性价比'],
        price: 356,
        unit: '车/日',
        category: 'SUV',
        image: '/images/car-tank.png'
      }
    ],
    // 附加服务数据
    services: [
      {
        id: 1,
        name: '车辆应急包 标准版',
        edition: '标准版',
        forCount: '1车',
        items: '拖车绳 | 防困板 | 防沙板 | 充气泵 | 工兵铲 | 搭电线/应急电源 | 补胎工具包 | 三角警示牌 | 灭火器',
        dimensions: '50cm×30cm×40cm',
        price: 38,
        unit: '包/日',
        category: '车辆应急包'
      },
      {
        id: 2,
        name: '车辆应急包 升级版',
        edition: '升级版',
        forCount: '1车',
        items: '拖车绳 | 防困板 | 防沙板 | 大功率充气泵 | 工兵铲 | 搭电线/应急电源 | 补胎工具包 | 三角警示牌 | 灭火器 | 急救包',
        dimensions: '60cm×35cm×45cm',
        price: 58,
        unit: '包/日',
        category: '车辆应急包'
      },
      {
        id: 3,
        name: '高原氧气包',
        edition: '标准版',
        forCount: '1人',
        items: '便携氧气瓶×2 | 血氧仪 | 葡萄糖口服液',
        price: 36,
        unit: '包/日',
        category: '高原氧气包'
      }
    ],
    // 旅行计划数据
    plans: [
      {
        id: 1,
        title: '越野西行 漫望恶魔之眼',
        subtitle: '穿越荒野·探索秘境',
        description: '与众不同的新疆人文之旅，特别是在塔克拉玛干沙漠沙暴的体验，绝对称得上人生之旅！',
        price: 10828,
        unit: '人',
        days: 6,
        nights: 5,
        distance: '950KM',
        tags: ['地质探险', '星空摄影', '车辆应急', '高原氧气', '户外摄影', '紧急通讯', '烤全羊包', '户外露营'],
        rating: 8.23,
        image: '/images/plan-evil-eye.png'
      },
      {
        id: 2,
        title: '丝路探秘之旅',
        subtitle: '千年丝路·文明回响',
        description: '沿着古老的丝绸之路，探寻千年的文明遗迹与壮美的自然风光。',
        price: 12800,
        unit: '人',
        days: 8,
        nights: 7,
        distance: '1800KM',
        tags: ['高海拔', '星空摄影', '人文探秘', '高原氧气'],
        rating: 9.1,
        image: '/images/plan-silk-road.png'
      }
    ],
    // 保险方案数据
    insurancePlans: [
      {
        id: 'basic',
        name: '基本保障',
        price: 17,
        costDisplay: '¥17/日 已含',
        features: {
          damage: '1500元以内自付\n不包含轮胎轮毂',
          thirdParty: '50万',
          depreciation: '车损5000以下免收',
          operationLoss: '不收费'
        }
      },
      {
        id: 'upgrade',
        name: '升级服务',
        price: 50,
        costDisplay: '+¥50/日',
        features: {
          damage: '全额赔付\n不含轮胎轮毂',
          thirdParty: '100万',
          depreciation: '车损5000以下免收',
          operationLoss: '不收费'
        }
      },
      {
        id: 'premium',
        name: '尊享服务',
        price: 80,
        costDisplay: '+¥80/日',
        features: {
          damage: '全额赔付',
          thirdParty: '200万',
          depreciation: '车损3万以下免收',
          operationLoss: '租金损失1万以下免收'
        }
      }
    ],
    // 城市数据
    cities: ['喀什', '乌鲁木齐', '伊犁', '和田', '阿克苏'],
    pickupPoints: {
      '喀什': ['喀什机场T1航站楼', '喀什火车站', '喀什市中心'],
      '乌鲁木齐': ['地窝堡机场T2', '乌鲁木齐站', '市区取车点'],
      '伊犁': ['伊宁机场', '伊宁站', '伊宁市中心']
    }
  }
})
