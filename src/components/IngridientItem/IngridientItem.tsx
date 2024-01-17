import {
    Counter,
    CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import {FC, useMemo} from 'react'
import {useDrag} from 'react-dnd'
import {Ingridient} from '../../types/ingridient'
import {classNames} from '../../utils/helpers/classNames'
import {useAppDispatch, useAppSelector} from '../../utils/hooks/reduxTypedHooks'
import {TEXT, TypografyTheme} from '../../utils/variables'
import cls from './IngridientItem.module.css'
import {Link, useLocation} from "react-router-dom";
import {setIngredientsToPage} from "../../store/ingridientsSlice";

interface IngridientItemProps {
    ingridient: Ingridient
}

export const IngridientItem: FC<IngridientItemProps> = (props) => {
    const {ingridient} = props
    const dispatch = useAppDispatch()
    const handleOpenInfo = (data: Ingridient) => {
        dispatch(setIngredientsToPage(data))
    }
    const {inConstructor} = useAppSelector((state) => state.burgerConstructor)
    const location = useLocation()
    const [, dragRef] = useDrag({
        type: ingridient.type,
        item: {ingridient},
    })

    const count = useMemo(() => {
        return inConstructor.filter((item) => {
            return item._id === ingridient._id
        }).length
    }, [inConstructor, ingridient._id])

    return (
        <Link
            key={ingridient._id}
            to={`/ingredients/${ingridient._id}`}
            state={{background: location}}
            className={classNames(cls.link, {}, [
                TEXT, TypografyTheme.digitsDefault, 'mt-1',
            ])}
            ref={dragRef}
            draggable={true}
            onClick={() => {
                handleOpenInfo(ingridient)
            }}
        >
            <li
                className={classNames(cls.container)}

            >
                <img
                    src={ingridient.image}
                    className={classNames(cls.img, {}, ['ml-4', 'mr-4'])}
                    alt={`${ingridient.name}`}
                />
                <div className={classNames(cls.priceWrapper)}>
                    <p
                        className={classNames(TEXT, {}, [
                            TypografyTheme.digitsDefault,
                            'mt-1',
                            'mb-2',
                        ])}
                    >
                        {ingridient.price}
                    </p>
                    <CurrencyIcon type="primary"/>
                </div>
                <p className={classNames(TEXT, {}, [TypografyTheme.default])}>
                    {ingridient.name}
                </p>
                {count !== 0 && <Counter count={count} size="default" extraClass="m-1"/>}
            </li>
        </Link>

    )
}
