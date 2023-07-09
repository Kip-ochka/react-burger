import React, {FC} from 'react';
import cls from './IngredientPage.module.css'
import {classNames} from "../../../utils/helpers/classNames";
import {TEXT, TypografyTheme} from "../../../utils/variables";
interface IngredientPageProps {
    children: JSX.Element
}
export const IngredientPage:FC<IngredientPageProps> = ({ children }) => {
    return (
        <section className={cls.container}>
            <h1 className={classNames(TEXT, {}, [TypografyTheme.large] )}>{"Детали ингредиента"}</h1>
            {children}
        </section>
    );
};

export default IngredientPage;
