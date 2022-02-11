export interface IResponse<data = any> {
  code: 0
  msg: string
  data: data
}

export interface NewsList {
  id: number
  title: string
  createTime: string
  updateBy: string
  publishDate: string
}
