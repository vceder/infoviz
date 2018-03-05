<template>
  <div id="app">
    <Loading/>
    <Particles/>
    <div v-if="!isLoading" class="router-view">
      <router-view/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Loading from '@/components/Loading.vue';
import Particles from '@/components/Particles.vue';
import { mapState } from 'vuex';

export default {
  name: 'app',
  computed: {
    ...mapState(['isLoading']),
  },
  components: {
    Loading,
    Particles,
  },
  mounted() {
    this.$store.dispatch('getTop100');
  },
};
</script>


<style lang="scss">
@import './assets/style/global.scss';
#app {
  height: 100vh;
  width: 100vw;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.router-view {
  width: 100vw;
  height: 90vh;
  top: 0;
  left: 0;
  position: absolute;
}
</style>
