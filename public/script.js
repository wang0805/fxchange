//wait for whole document to load up before loading javascript
window.onload = function(){

var apiKey = "V9CIRQRJSAFI99RM";
var curPair;
var trace = {
	x: [],
	close: [],
	high: [],
	low: [],
	open: [],
	type: 'candlestick',
};

$("#submit").on("click", function(event){
	curPair = $("#search-stock").val();
	let from = curPair.substring(0,3);
	let to  = curPair.substring(3,);
	console.log(curPair);
	ajaxPull(from, to);
})

function ajaxPull(from, to){
	$.ajax({
		type: 'GET',
		url: `https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=${from}&to_symbol=${to}&apikey=${apiKey}`,
		//if successful do the following
		success: function(data) {
			console.log(data);
			var data1 = data["Time Series FX (Daily)"];
			//check if API is working
			console.log("Data:", data1);
			var trace = {
				x: [],
				close: [],
				high: [],
				low: [],
				open: [],
				type: 'candlestick',
				xaxis: 'x',
				yaxis: 'y'
			};
			//1min data updates every minute
			$.each(data1, function(key,value){
			trace.x.push(key);
			trace.close.push(data1[key]["4. close"]);
			trace.high.push(data1[key]["2. high"]);
			trace.low.push(data1[key]["3. low"]);
			trace.open.push(data1[key]["1. open"]);
			});

			var graph = [trace];
			Plotly.newPlot('myDiv', graph);
			console.log(trace);
			console.log("success");
		}, // need a comma btwn success and error callback
		error: function(){
			alert("errror");
		}
	});
}


//document on load close
};