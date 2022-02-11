import request from '@/utils/request'
import { IResponse } from '@/utils/type'

// 概览头部数据
export interface Statistics {
  cumulativeValue: number // 全市累计产值
  yearOnYearGrowth: number // 全市累计产值同比增速
  industrialOutput: number // 全市累计工业增加值
  enterprisesNumber: number // 全市规上企业数量
  enterprisesNumberGrowth: number // 全市规上企业同比增速
}
export function surveyStatistics(): Promise<
  IResponse<{
    code: number
    msg: number
    data: Statistics
  }>
> {
  return request.get('/v1/survey/statistics')
}

// 园区产值情况
export interface ParkList {
  growthRate: number // 增速
  outputValue: string // 园区工业产值
  parkName: string // 园区名称
  serialNumber: number // 序号
}

export function surveyParkList(): Promise<
  IResponse<{
    code: number
    msg: number
    data: ParkList[]
  }>
> {
  return request.get('/v1/survey/getOutValueOfPark')
}

// 园区规上企业数量
export interface EnterprisesNumber {
  enterprisesNumber: number // 企业个数
  parkName: string // 园区名称
  serialNumber: number // 序号
}

export function surveyEnterprisesNumberList(): Promise<
  IResponse<{
    code: number
    msg: number
    data: EnterprisesNumber[]
  }>
> {
  return request.get('/v1/survey/enterprisesNumber')
}

// N大产业产值
export interface Panorama {
  currentValue: string // 当月产值(亿元)
  thisYearValue: string // 累计产值（亿元）
  currentMonthPercentage: string // 当月百分比
  cumulativePercentage: string // 累计百分比
}

export function industrialPanoramaPanoramaList(): Promise<
  IResponse<{
    code: number
    msg: number
    data: Panorama
  }>
> {
  return request.get('/v1/industrialPanorama/panorama')
}

// N大产业企业数量
export interface PanoramaEnterprisesNumber {
  enterprisesNumber: number // 企业个数
  industryName: string // 产业名称
  serialNumber: number // 序号
}

export function industrialPanoramaEnterprisesNumberList(): Promise<
  IResponse<{
    code: number
    msg: number
    data: PanoramaEnterprisesNumber[]
  }>
> {
  return request.get('/v1/industrialPanorama/enterprisesNumber')
}

// N大产业主营业务收入
export interface BusinessIncome {
  thisYearValue: number // 今年累计产值
  industryName: string // 产业名称
  serialNumber: number // 序号
  growthRate: number // 增速
}

export function industrialPanoramaBusinessIncomeList(): Promise<
  IResponse<{
    code: number
    msg: number
    data: BusinessIncome[]
  }>
> {
  return request.get('/v1/industrialPanorama/businessIncome')
}

// 主导产业详情
export interface IndustrialPanoramaDetails {
  industryProfile: number // 产业简介
  lastYearValue: number // 去年累计产值
  thisYearValue: number // 今年累计产值
  keyEnterprisesVoList: KeyEnterprises[]
  keyProjectsVoList: KeyProjects[]
}
export interface KeyEnterprises {
  enterprisesName: string // 企业名称
  industryName: string // 行业名称
  serialNumber: number // 序号
}
export interface KeyProjects {
  industryName: string // 行业名称
  projectName: string // 项目名称
  serialNumber: number // 序号
}

export function industrialPanoramaDetailsList(params: { industryName: string }): Promise<
  IResponse<{
    code: number
    msg: number
    data: IndustrialPanoramaDetails[]
  }>
> {
  return request.get('/v1/industrialPanorama/details', { params })
}

// 企业列表
export interface EnterpriseList {
  address: number // 地址
  addressLat: string // lat
  addressLng: number // lng
  enterpriseMainType: number // 规上企业类型
  faceImage: string // 图片地址
  name: string // 企业名称
  number: string // 编号
  ownerIndustry: string // 所属行业
  registerCapital: string // 注册资本
  operateGarden: string // 所在园区
  operateRegion: string // 所在区县
  capitalType: string // 资本类型
  enterpriseType: string // 组织类型
  linkman: string // 联系人
  linkphone: string // 联系电话
  industryName: string // 主导产业
  businessName: string // 国民经济行业
  businessRange: string // 主营业务
  enterprisesCategory: string // 公司类型
}

export function enterpriseInfoList(): Promise<
  IResponse<{
    code: number
    msg: number
    data: EnterpriseList[]
  }>
> {
  return request.get('/v1/enterpriseInfo/list')
}
// export function revokeNews(params: { newId: NewsList['id'] }): Promise<IResponse> {
//   return request.post('/newsManage/admin/withdrawNews/v1', { ...params })
// }

// export function newsDetail(params: { id: NewsInfo['id'] }): Promise<IResponse<NewsInfo>> {
//   return request.get('/newsManage/admin/getNewsManageInfo/v1', { params })
// }
