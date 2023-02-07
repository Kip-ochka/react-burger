import React, { useEffect } from 'react'
import cls from './Modal.module.css'
import { classNames } from '../../utils/helpers/classNames'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import ReactDOM from 'react-dom'
import { TEXT, TypografyTheme } from '../../utils/variables'
import ModalOverlay from '../ModalOverlay/ModalOverlay'

const reactModals = document.getElementById('react-modals') as HTMLElement

interface ModalProps {
  isOpen: boolean
  children: React.ReactNode
  title?: string
  onClose: () => void
}

export const Modal = (props: ModalProps) => {
  const { children, title, isOpen, onClose } = props

  useEffect(() => {
    const close = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keyup', close)
    return () => window.removeEventListener('keyup', close)
  }, [onClose])

  return ReactDOM.createPortal(
    <div className={classNames(cls.portal, { [cls.opened]: isOpen }, [])}>
      <ModalOverlay onClose={onClose} />
      <div className={classNames(cls.modal)}>
        <div className={classNames(cls.header)}>
          <h2
            className={classNames(TEXT, {}, [TypografyTheme.large, cls.title])}
          >
            {title || ''}
          </h2>
          <button
            className={classNames(cls.close)}
            onClick={() => {
              onClose()
            }}
          >
            <CloseIcon type="primary" />
          </button>
        </div>

        {children}
      </div>
    </div>,
    reactModals
  )
}
