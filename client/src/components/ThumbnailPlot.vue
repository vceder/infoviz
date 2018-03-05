<template>
  <div>
    <svg :id="'chart-' + gameId" :width="width" :height="width"></svg>
  </div>
</template>


<script>
import * as d3 from 'd3';

export default {
  name: 'ThumbnailPlot',
  props: ['streams', 'width'],
  data() {
    return {
      radius: 5,
    };
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
  },
  computed: {
    gameId() {
      return this.streams[0].game_id;
    },
  },
  mounted() {
    //Scatterplot
    const opacityCircles = 0.7;

    function color(n) {
      var colors = ["#3366cc", "#dc3912", "#ff9900", "#109618", "#990099", "#0099c6", "#dd4477", "#66aa00", "#b82e2e", "#316395", "#994499", "#22aa99", "#aaaa11", "#6633cc", "#e67300", "#8b0707", "#651067", "#329262", "#5574a6", "#3b3eac"];
      return colors[n % colors.length];
    }

    //Place the country circles
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
      .style('opacity', opacityCircles)
      .style('fill', d => {
        // console.log(this.gameId)
        // return color(this.gameId);
        return color(d.game_id);
      });
  },
};
</script>
<style scoped lang="scss">

</style>
