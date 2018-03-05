<template>
  <div class="overview-plot">
    <div class="top-container">
      <div>
        <div class="starCount static-headline">Total Viewers: <span class="changing-values">{{this.current.totalViewers}}</span></div>
        
      </div>
      <router-link to="/about" class="route_button">About</router-link>
      <router-link to="/analytic" class="route_button">Analytic Trail</router-link>
      <div class="headline-wrapper">
        <div class="img-placeholder"></div>
        <span class="static-headline">Game Name</span>
        <span class="static-headline">Current viewers</span>
      </div>
      <HoverDetails :gameID="currentGameId" v-show="gameHovered"/> <!-- Kanske skippa steget att det är en egen component? -->
    </div>
    <div v-bind:style="chartSize" id="overview-chart">
      <div v-for="(game, id) in current.games" :key="id" class="game" :style="getPosition(id)" @click="goToId(id)" @mouseenter="mouseOver(id)" @mouseleave="mouseLeave()" >
        <Thumbnailplot :streams="current.games[id].streams" :width="tmbWidth"/>
      </div>
    <Slider/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HoverDetails from "@/components/HoverDetails.vue";
import { mapState } from 'vuex';
import Slider from '@/components/Slider.vue';
import Thumbnailplot from '@/components/ThumbnailPlot.vue';
import * as d3 from 'd3';

export default {
  name: 'overview',
  data() {
    return {
      currentGameId: '',
      gameHovered: true,
      chartWidth: document.documentElement.clientWidth * 0.9,
      chartHeight: document.documentElement.clientHeight * 0.6,
    };
  },
  computed: {
    tmbWidth() {
      return Math.round(this.chartWidth / 30);
    },
    chartSize() {
      return {
        width: String(this.chartWidth) + 'px',
        height: String(this.chartHeight) + 'px',
      };
    },
    ...mapState(['current']),
  },
  components: {
    Slider,
    Thumbnailplot,
    HoverDetails,
  },
  mounted() {
    console.log('Mounted');
  },
  methods: {
    mouseOver: function(gameID){
      // Skicka gameinfo till HoverDetails componenten
      this.currentGameId = gameID;
      this.gameHovered = true;
    },
    mouseLeave: function(){
      this.gameHovered = false;
    },
    goToId(id) {
      console.log(id);
      this.$router.push({
        name: 'game',
        params: { id },
      });
    },
    getPosition(id) {
      const xScale = d3
        .scalePoint()
        .domain(Object.keys(this.current.games))
        .padding(0)
        .range([0, this.chartWidth - this.tmbWidth]);

      const yScale = d3
        .scaleLinear()
        .domain(
          d3.extent(Object.keys(this.current.games), d => {
            return this.current.games[d].totalViewers;
          })
        )
        .range([this.chartHeight - this.tmbWidth, 0]);

      return {
        top: String(yScale(this.current.games[id].totalViewers)) + 'px',
        left: String(xScale(id)) + 'px',
      };
    },
  },
};
</script>

<style scoped lang="scss">

.starCount{
  float: left;
}
.img-placeholder{
  width: 33%;
  opacity: 0;
}
.headline-wrapper{
  box-sizing: border-box;
  float: middle;
  width: 100%;
  margin-top: -15px;
  display: flex;
  justify-content: space-around;
  padding: 0px 10% 0px;
}
.static-headline{
  width: 33%;
  color: white;
  font-family: Lato;
  font-weight: 400;
  font-size: 15px;
}
.changing-values{
  width: 33%;
  color: #E81B5F;
  font-family: Lato;
  font-weight: 300;
  margin-bottom: 5%;
  font-size: 20px;

}

.overview-plot {
  height: 100%;
  width: 100%;
}

#overview-chart {
  position: relative;
  margin: 3% auto;
}

.top-container {
  height: 15%;
  width: 100%;
  margin: 2% auto;
}

.game {
  position: absolute;
  display: inline-block;
}
</style>
