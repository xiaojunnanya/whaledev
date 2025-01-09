import styled from 'styled-components'

export const ModalStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .searchInput {
    margin-bottom: 10px;
  }

  .iconSpan {
    display: inline-block;
    padding: 20px;
    margin: 5px;
    border: 1px solid ${props => props.theme.defaultColor.grey2};

    &:hover,
    &.iconSpanActive {
      background-color: ${props => props.theme.primaryColor[700]};
      cursor: pointer;
      color: ${props => props.theme.defaultColor.white};
    }
  }
`

export const SelectIconStyled = styled.div`
  display: flex;
  position: relative;

  .plusOutlined,
  .whale-icon {
    border: 1px dotted ${props => props.theme.defaultColor.grey2};
    height: 32px;
    width: 32px;
    font-size: 20px;
    padding: 5px;
  }

  .closeCircleOutlined {
    position: absolute;
    top: -5px;
    left: 25px;
  }
`
