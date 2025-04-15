import { memo } from 'react'
import { FooterStyle } from './style'
import { OUTWEBURL, SELFWEBURL } from '@/assets/defaultData'

export default memo(() => {
  const urlToWeb = (e: any) => {
    e.preventDefault()
    const { url } = e.target.dataset
    url && window.open(url)
  }

  return (
    <FooterStyle>
      <div className="footer" onClick={e => urlToWeb(e)}>
        <dl>
          <dt>致谢</dt>
          <dd data-url={OUTWEBURL.react}>React</dd>
          <dd data-url={OUTWEBURL.antd}>Ant Design</dd>
          <dd data-url={OUTWEBURL.antdx}>Ant Design X</dd>
        </dl>
        <dl>
          <dt>社交媒体</dt>
          <dd data-url={SELFWEBURL.blog}>个人博客</dd>
          <dd data-url={SELFWEBURL.github}>GitHub</dd>
          <dd data-url={SELFWEBURL.juejin}>掘金</dd>
        </dl>
        <dl>
          <dt>更多</dt>
        </dl>
      </div>
    </FooterStyle>
  )
})
