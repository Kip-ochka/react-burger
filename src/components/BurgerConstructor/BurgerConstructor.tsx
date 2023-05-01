import {
    Button,
    CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import {useCallback, useMemo, useState} from 'react'
import {useDrop} from 'react-dnd'
import {Ingridient} from '../../types/ingridient'
import {classNames} from '../../utils/helpers/classNames'
import {
    useAppDispatch,
    useAppSelector,
} from '../../utils/hooks/reduxTypedHooks'
import cls from './BurgerConstructor.module.css'
import {ConstructorItem} from '../ConstructorItem/ConstructorItem'
import {TEXT, TypografyTheme} from '../../utils/variables'
import {BunContainer} from '../BunContainer/BunContainer'
import Preloader from '../Preloader/Preloader'
import {
    addIngridient,
    clearConstructor,
} from '../../store/burgerConstructorSlice'
import {cleanError, fetchPostOrder, setError} from '../../store/orderSlice'
import {Reorder} from 'framer-motion'
import {useNavigate} from "react-router-dom";

interface BurgerConstructorProps {
    onOpenOrder: () => void
}

export const BurgerConstructor = (props: BurgerConstructorProps) => {
    const {onOpenOrder} = props
    const {inConstructor} = useAppSelector((state) => state.burgerConstructor)
    const {orderError, orderLoading} = useAppSelector((state) => state.order)
    const {isLogged} = useAppSelector((state) => state.user)
    const dispatch = useAppDispatch()
    const [isPlaceholder] = useState(inConstructor.length === 0)
    const navigate = useNavigate()
    const [{isHover}, dropTarget] = useDrop({
        accept: 'bun',
        drop(item) {
            dispatch(addIngridient(item))
        },
        collect: (monitor) => ({
            isHover: monitor.isOver(),
        }),
    })

    const totalPrice = useMemo(() => {
        if (inConstructor.length === 0) {
            return 0
        } else {
            return (inConstructor as Ingridient[]).reduce(
                (acc: number, item: Ingridient) => {
                    if (item.type === 'bun') {
                        return acc + item.price * 2
                    }
                    return acc + item.price
                },
                0
            )
        }
    }, [inConstructor])

    const makeOrderHandler = useCallback((inOrderArray: Ingridient[]) => {
        const data = inOrderArray.map((item) => item._id)
        if (data.length === 0) {
            dispatch(
                setError(
                    `Заказ пустой, пожалуйста добавьте ингредиенты, и мы начнем готовить`
                )
            )
            return
        }
        dispatch(fetchPostOrder({ingredients: data})).then((order) => {
            const {success} = order.payload
            if (success) {
                onOpenOrder()
                dispatch(clearConstructor())
                dispatch(cleanError())
            }
        })
    }, [])

    return (
        <section className={classNames(cls.section, {}, ['mt-25'])}>
            <div
                ref={dropTarget}
                className={classNames(
                    cls.constructorWrapper,
                    {[cls.empty]: isPlaceholder, [cls.targethover]: isHover},
                    []
                )}
            >
                {orderLoading ? (
                    <Preloader/>
                ) : inConstructor.length === 0 ? (
                    <p
                        className={classNames(TEXT, {}, [
                            TypografyTheme.large,
                            cls.placeholder,
                        ])}
                    >
                        Перетащи сюда булочку
                    </p>
                ) : (
                    inConstructor.map((item) => {
                        if (item.type === 'bun') {
                            return (
                                <BunContainer item={item} key={item.key}>
                                    {inConstructor.map((item, index) => {
                                        if (item.type !== 'bun') {
                                            return (
                                                <Reorder.Item value={item} key={item.key}>
                                                    <ConstructorItem
                                                        key={item.key}
                                                        extraClass={cls.item}
                                                        ingridient={item}
                                                        subId={index}
                                                    />
                                                </Reorder.Item>
                                            )
                                        }
                                    })}
                                </BunContainer>
                            )
                        }
                    })
                )}
            </div>
            {orderError && inConstructor.length === 0 ? (
                <p className={classNames(TEXT, {}, [TypografyTheme.small, cls.error])}>
                    {orderError}
                </p>
            ) : null}
            <div className={classNames(cls.order, {}, ['mt-10', 'mr-8'])}>
                <p className="text text_type_digits-medium">{totalPrice}</p>
                <div className={classNames(cls.icon, {}, ['ml-2', 'mr-10'])}>
                    <CurrencyIcon type="primary"/>
                </div>
                <Button
                    htmlType="button"
                    type="primary"
                    size="large"
                    onClick={() => {
                        isLogged
                            ? makeOrderHandler(inConstructor)
                            : navigate('/login')
                    }}
                >
                    Оформить заказ
                </Button>
            </div>
        </section>
    )
}
