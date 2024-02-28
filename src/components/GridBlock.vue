<template>
  <div
    class="grid-stack-item-content"
    :class="{ 'grid-stack-item-content--draggable': gridItemProps.draggable }"
  >
    <div class="content__itemIDr" v-if="isDev">
      {{ gridItemProps.id }}
    </div>

    <!-- 移除元件按鈕 -->
    <button
      v-show="gridItemProps.removable && gridItemProps.inLayout"
      class="gsItem__removeBtn"
      @click="$emit('removeItem')"
    >
      X
    </button>

    <div :id="'chart_' + gridItemProps.id" class="content__chartWrapper"></div>
  </div>
</template>

<script setup>
import { defineProps, onMounted, nextTick } from 'vue'

// echart
import * as echarts from 'echarts'

const isDev = import.meta.env.DEV // 是否為開發模式

const props = defineProps({
  gridItemProps: {
    type: [Object],
    required: true
  }
})

// 圓規圖表參數(echart)
let guageChartSet = {
  renderOption: {
    height: 250 //固定組件高度
  },

  chartOption: {
    series: [
      {
        type: 'gauge',
        progress: {
          show: true,
          width: 8
        },
        axisLine: {
          lineStyle: {
            width: 8
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          width: 8,
          distance: 3,
          length: 6,
          lineStyle: {
            width: 2,
            color: '#999'
          }
        },
        axisLabel: {
          distance: 16,
          color: '#999',
          fontSize: 6
        },
        anchor: {
          show: true,
          showAbove: true,
          size: 6,
          itemStyle: {
            borderWidth: 2
          }
        },
        title: {
          show: false
        },
        detail: {
          valueAnimation: true,
          fontSize: 8,
          offsetCenter: [0, '70%']
        },
        data: [
          {
            value: 70
          }
        ]
      }
    ]
  }
}

// 折現圖表參數(echart)
let lineChartSet = {
  renderOption: {
    renderer: 'canvas',
    useDirtyRect: false,
    height: 260 //固定組件高度
  },
  chartOption: {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['t1', 't2', 't3']
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line',
        name: 't1'
      },
      {
        data: [100, 200, 400, 230, 190, 120, 90],
        type: 'line',
        name: 't2'
      },
      {
        data: [200, 400, 420, 380, 390, 400, 370],
        type: 'line',
        name: 't3'
      }
    ]
  }
}

onMounted(() => {
  nextTick(() => {
    const dom = document.getElementById('chart_' + props.gridItemProps.id)

    let myChart = null
    let chartOption = null
    // 判斷圖表類型，並設定圖表參數
    if (props.gridItemProps.type === 'guage') {
      myChart = echarts.init(dom, null, guageChartSet.renderOption)
      chartOption = guageChartSet.chartOption
    }
    if (props.gridItemProps.type === 'line') {
      myChart = echarts.init(dom, null, lineChartSet.renderOption)
      chartOption = lineChartSet.chartOption
    }

    if (chartOption && typeof chartOption === 'object') {
      myChart.setOption(chartOption)
    }

    // 監聽視窗變化，重新繪製圖表
    window.addEventListener('resize', myChart.resize)
  })
})
</script>

<style lang="scss" scoped>
.chartContainer {
  //   height: 100%;
}
.grid-stack-item-content--draggable {
  cursor: move;
}

.grid-stack-item-content {
  position: relative;
  .gsItem__removeBtn {
    position: absolute;
    top: 4px;
    right: 8px;
    z-index: 1;
    // color: white;
    cursor: pointer;
  }
  .content__itemIDr {
    position: absolute;
    top: 4px;
    left: 8px;
    z-index: 1;
    // color: white;
    background-color: #e8e8e8;
    outline: 1px solid hsl(0, 60%, 55%);
    cursor: pointer;
  }
}
</style>
