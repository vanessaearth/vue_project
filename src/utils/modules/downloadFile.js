export function downloadBlobFile (res) {
  const blob = new Blob(['\uFEFF' + res.data])
  // const blob = res.data
  // let fileName = res.headers['content-disposition'].split(';')[1].split('=')[1]
  let fileName = 'report.xls'
  fileName = decodeURI(fileName)
  if ('download' in document.createElement('a')) { // 非IE下载
    const elink = document.createElement('a')
    elink.download = fileName
    elink.style.display = 'none'
    elink.href = window.URL.createObjectURL(blob)
    document.body.appendChild(elink)
    elink.click()
    URL.revokeObjectURL(elink.href)
    document.body.removeChild(elink)
  } else { // IE10+下载
    navigator.msSaveBlob(blob, fileName)
  }
}
