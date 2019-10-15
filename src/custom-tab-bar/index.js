Page({
  data: {
    PageCur: 'index'
  },
    onShow () {
        // console.log(this.data.PageCur)
    },
  NavChange(e) {
      // wx.reLaunch({
      //     url: 'com'
      // })
    this.setData({
      PageCur: e.currentTarget.dataset.cur
    })
      // console.log(e.currentTarget.dataset.cur)
      wx.setStorageSync('pageCur', e.currentTarget.dataset.cur)
      // console.log(getCurrentPages()[getCurrentPages().length - 1].route);
      // let url = getCurrentPages()[getCurrentPages().length - 1].route.split('pages/com')[1]
      // console.log(url)

      // getCurrentPages()[getCurrentPages().length - 1].onShow()
  },
  onShareAppMessage() {
    return {
      title: 'ColorUI-高颜值的小程序UI组件库',
      imageUrl: '',
      path: '/pages/index/index'
    }
  },
})