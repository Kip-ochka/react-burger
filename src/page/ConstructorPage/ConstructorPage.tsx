import React, { FC, useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { BurgerConstructor } from '../../components/BurgerConstructor/BurgerConstructor'
import { BurgerIngredients } from '../../components/BurgerIngredients/BurgerIngredients'
import { Modal } from '../../components/Modal/Modal'
import { ModalIngridient } from '../../components/ModalIngridient/ModalIngridient'
import { ModalOrder } from '../../components/ModalOrder/ModalOrder'
import { Ingridient } from '../../types/ingridient'
import { classNames } from '../../utils/helpers/classNames'
import cls from './ConstructorPage.module.css'

interface ConstructorPageProps {}

export const ConstructorPage: FC<ConstructorPageProps> = React.memo(() => {
  const [isOpenInfo, setIsOpenInfo] = useState(false)
  const [isOpenOrder, setIsOpenOrder] = useState(false)
  const [infoData, setIsInfoData] = useState({})

  const handleOpenInfo = (data: Ingridient) => {
    setIsInfoData(data)
    setTimeout(() => {
      setIsOpenInfo(true)
    }, 50)
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
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients onOpen={handleOpenInfo} />
        <BurgerConstructor onOpenOrder={handleOpenOrder} />
      </DndProvider>

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
