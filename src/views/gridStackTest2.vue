<template>
  <h1>Vue3: Gridstack Controls Vue Rendering Grid Item Content</h1>

  <button type="button" @click="addNewWidget()">Add Widget</button> {{ info }}
  <div class="grid-stack"></div>
</template>

<script setup>
import 'gridstack/dist/gridstack.min.css'
import { GridStack } from 'gridstack'
import GridContentComponent from '@/components/GridContentComponent.vue'

import { ref, onMounted, h, render, watch } from 'vue'

let info = ref('')
let grid = null // DO NOT use ref(null) as proxies GS will break all logic when comparing structures... see https://github.com/gridstack/gridstack.js/issues/2115
const items = [
  { id: 1, x: 2, y: 1, h: 2 },
  { id: 2, x: 2, y: 4, w: 3 },
  { id: 3, x: 4, y: 2 },
  { id: 4, x: 3, y: 1, h: 2 },
  { id: 5, x: 0, y: 6, w: 2, h: 2 }
]
let count = ref(items.length)

onMounted(() => {
  grid = GridStack.init({
    // DO NOT user grid.value = GridStack.init(), see above
    float: true,
    cellHeight: '70px',
    minRow: 1,
    columnOpts: {
      layout: 'move' // 自动布局
    }
  })

  grid.on('added', (event, items) => {
    for (const item of items) {
      const itemEl = item.el
      const itemElContent = itemEl.querySelector('.grid-stack-item-content')

      const itemId = item.id

      // Use Vue's render function to create the content
      // See https://vuejs.org/guide/extras/render-function.html#render-functions-jsx
      //      Supports: emit, slots, props, attrs, see onRemove event below
      const itemContentVNode = h(GridContentComponent, {
        itemId: itemId
        // onRemove: (itemId) => {
        //   grid.removeWidget(itemId)
        // }
      })

      // Render the vue node into the item element
      render(itemContentVNode, itemElContent)
    }
  })

  grid.on('removed', (event, items) => {
    for (const item of items) {
      const itemEl = item.el
      const itemElContent = itemEl.querySelector('.grid-stack-item-content')
      // Unmount the vue node from the item element
      // Calling render with null will allow vue to clean up the DOM, and trigger lifecycle hooks
      render(null, itemElContent)
    }
  })

  grid.load(items)
})

function addNewWidget() {
  const node = items[count.value] || {
    x: Math.round(12 * Math.random()),
    y: Math.round(5 * Math.random()),
    w: Math.round(1 + 3 * Math.random()),
    h: Math.round(1 + 3 * Math.random())
  }
  node.id = String(count.value++)
  grid.addWidget(node)
}

watch(info, (newValue) => {
  // 在嵌套的属性变更时触发
  // 注意：`newValue` 此处和 `oldValue` 是相等的
  // 因为它们是同一个对象！
  if (newValue.length === 0) return

  window.clearTimeout(this.timerId)
  this.timerId = window.setTimeout(() => {
    this.info = ''
  }, 2000)
})
</script>

<style scoped lang="scss">
.grid-stack {
  background: lightgoldenrodyellow;
}

:deep(.grid-stack-item-content) {
  color: #2c3e50;
  text-align: center;
  background-color: #18bc9c;
}
</style>
