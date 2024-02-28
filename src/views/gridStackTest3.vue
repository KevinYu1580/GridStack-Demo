<template>
  <!-- 新增功能不刪，先保留 -->
  <!-- <Button label="Add LineChart Widget" @click="addLineChartWidget()" /> -->
  <!-- <Button label="Add Guage Widget" @click="addGuageChartWidget()" /> -->

  <!-- 刪除最後編輯item不刪，先保留 -->
  <!-- <Button label="Remove Last Widget" @click="removeLastWidget()" /> -->
  <br />
  <br />

  <div class="flex gap-4">
    <Button :label="'元件漂浮: ' + gridFloat" @click="toggleFloat()" />

    <Button :label="'可拖動 :' + gridDraggable" @click="toggleDraggable()" />

    <Button :label="'可移除: ' + gridRemovable" @click="toogleRemovable()" />

    <Button :label="'Save (check console.log)'" @click="save()" />
  </div>

  <br />

  <!-- 可查看gridStack引擎及vue.data內資料，需相同才不會出錯 (開發用，上限版本需關掉) -->
  <div class="gridStackStatus" v-if="isDev">
    <b :style="{ color: color }">{{ gridInfo }}</b>
    <div>{{ info }}</div>
  </div>
  <br />

  <!-- layout元件庫 -->
  元件模板 (從此處拖曳元件至Layout)
  <div class="gridTemplateArea mb-[40px]" graggable>
    <!-- 
        gs-x: x座標 (必要)
        gs-y: x座標 (必要)
        gs-w: 寬度 (必要)
        gs-h: 高度 (必要)
        gs-id: 套件物件id(渲染用，必要)
        gs-no-resize: 是否可以调整大小 (非必要)
        key: v-for唯一key (必要)
        id: 提供給子元件的id
        data-type: 元件類型
     -->
    <div
      v-for="gridItem in templateItem"
      class="grid-stack-item"
      :class="`gridTemplateArea--${gridItem.type}`"
      :gs-x="gridItem.x"
      :gs-y="gridItem.y"
      :gs-w="gridItem.w"
      :gs-h="gridItem.h"
      :gs-id="gridItem.id"
      :gs-no-resize="'yes'"
      :key="gridItem.id"
      :id="gridItem.id"
      :data-type="gridItem.type"
    >
      <!-- 自定義元件 -->
      <GridBlock :gridItemProps="gridItem" @removeItem="removeGridItem(gridItem)" />
    </div>
  </div>

  <!-- layout -->
  Layout
  <div class="grid-stack mb-[20px]">
    <div
      v-for="gridItem in gridItems"
      class="grid-stack-item"
      :gs-x="gridItem.x"
      :gs-y="gridItem.y"
      :gs-w="gridItem.w"
      :gs-h="gridItem.h"
      :gs-id="gridItem.id"
      :id="gridItem.id"
      :key="gridItem.id"
      :gs-no-resize="'yes'"
    >
      <GridBlock :gridItemProps="gridItem" @removeItem="removeGridItem(gridItem)" />
    </div>
  </div>
</template>

<script setup>
import 'gridstack/dist/gridstack.min.css'
import { GridStack } from 'gridstack'

import { ref, onMounted, nextTick } from 'vue'

const isDev = import.meta.env.DEV // 是否為開發模式

let grid = null // gridstack instance實體
const gridItemCount = ref(0) //計算元件數量
const TemplateItemCount = ref(0) //計算模板元件數量

// 元件庫data
const templateItem = ref([
  {
    x: 0,
    y: 0,
    w: 2,
    h: 2,
    id: 'tw_' + TemplateItemCount.value++,
    type: 'guage',
    draggable: true,
    removable: true,
    inLayout: false
  },
  {
    x: 0,
    y: 2,
    w: 4,
    h: 2,
    id: 'tw_' + TemplateItemCount.value++,
    type: 'line',
    draggable: true,
    removable: true,
    inLayout: false
  }
]) // gridstack item data

// layout gridItems data
const gridItems = ref([
  {
    x: 0,
    y: 0,
    w: 2,
    h: 2,
    id: 'w_' + gridItemCount.value++,
    type: 'guage',
    draggable: true,
    removable: true,
    inLayout: true
  },
  {
    x: 0,
    y: 2,
    w: 4,
    h: 2,
    id: 'w_' + gridItemCount.value++,
    type: 'line',
    draggable: true,
    removable: true,
    inLayout: true
  }
]) // gridstack item data

