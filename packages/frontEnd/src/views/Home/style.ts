import styled from 'styled-components'

export const HeaderStyle = styled.div`
  height: calc(100vh - 48px);
  background: radial-gradient(
      at 10.414479567813917% 99.23042503048198%,
      hsla(288.75000000000006, 55.17241379310342%, 88.62745098039215%, 1) 0%,
      hsla(288.75000000000006, 55.17241379310342%, 88.62745098039215%, 0) 100%
    ),
    radial-gradient(
      at 75.49366330218024% 5.80608117044219%,
      hsla(192.39999999999998, 100%, 70.58823529411764%, 1) 0%,
      hsla(192.39999999999998, 100%, 70.58823529411764%, 0) 100%
    ),
    radial-gradient(
      at 24.841807153709205% 4.425022290572533%,
      hsla(0, 0%, 100%, 1) 0%,
      hsla(0, 0%, 100%, 0) 100%
    ),
    radial-gradient(
      at 92.30102971217396% 89.32946145739035%,
      hsla(288.75000000000006, 55.17241379310342%, 88.62745098039215%, 1) 0%,
      hsla(288.75000000000006, 55.17241379310342%, 88.62745098039215%, 0) 100%
    ),
    radial-gradient(
      at 81.91897390593812% 69.00931891325244%,
      hsla(192.39999999999998, 100%, 70.58823529411764%, 1) 0%,
      hsla(192.39999999999998, 100%, 70.58823529411764%, 0) 100%
    ),
    radial-gradient(
      at 1.866062135336377% 22.922517788976027%,
      hsla(0, 0%, 100%, 1) 0%,
      hsla(0, 0%, 100%, 0) 100%
    ),
    radial-gradient(
      at 84.31317214778011% 93.03605782889592%,
      hsla(288.75000000000006, 55.17241379310342%, 88.62745098039215%, 1) 0%,
      hsla(288.75000000000006, 55.17241379310342%, 88.62745098039215%, 0) 100%
    );

  .middle {
    display: flex;
    justify-content: center;

    .container {
      margin-top: 156px;
      text-align: center;

      .m1 {
        font-size: 56px;
        font-weight: 700;
        user-select: none;
      }

      .m2 {
        color: hsla(0, 0%, 100%);
        font-size: 20px;
        font-weight: 400;
        line-height: 32px;
        margin-top: 16px;
        max-width: 965px;
        text-align: center;
      }

      .m3 {
        margin-top: 38px;
        background-color: ${props => props.theme.primaryColor[700]};
        display: inline-block;
        padding: 8px 8px 8px 20px;
        color: ${props => props.theme.defaultColor.white};
        cursor: pointer;
        border-radius: 9999px;

        .startBtn {
          font-size: 18px;
          user-select: none;
        }

        .anticon-arrow-right {
          background-color: ${props => props.theme.defaultColor.black};
          border-radius: 50%;
          padding: 10px;
          margin-left: 10px;
          transition: transform 0.25s ease-in-out;
        }

        &:hover {
          background-color: ${props => props.theme.primaryColor[600]};

          .anticon-arrow-right {
            transform: rotate(-45deg);
          }
        }
      }
    }
  }
`
