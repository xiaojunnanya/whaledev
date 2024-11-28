import styled from 'styled-components'

export const ComponentLibraryStyled = styled.div`
  /* 遗留的问题：这里的布局有点魔幻，高度问题 */
  height: calc(100% - 48px);

  .search-input {
    margin: 0 10px;
  }

  .ant-tabs {
    height: calc(100% - 24px);

    .noComponents {
      text-align: center;
    }

    .ant-tabs-content-holder {
      overflow: auto;
    }

    .ant-collapse-content-box {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      padding: 0 !important;
    }
  }
`
