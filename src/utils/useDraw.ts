import { ref } from 'vue'

export default function useDraw() {
  // * 指向最外层容器
  const appRef = ref()
  // * 定时函数
  const timer = ref(0)
  // * 默认缩放值
  // const scale = {
  //   width: '1',
  //   height: '1'
  // }
  // * 设计稿尺寸（px）16:9
  const baseWidth = 1920
  const baseHeight = 1080

  // * 需保持的比例（默认1.77778）
  // const baseProportion = parseFloat((baseWidth / baseHeight).toFixed(5))
  const calcRate = () => {
    // const baseWidth = document.documentElement.clientWidth
    // const baseHeight = document.documentElement.clientHeight
    // const appStyle = document.getElementById('app').style
    // const realRatio = baseWidth / baseHeight
    // const designRatio = 16 / 9
    // let scaleRate = baseWidth / 1920
    // if (realRatio > designRatio) {
    //   scaleRate = baseHeight / 1080
    // }
    // appStyle.transformOrigin = 'left top'
    // appStyle.transform = `scale(${scaleRate}) translateX(-50%)`
    // appStyle.width = `${baseWidth / scaleRate}px`

    const bodyNode = document.body || document.documentElement
    const htmlNode = document.getElementsByTagName('html')[0]
    // const realRatio = htmlNode.offsetWidth / htmlNode.offsetHeight
    // const designRatio = 16 / 9
    // console.log(htmlNode.offsetWidth, htmlNode.offsetHeight, realRatio, designRatio)
    const scaleW = getScale(baseWidth, htmlNode.offsetWidth)
    const scaleH = getScale(baseHeight, htmlNode.offsetHeight)

    // let scaleRate = htmlNode.offsetWidth / baseWidth
    // if (realRatio > designRatio) {
    //   scaleRate = htmlNode.offsetHeight / baseHeight
    // }
    // const appStyle = document.getElementById('app').style
    bodyNode.style.width = baseWidth + 'px'
    bodyNode.style.height = baseHeight + 'px'
    bodyNode.style.overflow = 'hidden'
    bodyNode.style.transformOrigin = 'left top'
    // appStyle.transformOrigin = 'left top'
    // appStyle.transform = `scale(${scaleRate})`
    // appStyle.width = `${htmlNode.offsetWidth / scaleRate}px`
    bodyNode.style.transform = `translateZ(0) scale(${scaleW}, ${scaleH})`
    // 当前宽高比
    // const currentRate = parseFloat((window.innerWidth / window.innerHeight).toFixed(5))
    // if (appRef.value) {
    //   if (currentRate > baseProportion) {
    //     // 表示更宽
    //     scale.width = ((window.innerHeight * baseProportion) / baseWidth).toFixed(5)
    //     scale.height = (window.innerHeight / baseHeight).toFixed(5)
    //     appRef.value.style.transform = `scale(${scale.width}, ${scale.height}) translate(-50%, -50%)`
    //   } else {
    //     // 表示更高
    //     scale.height = (window.innerWidth / baseProportion / baseHeight).toFixed(5)
    //     scale.width = (window.innerWidth / baseWidth).toFixed(5)
    //     appRef.value.style.transform = `scale(${scale.width}, ${scale.height}) translate(-50%, -50%)`
    //   }
    // }
  }

  // const refreshScale = () => {
  //   const baseWidth = document.documentElement.clientWidth
  //   const baseHeight = document.documentElement.clientHeight
  //   const appStyle = document.getElementById('app').style
  //   const realRatio = baseWidth / baseHeight
  //   const designRatio = 16 / 9
  //   let scaleRate = baseWidth / 1920
  //   if (realRatio > designRatio) {
  //     scaleRate = baseHeight / 1080
  //   }
  //   appStyle.transformOrigin = 'left top'
  //   appStyle.transform = `scale(${scaleRate}) translateX(-50%)`
  //   appStyle.width = `${baseWidth / scaleRate}px`
  // }

  const getScale = (oSize, cSize) => {
    const scale = cSize / oSize + 0
    // scale = scale > 1 ? 1 : scale
    return scale
  }

  const resize = () => {
    clearTimeout(timer.value)
    timer.value = window.setTimeout(() => {
      calcRate()
    }, 200)
  }

  // 改变窗口大小重新绘制
  const windowDraw = () => {
    window.addEventListener('resize', resize)
  }

  // 改变窗口大小重新绘制
  const unWindowDraw = () => {
    window.removeEventListener('resize', resize)
  }

  return {
    appRef,
    calcRate,
    windowDraw,
    unWindowDraw
  }
}
