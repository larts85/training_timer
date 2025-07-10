import 'tailwindcss/tailwind.css'
import { FC } from 'react'
import { CheckboxProps } from './checkbox.types'

const RadioButtons: FC<CheckboxProps> = ({ handleChange, selected }) => {
  return (
    <div>
      <label className="relative block">
        <input
          type="checkbox"
          className=""
          checked={selected}
          onChange={handleChange}
        />
      </label>
    </div>
  )
}

RadioButtons.displayName = 'RadioButtons'

export default RadioButtons
