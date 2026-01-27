export interface IVaListItem {
  code: string
  name: string
  country: string
  is_Activated: boolean
  fee: number
}

export interface IVaListMeta {
  status: boolean
  message: string
  totalItem: number
}

export interface IVaListResponse {
  data: IVaListItem[]
  meta: IVaListMeta
}
