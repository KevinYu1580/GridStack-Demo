## KB連結

http://192.168.50.109/kanboard-1.2.8/?controller=TaskViewController&action=show&task_id=2030&project_id=141

## 專案起始&下載模組

```bash
yarn install
```

or

```bash
yarn -i
```

## 運行指令

```bash
yarn dev
```

## 如何打包

```bash
yarn build
```

## 專案建置工具 & 前端框架

[Vite](https://cn.vitejs.dev/guide/) + [Vue](https://cn.vuejs.org/guide/introduction.html)

## 包管理器

[Yarn](https://yarnpkg.com/)

## UI框架

[PrimeVue](https://primevue.org/)

## 依賴套件

- [echarts](https://echarts.apache.org/zh/index.html): ^5.4.3 圖表套件
- [gridstack](https://gridstackjs.com/): ^10.1.0 儀錶板組件drag套件
- [pinia](https://pinia.vuejs.org/zh/introduction.html): ^2.1.7 狀態管理器
- [primevue](https://primevue.org/introduction/): ^3.48.1 UI元件框架
- [vue](https://cn.vuejs.org/guide/introduction.html): ^3.4.15 前端框架
- [vue-router](https://router.vuejs.org/zh/introduction.html): ^4.2.5 路由管理器

## 開發工具

- eslint: ^8.49.0
- eslint-plugin-vue: ^9.17.0
- prettier: ^3.0.3
- sass: ^3.0.3 sass套件
- sass-loader: ^14.1.0 sass編譯器
- [tailwindcss](https://tailwindcss.com/docs/installation): ^3.4.1 tailwind套件
- [unplugin-vue-components](https://www.npmjs.com/package/unplugin-vue-components): ^0.26.0 自動引入組件工具
- [vite](https://cn.vitejs.dev/guide/): ^5.0.11 專案建置工具

## 資料夾架構圖

資料夾架構圖由[mddir](https://www.npmjs.com/package/mddir)產生

```

    |-- .eslintrc.cjs        #設定gitignore
    |-- .prettierrc.json        #prettier設定檔
    |-- components.d.ts     #unplugin-vue-components(套件)產生的檔案
    |-- index.html      #prettier設定檔
    |-- jsconfig.json       #js編輯設定
    |-- package.json        #模組管理json
    |-- README.md
    |-- tailwind.config.js      #tailwind設定檔
    |-- vite.config.js      #vite設定檔
    |-- yarn.lock
    |-- .vscode     #VScode套件管理json
    |   |-- extensions.json
    |-- dist        #打包輸出檔案
    |   |-- favicon.ico
    |   |-- index.html
    |   |-- assets
    |       |-- AboutView-C6Dx7pxG.css
    |       |-- AboutView-DPjWoP8b.js
    |       |-- index-BKY5TRLy.js
    |       |-- index-BTunN8KN.css
    |-- public      #存放favicon
    |   |-- favicon.ico
    |-- src     #專案主要資源
    |   |-- App.vue     #主要vue檔
    |   |-- main.js     #js掛載
    |   |-- assets      #存放靜態資源
    |   |   |-- main.css
    |   |   |-- font        #字體檔案
    |   |   |   |-- NotoSansTC-Black.ttf
    |   |   |   |-- NotoSansTC-Bold.ttf
    |   |   |   |-- NotoSansTC-ExtraBold.ttf
    |   |   |   |-- NotoSansTC-ExtraLight.ttf
    |   |   |   |-- NotoSansTC-Light.ttf
    |   |   |   |-- NotoSansTC-Medium.ttf
    |   |   |   |-- NotoSansTC-Regular.ttf
    |   |   |   |-- NotoSansTC-SemiBold.ttf
    |   |   |   |-- NotoSansTC-Thin.ttf
    |   |   |-- img         #圖片及svg
    |   |   |   |-- background      #存放背景圖(ex. welcome背景)
    |   |   |   |-- icon        #存放icon(依照組件分類)
    |   |   |   |   |-- BreadCrumb
    |   |   |   |   |-- Header
    |   |   |   |   |-- Inputs
    |   |   |   |   |-- Popup
    |   |   |   |   |-- SideBar
    |   |   |   |   |-- Table
    |   |   |   |   |-- Others      #存放組件以外的icon
    |   |   |-- scss        #存放scss檔案
    |   |   |   |-- _font.scss      #設定字體(ex. font-face)
    |   |   |   |-- _mixin.scss     #設定mixin
    |   |   |   |-- _var.scss       #設定scss變數
    |   |   |   |-- base
    |   |   |       |-- _base.scss      #將所有全域scss集中並引入至專案(於vite.config引入)
    |   |   |-- tailwindSrcCss      #tailwind css檔管理
    |   |       |-- input.css       #輸入給tailwind編譯
    |   |       |-- output.css      #經編譯後的css檔(於main.js套用至全域)
    |   |-- components      #存放所有vue組件(可依照組件類別再分類)
    |   |   |-- GridBlock.vue
    |   |   |-- GridContentComponent.vue
    |   |-- router      #路由器
    |   |   |-- index.js
    |   |-- stores      #Pinia
    |   |   |-- counter.js
    |   |-- views       #存放所有page組件
    |       |-- eChartTest.vue
    |       |-- gridStackTest.vue
    |       |-- gridStackTest2.vue
    |       |-- gridStackTest3.vue
    |       |-- HomeView.vue
    |       |-- PrimeVueTest.vue
    |-- utils       #存放自定義的js funciton
        |-- service.js

```

## component map

待補
