<template>
  <div class="overview-plot">
    <div class="top-container">
      <router-link to="/about" class="route_button">About</router-link>
      <router-link to="/analytic" class="route_button">Analytic Trail</router-link>
    </div>
    <div class="hover-details">
      <div class="dynamic-hover-details">
        <div class="starCount static-headline">Total Viewers</div>
        <div class="changing-values">{{this.current.totalViewers}}</div>
        <HoverDetails :gameID="currentGameId" v-if="gameHovered"/>
      </div>
    </div>
    <div v-bind:style="chartSize" id="overview-chart">
      <div v-for="(game, id) in current.games" :key="id" class="game" :style="getPosition(id)" @click="goToId(id)" @mouseenter="(event) => { mouseOver(event, id) }" @mouseleave="mouseLeave" >
        <Thumbnailplot :streams="current.games[id].streams" :width="tmbWidth"/>
      </div>
    <Slider/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HoverDetails from '@/components/HoverDetails.vue';
import { mapState } from 'vuex';
import Slider from '@/components/Slider.vue';
import Thumbnailplot from '@/components/ThumbnailPlot.vue';
import * as d3 from 'd3';

export default {
  name: 'overview',
  data() {
    return {
      currentGameId: false,
      chartWidth: document.documentElement.clientWidth * 0.9,
      chartHeight: document.documentElement.clientHeight * 0.6,
    };
  },
  computed: {
    gameHovered() {
      if (this.currentGameId) {
        return true;
      } else {
        return false;
      }
    },
    tmbWidth() {
      return Math.round(this.chartWidth / this.current.totalGames);
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
    mouseOver: function(event, gameID) {
      this.currentGameId = gameID;
    },
    mouseLeave: function(event) {
      this.currentGameId = false;
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

.hover-details{
  height: auto;
  width: 15%;
  position: absolute;
  right: 0px;
  top: 30%;
}
.img-placeholder{
  width: 100%;
  opacity: 0;
}
.headline-wrapper{
  box-sizing: border-box;
  float: left;
  width: 100%;
  display: flex;
  background-color: pink;

}
.dynamic-hover-details{
  box-sizing: border-box;
  flex-direction: column;
  float: left;
  width: 100%;
  display: flex;

}
.static-headline{
  width: 100%;
  color: white;
  font-family: Lato;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 0.8vw;

}
.changing-values{
  width: 100%;
  color: #E81B5F;
  font-family: Lato;
  text-transform: uppercase;
  font-weight: 300;
  margin-bottom: 5%;
  font-size: 1.3vw;
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
  width: 100%;
  margin: 2% auto;
}
.game:hover{
  border: 1px solid #9fff70;
  cursor: pointer;
}
.game {
  box-sizing: border-box;
  position: absolute;
  display: inline-block;
}
</style>
