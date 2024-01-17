import React, {FC} from 'react';
import {classNames} from "../../utils/helpers/classNames";
import {TEXT} from "react-dnd-html5-backend/dist/NativeTypes";
import {TypografyTheme} from "../../utils/variables";
import cls from "./ErrorMessage.module.css"
import {UserState} from "../../types/userTypes";

const ErrorMessage: FC<{ error:UserState['error']}> = ({error}) => {
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
