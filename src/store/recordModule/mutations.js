export function GET_RECORDS (state) {
  state.records.loading = true
  state.err = null
}

export function RECEIVE_RECORDS (state, payload) {
  state.records.data = payload.records
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