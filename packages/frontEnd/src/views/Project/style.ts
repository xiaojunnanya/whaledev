import styled from 'styled-components'

export const ProjectStyled = styled.div`
  .top {
    display: flex;
    justify-content: space-between;
    margin: 10px 30px;

    .ant-input-outlined {
      width: 200px;
    }
  }

  .content {
    padding: 10px 30px;

    .otherinfo {
      .typestate {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;

        .type {
          border: 1px solid;
          border-color: ${props => props.theme.color.primaryColor};
          color: ${props => props.theme.color.primaryColor};
          font-size: 12px;
          padding: 2px 5px;
          border-radius: 5px;
        }
      }
    }
  }
`
