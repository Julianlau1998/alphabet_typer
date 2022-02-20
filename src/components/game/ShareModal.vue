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
        <div v-if="!submitted" class="columns mt-5 is-justify-content-center">
            <div class="column is-5">
                <input
                    v-model="username"
                    type="text"
                    class="input is-custom-input"
                    placeholder="Usersame"
                    @keydown.enter="submitRecord"
                    maxlength="15"
                >
            </div>
            <div class="column is-2">
                <button
                    @click="submitRecord"
                    type="submit"
                    class="button is-primary"
                >
                    Submit Your Result
                </button>
            </div>
        </div>
        <button @click="close()" class="button is-primary-border mt-6">
            Close
        </button>
    </div>
    <button
        @click="close()"
        class="modal-close is-large"
        aria-label="close"
    >
        Close
    </button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    props: {
        time: {
            required: true,
            type: String
        }
    },
    data () {
        return {
            username: '',
            submitted: false
        }
    },
    methods: {
        ...mapActions({
            storeRecord: 'recordModule/store'
        }),
        close () {
            this.$emit('closeShareModal')
        },
        share () {
            var url = "https://alphabet-typer.netlify.app"
            var text = `I Just typed the alphabet in ${this.time} seconds. How fast can you go?`
            window.open('http://twitter.com/share?url='+encodeURIComponent(url)+'&text='+encodeURIComponent(text), '', 'left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0')
        },
        submitRecord () {
            this.storeRecord({
                record:   parseFloat(this.time),
                username: this.username
            })
                .then(() => {
                    this.submitted = true
                    this.$emit('submitted')
                })
        }
    }
}
</script>