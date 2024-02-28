<template>
  <button @click="addNewWidget()">Add Widget</button>

  <div class="grid-stack"></div>
</template>

<script setip>
// grid stack套件
import 'gridstack/dist/gridstack.min.css'
import { GridStack } from 'gridstack'

export default {
  components: {},

  data() {
    return {
      count: 2,
      items: [
        { x: 0, y: 0, w: 2, h: 2, content: '<div @click="testFunc()">test</div>' },
        { x: 2, y: 0, w: 2, content: '2' }
      ],
      options: {
        float: false
      }
    }
  },

  methods: {
    testFunc() {
      console.log('test')
    },
    initGrid() {
      let self = this
      this.grid = GridStack.init(self.options).load(self.items)
    },
    addNewWidget() {
      let self = this
      self.count++
      var node = {
        // x: Math.round(12 * Math.random()),
        // y: Math.round(5 * Math.random()),
        // w: Math.round(1 + 3 * Math.random()),
        // h: Math.round(1 + 3 * Math.random()),
        x: 0,
        y: 0,
        w: 2,
        h: 2,
        content: String(self.count)
      }
      this.grid.addWidget(node)
      //   return false
    }
  },
  computed: {},
  mounted() {
    this.initGrid()

    this.grid = GridStack.init(this.options)
  }
}
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
