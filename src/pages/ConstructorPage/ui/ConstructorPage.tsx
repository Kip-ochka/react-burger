import {FC, memo} from 'react'
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'
import {BurgerConstructor} from '../../../components/BurgerConstructor/BurgerConstructor'
import {BurgerIngredients} from '../../../components/BurgerIngredients/BurgerIngredients'
import {Modal} from '../../../components/Modal/Modal'
import {OrderDetails} from '../../../components/OrderDetails/OrderDetails'
import {classNames} from '../../../utils/helpers/classNames'
import cls from './ConstructorPage.module.css'
import {useModal} from "../../../utils/hooks/useModal";

interface ConstructorPageProps {
}

const ConstructorPage: FC<ConstructorPageProps> = memo(() => {
    const {isModalOpen, openModal, closeModal} = useModal()

    return (
        <main className={classNames(cls.page)}>
            <DndProvider backend={HTML5Backend}>
                <BurgerIngredients/>
                <BurgerConstructor onOpenOrder={openModal}/>
            </DndProvider>

            {isModalOpen && (<Modal
                onClose={closeModal}
                children={<OrderDetails/>}
            />)}

        </main>
    )
})

export default ConstructorPage
