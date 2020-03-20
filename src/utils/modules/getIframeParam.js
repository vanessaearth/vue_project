function getIframeParam (iframeId) {
  var regexpParam = /\??([\w\d%]+)=([\w\d%]*)&?/g // 分离参数的正则表达式
  var targetEle = document.getElementById(iframeId)
  var paramMap = null
  if (targetEle) {
    var url = targetEle.src // 取得iframe的url
    var ret
    paramMap = {}// 初始化结果集
    // 开始循环查找url中的参数，并以键值对形式放入结果集
    while ((ret = regexpParam.exec(url)) != null) {
      // ret[1]是参数名，ret[2]是参数值
      paramMap[ret[1]] = ret[2]
    }
  }

  return paramMap // 返回结果集
}
export default getIframeParam
