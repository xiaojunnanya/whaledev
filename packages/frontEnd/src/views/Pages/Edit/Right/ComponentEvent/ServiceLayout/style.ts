import styled from 'styled-components'

export const ServiceLayoutStyled = styled.div`
  .viewer {
    width: auto;
    height: calc(100vh - 65px);
    margin: -24px;
    background-color: ${props => props.theme.defaultColor.grey};
    cursor: grab;
  }

  .container {
    display: flex;
    justify-content: center;
    padding: 20px;
    width: 100%;
    height: 100%;

    // 所有节点均设置flex布局
    .start-node,
    .normal-node,
    .condition-node,
    .result-node,
    .end-node {
      position: relative;
      display: flex;
      align-items: center;
    }

    .start-node,
    .normal-node,
    .condition-node {
      // 添加节点容器
      .add-node-btn {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        width: 80px;
        height: 70px;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2;
        &:hover {
          .add-icon {
            opacity: 1;
            visibility: visible;
            width: 20px;
            height: 20px;
          }
        }
        // 添加按钮图标
        .add-icon {
          position: relative;
          display: flex;
          justify-content: center;
          transition: all 0.3s;
          width: 0;
          height: 0;
          border-radius: 50%;
          cursor: pointer;
          background-color: ${props => props.theme.primaryColor[700]};
          opacity: 0;
          visibility: hidden;
          &:hover {
            .popover {
              visibility: visible;
              opacity: 1;
              transform: scale(1);
            }
          }
        }
        // 添加图标popover浮层
        .popover {
          transition: all 0.3s;
          position: absolute;
          left: 20px;
          top: -21px;
          width: 80px;
          background-color: ${props => props.theme.defaultColor.black};
          padding: 5px;
          border-radius: 5px;
          font-size: 12px;
          visibility: hidden;
          opacity: 0;
          transform: scale(0);
          a {
            display: block;
            line-height: 26px;
            text-align: center;
            color: ${props => props.theme.defaultColor.white};
            &:hover {
              color: ${props => props.theme.primaryColor[700]};
            }
          }
        }
      }
    }

    .start-node {
    }

    .normal-node {
      .node-info {
        position: relative;
        width: 150px;
        min-height: 70px;
        padding: 10px;
        /* border: 2px solid transparent; */
        box-shadow: 0 1px 4px 0 rgba(10, 30, 65, 0.16);
        border-radius: 8px;
        cursor: pointer;
        background-color: ${props => props.theme.defaultColor.grey};
        &.success {
          background-color: ${props => props.theme.defaultColor.success};
          color: ${props => props.theme.defaultColor.white};
        }
        &.fail {
          background-color: ${props => props.theme.defaultColor.error};
          color: ${props => props.theme.defaultColor.white};
        }
        .title {
          font-size: 14px;
          font-weight: 600;
        }
        .content {
          font-size: 12px;
          padding: 5px;
          padding-left: 0;
          margin-top: 5px;
          border-radius: 4px;
        }
        .icon-del {
          position: absolute;
          right: 5px;
          top: 5px;
          visibility: hidden;
          opacity: 0;
          transition: all 0.3s;
          &:hover {
            color: ${props => props.theme.defaultColor.error};
          }
        }
        &:hover {
          .icon-del {
            visibility: visible;
            opacity: 1;
          }
        }
      }
    }

    // 条件节点样式
    .condition-node {
      position: relative;
      display: flex;
      align-items: center;
      > .title {
        position: absolute;
        left: -35px;
        width: 70px;
        height: 35px;
        line-height: 35px;
        border-radius: 35px;
        text-align: center;
        background: ${props => props.theme.primaryColor[700]};
        cursor: pointer;
        color: ${props => props.theme.defaultColor.white};
      }
      .node-list {
        .node-item {
          padding-inline: 60px;
          padding-block: 30px;
          padding-right: 0;
          position: relative;
          .left-line,
          .right-line {
            position: absolute;
            width: 2px;
            height: 50%;
            left: 0;
            top: 0;
            background-color: ${props => props.theme.primaryColor[700]};
          }
          .left-line {
            &.start {
              top: 50%;
            }
            &.center {
              height: 100%;
            }
          }
          .right-line {
            &.start {
              top: 50%;
              left: 100%;
            }
            &.center {
              left: 100%;
              height: 100%;
            }
            &.end {
              left: 100%;
            }
          }
          .connect-line {
            position: absolute;
            width: 60px;
            height: 2px;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            background-color: ${props => props.theme.primaryColor[700]};
          }
          .normal-container {
            display: flex;
            align-items: center;
            .normal-node {
              flex: 1;
              &:last-child {
                .arrow-line {
                  transform: translateX(2px);
                  &::after {
                    border: none;
                    transform: translateX(2px);
                  }
                }
              }

              .add-node-btn {
                // 170 是小容器的宽度
                width: calc(100% - 170px);
              }
            }
            .arrow-line {
              flex: 1;
            }
          }
        }
      }
    }

    .result-node {
    }

    .end-node {
    }

    // 开始节点
    .circle-btn {
      width: 60px;
      height: 60px;
      line-height: 60px;
      border-radius: 30px;
      box-shadow: 0 1px 5px 0 rgba(10, 30, 65, 0.8);
      color: ${props => props.theme.defaultColor.white};
      text-align: center;
      background: ${props => props.theme.primaryColor[700]};
      cursor: pointer;
      // 结束节点变灰
      &.gray {
        background: ${props => props.theme.defaultColor.grey};
        color: ${props => props.theme.defaultColor.black};
      }
    }
    // 箭头样式
    .arrow-line {
      position: relative;
      width: 80px;
      user-select: none;
      &::before,
      &::after {
        position: absolute;
        content: '';
        transform: translateY(-50%);
      }
      &::before {
        width: 100%;
        height: 2px;
        background-color: ${props => props.theme.primaryColor[700]};
      }
      &::after {
        width: 0;
        height: 0;
        border-left: 10px solid ${props => props.theme.primaryColor[700]};
        border-top: 6px solid transparent;
        border-bottom: 6px solid transparent;
        right: 0;
      }
    }
  }
`
