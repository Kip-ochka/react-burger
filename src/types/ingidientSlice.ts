import { Ingridient } from './ingridient'

export interface IngridientsData {
  success: boolean
  data: Ingridient[]
}

export interface IngridientSlice {
  loading: boolean
  error: string | null | undefined
  ingridientList: Ingridient[] | []
  inConstructor: Ingridient[] | []
  ingridientData: IngridientsData
  order: { ingridients: Ingridient[] } | { ingridients: [] }
}
