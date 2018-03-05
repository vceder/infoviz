<template>
<div id="particles-js"></div>
</template>

<script>
import { mapState } from 'vuex';
import particlesSettings from '../assets/js/particlesSettings.js';
require('particles.js');

export default {
  name: 'Particles',
  data() {
    return {
      settings: particlesSettings,
    };
  },
  computed: {
    ...mapState(['starCount']),
  },
  watch: {
    starCount() {
      if (this.starCount !== 0) {
        this.initParticles();
      }
    },
  },
  methods: {
    initParticles() {
      console.log('Star count: ', Math.round(this.starCount / 1000));
      this.settings.particles.number.value = Math.round(this.starCount / 1000);
      particlesJS('particles-js', this.settings);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#particles-js {
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0px;
  top: 0px;
  z-index: -1;
}
</style>
