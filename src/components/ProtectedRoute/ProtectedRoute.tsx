import { FC, ReactNode } from 'react'

interface ProtectedRouteProps {
  element: ReactNode
}

export const ProtectedRoute: FC<ProtectedRouteProps> = (props) => {
  const { element } = props
  return <>{element}</>
}
