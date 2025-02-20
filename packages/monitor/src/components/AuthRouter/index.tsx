import { useGlobal } from '@/stores/global'
import { useLocation, Navigate } from 'react-router-dom'

export default (props: { children: JSX.Element }) => {
  const { pathname } = useLocation()
  const { setMessage } = useGlobal()

  const go = Boolean(pathname === '/login' || pathname === '/')
  const token = localStorage.getItem('token')

  if (go) {
    return props.children
  }

  if (!token) {
    setMessage({ type: 'error', text: '您暂未登录，请先登录' })
    return <Navigate to="/login"></Navigate>
  }

  return props.children
}
