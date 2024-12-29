import styled from 'styled-components'

export const UserInfoStyled = styled.div`
  background-color: ${props => props.theme.defaultColor.grey};
  padding: 20px 0px;
  min-height: calc(100vh - 48px);

  .container {
    max-width: 1200px;
    width: 80%;
    min-width: 900px;
    margin: 0 auto;

    .headerBanner {
      background-image: linear-gradient(
        90deg,
        ${props => props.theme.primaryColor[700]},
        ${props => props.theme.primaryColor[200]}
      );
      height: 120px;
    }

    .contentAll {
      background-color: ${props => props.theme.defaultColor.white};
      padding: 40px;

      .avatar {
        margin-top: -84px;
        display: flex;
        align-items: flex-end;

        .userinfo {
          margin-left: 30px;

          .nickname {
            display: flex;
            align-items: center;

            .name {
              font-size: 26px;
              font-weight: 500;
            }

            .editNick {
              cursor: pointer;
              margin-left: 10px;
              &:hover {
                color: ${props => props.theme.primaryColor[700]};
              }
            }
          }

          .userdesc {
            margin: 10px 0 4px 0;
            color: ${props => props.theme.defaultColor.grey3};
          }
        }

        .image {
          width: 128px;
          height: 128px;

          img {
            width: 100%;
            padding: 4px;
            border-radius: 8px;
            background-color: ${props => props.theme.defaultColor.white};
          }
        }
      }

      .title {
        margin-top: 30px;
      }

      .contentItems {
        .item {
          margin-top: 20px;

          display: flex;
          justify-content: space-between;
          align-items: center;
          color: ${props => props.theme.defaultColor.black};
          opacity: 0.75;

          .itemTitle {
            font-weight: 500;
            font-size: 16px;
          }

          .itemDesc {
            font-size: 14px;
            margin-top: 5px;
          }

          .itemLeft {
            display: flex;

            & > span {
              font-size: 20px;

              margin-right: 16px;
            }
          }
        }
      }

      hr {
        opacity: 0.2;
        margin-top: 30px;
      }
    }
  }
`
