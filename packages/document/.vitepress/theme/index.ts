// .vitepress/theme/index.ts
import Theme from 'vitepress/theme'
import './styles.css'

import TeamMember from '../components/TeamMember.vue' // 路径看情况修改

export default {
  ...Theme,
  enhanceApp({ app }) {
    app.component('TeamMember', TeamMember)
  },
}
