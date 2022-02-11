import { defineComponent } from 'vue'
import "./index.scss"
// 声明类型
const PropsType = {
  
} as const

export type ColorBlockType = {
  color: string,
  name: "龙头企业" | "重点企业" | "规上企业",
  id?: number,
}

// 定义主体
export default defineComponent({
  props: PropsType,
  functional: true,
  setup() {

    const list: ColorBlockType[] = [
      {
        color: '#04B65E',
        name: '龙头企业',
        id: 1
      },
      {
        color: '#FE9A01',
        name: '重点企业',
        id: 2
      },
      {
        color: '#FE3399',
        name: '规上企业',
        id: 3
      }
    ]

    return () => {
      return (
        <div class="function-bg">
          {
            list.map(v => {
              return (
                <div>
                  <div class="block" style={{ background: v.color }}></div>
                  <div>{ v.name }</div>
                </div>
              )
            })
          }
        </div>
      )
    }
  }
})

