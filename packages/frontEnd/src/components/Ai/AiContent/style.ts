import styled from 'styled-components'

export const AiContentStyled = styled.div`
  &.ai_container {
    height: calc(100% - 70px - 10px);
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    ::-webkit-scrollbar {
      width: 0px;
      height: 0px;
    }

    .ai_container_content {
      overflow-y: auto;

      .ai_container_prompts {
        margin-top: 20px;

        .ant-prompts-list {
          justify-content: space-between;
        }
      }

      .ai_container_content_bubbleList {
        // 为了支持滚动
        max-height: 100%;
        overflow-y: auto;
      }

      .ai_content_typography p {
        margin-bottom: 0;
      }
    }

    .ai_container_sender {
      margin-top: 20px;
    }
  }
`
