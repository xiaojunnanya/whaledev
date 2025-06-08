import styled from 'styled-components'

export const ProjectListStyled = styled.div`
  .projectListTop {
    display: flex;
    justify-content: space-between;
    margin: 10px 30px;

    .createButton {
      width: 200px;

      & > button {
        float: right;
      }
    }
  }

  .content {
    display: flex;
    margin-left: -16px; /* 与列间距一致 */
    width: auto;
    margin: 16px;

    .cardItem {
      margin: 16px;
    }

    .otherinfo {
      .typestate {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;

        .type {
          border: 1px solid;
          border-color: ${props => props.theme.primaryColor[700]};
          color: ${props => props.theme.primaryColor[700]};
          font-size: 12px;
          padding: 2px 5px;
          border-radius: 5px;
        }
      }
    }
  }
`
