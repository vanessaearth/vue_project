// 获取汉子和英文的字符长度
function getLength (str) {
  var realLength = 0; var len = str.length; var charCode = -1
  for (var i = 0; i < len; i++) {
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
