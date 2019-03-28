function info(message: string);
function info(data: any, message: string);
function info(dataOrMessage: any, maybeMessage?: string) {
  let data: any = {}
  let message: string
  if (typeof dataOrMessage === 'object' && typeof maybeMessage === 'string') {
    data = dataOrMessage
    message = maybeMessage
  } else  if (typeof dataOrMessage === 'string') {
    data = {}
    message = dataOrMessage
  }
  data.msg = message
  const logEntry = JSON.stringify(data)
  console.info(logEntry)
}

function error(message: string);
function error(data: any, message: string);
function error(dataOrMessage: any, maybeMessage?: string) {
  let data: any = {}
  let message: string
  if (typeof dataOrMessage === 'object' && typeof maybeMessage === 'string') {
    data = dataOrMessage
    message = maybeMessage
  } else  if (typeof dataOrMessage === 'string') {
    data = {}
    message = dataOrMessage
  }
  const error = data.error
  data.errorMessage = error.message
  data.errorStack = error.stack
  data.msg = message
  const logEntry = JSON.stringify(data)
  console.error(logEntry)
}

export { info, error }
