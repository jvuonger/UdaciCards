export function listFormattedData(obj) {
  let dataArray = []
  for (const [key, value] of Object.entries(obj)) {
    dataArray.push({key,...value})
  }
  return dataArray
}