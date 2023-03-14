<template>
  <!--  <div class="adCard v-card mt-12">
      <div class="ad" v-html="adLink" />
    </div>-->
  <div class="ad" v-html="adLink"/>
</template>

<script>
export default {
  name: "AdCard",
  data() {
    return {
      linkList: [
        '<iframe src="//rcm-na.amazon-adsystem.com/e/cm?o=1&p=288&l=ur1&category=primevideo&banner=121YK2TVQY3WK6QWFBR2&f=ifr&linkID=9a912221d6d751fbfa9685a082f45188&t=jlapps08-20&tracking_id=jlapps08-20" width="320" height="50" scrolling="no" border="0" marginwidth="0" style="border:none;" frameborder="0" sandbox="allow-scripts allow-same-origin allow-popups allow-top-navigation-by-user-activation"></iframe>',
        '<iframe src="//rcm-na.amazon-adsystem.com/e/cm?o=1&p=288&l=ur1&category=amz_music&banner=07BYAWM96W9S4GKJ2B82&f=ifr&linkID=f783969c91f64449ef08cb39747bc17a&t=jlapps08-20&tracking_id=jlapps08-20" width="320" height="50" scrolling="no" border="0" marginwidth="0" style="border:none;" frameborder="0" sandbox="allow-scripts allow-same-origin allow-popups allow-top-navigation-by-user-activation"></iframe>',
        '<iframe src="//rcm-na.amazon-adsystem.com/e/cm?o=1&p=288&l=ur1&category=amazonfashion&banner=0TZ9JY8VCY3R51XPP8G2&f=ifr&linkID=24a19fd4135e2de2df480e2ab632fd44&t=jlapps08-20&tracking_id=jlapps08-20" width="320" height="50" scrolling="no" border="0" marginwidth="0" style="border:none;" frameborder="0" sandbox="allow-scripts allow-same-origin allow-popups allow-top-navigation-by-user-activation"></iframe>',
        '<iframe src="//rcm-na.amazon-adsystem.com/e/cm?o=1&p=42&l=ur1&category=outlet&banner=02TCQTA67MKQ19TDY0G2&f=ifr&linkID=39df3260ded361fee54f5a219a8f1656&t=jlapps08-20&tracking_id=jlapps08-20" width="234" height="60" scrolling="no" border="0" marginwidth="0" style="border:none;" frameborder="0" sandbox="allow-scripts allow-same-origin allow-popups allow-top-navigation-by-user-activation"></iframe>',
        '<iframe src="//rcm-na.amazon-adsystem.com/e/cm?o=1&p=288&l=ur1&category=primewardrobe&banner=0P7DSCVF5N6YPZC6APG2&f=ifr&linkID=2c60eda17f24a760acc77175fb72682f&t=jlapps08-20&tracking_id=jlapps08-20" width="320" height="50" scrolling="no" border="0" marginwidth="0" style="border:none;" frameborder="0" sandbox="allow-scripts allow-same-origin allow-popups allow-top-navigation-by-user-activation"></iframe>',
        '<iframe src="//rcm-na.amazon-adsystem.com/e/cm?o=1&p=42&l=ur1&category=kitchen&banner=09RE3AASKRA6TA2H9K82&f=ifr&linkID=cf0db4fe7c58b021f90e672c78642503&t=jlapps08-20&tracking_id=jlapps08-20" width="234" height="60" scrolling="no" border="0" marginwidth="0" style="border:none;" frameborder="0" sandbox="allow-scripts allow-same-origin allow-popups allow-top-navigation-by-user-activation"></iframe>'
      ]
    }
  },
  computed: {
    adLink() {
      const rand = Math.floor(Math.random() * 6)
      return this.linkList[rand]
    }
  },
}
</script>
