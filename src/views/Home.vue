<template>
  <div class="home">
    <h1 class="heading is-size-1 is-size-3-mobile mt-5 is-secondary">
      Alphabet Typer
    </h1>
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
