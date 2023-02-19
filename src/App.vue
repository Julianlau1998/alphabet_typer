<template>
  <div id="app">
    <router-view/>
    <AdCard v-if="!iOS" />
  </div>
</template>

<script>
import AdCard from "@/components/ads/AdCard"

export default {
  components: { AdCard },
  data () {
    return {
      iOS: false
    }
  },
  created () {
    this.iOS = [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod'
    ].includes(navigator.platform) || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
