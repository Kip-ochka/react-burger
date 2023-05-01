import {FC} from 'react'
import {TEXT} from 'react-dnd-html5-backend/dist/NativeTypes'
import {Route, Routes} from 'react-router-dom'
import {ProfileInputs} from '../../../components/ProfileInputs/ProfileInputs'
import {ProfileNav} from '../../../components/ProfileNav/ProfileNav'
import {classNames} from '../../../utils/helpers/classNames'
import {INACTIVE_COLOR, TypografyTheme} from '../../../utils/variables'
import cls from './ProfilePage.module.css'
import {useAppSelector} from "../../../utils/hooks/reduxTypedHooks";
import Preloader from "../../../components/Preloader/Preloader";

const ProfilePage: FC = () => {
    const {userLoading} = useAppSelector(state => state.user)
    return (
        <main className={classNames(cls.page)}>
            {userLoading
                ? <Preloader/>
                : (<div className={classNames(cls.wrapper)}>
                    <div className={classNames(cls.nav)}>
                        <ProfileNav/>
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <p
                                        className={classNames(TEXT, {}, [
                                            TypografyTheme.default,
                                            INACTIVE_COLOR,
                                        ])}
                                    >
                                        В этом разделе вы можете изменить свои персональные данные
                                    </p>
                                }
                            />
                            <Route
                                path="/orders"
                                element={
                                    <p
                                        className={classNames(TEXT, {}, [
                                            TypografyTheme.default,
                                            INACTIVE_COLOR,
                                        ])}
                                    >
                                        В этом разделе вы можете просмотреть свою историю заказов
                                    </p>
                                }
                            />
                        </Routes>
                    </div>
                    <Routes>
                        <Route path="/" element={<ProfileInputs/>}/>
                        <Route path="/orders" element={<div>orders</div>}/>
                    </Routes>
                </div>)}

        </main>
    )
}

export default ProfilePage
