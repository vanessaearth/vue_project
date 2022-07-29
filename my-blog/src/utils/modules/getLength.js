// 获取汉子和英文的字符长度
function getLength (str) {
  let realLength = 0; const len = str.length; let charCode = -1
  for (let i = 0; i < len; i++) {
    charCode = str.charCodeAt(i)
    if (charCode >= 0 && charCode <= 128) {
      realLength += 1
    } else {
      realLength += 2
    }
  }
  return realLength
}
export default getLength
