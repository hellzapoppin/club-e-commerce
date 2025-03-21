import { InputHTMLAttributes } from 'react'
import { CustomInputContainer } from './custom-input.styles'

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean
  label?: string
  ref: any
}

const CustomInput = ({ hasError, ref, label, ...rest }: CustomInputProps) => {
  return (
    <>
      <p>{label}</p>
      <CustomInputContainer ref={ref} hasError={hasError} {...rest} />
    </>
  )
}

export default CustomInput
