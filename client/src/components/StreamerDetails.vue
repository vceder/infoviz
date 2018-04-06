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
    };
  },
  mounted() {
    console.log("mounted")
    this.loadChart()
  },
  computed: {
    ...mapState(['current', 'games']),
  },
  components: {
  },
  props: ['steamerID'],
  methods: {
    loadChart() {

      console.log(d3.select("svg"));

    var svg = d3.select("svg"),
      margin = {top: 20, right: 20, bottom: 30, left: 40},
      width = +svg.attr("width") - margin.left - margin.right,
      height = +svg.attr("height") - margin.top - margin.bottom;

    var parseTime = d3.timeParse("%Y%m%d");
    var bisectDate = d3.bisector(function(d) { return d.date; }).left;

    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    var line = d3.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.viewers); });

    var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var data = [
      {
        "date": 20120318,
        "viewers": 48.2
      },
      {
        "date": 20120319,
        "viewers": 53.1
      },
      {
        "date": 20120320,
        "viewers": 57.8
      },
      {
        "date": 20120321,
        "viewers": 57.5
      },
      {
        "date": 20120322,
        "viewers": 57.3
      },
      {
        "date": 20120323,
        "viewers": 61.7
      },
      {
        "date": 20120324,
        "viewers": 55.8 },
      {
        "date": 20120325,
        "viewers": 48.4
      },
      {
        "date": 20120326,
        "viewers": 49.8
      },
      {
        "date": 20120327,
        "viewers": 39.6
      },
      {
        "date": 20120328,
        "viewers": 49.7
      },
      {
        "date": 20120329,
        "viewers": 56.8
      },
      {
        "date": 20120330,
        "viewers": 46.5
      },
      {
        "date": 20120331,
        "viewers": 42.2
      },
      {
        "date": 20120401,
        "viewers": 45.3
      },
      {
        "date": 20120402,
        "viewers": 48.1
      },
      {
        "date": 20120403,
        "viewers": 51.2
      },
      {
        "date": 20120404,
        "viewers": 61
      },
      {
        "date": 20120405,
        "viewers": 50.7
      },
      {
        "date": 20120406,
        "viewers": 48
      },
      {
        "date": 20120407,
        "viewers": 51.1
      },
      {
        "date": 20120408,
        "viewers": 55.7 },
      {
        "date": 20120409,
        "viewers": 58.3
      },
      {
        "date": 20120410,
        "viewers": 55
      },
      {
        "date": 20120411,
        "viewers": 49
      },
      {
        "date": 20120412,
        "viewers": 51.7
      },
      {
        "date": 20120413,
        "viewers": 53.1
      },
      {
        "date": 20120414,
        "viewers": 55.2
      },
      {
        "date": 20120415,
        "viewers": 62.3
      },
      {
        "date": 20120416,
        "viewers": 62.9
      },
      {
        "date": 20120417,
        "viewers": 69.3
      },
      {
        "date": 20120418,
        "viewers": 59 },
      {
        "date": 20120419,
        "viewers": 54.1
      },
      {
        "date": 20120420,
        "viewers": 56.5
      },
      {
        "date": 20120421,
        "viewers": 58.2 },
      {
        "date": 20120422,
        "viewers": 52.4
      },
      {
        "date": 20120423,
        "viewers": 51.6
      },
      {
        "date": 20120424,
        "viewers": 49.3
      },
      {
        "date": 20120425,
        "viewers": 52.5
      },
      {
        "date": 20120426,
        "viewers": 50.5
      },
      {
        "date": 20120427,
        "viewers": 51.9
      },
      {
        "date": 20120428,
        "viewers": 47.4
      },
      {
        "date": 20120429,
        "viewers": 54.1 },
      {
        "date": 20120430,
        "viewers": 51.9
      },
      {
        "date": 20120501,
        "viewers": 57.4
      },
      {
        "date": 20120502,
        "viewers": 53.7
      },
      {
        "date": 20120503,
        "viewers": 53.1
      },
      {
        "date": 20120504,
        "viewers": 57.2
      },
      {
        "date": 20120505,
        "viewers": 57
      },
      {
        "date": 20120506,
        "viewers": 56.6
      },
      {
        "date": 20120507,
        "viewers": 54.6
      },
      {
        "date": 20120508,
        "viewers": 57.9 },
      {
        "date": 20120509,
        "viewers": 59.2
      },
      {
        "date": 20120510,
        "viewers": 61.1
      },
      {
        "date": 20120511,
        "viewers": 59.7
      },
      {
        "date": 20120512,
        "viewers": 64.1
      },
      {
        "date": 20120513,
        "viewers": 65.3 },
      {
        "date": 20120514,
        "viewers": 64.2 },
      {
        "date": 20120515,
        "viewers": 62 },
      {
        "date": 20120516,
        "viewers": 63.8 },
      {
        "date": 20120517,
        "viewers": 64.5
      },
      {
        "date": 20120518,
        "viewers": 61
      },
      {
        "date": 20120519,
        "viewers": 62.6
      },
      {
        "date": 20120520,
        "viewers": 66.2
      },
      {
        "date": 20120521,
        "viewers": 62.7
      },
      {
        "date": 20120522,
        "viewers": 63.7
      },
      {
        "date": 20120523,
        "viewers": 66.4
      },
      {
        "date": 20120524,
        "viewers": 64.5
      },
      {
        "date": 20120525,
        "viewers": 65.4
      },
      {
        "date": 20120526,
        "viewers": 69.4
      },
      {
        "date": 20120527,
        "viewers": 71.9
      },
      {
        "date": 20120528,
        "viewers": 74.4
      },
      {
        "date": 20120529,
        "viewers": 75.9
      },
      {
        "date": 20120530,
        "viewers": 72.9
      },
      {
        "date": 20120531,
        "viewers": 72.5
      },
      {
        "date": 20120601,
        "viewers": 67.2
      },
      {
        "date": 20120602,
        "viewers": 68.3 },
      {
        "date": 20120603,
        "viewers": 67.7
      },
      {
        "date": 20120604,
        "viewers": 61.9
      },
      {
        "date": 20120605,
        "viewers": 58.3
      },
      {
        "date": 20120606,
        "viewers": 61.7
      },
      {
        "date": 20120607,
        "viewers": 66.7
      },
      {
        "date": 20120608,
        "viewers": 68.7
      },
      {
        "date": 20120609,
        "viewers": 72.2 },
      {
        "date": 20120610,
        "viewers": 72.6 },
      {
        "date": 20120611,
        "viewers": 69.2
      },
      {
        "date": 20120612,
        "viewers": 66.9
      },
      {
        "date": 20120613,
        "viewers": 66.7
      },
      {
        "date": 20120614,
        "viewers": 67.7
      },
      {
        "date": 20120615,
        "viewers": 68.5
      },
      {
        "date": 20120616,
        "viewers": 67.5 },
      {
        "date": 20120617,
        "viewers": 64.2
      },
      {
        "date": 20120618,
        "viewers": 61.7
      },
      {
        "date": 20120619,
        "viewers": 66.4
      },
      {
        "date": 20120620,
        "viewers": 77.9
      },
      {
        "date": 20120621,
        "viewers": 88.3
      },
      {
        "date": 20120622,
        "viewers": 82.2
      },
      {
        "date": 20120623,
        "viewers": 77
      },
      {
        "date": 20120624,
        "viewers": 75.4
      },
      {
        "date": 20120625,
        "viewers": 70.9
      },
      {
        "date": 20120626,
        "viewers": 65.9
      },
      {
        "date": 20120627,
        "viewers": 73.5
      },
      {
        "date": 20120628,
        "viewers": 77.4
      },
      {
        "date": 20120629,
        "viewers": 79.6
      },
      {
        "date": 20120630,
        "viewers": 84.2
      },
      {
        "date": 20120701,
        "viewers": 81.8
      },
      {
        "date": 20120702,
        "viewers": 82.5
      },
      {
        "date": 20120703,
        "viewers": 80.2
      },
      {
        "date": 20120704,
        "viewers": 77.8
      },
      {
        "date": 20120705,
        "viewers": 86.1
      },
      {
        "date": 20120706,
        "viewers": 79.9
      },
      {
        "date": 20120707,
        "viewers": 83.5
      },
      {
        "date": 20120708,
        "viewers": 81.5
      },
      {
        "date": 20120709,
        "viewers": 77.8
      },
      {
        "date": 20120710,
        "viewers": 76.1
      },
      {
        "date": 20120711,
        "viewers": 76.3
      },
      {
        "date": 20120712,
        "viewers": 75.8 },
      {
        "date": 20120713,
        "viewers": 77.2
      },
      {
        "date": 20120714,
        "viewers": 79.3 },
      {
        "date": 20120715,
        "viewers": 78.9 },
      {
        "date": 20120716,
        "viewers": 79.6
      },
      {
        "date": 20120717,
        "viewers": 83.3
      },
      {
        "date": 20120718,
        "viewers": 84.3
      },
      {
        "date": 20120719,
        "viewers": 75.1
      },
      {
        "date": 20120720,
        "viewers": 68.4
      },
      {
        "date": 20120721,
        "viewers": 68.4
      },
      {
        "date": 20120722,
        "viewers": 72.2 },
      {
        "date": 20120723,
        "viewers": 75.6
      },
      {
        "date": 20120724,
        "viewers": 82.6
      },
      {
        "date": 20120725,
        "viewers": 78.4
      },
      {
        "date": 20120726,
        "viewers": 77
      },
      {
        "date": 20120727,
        "viewers": 79.4
      },
      {
        "date": 20120728,
        "viewers": 77.4 },
      {
        "date": 20120729,
        "viewers": 72.5
      },
      {
        "date": 20120730,
        "viewers": 72.9
      },
      {
        "date": 20120731,
        "viewers": 73.6
      },
      {
        "date": 20120801,
        "viewers": 75
      },
      {
        "date": 20120802,
        "viewers": 77.7
      },
      {
        "date": 20120803,
        "viewers": 79.7
      },
      {
        "date": 20120804,
        "viewers": 79.6
      },
      {
        "date": 20120805,
        "viewers": 81.5
      },
      {
        "date": 20120806,
        "viewers": 80
      },
      {
        "date": 20120807,
        "viewers": 75.7 },
      {
        "date": 20120808,
        "viewers": 77.8 },
      {
        "date": 20120809,
        "viewers": 78.6 },
      {
        "date": 20120810,
        "viewers": 77.8
      },
      {
        "date": 20120811,
        "viewers": 78.5 },
      {
        "date": 20120812,
        "viewers": 78.8
      },
      {
        "date": 20120813,
        "viewers": 78.6
      },
      {
        "date": 20120814,
        "viewers": 76.8
      },
      {
        "date": 20120815,
        "viewers": 76.7
      },
      {
        "date": 20120816,
        "viewers": 75.9
      },
      {
        "date": 20120817,
        "viewers": 77.6
      },
      {
        "date": 20120818,
        "viewers": 72.6
      },
      {
        "date": 20120819,
        "viewers": 70.4
      },
      {
        "date": 20120820,
        "viewers": 71.8
      },
      {
        "date": 20120821,
        "viewers": 73.6
      },
      {
        "date": 20120822,
        "viewers": 74.7
      },
      {
        "date": 20120823,
        "viewers": 74.6
      },
      {
        "date": 20120824,
        "viewers": 76
      },
      {
        "date": 20120825,
        "viewers": 76.2
      },
      {
        "date": 20120826,
        "viewers": 73.4
      },
      {
        "date": 20120827,
        "viewers": 74.6
      },
      {
        "date": 20120828,
        "viewers": 79.4
      },
      {
        "date": 20120829,
        "viewers": 74.7
      },
      {
        "date": 20120830,
        "viewers": 73.5
      },
      {
        "date": 20120831,
        "viewers": 77.9
      },
      {
        "date": 20120901,
        "viewers": 80.7
      },
      {
        "date": 20120902,
        "viewers": 75.1
      },
      {
        "date": 20120903,
        "viewers": 73.5
      },
      {
        "date": 20120904,
        "viewers": 73.5
      },
      {
        "date": 20120905,
        "viewers": 77.7
      },
      {
        "date": 20120906,
        "viewers": 74.2
      },
      {
        "date": 20120907,
        "viewers": 76
      },
      {
        "date": 20120908,
        "viewers": 77.1
      },
      {
        "date": 20120909,
        "viewers": 69.7
      },
      {
        "date": 20120910,
        "viewers": 67.8
      },
      {
        "date": 20120911,
        "viewers": 64
      },
      {
        "date": 20120912,
        "viewers": 68.1
      },
      {
        "date": 20120913,
        "viewers": 69.3
      },
      {
        "date": 20120914,
        "viewers": 70
      },
      {
        "date": 20120915,
        "viewers": 69.3
      },
      {
        "date": 20120916,
        "viewers": 66.3
      },
      {
        "date": 20120917,
        "viewers": 67
      },
      {
        "date": 20120918,
        "viewers": 72.8
      },
      {
        "date": 20120919,
        "viewers": 67.2
      },
      {
        "date": 20120920,
        "viewers": 62.1
      },
      {
        "date": 20120921,
        "viewers": 64
      },
      {
        "date": 20120922,
        "viewers": 65.5
      },
      {
        "date": 20120923,
        "viewers": 65.7
      },
      {
        "date": 20120924,
        "viewers": 60.4
      },
      {
        "date": 20120925,
        "viewers": 63.2
      },
      {
        "date": 20120926,
        "viewers": 68.5
      },
      {
        "date": 20120927,
        "viewers": 69.2
      },
      {
        "date": 20120928,
        "viewers": 68.7
      },
      {
        "date": 20120929,
        "viewers": 62.5
      },
      {
        "date": 20120930,
        "viewers": 62.3
      }
    ];


    data.forEach(function(d) {
      d.date = parseTime(d.date);
      d.viewers = +d.viewers;
    });


    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain([0, d3.max(data, function(d) { return d.viewers; }) * 1.005]);

    g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y).ticks(6).tickFormat(function(d) { return parseInt(d); }))
        //.call(d3.axisLeft(y).ticks(6).tickFormat(function(d) { return parseInt(d / 1000) + "k"; }))
      .append("text")
        .attr("class", "axis-title")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .attr("fill", "#5D6971")
        .text("Population)");

    g.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", line);

    var focus = g.append("g")
        .attr("class", "focus")
        .style("display", "none");

    focus.append("line")
        .attr("class", "x-hover-line hover-line")
        .attr("y1", 0)
        .attr("y2", height);

    focus.append("line")
        .attr("class", "y-hover-line hover-line")
        .attr("x1", width)
        .attr("x2", width);

    focus.append("circle")
        .attr("r", 7.5);

    focus.append("text")
        .attr("x", 15)
        .attr("dy", ".31em");

    svg.append("rect")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .attr("class", "overlay")
        .attr("style", "color: white;")
        .attr("width", width)
        .attr("height", height)
        .on("mouseover", function() { focus.style("display", null); })
        .on("mouseout", function() { focus.style("display", "none"); })
        .on("mousemove", mousemove);

    function mousemove() {
      var x0 = x.invert(d3.mouse(this)[0]),
          i = bisectDate(data, x0, 1),
          d0 = data[i - 1],
          d1 = data[i],
          d = x0 - d0.date > d1.date - x0 ? d1 : d0;
      focus.attr("transform", "translate(" + x(d.date) + "," + y(d.viewers) + ")");
      focus.select("text").text(function() { return d.viewers; });
      focus.select(".x-hover-line").attr("y2", height - y(d.viewers));
      focus.select(".y-hover-line").attr("x2", width + width);
    }
    console.log("loadChart klar");
    },
  },
};
</script>
<style scoped lang="scss">

.streamer-details-wrapper{
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0px;
  top: 5%;
  z-index: 10;
}
.streamer-details{
  display: inline-block;
  margin: auto;
  border-radius: 20px;
  background-color: white;
  height: 80%;
  width: 60%;
}
h1{
  color: black;
}
.chart-canvas{
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
  stroke: #6F257F;
  stroke-width: 5px;
}

.overlay {
  color: white;
  fill: none;
  pointer-events: all;
}

.focus circle {
  fill: #F1F3F3;
  stroke: #6F257F;
  stroke-width: 5px;
}
  
.hover-line {
  stroke: #6F257F;
  stroke-width: 2px;
  stroke-dasharray: 3,3;
}
</style>
