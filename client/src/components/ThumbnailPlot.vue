<template>
  <div>
    <svg :id="'chart-' + gameId" :width="width" :height="width"></svg>
  </div>
</template>


<script>
import * as d3 from 'd3';
import gameColor from '../assets/js/colorsMixin.js';

export default {
  mixins: [gameColor],
  name: 'ThumbnailPlot',
  props: ['streams', 'width'],
  data() {
    return {
      radius: 5,
      opacityCircles: 0.7,
    };
  },
  watch: {
    width() {
      this.createPlot();
    },
    streams() {
      this.createPlot();
    },
  },
  methods: {
    xScale(num) {
      const xScale = d3
        .scaleLog()
        .range([this.radius, this.width - this.radius])
        .domain(
          d3.extent(this.streams, d => {
            return d.view_count;
          })
        );
      return Math.round(xScale(num));
    },
    yScale(num) {
      const yScale = d3
        .scaleLinear()
        .range([this.width - this.radius, this.radius])
        .domain(
          d3.extent(this.streams, d => {
            return d.viewer_count;
          })
        );
      return Math.round(yScale(num));
    },
    createPlot() {
      const tmbPlot = d3
        .select('#chart-' + this.gameId)
        .selectAll('tmb-plot')
        .data(this.streams, d => {
          return d.user_id;
        });

      tmbPlot.exit().remove();

      tmbPlot
        .enter()
        .append('circle')
        .attr('class', 'tmb-plot')
        .merge(tmbPlot)
        .attr('cx', d => {
          return this.xScale(d.view_count);
        })
        .attr('cy', d => {
          return this.yScale(d.viewer_count);
        })
        .attr('r', this.radius)
        .style('opacity', this.opacityCircles)
        .style('fill', d => {
          return this.gameColor(d.game_id);
        });
    },
  },
  computed: {
    gameId() {
      return this.streams[0].game_id;
    },
  },
  mounted() {
    this.createPlot();
  },
};
</script>
<style scoped lang="scss">

</style>
