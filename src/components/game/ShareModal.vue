git branch -M main<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-content">
        <h1 class="heading is-white is-size-2">
            New Record!
            <br>
            {{time}}
        </h1>
        <p @click="share()" class="text is-white mt-5 is-share-text">
            Share Youre Result
            <i class="fas fa-share ml-2 is-secondary"></i>
        </p>
        <button @click="close()" class="button is-primary-border mt-6">
            Close
        </button>
    </div>
    <button @click="close()" class="modal-close is-large" aria-label="close"></button>
  </div>
</template>

<script>
export default {
    props: {
        time: {
            required: true,
            type: String
        }
    },
    methods: {
        close () {
            this.$emit('closeShareModal')
        },
        share () {
            var url = "https://alphabet-typer.netlify.app"
            var text = `I Just typed the alphabet in ${this.time} seconds. How fast can you go?`
            window.open('http://twitter.com/share?url='+encodeURIComponent(url)+'&text='+encodeURIComponent(text), '', 'left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0')
        }
    }
}
</script>