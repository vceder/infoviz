<template>
  <div class="overview-plot">
    <div v-bind:style="chartSize" id="overview-chart">
      <div v-for="(game, id) in current.games" :key="id" class="stream" :style="getPosition(id)">
        {{current.games[id].totalViewers}}
      </div>
      <h1 style="color:white">This is overview</h1>
      <router-link to="/about" class="route_button">About</router-link>
      <router-link to="/analytic" class="route_button">Analytic Trail</router-link>
      <!-- <a href="javascript:history.go(-1)" class="route_button"> Go Back</a> -->
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex';
import * as d3 from 'd3';

export default {
  name: 'overview',
  data() {
    return {
      chartWidth: document.documentElement.clientWidth * 0.9,
      chartHeight: document.documentElement.clientHeight * 0.8,
    };
  },
  computed: {
    chartSize() {
      return {
        width: String(this.chartWidth) + 'px',
        height: String(this.chartHeight) + 'px',
      };
    },
    ...mapState(['current']),
  },
  mounted() {
    console.log('Mounted');
  },
  methods: {
    getPosition(id) {
      const xScale = d3
        .scalePoint()
        .domain(Object.keys(this.current.games))
        .padding(0)
        .range([0, this.chartWidth - 100]);

      const yScale = d3
        .scaleLinear()
        .domain(
          d3.extent(Object.keys(this.current.games), d => {
            return this.current.games[d].totalViewers;
          })
        )
        .range([this.chartHeight - 50, 0]);

      return {
        top: String(yScale(this.current.games[id].totalViewers)) + 'px',
        left: String(xScale(id)) + 'px',
      };
    },
  },
};
</script>

<style scoped lang="scss">
.overview-plot {
  height: 100%;
  width: 100%;
}

#overview-chart {
  position: relative;
  margin: 3% auto;
}

.stream {
  position: absolute;
  display: inline-block;
  width: 100px;
}
</style>
