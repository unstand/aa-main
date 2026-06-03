const { baseUrl } = require('../config/api.js')

function request({ url, method = 'GET', data = {}, header = {} }) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${baseUrl}${url}`,
      method,
      data,
      header: {
        'Content-Type': 'application/json',
        ...header
      },
      success(res) {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          const body = res.data
          if (body && body.code === 0) {
            resolve(body.data)
            return
          }
          reject(body || { message: '接口返回异常' })
          return
        }
        reject({ message: `HTTP ${res.statusCode}` })
      },
      fail(err) {
        reject(err)
      }
    })
  })
}

module.exports = {
  request
}
