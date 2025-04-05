import styled from 'styled-components'

interface IProps {
  openAiModal: boolean
}

export const AiStyled = styled.div.withConfig({
  shouldForwardProp: prop => !['openAiModal'].includes(prop),
})<IProps>`
  display: ${props => (props.openAiModal ? 'block' : 'none')};
  position: fixed;
  bottom: 80px;
  right: 80px;
  z-index: 999;
  width: 800px;
  height: 80vh;
  background-color: ${props => props.theme.defaultColor.white};
  box-shadow: 0 0 10px ${props => props.theme.blackOpacity[5]};
  border-radius: 10px;
  padding: 0 20px 20px;

  .ai_header {
    height: 70px;
    padding: 10px;
    border-bottom: 1px solid ${props => props.theme.blackOpacity[1]};

    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 20px;
    font-weight: 700;

    &_close {
      cursor: pointer;

      &:hover {
        color: ${props => props.theme.primaryColor[700]};
      }
    }

    &_logo {
      color: ${props => props.theme.primaryColor[700]};
      user-select: none;
    }
  }
`
