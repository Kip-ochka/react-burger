import {FC} from 'react'
import {NavLink, useLocation, useNavigate} from 'react-router-dom'
import {classNames} from '../../utils/helpers/classNames'
import {INACTIVE_COLOR, TEXT, TypografyTheme} from '../../utils/variables'
import cls from './ProfileNav.module.css'
import {useAppDispatch} from "../../utils/hooks/reduxTypedHooks";
import {fetchLogout} from "../../store/userSlice";

export const ProfileNav: FC = () => {
    const {pathname} = useLocation()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    return (
        <section className={classNames(cls.section, {}, [cls.nav])}>
            <NavLink to="/profile" className={cls.link}>
                <p
                    className={classNames(
                        TEXT,
                        {[INACTIVE_COLOR]: pathname !== '/profile'},
                        [TypografyTheme.medium]
                    )}
                >
                    Профиль
                </p>
            </NavLink>
            <NavLink to="/profile/orders" className={cls.link}>
                <p
                    className={classNames(
                        TEXT,
                        {[INACTIVE_COLOR]: pathname !== '/profile/orders'},
                        [TypografyTheme.medium]
                    )}
                >
                    История заказов
                </p>
            </NavLink>

            <button
                className={classNames(TEXT, {}, [
                    TypografyTheme.medium,
                    cls.exit,
                    INACTIVE_COLOR,
                ])}
                onClick={() => {
                    dispatch(fetchLogout()).then(res=>{
                        if(res.type === 'user/logout/fulfilled') {
                            navigate('/')
                        }
                    })
                }}
            >
                Выход
            </button>
        </section>
    )
}
