import styled from 'styled-components'
import Color from '../../theme/theme.colors'

interface CategoryItemContainerProps {
  $backgroundImage: string
}

export const CategoryItemContainer = styled.div<CategoryItemContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  grid-gap: 15px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 10px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);
  background-color: rgba(0, 0, 0, 0.3);
  background-blend-mode: color;
  background-image: ${(props) =>
    props.$backgroundImage && `url('${props.$backgroundImage}')`};

  @media (max-width: 768px) {
    padding: 0 50px 0 50px;
    height: 300px;
  }
`
export const CategoryName = styled.div`
  color: ${Color.text.white};
  text-align: center;
  background: rgba(233, 236, 239, 0.45);
  padding-top: 10px;
  padding-bottom: 10px;
  padding-right: 30px;
  padding-left: 30px;
  border-radius: 10px;
  border: 1px solid #212529;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  transition: all 0.5s ease;

  &:hover {
    cursor: pointer;
    background: rgba(233, 236, 239, 0.55);
  }

  & p:nth-child(1) {
    font-weight: 600;
  }
`
