<template>
  <div id="app">
    <particles/>
    <Loading/>
    <div v-if="!isLoading" class="router-view">
      <!-- <router-view/> -->
      <router-view/>
    </div>
    <div class="slider-container">
      <div id="slider">
        <Slider/>
      </div>
    </div>
  </div>
</template>

<script>


// @ is an alias to /src
import Loading from '@/components/Loading.vue';
import particles from '@/components/Particles.vue';
import { mapState } from 'vuex';
import Slider from '@/components/Slider.vue'


export default {
  name: 'app',
  computed: {
    ...mapState(['isLoading']),
  },
  components: {
    Loading,
    Slider,
    particles

  },
  mounted() {
    this.$store.dispatch('getTop100');
  },
};
</script>


<style lang="scss">

@import url(http://fonts.googleapis.com/css?family=Lato:300,400,700);
body {
  width:100%;
  height:auto;
  background: black;
  position:absolute;
  border:0px;
  margin:0px;
  padding:0px;
  left:0px;
  top:0px;
  font-family: Lato;
  z-index: -99999;
  overflow: hidden;
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

.route_button{
  color: #3CDCA0;
  text-decoration: none;
  font-weight: bold;
  font-size: 40px;
  margin: 20px;
}
</style>
