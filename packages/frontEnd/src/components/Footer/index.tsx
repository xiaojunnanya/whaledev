import { memo } from 'react'
import { FooterStyle } from './style'

export default memo(() => {

  const urlToWeb = (e: any) =>{
    e.preventDefault()
    const { url } = e.target.dataset
    url && window.open(url)
  } 

  return (
    <FooterStyle>
        <div className='footer' onClick={e => urlToWeb(e)}>
          <dl>
            <dt>致谢</dt>
            <dd data-url="https://ant-design.antgroup.com/index-cn">Ant Design</dd>
          </dl>
          <dl>
            <dt>社交媒体</dt>
            <dd data-url="http://www.xiaojunnan.cn/">个人博客</dd>
            <dd data-url="https://github.com/xiaojunnanya">GitHub</dd>
            <dd data-url="https://juejin.cn/user/3633256370537165">掘金</dd>
          </dl>
          <dl>
            <dt>更多</dt>
          </dl>
        </div>
    </FooterStyle>
  )
})