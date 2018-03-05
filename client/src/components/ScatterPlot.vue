<template>
	<div id="cont">
    <div class="starCount staticHeadline">Total Viewers: <span class="changingValues">{{this.current.games[gameId].totalViewers}}</span></div>
				<div id="chart"></div>
		<Slider/>
	</div>
</template>


<script>
import { mapState } from 'vuex';
import Slider from '@/components/Slider.vue';
import * as d3 from 'd3';
import gameColor from '../assets/js/colorsMixin.js';

export default {
  mixins: [gameColor],
  name: 'ScatterPlot',
  mounted() {
    this.initScatter();
  },
  computed: {
    gameId() {
      return this.$route.params.id;
    },
    streams() {
      const streams = this.current.games[this.gameId]
        ? this.current.games[this.gameId].streams
        : [];
      return streams;
    },
    ...mapState(['current']),
  },
  components: {
    Slider,
  },
  watch: {
    current() {
      this.initScatter();
    },
  },
  methods: {
    initScatter() {
      const streams = this.streams;

      //Scatterplot
      const margin = { left: document.documentElement.clientWidth*0.04, top: document.documentElement.clientWidth*0.04, right: document.documentElement.clientWidth*0.05, bottom: document.documentElement.clientWidth*0.04 },
        width = document.documentElement.clientWidth / 1.3,
        height = document.documentElement.clientHeight / 1.4;

      d3.select('svg').remove();

      const svg = d3
        .select('#chart')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom);

      const wrapper = svg
        .append('g')
        .attr('class', 'chordWrapper')
        .attr('transform', 'translate(' + margin.left+ ',' + margin.top + ')');

      const tooltip = d3
        .select('#chart')
        .append('div')
        .style('position', 'absolute')
        .style('display', 'inline-block')
        .style('visibility', 'hidden')
        .style('color', 'white')
        .style('background-color', '#242625')
        .style('opacity', 0.8)
        .style('border-radius', '8px')
        .style('text-align', 'center')
        .style('font-family', 'Helvetica')
        .style('font-size', '20px')
        .style('width', '200px')
        .style('padding', '8px')
        .text('');

      //////////////////////////////////////////////////////
      ///////////// Initialize Axes & Scales ///////////////
      //////////////////////////////////////////////////////

      const opacityCircles = 0.8;
      const maxDistanceFromPoint = 50;

      //Set the new x axis range
      const xScale = d3
        .scaleLog()
        .range([0, width])
        .domain(
          d3.extent(streams, function(d) {
            const view_count = d.view_count ? d.view_count : 0;
            return view_count;
          })
        )
        .nice();
      //Set new x-axis
      const xAxis = d3
        .axisBottom()
        .ticks(4)
        .tickFormat(function(d) {
          return xScale.tickFormat(4, function(d) {
            return d3.format('.2s')(d);
          })(d);
        })
        .scale(xScale);
      //Append the x-axis
      wrapper
        .append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(' + 0 + ',' + height + ')')
        .style('stroke', 'white')
        .call(xAxis);

      //Set the new y axis range
      const yScale = d3
        .scaleLinear()
        .range([height, 0])
        .domain(
          d3.extent(streams, function(d) {
            const viewer_count = d.viewer_count ? d.viewer_count : 0;
            return viewer_count;
          })
        )
        .nice();
      const yAxis = d3
        .axisLeft()
        .ticks(6) //Set rough # of ticks
        .scale(yScale);
      //Append the y-axis
      wrapper
        .append('g')
        .attr('class', 'y axis')
        .attr('transform', 'translate(' + 0 + ',' + 0 + ')')
        .style('stroke', 'white')
        .call(yAxis);

      //////////////////////////////////////////////////////
      ///////////////// Initialize Labels //////////////////
      //////////////////////////////////////////////////////

      //Set up X axis label
      wrapper
        .append('g')
        .append('text')
        .attr('class', 'x title')
        .attr('text-anchor', 'end')
        .style('font-size', '12px')
        .style('font-family', 'Lato')
        .style('font-weight', '400')
        .style('stroke', 'white')
        .attr(
          'transform',
          'translate(' + (width + 15) + ',' + (height - 10) + ')'
        )
        .text('Life time views');

      //Set up y axis label
      wrapper
        .append('g')
        .append('text')
        .attr('class', 'y title')
        .attr('text-anchor', 'end')
        .style('font-size', '12px')
        .style('font-family', 'Lato')
        .style('font-weight', '400')
        .style('stroke', 'white')
        .attr('transform', 'translate(18, 0) rotate(-90)')
        .text('Current Viewers');
        

      ////////////////////////////////////////////////////////////
      ///// Capture mouse events and voronoi.find() the site /////
      ////////////////////////////////////////////////////////////

      // Use the same variables of the data in the .x and .y as used in the cx and cy of the circle call
      svg._tooltipped = svg._voronoi = null;
      svg.on('mousemove', function() {
        if (!svg._voronoi) {
          svg._voronoi = d3
            .voronoi()
            .x(function(d) {
              return xScale(d.view_count);
            })
            .y(function(d) {
              return yScale(d.viewer_count);
            })(streams);
        }
        var p = d3.mouse(this),
          site;
        p[0] -= margin.left;
        p[1] -= margin.top;
        // don't react if the mouse is close to one of the axis
        if (p[0] < 5 || p[1] < 5) {
          site = null;
        } else {
          site = svg._voronoi.find(p[0], p[1], maxDistanceFromPoint);
        }
        if (site !== svg._tooltipped) {
          if (svg._tooltipped) removeTooltip(svg._tooltipped.data);
          if (site) showTooltip(site.data);
          svg._tooltipped = site;
        }
        return tooltip
            .style('top', d3.event.pageY - 10 + 'px')
            .style('left', d3.event.pageX + 10 + 'px');
  
      });

      ////////////////////////////////////////////////////////////
      /////////////////// Scatterplot Circles ////////////////////
      ////////////////////////////////////////////////////////////

      //Initiate a group element for the circles
      const circleGroup = wrapper
        .append('g')
        .attr('class', 'circleWrapper')
        .selectAll('streamer')
        .data(streams);

      circleGroup.exit().remove();
      //Place the country circles
      circleGroup
        .enter()
        .append('circle')
        .merge(circleGroup)
        .attr('class', function(d, i) {
          return 'streamer ' + d.display_name;
        })
        .attr('cx', function(d) {
          return xScale(d.view_count);
        })
        .attr('cy', function(d) {
          return yScale(d.viewer_count);
        })
        .attr('r', '8')
        .style('opacity', opacityCircles)
        .style('fill', d => {
          return this.gameColor(d.game_id);
        })
 

      ///////////////////////////////////////////////////////////////////////////
      /////////////////// Hover functions of the circles ////////////////////////
      ///////////////////////////////////////////////////////////////////////////

      //Hide the tooltip when the mouse moves away
      function removeTooltip(d, i) {
        //Save the chosen circle (so not the voronoi)
        const element = d3.selectAll('.streamer.' + d.display_name);

        //Fade out the bubble again
        element.style('opacity', opacityCircles);

        //Hide tooltip
        d3.select('.popover').each(function() {
          d3.select(this).style('visibility', 'hidden');
        });

        //Fade out guide lines, then remove them
        d3
          .selectAll('.guide')
          .transition()
          .duration(100)
          .style('opacity', 0)
          .remove();

          return tooltip.style('visibility', 'hidden');
      } //function removeTooltip

      //Show the tooltip on the hovered over slice
      function showTooltip(d, i) {
        //Save the chosen circle (so not the voronoi)
        const element = d3.select('.streamer.' + d.display_name),
          el = element._groups[0];
          console.log(d)
          tooltip.html('<p>' + d.display_name + '</p>');
          
      
        //Make chosen circle more visible
        element.style('opacity', 1);

        //Place and show tooltip
        const x = +element.attr('cx'),
          y = +element.attr('cy'),
          color = element.style('fill');

        //Append lines to bubbles that will be used to show the precise data points

        //vertical line
        wrapper
          .append('line')
          .attr('class', 'guide')
          .attr('x1', x)
          .attr('x2', x)
          .attr('y1', y)
          .attr('y2', height + 20)
          .style('stroke', color)
          .style('opacity', 0)
          .transition()
          .duration(100)
          .style('opacity', 0.5);
        //Value on the axis
        wrapper
          .append('text')
          .attr('class', 'guide')
          .attr('x', x)
          .attr('y', height + 38)
          .style('fill', color)
          .style('opacity', 0)
          .style('text-anchor', 'middle')
          .text(d3.format('.2s')(d.view_count))
          .transition()
          .duration(100)
          .style('opacity', 0.5);

        //horizontal line
        wrapper
          .append('line')
          .attr('class', 'guide')
          .attr('x1', x)
          .attr('x2', '')
          .attr('y1', y)
          .attr('y2', y)
          .style('stroke', color)
          .style('opacity', 0)
          .transition()
          .duration(100)
          .style('opacity', 0.5);
        //Value on the axis
        wrapper
          .append('text')
          .attr('class', 'guide')
          .attr('x', '')
          .attr('y', y)
          .attr('dy', '0.35em')
          .style('fill', color)
          .style('opacity', 0)
          .style('text-anchor', 'end')
          .text(d.viewer_count)
          .transition()
          .duration(100)
          .style('opacity', 0.5);

          return tooltip.style('visibility', 'visible');
      } //function showTooltip
    },
  },
};
</script>
<style scoped lang="scss">
@import url(http://fonts.googleapis.com/css?family=Lato:300,400,700);

.starCount{
  float: left;
}
.staticHeadline{
  color: white;
  font-family: Lato;
  font-weight: 400;
  font-size: 15px;
}

.changingValues{
  color: #E81B5F;
  font-family: Lato;
  font-weight: 300;
  margin-bottom: 5%;
  font-size: 20px;
}

.axis path,
.axis line {
  fill: none;
  stroke: #b3b3b3;
  shape-rendering: crispEdges;
}
.axis text {
  font-size: 10px;
  fill: #6b6b6b;
}

.guide {
  pointer-events: none;
  font-size: 14px;
  font-weight: 600;
}

.popover {
  position: absolute;
  pointer-events: none;
}

</style>
