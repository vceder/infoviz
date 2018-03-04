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

    // var color = d3.scaleOrdinal()
    //   .range(["blue", "green", "yellow"])

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
        return "red";
      });
  },
};
</script>
<style scoped lang="scss">

</style>
