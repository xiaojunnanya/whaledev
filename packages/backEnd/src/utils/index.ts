export function formatDate() {
  const time = new Date()
  const year = foo(time.getFullYear())
  const month = foo(time.getMonth() + 1)
  const day = foo(time.getDate())
  const hours = foo(time.getHours())
  const minute = foo(time.getMinutes())
  const second = foo(time.getSeconds())

  return `${year}-${month}-${day} ${hours}:${minute}:${second}`
}

function foo(num: number) {
  return num < 10 ? '0' + num : num
}
