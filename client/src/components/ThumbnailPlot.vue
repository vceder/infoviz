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
      var colors = ["#3CDCA0", "#F7766F", "#9FFF70", "#9C78F8", "#F9CD80", "#8FCEFD", "#4FDFA9", "#A8FF7E", "#F7837D", "#9169F8", "#F9C872", "#83C9FD"]
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
        return color(d.game_id);
      });
  },
};
</script>
<style scoped lang="scss">

</style>
