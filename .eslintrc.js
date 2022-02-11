module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
    '@vue/typescript/recommended'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  rules: {
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'generator-star-spacing': 'off', // 生成器函数*的前后空格
    'no-mixed-operators': 0, // 禁止混合使用不同的操作符
    'vue/script-setup-uses-vars': 'error',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'vue/custom-event-name-casing': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
      }
    ],
    'space-before-function-paren': 'off',
    'vue/attributes-order': 'off',
    'vue/one-component-per-file': 'off',
    // 限制每行允许的最多属性数量
    // 'vue/max-attributes-per-line': [
    //   2,
    //   {
    //     singleline: 3, // 单行允许属性数量
    //     multiline: {
    //       max: 1 // 多行允许属性数量
    //     }
    //   }
    // ],
    // 需要在多行元素的内容前后换行
    'vue/multiline-html-element-content-newline': 0,
    // 在单行元素的内容前后强制换行
    'vue/singleline-html-element-content-newline': 0,
    // html括号间距
    'vue/html-closing-bracket-spacing': 0,
    // 禁止在标签的右括号前换行
    'vue/html-closing-bracket-newline': 0,
    // 禁止解析错误<template>
    'vue/no-parsing-error': 0,
    // 禁止所有标签
    'no-tabs': 0,
    'vue/attribute-hyphenation': 0,
    // 组件名风格：kebab-case | PascalCase | camelCase
    'vue/component-name-in-template-casing': 0,
    // 报告模板中尚未使用的组件
    'vue/no-unused-components': 0,
    // 禁止在与 v-for 相同的元素上使用 v-if
    'vue/no-use-v-if-with-v-for': 0,
    'vue/require-default-prop': 'off',
    // 没有内容时，组件必须自闭和
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'never',
          component: 'always'
        },
        svg: 'always',
        math: 'always'
      }
    ],
    'vue/multi-word-component-names': 'off',
    quotes: [
      2,
      'single', // 使用单引号
      {
        avoidEscape: true, // 允许字符串使用单引号或双引号，只要字符串中包含了一个其它引号，否则需要转义
        allowTemplateLiterals: true // 允许字符串使用反勾号
      }
    ],
    semi: [
      2,
      'never', // 禁止在语句末尾使用分号
      {
        beforeStatementContinuationChars: 'never' // 如果下一句以 [、(、/、+ 或 - 开头，禁止末尾有分号
      }
    ],
    // 禁止删除变量 禁止对变量使用 delete 操作符
    'no-delete-var': 2,
    // 使用const声明
    'prefer-const': [
      2,
      {
        ignoreReadBeforeAssign: false
      }
    ],
    // 在模板字符串中强制使用间距
    'template-curly-spacing': 'off'
  }
}
