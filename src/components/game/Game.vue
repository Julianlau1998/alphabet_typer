<template>
  <div class="gameWrapper">
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

    <p v-if="!records.length" class="mt-6 is-white">
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

        <div class="column is-3 mt-5 is-white">
            <div class="columns is-justify-content-flex-end mb-0">
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
                {{`${fetchedRecordsIndex+1}. ${record.username}: ${record.record}s`}}
            </p>
        </div>
    </div>
    <ShareModal 
        @closeShareModal="closeShareModal"
        v-if="showShareModal"
        :time="timer.toFixed(2)"
    />
  </div>
</template>

<script>
import ShareModal from '@/components/game/ShareModal.vue'
import Dropdown from '@/components/helpers/Dropdown.vue'
import { mapActions, mapState } from 'vuex'
export default {
    components: {
        ShareModal,
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
                { name: 'Today', value: 1},
                { name: 'This Week', value: 7},
                { name: 'This Month', value: 30},
                { name: 'This Year', value: 365}
            ]
        }
    },
    computed: {
        ...mapState([
            'recordModule'
        ]),
        fetchedRecords () {
            return this.recordModule.records.data
        }
    },
    watch: {
        inputLetter (val) {
            if (val.toLowerCase() === this.alphabet[this.letterPosition]) {
                this.letterPosition++
            }
        }
    },
    created () {
        this.getRecords(false)
        this.getAll({limit: this.limit})
    },
    methods: {
        ...mapActions({
            getAll: 'recordModule/getAll'
        }),
        changeLetter (letter) {
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
                top: 100,
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
            console.log(filter)
            this.getAll({limit: this.limit, filter: filter})
        },
        closeShareModal () {
            this.getAll({limit: this.limit})
            this.showShareModal = false
        }
    }
}
</script>