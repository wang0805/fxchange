//wait for whole document to load up before loading javascript
window.onload = function(){


var value;
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

$("#search-form").submit(function(event){
	curPair = $("#search-stock").val();
	let from = curPair.substring(0,3);
	let to  = curPair.substring(3,);
	console.log(curPair);
	event.preventDefault();

	ajaxPull(from, to);
	var startInterval = setInterval(function(){ajaxPull(from, to)}, 300000); 
})


$('#my-form').submit(function(event){
	value = $('#input-ticker').val().toUpperCase();
	event.preventDefault();
	//$("#ordertable").show();
	ajaxpullTicker(value);
})

function ajaxPull(from, to){
	$.ajax({
		type: 'GET',
		//url: `https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=${from}&to_symbol=${to}&apikey=${apiKey}`,
		url: `https://www.alphavantage.co/query?function=FX_INTRADAY&from_symbol=${from}&to_symbol=${to}&interval=5min&apikey=${apiKey}`,
		//if successful do the following
		success: function(data) {
			console.log(data);
			var data1 = data["Time Series FX (5min)"];
			//var data1 = data["Time Series FX (Daily)"];
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
			alert("error pulling graph");
		}
	});
}

function ajaxpullTicker(value) {
	$.ajax({
		type: 'GET',
		//url: 'http://localhost:3000/orders',
		url: 'https://enigmatic-basin-19796.herokuapp.com/orders',
		success: function(data) {
			console.log(data);
			var html = '';
			for (let i=0; i<data.length; i++){
				if(data[i].ticker === value){
					html += `<tr>
					<td class="text-center">${data[i].ticker}</td>
					<td class="text-center">${data[i].ordertype}</td>
					<td class="text-center">${data[i].price}</td>
					<td class="text-center">${data[i].qty}</td>
					</tr>`
				}
			}
			$('#insert-table').html(html);
			console.log("success")
		}, // need a comma btwn success and error callback
		error: function(){
			alert("error pulling table");
		}
	})
}

function ajaxpullAll() {
	$.ajax({
		type: 'GET',
		url: 'https://enigmatic-basin-19796.herokuapp.com/orders',
		//url: 'http://localhost:3000/orders',
		success: function(data) {
			console.log(data);
			var html = '';
			for (let i=0; i<data.length; i++){
				html += `<tr>
				<td class="text-center">${data[i].ticker}</td>
				<td class="text-center">${data[i].ordertype}</td>
				<td class="text-center">${data[i].price}</td>
				<td class="text-center">${data[i].qty}</td>
				</tr>`
			}
			$('#insert-table').html(html);
			console.log("success")
		}, // need a comma btwn success and error callback
		error: function(){
			alert("error pulling order table");
		}
	})
}

$('#orderstatus').change(function(event){
	if($('#orderstatus').val() === 'all'){
		showAll('all');
	}
	if($('#orderstatus').val() === 'filled'){
		sortBy('filled');
	}
	else if($('#orderstatus').val() === 'active'){
		sortBy('active');
	}
	else if($('#orderstatus').val() === 'cancelled'){
		sortBy('cancelled');
	}
})

$('#orderticker').change(function(event){
	if($('#orderticker').val() === 'all'){
		showAllTicker('all');
	}
	if($('#orderticker').val() === 'USDSGD'){
		sortByTicker('USDSGD');
	}
	else if($('#orderticker').val() === 'SGDMYR'){
		sortByTicker('SGDMYR');
	}
	else if($('#orderticker').val() === 'SGDTWD'){
		sortByTicker('SGDTWD');
	}
	else if($('#orderticker').val() === 'SGDTHB'){
		sortByTicker('SGDTHB');
	}
})

editStuff();
ajaxPull('usd', 'sgd')
ajaxpullAll();


//document on load close
};
// other functions
function editStuff() {
    for ( let i = 0; i < document.getElementsByClassName('orderstatus').length; i++ ) {
        if ( document.getElementsByClassName('orderstatus')[i].textContent != 'active' ) {
            document.getElementsByClassName('edit')[i].textContent = "";
            document.getElementsByClassName('cancel')[i].textContent = "";
        }
    }
}

function sortBy(sort){
	for(let i=0; document.getElementsByClassName('orderstatus').length; i++) {
		if(document.getElementsByClassName('orderstatus')[i].textContent != sort){
			document.getElementsByClassName('orderstatus')[i].parentElement.style.display ="none";
		}
		else {
			document.getElementsByClassName('orderstatus')[i].parentElement.style.display ="table-row";
		}
	}
}

function sortByTicker(sort){
	for(let i=0; document.getElementsByClassName('orderticker').length; i++) {
		if(document.getElementsByClassName('orderticker')[i].textContent != sort){
			document.getElementsByClassName('orderticker')[i].parentElement.style.display ="none";
		}
		else {
			document.getElementsByClassName('orderticker')[i].parentElement.style.display ="table-row";
		}
	}
}

function showAll(sort){
	for(let i=0; document.getElementsByClassName('orderstatus').length; i++) {
		if(document.getElementsByClassName('orderstatus')[i].textContent != sort){
			document.getElementsByClassName('orderstatus')[i].parentElement.style.display ="table-row";
		}
	}
}

function showAllTicker(sort){
	for(let i=0; document.getElementsByClassName('orderticker').length; i++) {
		if(document.getElementsByClassName('orderticker')[i].textContent != sort){
			document.getElementsByClassName('orderticker')[i].parentElement.style.display ="table-row";
		}
	}
}