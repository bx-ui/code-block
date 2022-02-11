// prettier配置清单
// https://prettier.io/docs/en/index.html
module.exports = {
  printWidth: 100, // 一行最大100个字符
  semi: false, // 行末分号
  vueIndentScriptAndStyle: true,
  singleQuote: true, // 单引号
  trailingComma: 'none', // 末尾尾随逗号
  proseWrap: 'never', // 折行标准
  htmlWhitespaceSensitivity: 'strict', // vue >
  endOfLine: 'auto', // 行尾换行格式
  // tabWidth: 2, // 缩进
  useTabs: false, // 使用tab还是空格
  insertPragma: false, // 在文件顶部插入一个特殊的 @format 标记，指定文件格式需要被格式化
  bracketSpacing: true, // 在对象文字中打印括号之间的空格
  jsxSingleQuote: false, // JSX双引号
  jsxBracketSameLine: false, // > 标签放在最后一行的末尾，而不是单独放在下一行
  arrowParens: 'avoid' // 箭头圆括号
}
