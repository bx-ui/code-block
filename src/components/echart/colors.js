import * as echarts from 'echarts'
export const colors = [
  '#02CDE6',
  '#E6ab4d',
  '#54CFA3',
  '#098DF8',
  '#06B75E',
  '#FF9900',
  '#2db7f5',
  '#02CDE6',
  '#54CFA3'
]

const barLinearGradients = [...colors]
export function generateBarLinearGradient(index) {
  return barLinearGradients[index]
}

const lineFillLinearGradients = [
  '#00000000',
  '#00000000',
  '#00000000',
  '#00000000',
  '#00000000',
  '#00000000'
]
export function generateLineFillLinearGradient(index) {
  return lineFillLinearGradients[index]
}

export const pieLinearColors = ['#365CB4', '#2299F9', '#30C0E4', '#92E0DC', '#D6F5DE']
const pieLinearGradients = [
  // blue
  new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    { offset: 0, color: pieLinearColors[0] },
    { offset: 1, color: pieLinearColors[0] }
  ]),
  // green
  new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    { offset: 0, color: pieLinearColors[1] },
    { offset: 1, color: pieLinearColors[1] }
  ]),
  // orange
  new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    { offset: 0, color: pieLinearColors[2] },
    { offset: 1, color: pieLinearColors[2] }
  ]),
  // blue
  new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    { offset: 0, color: pieLinearColors[3] },
    { offset: 1, color: pieLinearColors[3] }
  ]),
  // green
  new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    { offset: 0, color: pieLinearColors[4] },
    { offset: 1, color: pieLinearColors[4] }
  ])
]
export function generatePieLinearGradients(index) {
  return pieLinearGradients[index]
}

export const textColor = 'rgba(23,35,61,0.75)'

export const splitLineColor = '#E8EAEC'
