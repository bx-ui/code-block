import request from '@/utils/request'
import { IResponse } from '@/utils/type'

export interface Enterprise {
  address: string
  addressLat: string
  addressLng: string
  enterpriseMainType: number
  faceImage: string
  name: string
  [props: string]: any
}

// 列表
export function enterpriseInfoList(): Promise<
  IResponse<{
    code: number
    message: number
    model: Enterprise[]
  }>
> {
  return request.get('/v1/enterpriseInfo/list')
}
