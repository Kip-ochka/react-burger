import { FC } from 'react'
import { classNames } from '../../utils/helpers/classNames'
import cls from './ModalOverlay.module.css'

interface ModalOverlayProps {
  onClose: () => void
}

export const ModalOverlay: FC<ModalOverlayProps> = (props) => {
  return (
    <div
      className={classNames(cls.overlay)}
      onClick={() => {
        props.onClose()
      }}
    ></div>
  )
}
