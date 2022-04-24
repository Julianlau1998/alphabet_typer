export function GET_RECORDS (state) {
  state.records.loading = true
  state.records.load_more = true
  state.err = null
}

export function RECEIVE_RECORDS (state, payload) {
  if (payload.records.length < 10) {
    state.records.load_more = false
  }
  if (payload.offset > 0) {
    payload.records.forEach(record => {
      state.records.data.push(record)
    })
  } else {
    state.records.data = payload.records
  }
  state.records.loading = false
}

export function POST_RECORD (state) {
  state.records.submitting = true
  state.err = null
}
export function RECORD_POSTED (state) {
  //state.records.data.unshift(topic)
  state.records.submitting = false
}