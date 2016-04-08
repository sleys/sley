import fetch from 'isomorphic-fetch'

const host = __DEVTOOLS__ ? 'http://localhost:4000/api' : '//localhost:4000/api'

export default function callFetch (endpoint, options = options) {
  const fullUrl = (endpoint.indexOf(host) === -1) ? host + endpoint : endpoint

  return fetch(fullUrl, options)
    .then(response => {
      return response.json().then(json => ({ json, response }))
    })
    .then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json.mate.message)
      }
      if (json.mate.status !== 'ok') {
        return Promise.reject(json.mate.message)
      }
      return {
        mate: json.mate,
        response: json.response
      }
    }, error => {
      console.error(error)
      return { error: 'Something bad happened' }
    })
}
