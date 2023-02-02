import { Ingridient } from '../types/ingridient'

interface IngridientsData {
  success: boolean
  data: Ingridient[]
}

export const fetchIngredients = async (
  url: string
): Promise<IngridientsData> => {
  const response = await fetch(url, {
    method: 'GET',
  })
  if (response.ok) {
    const data = await response.json()
    return data
  }
  const error = await response.json()
  return Promise.reject(error)
}
