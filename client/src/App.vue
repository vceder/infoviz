<template>
  <div id="app">
    <map-view/>
    <div id="menu">
      <div :class="{'open': (menu === true)}" class="menu-router-view">
        <router-view/>
      </div>
      <div class="menu-toggle">
        <button @click="$store.commit('setMenu', (!menu))">Menu</button>
      </div>
    </div>
    <div id="slider">
      <p>Slider</p>
    </div>
  </div>
</template>

<script>
import mapView from '@/components/mapView.vue';
import { mapState } from 'vuex';

export default {
  name: 'app',
  components: {
    mapView,
  },
  computed: {
    ...mapState(['menu']),
  },
  mounted() {
    this.$store.dispatch('getLatestData');
  },
};
</script>


<style lang="scss">
body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  width: 100vw;
}

#slider {
  z-index: 100;
  position: fixed;
  bottom: 2vh;
  left: 2vw;
  width: 96vw;
  background-color: white;
  height: 5vh;
  border-radius: 10px;
}

#menu {
  z-index: 100;
  position: fixed;
  top: 2vh;
  left: 0;
  display: flex;
  justify-content: center;
  flex-direction: row;
  height: 89vh;
  .menu-toggle {
    margin-left: 1vw;
    button {
      height: 50px;
      min-width: 50px;
      border-radius: 10px;
      background-color: white;
      border-style: none;
    }
  }
}

.menu-router-view {
  display: flex;
  margin-left: 0;
  justify-content: center;
  flex-direction: column;
  background-color: white;
  border-radius: 10px;
  width: 0;
  overflow: hidden;
  transition: 500ms ease-in-out;
}

.open {
  margin-left: 2vw;
  width: 22vw;
}
</style>
