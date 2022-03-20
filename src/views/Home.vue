<template>
  <div class="home">
    <h1 class="heading is-size-1 is-size-3-mobile mt-5 is-secondary is-italic">
      Type The Alphabet
    </h1>
    <br>
    <p class="text mt-0 is-white is-italic mt-negative-5">
      How fast can you type?
    </p>
    <Game />
  </div>
</template>

<script>
import Game from '@/components/game/Game.vue'
export default {
  name: 'Home',
  metaInfo: {
      title: 'Type The Alphabet',
      titleTemplate: '%s | Type The Alphabet As Fast As You Can',
      htmlAttrs: {
        lang: 'en',
        amp: true
      }
    },
  components: {
    Game
  }
}
</script>
