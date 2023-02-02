<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <template v-for="item in topPanelDatas" :key="item.amount">
        <el-col :span="6">
          <countCard v-bind="item" />
        </el-col>
      </template>
    </el-row>

    <!-- 2.中间的图标 -->
    <el-row :gutter="20">
      <el-col :span="8">
        <chart-card header="分类商品数量(饼图)">
          <pie-echart :pie-data="showGoodsCategoryCount" />
        </chart-card>
      </el-col>
      <el-col :span="8">
        <chart-card header="分类商品数量(玫瑰图)">
          <map-echart :map-data="showGoodsAddressSale" />
        </chart-card>
      </el-col>
      <el-col :span="8">
        <chart-card header="分类商品数量(玫瑰图)">
          <rose-echart :rose-data="showGoodsCategoryCount" />
        </chart-card>
      </el-col>
    </el-row>

    <!-- 3.底部的图标 -->
    <el-row :gutter="20">
      <el-col :span="12">
        <chart-card>
          <line-echart
            :labels="showGoodsCategorySale.labels"
            :values="showGoodsCategorySale.values"
          />
        </chart-card>
      </el-col>
      <el-col :span="12">
        <chart-card>
          <bar-echart
            :labels="showGoodsCategoryFavor.labels"
            :values="showGoodsCategoryFavor.values"
          />
        </chart-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts" name="dashboard">
import { computed } from 'vue'
import useAnalysisStore from '@/store/main/analysis/analysis'
import { storeToRefs } from 'pinia'
import countCard from '@/components/count-card/count-card.vue'
import { PieEchart, RoseEchart, LineEchart, BarEchart } from '@/components/page-charts'

const AnalysisStore = useAnalysisStore()
AnalysisStore.fetchAmountList()
const {
  topPanelDatas,
  categoryGoodsCount,
  categoryGoodsSale,
  categoryGoodsFavor,
  goodsAddressSale
} = storeToRefs(AnalysisStore)

const showGoodsCategoryCount = computed(() => {
  return categoryGoodsCount.value.map((item) => {
    return { name: item.name, value: item.goodsCount }
  })
})
const showGoodsCategorySale = computed(() => {
  const labels = categoryGoodsSale.value.map((item) => item.name)
  const values = categoryGoodsSale.value.map((item) => item.goodsCount)
  return { labels, values }
})
const showGoodsCategoryFavor = computed(() => {
  const labels = categoryGoodsFavor.value.map((item) => item.name)
  const values = categoryGoodsFavor.value.map((item) => item.goodsFavor)
  return { labels, values }
})
const showGoodsAddressSale = computed(() => {
  return goodsAddressSale.value.map((item) => {
    return { name: item.address, value: item.count }
  })
})
</script>

<style scoped lang="less">
.el-row {
  margin-bottom: 20px;
}
</style>
