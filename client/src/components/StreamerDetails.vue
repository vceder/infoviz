<template>
<div class="streamer-details-wrapper">
  <div class="streamer-details">
    <h1>
      Här är Streamerdetials
    </h1>

    <svg class="chart-canvas" width="960" height="500"></svg>
  </div>
</div>
</template>


<script>
import { mapState } from 'vuex';
import * as d3 from 'd3';
import gameColor from '../assets/js/colorsMixin.js';

export default {
  mixins: [gameColor],
  name: 'StreamerDetails',
  data() {
    return {
      gameName: '',
      streamerID: this.props.streamerID,
      viewerData: this.props.data,
    };
  },
  mounted() {
    this.loadChart(this.viewerData)
  },
  computed: {
    ...mapState(['current', 'games']),
  },
  components: {},
  props: ['streamerID'],
  watch: {
    streamerID() {
      console.log("WOOOOOW")
      this.$store
        .dispatch('getUserHistory', this.selectedStreamer)
        .then(array => {
          console.log(array)
          this.loadChart(array);
        });
      
    },
  },
  methods: {
    loadChart(data) {
      console.log("loadChart");

      var svg = d3.select('svg'),
        margin = { top: 20, right: 20, bottom: 30, left: 40 },
        width = +svg.attr('width') - margin.left - margin.right,
        height = +svg.attr('height') - margin.top - margin.bottom;

      var parseTime = d3.timeParse('%Y%m%d');
      var bisectDate = d3.bisector(function(d) {
        return d.date;
      }).left;

      var x = d3.scaleTime().range([0, width]);
      var y = d3.scaleLinear().range([height, 0]);

      var line = d3
        .line()
        .x(function(d) {
          return x(d.date);
        })
        .y(function(d) {
          return y(d.viewers);
        });

      var g = svg
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
        
      data.forEach(function(d) {
        d.date = parseTime(d.date);
        d.viewers = +d.viewers;
      });

      x.domain(
        d3.extent(data, function(d) {
          return d.date;
        })
      );
      y.domain([
        0,
        d3.max(data, function(d) {
          return d.viewers;
        }) * 1.005,
      ]);

      g
        .append('g')
        .attr('class', 'axis axis--x')
        .attr('transform', 'translate(0,' + height + ')')
        .call(d3.axisBottom(x));

      g
        .append('g')
        .attr('class', 'axis axis--y')
        .call(
          d3
            .axisLeft(y)
            .ticks(6)
            .tickFormat(function(d) {
              return parseInt(d);
            })
        )
        //.call(d3.axisLeft(y).ticks(6).tickFormat(function(d) { return parseInt(d / 1000) + "k"; }))
        .append('text')
        .attr('class', 'axis-title')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '.71em')
        .style('text-anchor', 'end')
        .attr('fill', '#5D6971')
        .text('Population)');

      g
        .append('path')
        .datum(data)
        .attr('class', 'line')
        .attr('d', line);

      var focus = g
        .append('g')
        .attr('class', 'focus')
        .style('display', 'none');

      focus
        .append('line')
        .attr('class', 'x-hover-line hover-line')
        .attr('y1', 0)
        .attr('y2', height);

      focus
        .append('line')
        .attr('class', 'y-hover-line hover-line')
        .attr('x1', width)
        .attr('x2', width);

      focus.append('circle').attr('r', 7.5);

      focus
        .append('text')
        .attr('x', 15)
        .attr('dy', '.31em');

      svg
        .append('rect')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
        .attr('class', 'overlay')
        .attr('style', 'fill: white;')
        .attr('width', width)
        .attr('height', height)
        .on('mouseover', function() {
          focus.style('display', null);
        })
        .on('mouseout', function() {
          focus.style('display', 'none');
        })
        .on('mousemove', mousemove);

      function mousemove() {
        var x0 = x.invert(d3.mouse(this)[0]),
          i = bisectDate(data, x0, 1),
          d0 = data[i - 1],
          d1 = data[i],
          d = x0 - d0.date > d1.date - x0 ? d1 : d0;
        focus.attr(
          'transform',
          'translate(' + x(d.date) + ',' + y(d.viewers) + ')'
        );
        focus.select('text').text(function() {
          return d.viewers;
        });
        focus.select('.x-hover-line').attr('y2', height - y(d.viewers));
        focus.select('.y-hover-line').attr('x2', width + width);
      }
      console.log('loadChart klar');
    },
  },
};
</script>
<style scoped lang="scss">
.streamer-details-wrapper {
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0px;
  top: 5%;
  z-index: 10;
}
.streamer-details {
  display: inline-block;
  margin: auto;
  border-radius: 20px;
  background-color: white;
  height: 80%;
  width: 60%;
}
h1 {
  color: black;
}
.chart-canvas {
  color: white;
}

.axis {
  font: 10px sans-serif;
}

.axis path,
.axis line {
  z-index: 11;
  fill: none;
  stroke: white;
  stroke-width: 2px;
  shape-rendering: crispEdges;
}

.line {
  fill: none;
  stroke: #6f257f;
  stroke-width: 5px;
}

.overlay {
  color: white;
  fill: none;
  pointer-events: all;
}

.focus circle {
  fill: #f1f3f3;
  stroke: #6f257f;
  stroke-width: 5px;
}

.hover-line {
  stroke: #6f257f;
  stroke-width: 2px;
  stroke-dasharray: 3, 3;
}
</style>
