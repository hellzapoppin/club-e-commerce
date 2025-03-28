import { HashLoader } from 'react-spinners'
import { LoadingContainer } from './loading.styles'

interface LoadingProps {
  message?: string
}

const Loading = ({ message }: LoadingProps) => {
  return (
    <LoadingContainer>
      {message && <p>{message}</p>}
      <HashLoader size={60} />
    </LoadingContainer>
  )
}

export default Loading
