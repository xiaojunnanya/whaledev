import { memo } from 'react'

import { LoginStyled } from './style'

import LoginModel from './Form/Login'
import AccountModel from './Form/Register'
import ForgetModel from './Form/Forget'

import { useGlobal } from '@/stores/global'

const select: Record<string, JSX.Element> = {
  login: <LoginModel />,
  account: <AccountModel />,
  forget: <ForgetModel />,
}

const Login = memo(() => {
  const { mode } = useGlobal()

  // 遗留的问题：验证码倒计时
  return (
    <LoginStyled>
      <div className="login-body">
        <div className="bg"></div>
        <div className="login-panel">{select[mode]}</div>
      </div>
    </LoginStyled>
  )
})

export default Login
