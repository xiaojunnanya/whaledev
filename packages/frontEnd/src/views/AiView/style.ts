import styled from 'styled-components'

export const AiViewStyled = styled.div`
  display: flex;
  height: calc(100vh - 48px);

  .ai_view_conversations {
    border-right: 1px solid #ccc;
    overflow: auto;
  }

  .ai_view_content {
    flex: 1;
    margin: 20px 20px 32px 20px;

    .ai_container {
      height: 100%;
    }
  }
`
