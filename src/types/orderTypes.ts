export interface IncomingOrder {
  ingredients: string[]
}

export interface OutcomingOrder {
  name: string
  order: {
    number: number
  }
  sucess: boolean
}

export interface OrderSlice {
  orderLoading: boolean
  orderError: string | null | undefined
  order: OutcomingOrder
}
