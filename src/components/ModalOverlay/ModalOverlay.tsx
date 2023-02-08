import { classNames } from '../../utils/helpers/classNames'
import cls from './ModalOverlay.module.css'

interface ModalOverlayProps {
  onClose: () => void
}

function ModalOverlay(props: ModalOverlayProps) {
  return (
    <div
      className={classNames(cls.overlay)}
      onClick={() => {
        props.onClose()
      }}
    ></div>
  )
}

export default ModalOverlay
