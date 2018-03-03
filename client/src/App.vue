<template>
  <div id="app">
    <div class="router-view">
      <router-view/>
    </div>
    <div class="slider-container">
      <div id="slider">
        <p>Slider</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'app',
  computed: {
    ...mapState(['menu']),
  },
  mounted() {
    //this.$store.dispatch('getLatestData');
  },
};
</script>


<style lang="scss">
@import './assets/style/global.scss';

.slider-container {
  z-index: 100;
  position: fixed;
  bottom: 2vh;
  left: 2vw;
  width: 96vw;
  background-color: grey;
  height: 6vh;
  border-radius: 10px;
}

.router-view {
  width: 100vw;
  height: 90vh;
  top: 0;
  left: 0;
  position: absolute;
}
</style>
