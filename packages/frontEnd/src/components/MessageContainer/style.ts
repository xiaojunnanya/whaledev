import styled from 'styled-components'

export const MessageContainerStyled = styled.div`
  .msg.error {
    --color: #f56c6c;
    --bg-color: #fef0f0;
  }

  .msg.warn {
    --color: #e6a23c;
    --bg-color: #fdf6ec;
  }

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
    color: var(--color);

    background-color: var(--bg-color);
    border: 2px solid #fff;
    border-radius: 6px;

    border-color: var(--color);
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
