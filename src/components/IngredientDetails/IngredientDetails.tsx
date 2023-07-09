import {FC, useEffect} from 'react'
import {classNames} from '../../utils/helpers/classNames'
import {TEXT, TypografyTheme} from '../../utils/variables'
import cls from './IngredientDetails.module.css'
import {useAppDispatch, useAppSelector} from "../../utils/hooks/reduxTypedHooks";
import Preloader from "../Preloader/Preloader";
import {useParams} from "react-router-dom";
import {setIngredientsToPage} from "../../store/ingridientsSlice";

export const IngredientDetails: FC = () => {
    const {ingredientsToPage, ingredients} = useAppSelector(state => state.ingridients)
    const dispatch = useAppDispatch()
    const { id } = useParams()

    useEffect(()=>{
        if(!ingredientsToPage) {
            const obj = ingredients.find((item) => item._id === id)
            dispatch(setIngredientsToPage({...obj, imageLarge: obj!.image_large,}))
        }
    }, [ingredientsToPage, id, dispatch, ingredients])

    return ingredientsToPage ? (
            <>
                <img src={ingredientsToPage.image_large} alt={`${ingredientsToPage.name}`}/>
                <p className={classNames(TEXT, {}, [TypografyTheme.medium, 'mt-4'])}>
                    {ingredientsToPage.name}
                </p>
                <ul className={classNames(cls.wrapper)}>
                    <li className={classNames(cls.item)}>
                        <p
                            className={classNames(TEXT, {}, [
                                TypografyTheme.default,
                                cls.color,
                            ])}
                        >
                            Калории,ккал
                        </p>
                        <p
                            className={classNames(TEXT, {}, [
                                TypografyTheme.digitsDefault,
                                cls.color,
                            ])}
                        >
                            {ingredientsToPage.calories}
                        </p>
                    </li>
                    <li className={classNames(cls.item)}>
                        <p
                            className={classNames(TEXT, {}, [
                                TypografyTheme.default,
                                cls.color,
                            ])}
                        >
                            Белки,г
                        </p>
                        <p
                            className={classNames(TEXT, {}, [
                                TypografyTheme.digitsDefault,
                                cls.color,
                            ])}
                        >
                            {ingredientsToPage.proteins}
                        </p>
                    </li>
                    <li className={classNames(cls.item)}>
                        <p
                            className={classNames(TEXT, {}, [
                                TypografyTheme.default,
                                cls.color,
                            ])}
                        >
                            Жиры,г
                        </p>
                        <p
                            className={classNames(TEXT, {}, [
                                TypografyTheme.digitsDefault,
                                cls.color,
                            ])}
                        >
                            {ingredientsToPage.fat}
                        </p>
                    </li>
                    <li className={classNames(cls.item)}>
                        <p
                            className={classNames(TEXT, {}, [
                                TypografyTheme.default,
                                cls.color,
                            ])}
                        >
                            Углеводы,г
                        </p>
                        <p
                            className={classNames(TEXT, {}, [
                                TypografyTheme.digitsDefault,
                                cls.color,
                            ])}
                        >
                            {ingredientsToPage.carbohydrates}
                        </p>
                    </li>
                </ul>
            </>
        )
        : (<Preloader/>)
}

