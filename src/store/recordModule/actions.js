import axios from 'axios'

let host = 'https://api.alphabet-typer.com'
if (process.env.VUE_APP_ENV === "DEV") {
  host = ''
}

export async function getAll ({ commit }, {limit=10, filter=0}) {
  return new Promise((resolve, reject) => {
    commit('GET_RECORDS')
    axios
      .get(`${host}/api/records?limit=${limit}&filter=${filter}`)
      .then(response => {
        commit('RECEIVE_RECORDS', {records: response.data})
        resolve()
      })
      .catch(err => {
        console.log(err)
        reject()
      })
    })
}

export function store ({ commit }, record) {
  return new Promise((resolve, reject) => {
    commit('POST_RECORD', record)
    axios
      .post(`${host}/api/records`, record)
      .then(response => {
        commit('RECORD_POSTED', response.data)
        resolve()
      })
      .catch(function (error) {
        console.log(error)
        reject()
      })
    })
  }