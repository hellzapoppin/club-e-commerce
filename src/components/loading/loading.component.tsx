import { HashLoader } from 'react-spinners'
import { LoadingContainer } from './loading.styles'

const Loading = () => {
  return (
    <LoadingContainer>
      <HashLoader size={60} />
    </LoadingContainer>
  )
}

export default Loading
