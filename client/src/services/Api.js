import axios from 'axios'

export default() => {
  if (process.env.NODE_ENV === 'development') {
    return axios.create({
      baseURL: 'http://localhost:8081/'
    })
  }
  if (process.env.NODE_ENV === 'production') {
    return axios.create({
      baseURL: 'https://cayena-v1.herokuapp.com/' //replace by localhost if you want to build for local tests.
    })
  }
  // baseURL: process.env.VUE_APP_BASE_URL
}
