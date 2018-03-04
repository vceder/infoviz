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
  computed: {
    gameId() {
      return this.streams[0].game_id;
    },
  },
  mounted() {
    //Scatterplot
    const radius = 5;

    const svg = d3.select('#chart-' + this.gameId);

    const opacityCircles = 0.7;

    //Set the new x axis range
    const xScale = d3
      .scaleLog()
      .range([radius, this.width - radius])
      //.domain([100,2e5]); //I prefer this exact scale over the true range and then using "nice"
      .domain(
        d3.extent(this.streams, function(d) {
          return d.view_count;
        })
      )
      .nice();

    //Set the new y axis range
    const yScale = d3
      .scaleLinear()
      .range([this.width - radius, radius])
      .domain(
        d3.extent(this.streams, function(d) {
          return d.viewer_count;
        })
      )
      .nice();

    ////////////////////////////////////////////////////////////
    /////////////////// Scatterplot Circles ////////////////////
    ////////////////////////////////////////////////////////////

    //Place the country circles
    svg
      .selectAll('tmb-plot')
      .data(this.streams)
      .enter()
      .append('circle')
      .attr('class', function(d) {
        return 'tmb-plot ' + d.user_id;
      })
      .attr('cx', function(d) {
        return Math.round(xScale(d.view_count));
      })
      .attr('cy', function(d) {
        return Math.round(yScale(d.viewer_count));
      })
      .attr('r', radius)
      .style('opacity', opacityCircles)
      .style('fill', function(d) {
        return 'red';
      });
  },
};
</script>
<style scoped lang="scss">

</style>
