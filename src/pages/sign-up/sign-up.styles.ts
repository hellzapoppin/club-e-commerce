import styled from 'styled-components'
import Color from '../../theme/theme.colors'

export const SignUpContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`
export const SignUpHeadLine = styled.p`
  font-weight: 600;
  font-size: 1.3rem;
  margin-bottom: 20px;
  color: ${Color.text.dark};
  padding-bottom: 20px;
  border-bottom: 1px solid #6c757d;
  width: 100%;
  text-align: center;
`

export const SignupContent = styled.form`
  display: flex;
  flex-direction: column;
  align-item: center;
  width: 450px;

  @media (max-width: 768px) {
    width: 90%;
  }
`

export const SignUpInputContainer = styled.div`
  width: 100%;
  margin-bottom: 20px;
  P:nth-child(1) {
    font-weight: 600;
    margin-bottom: 5px;
  }
`
