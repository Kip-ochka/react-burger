import { FC } from 'react'
import './Preloader.css'
export const Preloader: FC = () => {
  return (
    <div className="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}

export default Preloader
