import React from 'react'
import { classNames } from '../../utils/helpers/classNames'
import { TEXT, TypografyTheme } from '../../utils/variables'

export const ModalOrder = () => {
  return (
    <>
      <p className={classNames(TEXT, {}, [TypografyTheme.digitsLarge])}>
        034536
      </p>
    </>
  )
}
