import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ConstructorPage } from '../../page/ConstructorPage/ConstructorPage'
import { classNames } from '../../utils/helpers/classNames'
import { AppHeader } from '../AppHeader/AppHeader'
import cls from './App.module.css'
import {
  useAppDispatch,
  useAppSelector,
} from '../../utils/hooks/reduxTypedHooks'
import { fetchGetIngridients } from '../../store/ingridientsSlice'

export function App() {
  const dispatch = useAppDispatch()
  const { loading } = useAppSelector((state) => state.ingridients)
  useEffect(() => {
    dispatch(fetchGetIngridients())
  }, [])

  return (
    <div className={classNames(cls.app)}>
      <AppHeader />
      {loading ? (
        'Loading...'
      ) : (
        <Routes>
          <Route path="/" element={<ConstructorPage />} />
        </Routes>
      )}
    </div>
  )
}