const draggingItemType = ref('') // item移動信息(demo 用)

let isMakingWidget = false //紀錄是否正在新增元件

/**
 * NOTE: 掛載該頁面時初始化gridStack
 */
onMounted(() => {
  // 初始化gridstack設定
  grid = GridStack.init({
    float: gridFloat.value, // 控制grid元件是否可以浮动
    acceptWidgets: true, // 是否接受新的元件
    // cellHeight: '70px', //固定layout row高度
    minRow: 6, // 最小行数
    maxRow: 6, // 最大行数
    animate: true, //移動block item時是否有動畫
    staticGrid: false //是否可以拖動/縮放
  })

  // 設定layout template拖移至layout
  GridStack.setupDragIn('.gridTemplateArea .grid-stack-item', {
    appendTo: '.grid-stack', // 拖移至目標節點
    helper: 'clone' // 被拖移元件，拖移後不會消失
  })

  updateInfo() //更新gridStack引擎狀態資料

  // 監聽dropped事件，紀錄目前拖動的元件類型type(套件無提供此資訊，故需自行紀錄於data-type)
  grid.on('dropped', (event, element, newEl) => {
    draggingItemType.value = newEl.el.getAttribute('data-type')
  })

  // 監聽change & added事件，將畫面上位置與大小的變化同步到gridItems
  grid.on('change added', function (event, elements) {
    // console.log('change')
    // console.log('elements', elements)
    // console.log('event', event)
    updateInfo()

    elements.forEach((item) => {
      var widget = gridItems.value.find((w) => {
        return w.id == item.id
      })

      // **如果沒有找到對應的widget，則刪除
      if (!widget) {
        // 刪除gridStack引擎中的元件
        grid.removeWidget(item.id, false)

        // 連layout裡的 dom也刪除，不然會重複出現兩個相同節點(補足套件不足之處)
        document.querySelector('.grid-stack').querySelector(`#${item.id}`).remove()

        return
      }

      // 同步gridItems中的元件位置與大小
      widget.x = turnToZero(item.x)
      widget.y = turnToZero(item.y)
      widget.w = turnToZero(item.w)
      widget.h = turnToZero(item.h)
    })
  })

  // 監聽added事件，新增layout實體元件
  grid.on('added', function (event, element) {
    if (!isMakingWidget) {
      isMakingWidget = true

      const gridItemData = {
        x: turnToZero(element[0].x),
        y: turnToZero(element[0].y),
        w: turnToZero(element[0].w),
        h: turnToZero(element[0].h),

        id: 'w_' + gridItemCount.value++,
        // type為dom上data-type的值
        type: draggingItemType,
        draggable: gridDraggable.value,
        removable: gridRemovable.value,
        inLayout: true
      }

      // 將新增的元件資料存入gridItems
      gridItems.value.push(gridItemData)

      nextTick(() => {
        // 在gridStack引擎中新增元件(必要)
        grid.makeWidget(gridItemData.id)
        updateInfo()
        isMakingWidget = false
      })
    }
  })

  //將小於0的值設為0，防呆用
  function turnToZero(value) {
    // 嚴格判斷是否為-0
    value = Object.is(value, -0) ? 0 : value
    return value < 0 ? 0 : value
  }
})

/**
 * NOTE: 查看元件拖動位置
 *  * MEMO: (開發用)
 */
const info = ref('') // item移動信息
// 監聽dragStep事件，顯示套件引擎狀態
onMounted(() => {
  grid.on('dragstop', (event, element) => {
    updateInfo()
    const node = element.gridstackNode

    //查看最後一個拖移的元件位置
    info.value = `剛剛已將 #${node.id} 拖動到了 X:${node.x}, Y:${node.y}`
  })
})

/**
 * NOTE: 查看gridStack引擎及vue.data內資料，需相同才不會出錯\
 * MEMO: (開發用)
 */
