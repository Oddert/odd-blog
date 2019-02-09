module.exports = function (body) {
  const oneStr = str => str
    .split(' ')
    .map(e => e.split('\r\n'))
    .reduce((acc, each) => acc = [...acc, ...each], []).length

  let wordCount = body.inputs.reduce((acc, each) => {
    if (each.data_type == 'paragraph') {
      return acc += oneStr(each.text)
    } else if (each.data_typ == 'image') {
      return acc += oneStr(each.caption)
    } else if (each.data_typ == 'quote') {
      return acc += oneStr(each.text)
    }
    return acc
  }, 0)
  wordCount += oneStr(body.title)
  wordCount += oneStr(body.subtitle)
  return wordCount
}
