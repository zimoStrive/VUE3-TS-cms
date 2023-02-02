import { defineStore } from 'pinia'

import {
  getAmountList,
  getCategoryGoodsCount,
  getCategoryGoodsFavor,
  getCategoryGoodsSale,
  getGoodsAddressSale,
  getGoodsSaleTop10
} from '@/service/main/analysis'

interface IAnalysis {
  topPanelDatas: any[]
  categoryGoodsCount: any[]
  categoryGoodsSale: any[]
  categoryGoodsFavor: any[]
  goodsSaleTop10: any[]
  goodsAddressSale: any[]
}

const useAnalysis = defineStore('analysis', {
  state: (): IAnalysis => ({
    topPanelDatas: [],
    categoryGoodsCount: [],
    categoryGoodsSale: [],
    categoryGoodsFavor: [],
    goodsSaleTop10: [],
    goodsAddressSale: []
  }),
  actions: {
    async fetchAmountList() {
      const res = await getAmountList()
      this.topPanelDatas = res.data
      getCategoryGoodsCount().then((res) => {
        this.categoryGoodsCount = res.data
      })
      getCategoryGoodsSale().then((res) => {
        this.categoryGoodsSale = res.data
      })
      getCategoryGoodsFavor().then((res) => {
        this.categoryGoodsFavor = res.data
      })
      getGoodsSaleTop10().then((res) => {
        this.goodsSaleTop10 = res.data
      })
      getGoodsAddressSale().then((res) => {
        this.goodsAddressSale = res.data
      })
    }
  }
})

export default useAnalysis
