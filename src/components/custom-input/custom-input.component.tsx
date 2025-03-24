import { InputHTMLAttributes } from 'react'
import { CustomInputContainer } from './custom-input.styles'

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean
  type?: string
}

const CustomInput = ({ hasError, ...rest }: CustomInputProps) => {
  return <CustomInputContainer hasError={hasError} {...rest} />
}

export default CustomInput
