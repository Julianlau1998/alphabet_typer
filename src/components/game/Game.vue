<template>
  <div class="gameWrapper">
      <h1 v-if="iOS" class="is-secondary mt-3 is-tries">
        {{ tries }}
      </h1>
      <span v-if="showCountdown && !watchAdClicked && iOS">
        <p class="text mt-0 is-white mt-5">
          New tries in {{ countdown }}s
        </p>
        <button @click="watchAd()" class="button is-third-border mt-5">
          GetMoreTries
        </button>
      </span>
      <h1
        class="heading is-primary"
        :class="letterPosition >= 26 ? 'is-size-1' : 'is-large'"
      >
          {{ alphabet[letterPosition] }}
      </h1>
      <input
        class="is-custom-input"
        @input="changeLetter($event.data)"
        :value="inputLetter"
        type="text"
        placeholder="Start The Alphabet"
        ref="letterInput"
        @click="scrollDown"
        @keydown.enter = reset
        autofocus
    >
    <h3 class="heading is-size-1 mt-4 is-primary">
        {{ timer.toFixed(2) }}
        <i class="fas fa-stopwatch"></i>
    </h3>
    <button class="button is-secondary-border mt-4" @click="reset">
        Reset
        <i class="fas fa-eraser ml-2" @click="reset()"></i>
    </button>

    <p v-if="!records.length" class="mt-6 is-white px-3">
        How fast can you type the letters of the alphabet?
        Just start with an 'A' and the timer will start to.
    </p>
    <div class="columns is-justify-content-center has-text-start mt-5">
        <div v-if="records.length" class="column is-3 mt-5 is-white">
            <h1 class="heading is-size-4 is-fourth is-italic">
                Your <br> Records:
            </h1>
            <p
                v-for="(record, recordsIndex) in records"
                :key="recordsIndex"
                class="text"
            >
                {{`${recordsIndex+1}. ${record}s` }}
            </p>
        </div>

        <div class="column is-3 mt-5 is-white pb-30">
            <div class="columns is-justify-content-flex-end mb-0 ">
                <div class="column is-8">
                    <h1 class="heading is-size-4 is-third is-italic mb-negative-2">
                        All <br> Records:
                    </h1>
                </div>
                <div class="column is-2">
                    <Dropdown
                        @setFilter="setFilter"
                        :options="recordOptions"
                    />
                </div>
            </div>
            <p
                v-for="(record, fetchedRecordsIndex) in fetchedRecords"
                :key="fetchedRecordsIndex"
                class="text"
            >
                {{ `${fetchedRecordsIndex+1}. ${record.username}: ${record.record}s` }}
            </p>
            <p
                v-if="loadMoreAvailable && fetchedRecords.length < 100"
                class="is-primary is-pointer mb-2 mt-2"
                @click="loadMore"
            >
                Load More
                <i class="fas fa-angle-down" />
            </p>
        </div>
    </div>
<!--    <button
        v-if="shareAvailable && !iOS"
        @click="recommend"
        class="button is-fourth-border is-external-button-first px-5 py-5 mx-4 mb-6"
    >
      Share this App
      <i class="fas fa-share ml-4 is-secondary" />
    </button>
    <button
        v-if="!iOS"
        @click="linkToStorePage()"
        class="button is-fourth-border is-external-button-second px-5 py-5 mx-4 mb-6"
    >
      Rate this App
    </button>-->

    <ShareModal
        @closeShareModal="closeShareModal"
        v-if="showShareModal"
        :time="timer.toFixed(2)"
    />
    <TriesModal
        @closeShareModal="closeTriesModal"
        @watchAd="watchAd"
        v-if="showNoTriesModal"
    />
  </div>
</template>

