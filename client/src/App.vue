<template>
  <div id="app">
    <Loading/>
    <div v-if="!isLoading" class="router-view">
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
// @ is an alias to /src
import Loading from '@/components/Loading.vue';
import { mapState } from 'vuex';

export default {
  name: 'app',
  computed: {
    ...mapState(['isLoading']),
  },
  components: {
    Loading,
  },
  mounted() {
    this.$store.dispatch('getTop100');
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
