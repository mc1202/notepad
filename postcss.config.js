module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    require('postcss-px-to-viewport')({
      viewportWidth: 375, // 视口宽度
      viewportHeight: 667, // 可选，视口高度
      unitPrecision: 5, // 转换后的精度
      viewportUnit: 'vw', // 使用的视口单位
      selectorBlackList: ['ignore'], // 忽略某些选择器
      minPixelValue: 1, // 小于或等于此值的 px 不转换
      mediaQuery: false, // 是否允许在媒体查询中转换 px
      replace: true, // 是否直接替换 px
      exclude: [], // 忽略某些文件夹或文件
    }),
  ],
};
