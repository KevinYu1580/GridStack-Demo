/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  // 表示此文件是ESLint配置的根目錄，不應該再加載其他的配置文件。
  root: true,

  // 環境設定定義了哪些全局變量是可用的。
  env: {
    node: true // 定義Node.js環境中可用的變量。
  },

  // 指定配置從哪一組基本規則中擴展。
  extends: [
    'plugin:vue/vue3-essential', // 來自eslint-plugin-vue的Vue3的基本規則集。
    'eslint:recommended', // 一組來自ESLint的推薦規則。
    'plugin:prettier/recommended', // 整合了eslint-plugin-prettier和eslint-config-prettier。幫助將prettier作為ESLint規則運行。
    'prettier' // 關閉可能與Prettier衝突或不必要的ESLint規則。
  ],

  // 指定解析器選項。
  // parserOptions: {
  //   parser: '@babel/eslint-parser', // 使用babel-eslint解析器。
  //   requireConfigFile: false // 這意味著對於linting，babel-eslint不需要Babel配置文件。
  // },

  // 規則指定哪些代碼片段被視為錯誤、警告或被忽略。
  rules: {
    // allow async-await
    'generator-star-spacing': 'off', // 關閉 generator 函數中 * 的空格檢查

    // 允許無括號的箭頭函數
    'arrow-parens': 'off', // 關閉箭頭函數的參數括號檢查

    'one-var': 'off', // 關閉單個 var 宣告檢查 // 不用

    'no-void': 'off', // 允許使用 void 運算符 // 不用

    'multiline-ternary': 'off', // 關閉多行三元運算符檢查 // 不用

    // 'space-before-function-paren': ['error', 'never'], // 函數括號前禁止有空格  // 要用
    'space-before-function-paren': 'off',
    'no-trailing-spaces': 'off', // 關閉行尾空白檢查 // 不用

    'no-irregular-whitespace': 'off', // 關閉不規則空白檢查 // 不用

    'dot-notation': 'off', // 關閉物件屬性存取必須使用點號的檢查 // 不用

    'import/first': 'off', // 關閉導入語句必須在文件頂部的檢查 // 不用
    'import/named': 'off', // 要求命名的導入匹配導出的名稱  // 要用
    'import/namespace': 'off', // 確保導入的命名空間存在於導出的文件中 // 要用
    'import/default': 'off', // 確保默認導入匹配一個導出的默認值 // 要用
    'import/export': 'off', // 確保一個文件中的導入和導出不重複  // 要用
    'import/extensions': 'off', // 關閉導入文件必須帶文件擴展名的檢查 // 不用
    'import/no-unresolved': 'off', // 關閉未解析的導入檢查  // 不用
    'import/no-extraneous-dependencies': 'off', // 關閉禁止導入不在 package.json 依賴中的包的檢查 // 要用

    'prefer-promise-reject-errors': 'off', // 關閉 Promise 拒絕時必須返回 Error 的檢查 // 不用

    'vue/multi-word-component-names': 'error', // 關閉 Vue 組件名必須為多詞的檢查 // 要用
    'vue/no-reserved-component-names': 'off', // 關閉 Vue 組件名不能使用保留字的檢查 // 不用
    'vue/no-v-for-template-key': 'error', // 關閉 Vue 模板中 v-for 使用 key 的檢查 // 要用

    // allow debugger during development only
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off', // 生產環境中不使用debugger。
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off' // 生產環境中不使用console日誌。
    // "no-use-before-define": [2, "nofunc"], //變數是否一定要宣告賦值
    // "comma-spacing": [
    //     2,
    //     {
    //         //  關於 , 的規則，前後是否有空格
    //         before: false,
    //         after: true,
    //     },
    // ],
    // "key-spacing": [
    //     1,
    //     {
    //         // 關於 key 的 ":" 前後是否有空格
    //         beforeColon: false,
    //         afterColon: true,
    //     },
    // ],
    // "import/first": [0], // 雖說 import 都會先 Hoisting，在這些行數中間可否插入其他的變數或是函式

    // "vue/multi-word-component-names": "off", // 關閉 multi-word 组件名規則
    // quotes: ["error", "double"], // 強制使用雙引號。
    // "prettier/prettier": [
    //     // 配置prettier設定。
    //     "error",
    //     {
    //         singleQuote: false, // 使用雙引號，而不是單引號。
    //         semi: true, // 總是使用分號。
    //         trailingComma: "none", // 沒有尾隨的逗號。
    //     },
    // ],
    // "no-console": process.env.NODE_ENV === "production" ? "warn" : "off", // 生產環境中不使用console日誌。
    // "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off", // 生產環境中不使用debugger。
  }
}
