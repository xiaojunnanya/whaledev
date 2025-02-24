import styled from 'styled-components'

export const FooterStyle = styled.div`
  width: 100%;
  background-color: ${props => props.theme.defaultColor.black};
  padding: 32px 0;

  .footer {
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
    color: ${props => props.theme.defaultColor.white};

    dt {
      font-weight: 700;
      font-size: 16px;
      margin-bottom: 16px;
    }

    dd {
      margin-left: 0;
      margin-top: 10px;
      cursor: pointer;
      font-size: 14px;
    }
  }
`
