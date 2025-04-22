import { InputErrorMessageContainer } from './input-error-message.style'

interface InputErrorMessageProps {
  message: string | undefined
}

const InputErrorMessage = ({ message }: InputErrorMessageProps) => {
  return <InputErrorMessageContainer>{message}</InputErrorMessageContainer>
}

export default InputErrorMessage
