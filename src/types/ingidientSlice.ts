import { Ingridient } from './ingridient'

export interface IngridientsData {
  success: boolean
  data: Ingridient[]
}

export interface IngridientSlice {
  loading: boolean
  error: string | null | undefined
  ingridientList: Array<Ingridient>
  inConstructor: Array<Ingridient>
  ingridientData: IngridientsData | {}
  order: IncomingOrder
  orderError: string | null | undefined
  orderLoading: boolean
}

export interface OutcomingOrder {
  ingredients: string[]
}

export interface IncomingOrder {
  name: string
  order: {
    number: number
  }
  sucess: boolean
}
