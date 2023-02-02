<template>
  <el-card>
    <div class="count-card">
      <div class="header">
        <span>{{ title }}</span>
        <el-tooltip :content="tips" placement="top" effect="light">
          <el-icon><Warning /></el-icon>
        </el-tooltip>
      </div>
      <div class="content">
        <!-- <span v-if="props.amount === 'saleroom'">￥</span> -->
        <span ref="numberRef1">{{ number1 }}</span>
      </div>
      <div class="footer">
        <span>{{ subtitle }}</span
        >&nbsp; &nbsp;
        <!-- <span v-if="props.amount === 'saleroom'">￥</span> -->
        <span ref="numberRef2">{{ number2 }}</span>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { CountUp } from 'countup.js'

interface IProps {
  amount?: string
  title?: string
  tips?: string
  number1?: number
  number2?: number
  subtitle?: string
}

const props = withDefaults(defineProps<IProps>(), {
  title: '商品总销量',
  tips: '所有商品总销量',
  number1: 52313,
  number2: 125465,
  subtitle: '商品总销量'
})

const numberRef1 = ref<HTMLElement>()
const numberRef2 = ref<HTMLElement>()
const options = {
  decimalPlaces: props.amount === 'saleroom' ? 2 : 0,
  prefix: props.amount === 'saleroom' ? '￥' : ''
}
onMounted(() => {
  const numAnim1 = new CountUp(numberRef1.value!, props.number1, options)
  const numAnim2 = new CountUp(numberRef2.value!, props.number2, options)
  numAnim1.start()
  numAnim2.start()
})
</script>

<style scoped>
.count-card {
  display: flex;
  flex-direction: column;
  height: 120px;
  justify-content: space-between;
}
.header {
  display: flex;
  justify-content: space-between;
  color: rgba(0, 0, 0, 0.45);
  align-items: flex-end;
}
.content {
  font-size: 30px;
  color: rgba(0, 0, 0, 0.85);
}
.footer {
  display: flex;
  line-height: 38px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.85);
  border-top: 1px solid #f0f0f0;
}
</style>
