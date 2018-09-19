const mockRequest = async () => {
  await new Promise(res => setTimeout(res, 1000))
  return Math.round(Math.random() * 100)
}

export default {
  mockRequest
}