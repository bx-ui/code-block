import axios from 'axios'
import { IResponse } from './type'

const axiosHttp = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  //超时时间
  timeout: 30000
  // withCredentials: true,
})

// 请求拦截
axiosHttp.interceptors.request.use(config => {
  return config
})

// 返回拦截
axiosHttp.interceptors.response.use(
  res => {
    if (res.config.responseType && res.config.responseType !== 'json') {
      return Promise.resolve(res.data)
    }
    if (res.data?.code !== 0) {
      return Promise.reject(new NetworkError(res.data?.message, res.data))
    }

    return Promise.resolve(res.data)
  },
  () => {
    return Promise.reject(new NetworkError())
  }
)

class NetworkError extends Error {
  constructor(msg = '网络请求异常，请稍后重试!', response?: IResponse) {
    super()
    this.message = msg
    this.response = response
  }

  name = 'NetworkError'
  response?: IResponse
}

export default axiosHttp
