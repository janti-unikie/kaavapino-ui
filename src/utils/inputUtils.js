const hasError = error => {
  if (!error) {
    return false
  } else if (error.length > 0) {
    return true
  }

  return false
}

export default {
  hasError
}
