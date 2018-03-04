<template>
  <div class="game-plot">
    <div v-bind:style="chartSize" id="game-chart">
      <!-- <div v-for="(game, id) in current.games" :key="id" class="stream" :style="getPosition(id)">
        {{current.games[id].totalViewers}}
      </div> -->
      <!-- <h1>{$route.params.id}</h1> -->

      <router-link to="/about" class="route_button">About</router-link>
      <router-link to="/analytic" class="route_button">Analytic Trail</router-link>
    <Slider/>
    </div>
  </div>
</template>
