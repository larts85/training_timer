import { FC } from 'react'
import { ButtonProps } from './button.types'

const Button: FC<ButtonProps> = ({ className, isDisable, cta, onChange }) => {
  return (
    <button className={className} disabled={isDisable} onChange={onChange}>
      {cta}
    </button>
  )
}

Button.displayName = 'Button'

export default Button
