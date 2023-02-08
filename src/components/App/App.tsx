import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ConstructorPage } from '../../page/ConstructorPage/ConstructorPage'
import { Ingridient } from '../../types/ingridient'
import { classNames } from '../../utils/helpers/classNames'
import { fetchIngredients } from '../../utils/api/fetchData'
import { BASE_URL } from '../../utils/variables'
import { AppHeader } from '../AppHeader/AppHeader'
import cls from './App.module.css'

export function App() {
  const [ingridients, setIngredients] = useState<Ingridient[]>([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    fetchIngredients(BASE_URL)
      .then((res) => {
        setIngredients(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  return (
    <div className={classNames(cls.app)}>
      <AppHeader />
      {isLoading ? (
        'Loading...'
      ) : (
        <Routes>
          <Route
            path="/"
            element={<ConstructorPage ingridients={ingridients} />}
          />
        </Routes>
      )}
    </div>
  )
}
