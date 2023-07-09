import React, {FC} from 'react';
import {classNames} from "../../utils/helpers/classNames";
import {TEXT} from "react-dnd-html5-backend/dist/NativeTypes";
import {TypografyTheme} from "../../utils/variables";
import cls from "./ErrorMessage.module.css"

const ErrorMessage: FC<{ error: string | null}> = ({error}) => {
    return (
        <p
            className={classNames(TEXT, {}, [
                TypografyTheme.default,
                cls.error,
            ])}
        >
            {error}
        </p>
    );
}

export default ErrorMessage;
