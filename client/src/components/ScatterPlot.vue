<template>
<div id="cont" class="container-fluid text-center">
		<div class="row scatter">
			<div class="col-sm-9">
				<div id="chart"></div>
			</div>
			</div>
		</div>
</template>


<script>
import * as d3 from 'd3';
import { mapState } from 'vuex';
export default {
  name: 'ScatterPlot',
  mounted(){
    this.initScatter();
  },
  computed:{
    ...mapState(['current']),
  },
  watch:{
    current(){
      
    }
  },
  methods:{
    initScatter(){
    console.log(this.current.games)
    var streams = this.current.games['21779'].streams
    //console.log(streams)
    

//Scatterplot
var margin = {left: 200, top: 100, right: 20, bottom: 60},
	width = document.documentElement.clientWidth/1.1- margin.left - margin.right,
	height = document.documentElement.clientHeight/1.4-margin.bottom;

var svg = d3.select("#chart").append("svg")
			.attr("width", (width + margin.left + margin.right))
			.attr("height", (height + margin.top + margin.bottom));
			
var wrapper = svg.append("g").attr("class", "chordWrapper")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      
var tooltip = d3.select("#chart")
    .append("div")
    .style("position", "absolute")
    .style("display", "inline-block")
    .style("visibility", "hidden")
    .style("color", "white") 
    .style("background-color", "#242625")
    .style("opacity", 0.8)
    .style("border-radius", "8px")
    .style("text-align", "center")
    .style("font-family", "Helvetica")
    .style("font-size", "12px")
    .style("width", "200px")
    .style("padding", "8px")
    .text("");

//////////////////////////////////////////////////////
///////////// Initialize Axes & Scales ///////////////
//////////////////////////////////////////////////////

var opacityCircles = 0.8,
	maxDistanceFromPoint = 10;
//Set the color for each region
var color = d3.scaleOrdinal()
					.range(["#3CDCA0", "#F7766F", "#9FFF70", "#9169F8", "#F9C872", "#83C9FD"])
					// .domain(["Africa | North & East", "Africa | South & West", "America | North & Central", "America | South", 
					// 		 "Asia | East & Central", "Asia | South & West", "Europe | North & West", "Europe | South & East", "Oceania"]);
          .domain([0,504021])
          
//Set the new x axis range
var xScale = d3.scaleLog()
	.range([0, width])
	//.domain([100,2e5]); //I prefer this exact scale over the true range and then using "nice"
	.domain(d3.extent(streams, function(d) {return d.view_count; }))
	.nice();
//Set new x-axis
var xAxis = d3.axisBottom()
	.ticks(2)
	.tickFormat(function (d) {
		return xScale.tickFormat((8),function(d) { 
			return d3.format('.2s')(d);
		})(d);
	})	
	.scale(xScale);	
//Append the x-axis
wrapper.append("g")
	.attr("class", "x axis")
  .attr("transform", "translate(" + 0 + "," + height + ")")
  .style("stroke", "white")
	.call(xAxis);
		
//Set the new y axis range
var yScale = d3.scaleLinear()
	.range([height,0])
	.domain(d3.extent(streams, function(d) { return d.viewer_count; }))
	.nice();	
var yAxis = d3.axisLeft()
	.ticks(6)  //Set rough # of ticks
	.scale(yScale);	
//Append the y-axis
wrapper.append("g")
		.attr("class", "y axis")
    .attr("transform", "translate(" + 0 + "," + 0 + ")")
    .style("stroke", "white")
		.call(yAxis);
		
//Scale for the bubble size

// var rScale = d3.scaleSqrt()
// 			.range([2,16])
// 			.domain(d3.extent(countries, function(d) { return d.GDP; }));

//////////////////////////////////////////////////////
///////////////// Initialize Labels //////////////////
//////////////////////////////////////////////////////

//Set up X axis label
wrapper.append("g")
	.append("text")
	.attr("class", "x title")
	.attr("text-anchor", "end")
  .style("font-size", "12px")
  .style("font-family", "Lato")
  .style("font-weight", "400")
  .style("stroke", "white")
	.attr("transform", "translate(" + (width + 15) + "," + (height - 10) + ")")
	.text("Life time views");

//Set up y axis label
wrapper.append("g")
	.append("text")
	.attr("class", "y title")
	.attr("text-anchor", "end")
  .style("font-size", "12px")
  .style("font-family", "Lato")
  .style("font-weight", "400")
  .style("stroke", "white")
	.attr("transform", "translate(18, 0) rotate(-90)")
	.text("Current Viewers");

////////////////////////////////////////////////////////////	
///// Capture mouse events and voronoi.find() the site /////
////////////////////////////////////////////////////////////	

// Use the same variables of the data in the .x and .y as used in the cx and cy of the circle call
svg._tooltipped = svg._voronoi = null;
svg.on('mousemove', function() {
  if (!svg._voronoi) {
    svg._voronoi = d3.voronoi()
	  .x(function(d) { return xScale(d.view_count); })
	  .y(function(d) { return yScale(d.viewer_count); })
    (streams);
  }
  var p = d3.mouse(this), site;
  p[0] -= margin.left;
  p[1] -= margin.top;
  // don't react if the mouse is close to one of the axis
  if (p[0] < 5 || p[1] < 5) {
    site = null;
  } else {
    site = svg._voronoi.find(p[0], p[1], maxDistanceFromPoint);
  }
  if (site !== svg._tooltipped) {
    if (svg._tooltipped) removeTooltip(svg._tooltipped.data)
    if (site) showTooltip(site.data);
    svg._tooltipped = site;
  }

});

////////////////////////////////////////////////////////////	
/////////////////// Scatterplot Circles ////////////////////
////////////////////////////////////////////////////////////	

//Initiate a group element for the circles	
var circleGroup = wrapper.append("g")
	.attr("class", "circleWrapper"); 
	
//Place the country circles
circleGroup.selectAll("streamer")
	.data(streams) 
	.enter().append("circle")
		.attr("class", function(d,i) { return "streamer " + d.display_name; })
		.attr("cx", function(d) {return xScale(d.view_count);})
		.attr("cy", function(d) {return yScale(d.viewer_count);})
		.attr("r", "8") 
		.style("opacity", opacityCircles)
    .style("fill", function(d) {return color(d.game_id);})
    .on("mouseover", function(d){
     tooltip.html("<h3>" + d.display_name + "</h3>");
     return tooltip.style("visibility", "visible")
    })
    .on("mousemove", function(){
    return tooltip.style("top", (d3.event.pageY - 10) + "px").style("left", (d3.event.pageX + 10) + "px");
    })
    .on("mouseout", function(){
    return tooltip.style("visibility","hidden")
    })


///////////////////////////////////////////////////////////////////////////
/////////////////// Hover functions of the circles ////////////////////////
///////////////////////////////////////////////////////////////////////////

//Hide the tooltip when the mouse moves away
function removeTooltip (d, i) {
	//Save the chosen circle (so not the voronoi)
  var element = d3.selectAll(".streamer."+d.display_name);
		
	//Fade out the bubble again
	element.style("opacity", opacityCircles);
	
	//Hide tooltip
	d3.select('.popover').each(function() {
		d3.select(this).style("visibility", "hidden");
	}); 
  
	//Fade out guide lines, then remove them
	d3.selectAll(".guide")
		.transition().duration(100)
		.style("opacity",  0)
		.remove();
		
}//function removeTooltip

//Show the tooltip on the hovered over slice
function showTooltip (d, i) {
	//console.log(d.Country)
	//Save the chosen circle (so not the voronoi)
	var element = d3.select(".streamer."+d.display_name),
      el = element._groups[0];

	//Make chosen circle more visible
	element.style("opacity", 1);

	//Place and show tooltip
	var x = +element.attr("cx"),
		y = +element.attr("cy"),
		color = element.style("fill");

	//Append lines to bubbles that will be used to show the precise data points
	
	//vertical line
	wrapper
		.append("line")
		.attr("class", "guide")
		.attr("x1", x)
		.attr("x2", x)
		.attr("y1", y)
		.attr("y2", height + 20)
		.style("stroke", color)
		.style("opacity",  0)
		.transition().duration(100)
		.style("opacity", 0.5);
	//Value on the axis
	wrapper
		.append("text")
		.attr("class", "guide")
		.attr("x", x)
		.attr("y", height + 38)
		.style("fill", color)
		.style("opacity",  0)
		.style("text-anchor", "middle")
		.text(d3.format(".2s")(d.view_count) )
		.transition().duration(100)
		.style("opacity", 0.5);

	//horizontal line
	wrapper
		.append("line")
		.attr("class", "guide")
		.attr("x1", x)
		.attr("x2", -20)
		.attr("y1", y)
		.attr("y2", y)
		.style("stroke", color)
		.style("opacity",  0)
		.transition().duration(100)
		.style("opacity", 0.5);
	//Value on the axis
	wrapper
		.append("text")
		.attr("class", "guide")
		.attr("x", -25)
		.attr("y", y)
		.attr("dy", "0.35em")
		.style("fill", color)
		.style("opacity",  0)
		.style("text-anchor", "end")
		.text((d.viewer_count) )
		.transition().duration(100)
		.style("opacity", 0.5);	

}//function showTooltip
}
}
}
</script>
<style scoped lang="scss">
@import url(http://fonts.googleapis.com/css?family=Lato:300,400,700);

.axis path,
		.axis line {
			fill: none;
			stroke: #B3B3B3;
			shape-rendering: crispEdges;
		}
		.axis text {
			font-size: 10px;
			fill: #6B6B6B;
		}

		.countries {
			pointer-events: none;
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
		
		
		@media (min-width: 500px) {
		  .col-sm-3, .col-sm-9 {
			float: left;
		  }
		  .col-sm-9 {
			width: 75%;
		  }
		  .col-sm-3 {
			width: 25%;
		  }
		}
</style>
