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
  order: { ingridients: Array<Ingridient> }
}
