exports.handleError = function handleError(
  error,
  filePath = '',
  functionName = ''
){
  console.error(`${filePath} -> ${functionName} -> Error:`, error)
}