import styled from 'styled-components'

export const AiContentStyled = styled.div`
  &.ai_container {
    height: calc(100% - 70px - 10px);
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .ai_container_content {
      overflow-y: auto;
    }

    .ai_container_sender {
      margin-top: 20px;
    }
  }
`
