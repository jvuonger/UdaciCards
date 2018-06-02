export function listFormattedData(results) {
  let obj = JSON.parse(results)
  let dataArray = []

  if(obj === null || obj === 'undefined') return []
  
  for (const [key, value] of Object.entries(obj)) {
    dataArray.push({key,...value})
  }

  return dataArray
}