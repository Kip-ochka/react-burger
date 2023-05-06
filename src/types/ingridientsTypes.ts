import { Ingridient } from './ingridient'

export interface IngridientsSlice {
  loading: boolean
  error: string | null | undefined
  ingredients: Array<Ingridient>,
  ingredientsToPage: Ingridient | null,
}

export interface IngridientsData {
  success: boolean
  data: Ingridient[]
}
