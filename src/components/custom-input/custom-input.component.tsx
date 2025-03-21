import { InputHTMLAttributes } from 'react'
import { CustomInputContainer } from './custom-input.styles'

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean
  label?: string
}

const CustomInput = ({ hasError, label, ...rest }: CustomInputProps) => {
  return (
    <>
      <p>{label}</p>
      <CustomInputContainer hasError={hasError} {...rest} />
    </>
  )
}

export default CustomInput
