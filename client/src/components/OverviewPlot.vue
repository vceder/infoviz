<template>
  <div class="overview-plot">
    <HoverDetails/>
    <div v-bind:style="chartSize" class="chart">
      <div v-for="(game, id) in current.games" :key="id" class="stream">
        <p>{{id}}</p>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HoverDetails from "@/components/HoverDetails.vue";
import { mapState } from 'vuex';
import * as d3 from 'd3';

export default {
  name: 'overview',
  data() {
    return {
      chartWidth: document.documentElement.clientWidth * 0.9,
      chartHeight: document.documentElement.clientHeight * 0.8,
      margin: document.documentElement.clientWidth * 0.04,
    };
  },
  components:{
    HoverDetails,
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
    console.log(this.current.games);
    // this.updateCircles();
  },
  watch: {},
  methods: {
    updateCircles() {
      const xScale = d3
        .scaleLinear()
        .domain([
          0,
          d3.max(this.dataPoints[this.wave], d => {
            return d[this.scatterOptions.x];
          }),
        ])
        .range([this.margin, this.chartWidth - this.margin]);
      const yScale = d3
        .scaleLinear()
        .domain([
          0,
          d3.max(this.dataPoints[this.wave], d => {
            return d[this.scatterOptions.y];
          }),
        ])
        .range([this.chartHeight - this.margin, this.margin]);
      // Create tooltip variable
      const tooltip = d3
        .select('#tooltip')
        .attr('text-anchor', 'end')
        .style('color', '#ddd')
        .style('font-size', '2.5em');
      // Create update selection
      const circles = d3
        .select('#circles')
        .selectAll('circle')
        .data(this.dataPoints[this.wave], d => {
          return d['Country'];
        });

      // Remove exit selection
      circles.exit().remove();

      // Add new elements with the enter selection and merge with the update and set new position with transition
      circles
        .enter()
        .append('circle')
        .attr('r', '10px')
        .merge(circles)
        .on('mouseover', d => {
          tooltip
            .transition()
            .duration(200)
            .text(d['Country'])
            .style('opacity', 0.5);
        })
        .on('mouseout', d => {
          tooltip
            .transition()
            .duration(200)
            .style('opacity', 0);
        })
        .transition()
        .duration(500)
        .attr('fill', (d, i) => {
          return colorScale(i);
        })
        .attr('cx', d => {
          return xScale(d[this.scatterOptions.x]);
        })
        .attr('cy', d => {
          return yScale(d[this.scatterOptions.y]);
        });

      d3
        .select('#x-axis')
        .call(d3.axisBottom(xScale))
        .style('opacity', 0.5);
      d3
        .select('#y-axis')
        .call(d3.axisLeft(yScale))
        .style('opacity', 0.5);
    },
  },
};
</script>

<style scoped lang="scss">
.overview-plot {
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-content: center;
}

.chart {
  margin: auto;
  display: flex;
  flex-wrap: wrap;
}

.stream {
  display: flex;
}
</style>

