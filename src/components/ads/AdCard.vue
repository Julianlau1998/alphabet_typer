<template>
<!--  <div class="adCard v-card mt-12">
    <div class="ad" v-html="adLink" />
  </div>-->
  <div class="ad" v-html="adLink" />
</template>

<script>
export default {
  name: "AdCard",
  computed: {
    adLink () {
      return '<iframe src="https://rcm-eu.amazon-adsystem.com/e/cm?o=2&p=42&l=ur1&category=amazongeneric&banner=1SSZXMV91WA8E5ZECC02&f=ifr&linkID=5adc81a760a4f5eead519a4e25dbdbf7&t=jlapps08-21&tracking_id=jlapps08-21" width="234" height="60" scrolling="no" border="0" marginwidth="0" style="border:none;" frameborder="0" sandbox="allow-scripts allow-same-origin allow-popups allow-top-navigation-by-user-activation"></iframe>'
    }
  },
}
</script>
