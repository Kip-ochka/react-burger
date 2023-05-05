import {FC, useState, memo} from 'react'
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'
import {BurgerConstructor} from '../../../components/BurgerConstructor/BurgerConstructor'
import {BurgerIngredients} from '../../../components/BurgerIngredients/BurgerIngredients'
import {Modal} from '../../../components/Modal/Modal'
import {ModalOrder} from '../../../components/ModalOrder/ModalOrder'
import {classNames} from '../../../utils/helpers/classNames'
import cls from './ConstructorPage.module.css'

interface ConstructorPageProps {
}

const ConstructorPage: FC<ConstructorPageProps> = memo(() => {
    const [isOpenOrder, setIsOpenOrder] = useState(false)

    const handleOpenOrder = () => {
        setIsOpenOrder(true)
    }

    const handleClose = () => {
        setIsOpenOrder(false)
    }

    return (
        <main className={classNames(cls.page)}>
            <DndProvider backend={HTML5Backend}>
                <BurgerIngredients />
                <BurgerConstructor onOpenOrder={handleOpenOrder}/>
            </DndProvider>


            <Modal
                isOpen={isOpenOrder}
                onClose={handleClose}
                children={<ModalOrder/>}
            />
        </main>
    )
})

export default ConstructorPage
