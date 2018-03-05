<template>
  <div class="game-plot">
    <!-- <div v-bind:style="chartSize" id="overview-chart"> -->
      <!-- <div v-for="(game, id) in current.games" :key="id" class="stream" :style="getPosition(id)">
        {{current.games[id].totalViewers}}
      </div> -->
      <h1>Game</h1>

      <router-link to="/about" class="route_button">About</router-link>
      <router-link to="/analytic" class="route_button">Analytic Trail</router-link>

      <a href="javascript:history.go(-1)" class="route_button">Go Back</a>


      <!-- Make the following an onclick on the subplot rather than a button.
           Give it the parameter id instead of the string "id" -->
    <Slider/>
    <!-- </div> -->
  </div>
</template>
<script>
export default {
  name: 'Game',
  mounted() {
    console.log('Game Mounted');
  },
};
</script>

<style scoped lang="scss">
  
</style>
