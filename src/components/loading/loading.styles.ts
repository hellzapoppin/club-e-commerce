import styled from 'styled-components'
import Color from '../../theme/theme.colors'

export const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  p {
    color: ${Color.text.white};
    font-weight: 500;
    margin-bottom: 25px;
    font-size: 1.325rem;
    max-width: 50%;
    text-align: center;
  }
`
