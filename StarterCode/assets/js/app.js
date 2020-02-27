// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 40
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// SVG wrapper 
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// append SVG group and shift margin.
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // data
d3.csv("assets/data/data.csv")
  .then(function(healthData) {

    // begin parse of data
   
    healthData.forEach(function(data) {
      data.poverty = +data.poverty;
      data.age = +data.age;
      data.healthcare = +data.healthcare;
      data.smokes = +data.smokes;
      data.abbr = data.abbr;
    });

    // setup scale functions
   
    var xLinearScale = d3.scaleLinear()
      .domain([8, d3.max(healthData, d => d.poverty)])
      .range([0, width]);

    var yLinearScale = d3.scaleLinear()
      .domain([0, d3.max(healthData, d => d.healthcare)])
      .range([height, 0]);

    // setup axis variables
   
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // set axis
    
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

    // set circle points
    
    var circlesGroup = chartGroup.selectAll("circle")
    .data(healthData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r", "20")
    .attr("fill", "darkblue")
    .attr("opacity", ".5");

    var textGroup = chartGroup.selectAll("text")
    .data(healthData)
    .enter()
    .append("text")
    .style("fill", "white")
    .attr('x',d => xLinearScale(d.poverty))
    .attr('y',d => yLinearScale(d.healthcare)) 
    .attr("text-anchor", "middle")
    .text(d => d.abbr);
    


    // axis labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - 43)
      .attr("x", 0 -275)
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Lacks Healthcare (%)");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text("In Poverty (%)");
  });