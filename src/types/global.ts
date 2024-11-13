declare global {
  interface Window {
    env: {
      REACT_APP_FAKEAPI_API_URL: string
    }
  }
}