//index.js
//获取应用实例
const app = getApp()
import api from '../../api/api.js'
import util from '../../utils/util.js'

Page({
  data: {
   vols: [],
   current: 0
  },
  //事件处理函数

  onLoad: function () {
    api.getVolIdList({
      success: (res) => {
        if (res.data.res === 0) {
          let idList = res.data.data
          // console.log(idList)
          this.getVols(idList)
        }
      }
    })
  },
  getVols: function (idList) {
    let vols = this.data.vols
    if (idList.length > 0) {
      api.getVolById({
        query: {
          id: idList.shift()
        },
        success: (res) => {
          if (res.data.res === 0) {
            let vol = res.data.data
            
            // vol.hp_makettime = util.formatMakettime(vol.hp_makettime)
            this.data.vols.push(vol)
            console.log(vol)
          }
          this.getVols(idList)
        }
      })
    } else {
      this.setData({ vols })
    }
  },
})
