queue()
    .defer(d3.json, "/appleStockData/projects")
    // .defer(d3.json, "static/geojson/us-states.json")
    .await(makeGraphs);

function makeGraphs(error, projectsJson, statesJson) {
	
	var appleData = projectsJson;

	var dateFormat = d3.time.format("%Y-%m-%d");
	appleData.forEach(function(d){
		d.dd = dateFormat.parse(d['Date']);
		d.month = d3.time.month(d.dd);
		str = d["Volume"];
		d["date_posted"] = dateFormat.parse(d["Date"]);
    d["volume"] = parseFloat(str.replace(',','').replace(',',''))/10000;
    console.log(d["Open"])
	});


	var moveChart = dc.lineChart('#vol-chart');
	var openChart = dc.lineChart('#open-chart')

	var ndx = crossfilter(appleData);

	var dateDim = ndx.dimension(function(d){return d.month;});

	var numVolumeByDate = dateDim.group().reduceSum(function(d) { return d['volume']; });
	var openByDate = dateDim.group().reduceSum(function(d) { return d['Open']; });

	var minDate = dateDim.bottom(1)[0]["date_posted"];
  var maxDate = dateDim.top(1)[0]["date_posted"];

	moveChart
    .width(400)
    .height(160)
    .transitionDuration(500)
    .margins({top: 10, right: 50, bottom: 30, left: 50})
    .dimension(dateDim) //moveMonths

    // .rangeChart() //volumeChart (i dont have volume chart made)
    .x(d3.time.scale().domain([minDate, maxDate]))
    .elasticY(true)
    .xAxisLabel("Year")
    
    .group(numVolumeByDate) //indexAvgByMonthGroup

 	openChart
    .width(400)
    .height(160)
    .transitionDuration(500)
    .margins({top: 10, right: 50, bottom: 30, left: 50})
    .dimension(dateDim) //moveMonths

    // .rangeChart() //volumeChart (i dont have volume chart made)
    .x(d3.time.scale().domain([minDate, maxDate]))
    .elasticY(true)
    .xAxisLabel("Year")
    
    .group(openByDate) //indexAvgByMonthGroup 

    dc.renderAll();
}
