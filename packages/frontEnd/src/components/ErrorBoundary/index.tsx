import { SELFWEBURL } from '@/assets/defaultData'
import { Button, Result } from 'antd'
import { Component, ErrorInfo, ReactNode } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    console.error(error, 'error')
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(error, errorInfo)
    // 可以进行错误上报
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <Result
            status="500"
            title="页面异常"
            subTitle="您可以尝试以下操作"
            extra={
              <>
                <Button type="primary" onClick={() => window.location.reload()}>
                  刷新页面
                </Button>
                <Button onClick={() => window.open(SELFWEBURL.projectGithub)}>
                  联系我们
                </Button>
              </>
            }
          />
        </>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
