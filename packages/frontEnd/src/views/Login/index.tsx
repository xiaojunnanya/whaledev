import { memo } from 'react'

import { LoginStyled } from './style'

import LoginModel from './Form/Login'
import AccountModel from './Form/Register'
import ForgetModel from './Form/Forget'

import { useGlobal } from '@/stores/global'

const Login = memo(() => {
  const { mode } = useGlobal()

  let showContainer = <></>

  switch (mode) {
    case 'login':
      showContainer = <LoginModel></LoginModel>
      break
    case 'account':
      showContainer = <AccountModel></AccountModel>
      break
    case 'forget':
      showContainer = <ForgetModel></ForgetModel>
      break
    default:
      showContainer = <LoginModel></LoginModel>
      break
  }

  return (
    <LoginStyled>
      <div className="login-body">
        <div className="bg"></div>
        <div className="login-panel">{showContainer}</div>
      </div>
    </LoginStyled>
  )
})

export default Login
