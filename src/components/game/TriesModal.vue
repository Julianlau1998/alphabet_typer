<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-content">
      <h1 class="heading is-white is-size-2">
        You have no more tries
      </h1>
      <p class="is-white">
        Watch an ad to get more tries
      </p>
        <button @click="close()" class="button is-black-border mt-6 mr-5">
            Wait five minutes
        </button>
        <button @click="watchAd()" class="button is-primary-border mt-6">
          Watch Ad
        </button>
    </div>
  </div>
</template>

<script>
export default {
    data () {
        return {}
    },
    methods: {
        close () {
            this.$emit('closeShareModal')
        },
        watchAd () {
          this.$emit('watchAd')
        }
    }
}
</script>