const color = ref('black') // 警示顏色
const gridInfo = ref('') // gridStack引擎狀態資料
// 更新套件引擎item數量
function updateInfo() {
  color.value = grid.engine.nodes.length == gridItems.value.length ? 'black' : 'red'
  gridInfo.value = `Grid engine: ${grid.engine.nodes.length},  widgets(vue.data): ${gridItems.value.length}`
}

/**
 * NOTE: 儲存及發送api
 */
function save() {
  let gridItem = JSON.parse(JSON.stringify(gridItems.value))
  console.log('gridItem', gridItem)
}

/**
 * NOTE: 控制grid元件是否可以浮动
 */
const gridFloat = ref(true)
function toggleFloat() {
  gridFloat.value = !gridFloat.value
  grid.float(gridFloat.value)
}

/**
 * NOTE:  控制grid元件是否可以拖动
 */
const gridDraggable = ref(true)
function toggleDraggable() {
  gridDraggable.value = !gridDraggable.value
  grid.setStatic(!gridDraggable.value) // 設定grid引擎
}

/**
 * NOTE: 控制grid元件是否可以刪除
 */
const gridRemovable = ref(true)
function toogleRemovable() {
  gridRemovable.value = !gridRemovable.value

  // 更新gridItems.removable
  gridItems.value.forEach((item) => {
    item.removable = gridRemovable.value
  })
}

/**
 * NOTE: 新增元件功能
 * Memo: 先保留，未來可能用到
 */
// function addLineChartWidget() {
//   const gridItemData = {
//     x: 0,
//     y: 0,
//     w: 4,
//     h: 2,
//     id: 'w_' + gridItemCount.value++,
//     type: 'line',
//     draggable: gridDraggable.value,
//     removable: gridRemovable.value
//   }

//   const node = gridItems[gridItemCount.value] || gridItemData

//   gridItems.value.push(node)
//   nextTick(() => {
//     grid.makeWidget(node.id)
//     updateInfo()
//   })
// }

/**
 * NOTE: 新增元件功能
 * Memo: 先保留，未來可能用到
 */
// function addGuageChartWidget() {
//   const gridItemData = {
//     x: 0,
//     y: 0,
//     w: 2,
//     h: 2,
//     id: 'w_' + gridItemCount.value++,
//     type: 'guage',
//     draggable: gridDraggable.value,
//     removable: gridRemovable.value
//   }

//   const node = gridItems[gridItemCount.value] || gridItemData

//   gridItems.value.push(node)
//   nextTick(() => {
//     grid.makeWidget(node.id)
//     updateInfo()
//   })
// }

/**
 * NOTE: 刪除最後新增item
 * Memo: 先保留，未來可能用到
 */
// function removeLastWidget() {
//   if (gridItemCount.value == 0) return
//   var id = `w_${gridItemCount.value - 1}`
//   var index = gridItems.value.findIndex((w) => w.id == id)
//   if (index < 0) return
//   var removed = gridItems.value[index]
//   removeGridItem(removed)
// }

/**
 * NOTE: 刪除grid item
 */
function removeGridItem(widget) {
  var index = gridItems.value.findIndex((w) => w.id == widget.id)
  gridItems.value.splice(index, 1)
  const selector = `#${widget.id}`

  grid.removeWidget(selector, false)
  updateInfo()
}
</script>

<style lang="scss" scoped>
.gridStackStatus {
  position: fixed;
  right: 0;
  top: 0;
  z-index: 10;
  background-color: rgb(244, 244, 244);
  border: 1px solid rgb(199, 0, 0);
  padding-left: 8px;
}

$gridItemRadious: 20px;
.grid-stack {
  background: lightgoldenrodyellow;
}
// 拖動時的灰色底框框
:deep(.grid-stack-placeholder) {
  * {
    border-radius: $gridItemRadious !important;
    overflow: hidden !important;
  }
}

.grid-stack-item-content {
  color: #2c3e50;
  text-align: center;
  background-color: #ffffff;
  border-radius: $gridItemRadious;
}

// layout元件庫
.gridTemplateArea {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  width: 100%;
  height: fit-content;
  background-color: rgb(221, 249, 240);

  padding: 10px;
  .gridTemplateArea--line {
    width: 520px;
    height: fit-content;
  }
  .gridTemplateArea--guage {
    width: 267px;
    height: fit-content;
  }
}
</style>
