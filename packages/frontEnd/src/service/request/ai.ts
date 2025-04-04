// 获取ai回复
export const getAiTream = async (
  data: {
    messages: { content: string; role: string }[]
  },
  onChunk: (text: string) => void,
  onDone: () => void,
  onError: (err: any) => void,
) => {
  try {
    const response = await fetch('/whaledev/ai/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + localStorage.getItem('TOKEN'),
      },
      body: JSON.stringify(data),
    })

    const reader = response.body?.getReader()
    const decoder = new TextDecoder('utf-8')

    while (true) {
      const { value, done } = await reader!.read()
      if (done) break
      const text = decoder.decode(value)
      onChunk(text)
    }

    onDone()
  } catch (err) {
    onError(err)
  }
}
