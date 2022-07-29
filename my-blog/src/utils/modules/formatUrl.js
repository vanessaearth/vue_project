// 删除url的 回车r,换行n
function formatUrl (url) {
  let result = ''
  result = url.replace(/[\r\n]/g, '')
  result = url.trim()
  return result
}
export default formatUrl
