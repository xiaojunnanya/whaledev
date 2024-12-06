import styled from 'styled-components'

export const DescribeStyled = styled.div`
  .title {
    font-size: 14px;
    margin: 0;
  }

  .describe {
    font-size: 12px;
    color: ${props => props.theme.defaultColor.grey3};
  }

  .hr {
    margin: 20px 0;
    opacity: 0.3;
  }
`
