import { SyncLoader } from 'react-spinners'
import { LoadingContainer } from './loading.styles'

const Loading = () => {
  return (
    <LoadingContainer>
      <SyncLoader size={30} />
    </LoadingContainer>
  )
}

export default Loading
