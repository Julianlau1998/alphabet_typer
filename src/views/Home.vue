<template>
  <div class="home">
    <h1 class="heading is-size-1 is-size-3-mobile mt-5 is-secondary is-italic">
      Alphabet Typer
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
  components: {
    Game
  }
}
</script>
