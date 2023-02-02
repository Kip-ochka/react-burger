import { useEffect, useState } from 'react'
import { Ingridient } from '../../types/ingridient'
import { classNames } from '../../utils/classNames'
import { fetchIngredients } from '../../utils/fetchData'
import { BASE_URL } from '../../utils/variables'
import { AppHeader } from '../AppHeader/AppHeader'
import cls from './App.module.css'

export function App() {
  const [ingredients, setIngredients] = useState<Ingridient[]>([])
  useEffect(() => {
    fetchIngredients(BASE_URL)
      .then((res) => setIngredients(res.data))
      .catch((err) => console.log(err))
  }, [])

  return (
    <div className={classNames(cls.app)}>
      <AppHeader />
      {/*  */}
    </div>
  )
}