<script>
import ShareModal from '@/components/game/ShareModal.vue'
import TriesModal from '@/components/game/TriesModal'
import Dropdown from '@/components/helpers/Dropdown.vue'
import { mapActions, mapState } from 'vuex'
export default {
    name: 'Game-view',
    components: {
        ShareModal,
        TriesModal,
        Dropdown
    },
    data () {
        return {
            letterPosition: 0,
            alphabet: [
                'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','Hooray!!!'
            ],
            inputLetter: '',
            timer: 0.00,
            started: false,
            stopTimer: false,
            recordsSet: false,
            records: [],
            showShareModal: false,
            limit: '10',
            recordOptions: [
                { name: 'All Time', value: 0},
                { name: 'Last Day', value: 1},
                { name: 'Last Week', value: 7},
                { name: 'Last Month', value: 30},
                { name: 'Last Year', value: 365}
            ],
            filter: '',
            shareAvailable: false,
            offset: 0,
            tries: 2,
            showNoTriesModal: false,
            dateOfTries: '',
            countdown: 300,
            totalWaitTime: 300,
            interval: {},
            watchAdClicked: false
        }
    },
    computed: {
        ...mapState([
            'recordModule'
        ]),
        iOS () {
          return window.webkit && window.webkit.messageHandlers.toggleMessageHandler
        },
        fetchedRecords () {
            return this.recordModule.records.data
        },
        loadMoreAvailable () {
            return this.recordModule.records.load_more
        },
        username () {
            return this.$store.state.username
        },
        showCountdown () {
          return this.countdown > 0 && this.countdown < this.totalWaitTime && this.iOS
        }
    },
    watch: {
        inputLetter (val) {
            if (val.toLowerCase() === this.alphabet[this.letterPosition]) {
                this.letterPosition++
            }
        },
        countdown (val) {
          if (val <= 0) {
            clearInterval(this.interval)
            this.tries = 5
            this.setTriesInStorage()
          }
        }
    },
    created () {
        if(navigator.share !== undefined) {
            this.shareAvailable = true
        }
        this.getRecords(false)
        this.getAll({limit: this.limit, filter: this.filter, offset: this.offset})

        this.dateOfTries = JSON.parse(localStorage.getItem('timestamp'))
        if (this.dateOfTries === null || this.dateOfTries === '') this.dateOfTries = new Date(Date.now())

        this.getTriesFromStorage()
        this.startCountdown()
    },
    mounted () {
        this.getRecords(false)
        this.getAll({limit: this.limit, filter: this.filter, offset: this.offset})
    },
    methods: {
        ...mapActions({
            getAll: 'recordModule/getAll'
        }),
        changeLetter (letter) {
            if (this.tries <= 0 && this.iOS) {
              this.showNoTriesModal = true
              return
            }
            if (letter === null) return
            letter = letter.slice(-1)
            if (!this.started) this.startTimer()
            if (this.alphabet.includes(letter.toLowerCase())) {
                this.inputLetter = letter
            }
            if (this.letterPosition >= this.alphabet.length-2) {
                this.stopTimer = true
                if (!this.recordsSet) this.getRecords(true)
            }
        },
        startTimer () {
            this.tries -= 1
            this.setTriesInStorage()
            this.stopTimer = false
            this.started = true
            const timerInterval = setInterval(() => {
                if (this.stopTimer) {
                    clearInterval(timerInterval)
                    this.started = false
                    this.stopTimer = false
                } else {
                    this.timer += 0.01
                }
            },10)
        },
        reset () {
            if (this.showShareModal) return
            this.$refs.letterInput.focus()
            this.stopTimer = true
            this.letterPosition = 0
            this.timer = 0.00
            this.started = false
            this.inputLetter = ''
            this.recordsSet = false
            this.scrollDown()
        },
        scrollDown () {
            window.scroll({
                top: 110,
                behavior: "smooth"
            });
        },
        getRecords (editRecords) {
            this.records = JSON.parse(localStorage.getItem('records'))
            if (this.records === undefined || this.records === null) this.records = []
            if (editRecords) this.editRecords()
        },
        editRecords () {
            if (this.records.length <5) {
                this.records.push(this.timer.toFixed(2))
            } else if (this.timer < this.records[4]) {
                this.records[4] = this.timer.toFixed(2)
            } else {
                return
            }
            for (let i=0; i<this.records.length; i++) {
                this.records[i] = parseFloat(this.records[i])
            }
            this.recordsSet = true
            this.records = this.records.sort(function(a, b){return a-b});
            this.storeRecords(this.records)
        },
        storeRecords () {
            localStorage.setItem('records', JSON.stringify(this.records))
            this.showShareModal = true
        },
        setFilter (filter) {
            this.filter = filter
            this.offset = 0
            this.getAll({limit: this.limit, filter: filter})
        },
        loadMore () {
            this.offset += 10
            this.getAll({limit: this.limit, filter: this.filter, offset: this.offset})
        },
        closeShareModal () {
            this.getAll({limit: this.limit, filter: this.filter})
            this.showShareModal = false
            this.$refs.letterInput.focus()
        },
        closeTriesModal () {
          this.showNoTriesModal = false
          if (this.countdown >= 300 || this.countdown <= 0) this.startCountdown()
        },
        startCountdown () {
          if (this.tries === 0) {
            let timePassed = parseInt(new Date(Date.now()) - new Date(this.dateOfTries).getTime()) / 1000
            timePassed = Math.round(timePassed)
            if (timePassed >= this.totalWaitTime) {
              this.tries = 5
              this.setTriesInStorage()
            } else {
              this.countdown = this.totalWaitTime - timePassed
              this.interval = setInterval(() => {
                this.countdown -= 1
              }, 1000)
            }
          }
        },
        watchAd () {
          if (this.iOS && window.webkit.messageHandlers.toggleMessageHandler) {
            window.webkit.messageHandlers.toggleMessageHandler.postMessage({
              "message": 'Trigger reward-ad:'
            });
          }

          this.watchAdClicked = true
          this.showNoTriesModal = false
          setTimeout(() => {
            this.tries += 3
            this.setTriesInStorage()
            this.countdown = 0
            this.watchAdClicked = false
            this.reset()
          },10000)
        },
        getTriesFromStorage () {
          this.tries = JSON.parse(localStorage.getItem('tries'))
          if (this.tries === null) this.tries = 5
        },
        setTriesInStorage () {
          localStorage.setItem('tries', JSON.stringify(this.tries))
          localStorage.setItem('timestamp', JSON.stringify(new Date(Date.now())))
          this.dateOfTries = Date.now()
        },
        recommend () {
            navigator.share({
                "title": 'How fast can You type the alphabet? Test your Typing skills with Alphabet Typer',
                "text": !this.iOS ? 'https://play.google.com/store/apps/details?id=com.alphabet_typer.app' : 'https://apps.apple.com/us/app/alphabet-typer/id1610788763'
            })
        },
        linkToStorePage () {
            window.location.href='https://play.google.com/store/apps/details?id=com.alphabet_typer.app&gl=DE'
        }
    }
}
</script>
