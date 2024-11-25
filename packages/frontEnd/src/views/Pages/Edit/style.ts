import styled from 'styled-components'

export const ContentStyled = styled.div`
  display: flex;
  height: calc(100vh - 90px);

  .edit {
    &-left {
      width: 48px;
    }

    &-middle {
      flex: 1;
    }

    &-right {
      width: 300px;
    }
  }
`
