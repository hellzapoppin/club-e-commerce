import styled from 'styled-components'
import Color from '../../theme/theme.colors'

export const HeaderContainer = styled.div`
  width: 100%;
  background-color: ${Color.background.dark};
  display: flex;
  justify-content: space-between;
  padding: 20px;
  color: ${Color.text.white};
`

export const HeaderTitle = styled.h1`
  font-weight: bold;
  font-size: 1.5rem;

  &:hover {
    cursor: pointer;
  }
`

export const HeaderItems = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const HeaderItem = styled.div`
  font-weight: 600;
  font-size: 1rem;
  display: flex;
  align-items: center;
  &:nth-child(1),
  &:nth-child(2),
  &:nth-child(3) {
    margin-right: 40px;
  }

  &:hover {
    cursor: pointer;
  }
`
