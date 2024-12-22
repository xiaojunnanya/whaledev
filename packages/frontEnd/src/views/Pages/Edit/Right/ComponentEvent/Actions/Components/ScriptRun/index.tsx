import Editor from '@/components/Editor'
import { memo } from 'react'
import { ScriptRunStyled } from './style'
import { Form, FormInstance } from 'antd'
import { generateId } from '@/utils'

interface IProps {
  form: FormInstance
}

export default memo((props: IProps) => {
  const { form } = props

  return (
    <ScriptRunStyled>
      <Form.Item name="scriptRun-run" noStyle>
        <Editor
          file={{
            name: `script${generateId()}.js`,
            value: form.getFieldValue('scriptRun-run') || `function run(){}`,
            language: 'javascript',
          }}
          isMount={false}
          onChange={value => {
            form.setFieldsValue({
              'scriptRun-run': value,
            })
          }}
        ></Editor>
      </Form.Item>
    </ScriptRunStyled>
  )
})
