import styled from 'styled-components'

export const MessageContainerStyled = styled.div`
  .msg {
    position: absolute;
    right: 8px;
    bottom: 0;
    left: 8px;
    z-index: 10;

    display: flex;
    align-items: flex-start;
    max-height: calc(100% - 300px);
    min-height: 40px;
    margin-bottom: 8px;
    color: ${props => props.theme.defaultColor.error};

    background-color: ${props => props.theme.defaultColorOpacity.redOpacity1};
    border: 2px solid ${props => props.theme.defaultColor.white};
    border-radius: 6px;

    border-color: ${props => props.theme.defaultColor.error};
  }

  pre {
    padding: 12px 20px;
    margin: 0;
    overflow: auto;
    white-space: break-spaces;
  }

  .closeOutlined {
    margin: 4px;
  }
`
