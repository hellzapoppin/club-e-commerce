import styled from 'styled-components'
import Color from '../../theme/theme.colors'

type CustomInputContainerProps = {
  hasError?: boolean
}

export const CustomInputContainer = styled.input<CustomInputContainerProps>`
  border: none;
  width: 100%;
  background-color: ${Color.input.background};
  padding: 10px 20px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  color: ${Color.text.dark};
  border: ${(props) => (props.hasError ? `2px solid ${Color.error}` : 'none')};

  &::placeholder {
    color: ${(props) =>
      props.hasError ? Color.error : Color.input.placeholder};
  }

  &:focus {
    outline: ${(props) =>
      props.hasError ? 'none' : `2px solid ${Color.input.placeholder}`};
  }
`
