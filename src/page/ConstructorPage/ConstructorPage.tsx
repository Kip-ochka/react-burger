import React, { useState } from 'react'
import { BurgerConstructor } from '../../components/BurgerConstructor/BurgerConstructor'
import { BurgerIngredients } from '../../components/BurgerIngredients/BurgerIngredients'
import { Modal } from '../../components/Modal/Modal'
import ModalIngridient from '../../components/ModalIngridient/ModalIngridient'
import { ModalOrder } from '../../components/ModalOrder/ModalOrder'
import { Ingridient } from '../../types/ingridient'
import { classNames } from '../../utils/helpers/classNames'
import cls from './ConstructorPage.module.css'

interface ConstructorPageProps {
  ingridients: Ingridient[]
}

export const ConstructorPage = React.memo((props: ConstructorPageProps) => {
  const [isOpenInfo, setIsOpenInfo] = useState(false)
  const [isOpenOrder, setIsOpenOrder] = useState(false)
  const [infoData, setIsInfoData] = useState({})
  const { ingridients } = props

  const handleOpenInfo = (data: Ingridient) => {
    setIsInfoData(data)
    setTimeout(() => {
      setIsOpenInfo(true)
    }, 100)
  }

  const handleClose = () => {
    setIsInfoData({})
    setIsOpenOrder(false)
    setIsOpenInfo(false)
  }

  const handleOpenOrder = () => {
    setIsOpenOrder(true)
  }

  return (
    <main className={classNames(cls.page)}>
      <BurgerIngredients ingridients={ingridients} onOpen={handleOpenInfo} />
      <BurgerConstructor
        ingridients={ingridients}
        onOpenInfo={handleOpenInfo}
        onOpenOrder={handleOpenOrder}
      />

      <Modal
        isOpen={isOpenInfo}
        onClose={handleClose}
        children={<ModalIngridient ingridient={infoData} />}
        title="Детали ингридиента"
      />
      <Modal
        isOpen={isOpenOrder}
        onClose={handleClose}
        children={<ModalOrder />}
      />
    </main>
  )
})
