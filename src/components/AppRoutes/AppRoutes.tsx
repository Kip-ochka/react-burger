import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { routeConfig } from '../../utils/configs/routeConfig'
import { PageLayout } from '../PageLayout/PageLayout'
import Preloader from '../Preloader/Preloader'

function AppRoutes() {
  return (
    <Suspense
      fallback={
        <PageLayout>
          <Preloader />
        </PageLayout>
      }
    >
      <Routes>
        {Object.values(routeConfig).map(({ element, path }) => (
          <Route
            key={path}
            path={path}
            element={<PageLayout>{element}</PageLayout>}
          />
        ))}
      </Routes>
    </Suspense>
  )
}

export default AppRoutes
