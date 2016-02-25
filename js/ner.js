	function populateCharts(dateString, url){
	    $('.articles').empty();
		var fileString = "json/" + dateString + ".json";
		var loopMany = true;
		if(url != ""){
			loopMany = false;
		}
		//file exists
		$.getJSON( fileString, function( data ) {
			var organizationCount = 0;
			var personCount = 0;
			var locationCount = 0;
			var miscCount = 0;
			var durationCount = 0;
			var setCount = 0;
			var timeCount = 0;
			var ordinalCount = 0;
			var numberCount = 0;
			var dateCount = 0;
			
			var organizationData = [];
			var locationData = [];
			var personData = [];
			var miscData = [];
			var ordinalData = [];
			
			$.each( data, function( key, val ) {
				if(loopMany || key === url){
					var summary = val.Summary;
					var article = '';
					if(summary != null && typeof summary !== 'undefined'){
						var title = Object.keys(summary)[0];
						article = '<div class="article">'
									+ '<h3><a href="#" onclick="populateCharts(\'' + dateString + '\', \'' + key + '\');">'
									+ title + '</a></h3>'
									+ '<p class="summary">' + summary[title] + '</p></div>';
					}
					var ner = val.NER;
					var organization = ner.ORGANIZATION;
					var person = ner.PERSON;
					var location = ner.LOCATION;
					var misc = ner.MISC;
					var duration = ner.DURATION;
					var set = ner.SET;
					var time = ner.TIME;
					var ordinal = ner.ORDINAL;
					var number = ner.NUMBER;
					var date = ner.DATE;
					if(organization !== null && typeof organization !== 'undefined'){
						$.each(organization, function(key, val){
							var pushData = true;
							organizationCount = organizationCount + val;
							$.each(organizationData, function(i,arr){
								if(arr[0]==key){
									arr[1] = arr[1] + val;
									pushData = false;
									return false;
								}
							});
							if(pushData){
								organizationData.push([key,val]);
							}
						});
					}
					if(person !== null && typeof person !== 'undefined'){
						$.each(person, function(key, val){
							var pushData = true;
							personCount = personCount + val;
							$.each(personData, function(i,arr){
								if(arr[0]==key){
									arr[1] = arr[1] + val;
									pushData = false;
									return false;
								}
							});
							if(pushData){
								personData.push([key,val]);
							}
						});
					}
					if(location !== null && typeof location !== 'undefined'){
						$.each(location, function(key, val){
							var pushData = true;
							locationCount = locationCount + val;
							$.each(locationData, function(i,arr){
								if(arr[0]==key){
									arr[1] = arr[1] + val;
									pushData = false;
									return false;
								}
							});
							if(pushData){
								locationData.push([key,val]);
							}
						});
					}
					if(misc !== null && typeof misc !== 'undefined'){
						$.each(misc, function(key, val){
							var pushData = true;
							miscCount = miscCount + val;
							$.each(miscData, function(i,arr){
								if(arr[0]==key){
									arr[1] = arr[1] + val;
									pushData = false;
									return false;
								}
							});
							if(pushData){
								miscData.push([key,val]);
							}
						});
					}
					if(ordinal !== null && typeof ordinal !== 'undefined'){
						$.each(ordinal, function(key, val){
							ordinalCount = ordinalCount + val;
						});
					}
					if(duration !== null && typeof duration !== 'undefined'){
						$.each(duration, function(key, val){
							durationCount = durationCount + val;
						});
					}
					if(set !== null && typeof set !== 'undefined'){
						$.each(set, function(key, val){
							setCount = setCount + val;
						});
					}
					if(time !== null && typeof time !== 'undefined'){
						$.each(time, function(key, val){
							timeCount = timeCount + val;
						});
					}
					if(date !== null && typeof date !== 'undefined'){
						$.each(date, function(key, val){
							dateCount = dateCount + val;
						});
					}
					if(number !== null && typeof number !== 'undefined'){
						$.each(number, function(key, val){
							numberCount = numberCount + val;
						});
					}
				}
				$('.articles').append(article);
			});	
				
			// Create the chart
			$('#bar-graph').highcharts({
				chart: {
					type: 'column'
				},
				title: {
					text: 'NER for ' + dateString
				},
				subtitle: {
					text: 'Click the columns to view name entities. Source: http://www.nation.co.ke'
				},
				xAxis: {
					type: 'category'
				},
				yAxis: {
					title: {
						text: 'Total frequency'
					}

				},
				legend: {
					enabled: false
				},
				plotOptions: {
					series: {
						borderWidth: 0,
						dataLabels: {
							enabled: true,
							//format: '{point.y:.1f}%'
							format: '{point.y}'
						}
					}
				},

				tooltip: {
					headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
					//pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
					pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b> mentions<br/>'
				},

				series: [{
					name: "NE",
					colorByPoint: true,
					data: [{
						name: "Organization",
						//y: (organizationCount/total)*100,
						y: organizationCount,
						drilldown: "Organization"
					}, {
						name: "Location",
						//y: (locationCount/total)*100,
						y: locationCount,
						drilldown: "Location"
					}, {
						name: "Person",
						//y: (personCount/total)*100,
						y: personCount,
						drilldown: "Person"
					}, {
						name: "Misc",
						//y: (miscCount/total)*100,
						y: miscCount,
						drilldown: "Misc"
					}, {
						name: "Ordinal",
						//y: (ordinalCount/total)*100,
						y: ordinalCount,
						drilldown: "null"
					}, {
						name: "Duration",
						//y: (durationCount/total)*100,
						y: durationCount,
						drilldown: "null"
					}, {
						name: "Number",
						//y: (numberCount/total)*100,
						y: numberCount,
						drilldown: "null"
					}, {
						name: "Date",
						//y: (dateCount/total)*100,
						y: dateCount,
						drilldown: "null"
					}, {
						name: "Set",
						//y: (setCount/total)*100,
						y: setCount,
						drilldown: "null"
					}, {
						name: "Time",
						//y: (timeCount/total)*100,
						y: timeCount,
						drilldown: "null"
					}]
				}],
				drilldown: {
					series: [{
						name: "Organization",
						id: "Organization",
						data: organizationData
					}, {
						name: "Location",
						id: "Location",
						data: locationData
					}, {
						name: "Person",
						id: "Person",
						data: personData
					}, {
						name: "Misc",
						id: "Misc",
						data: miscData
					}]
				}
			});
		});
	}

	function fillMap(dateString){
		$.getJSON("js/mapdata/countries/ke/kenya-counties.json", function(jsondata) {
			// data is a JavaScript object now. Handle it as such
			Highcharts.maps["countries/ke/ke-all"] = jsondata;
			// Prepare demo data
			var fileString = "json/counties-" + dateString + ".json";
			$.getJSON(fileString, function(countiesData) {
				var jsonObj = [];
				$.each(countiesData, function(key, val){
					var item = {};
					item["code"] = key;
					item["value"] = val;
                    jsonObj.push(item);					
				});
				var data = jsonObj;
				/*
				var data = [
					{
						"code": "Murang'a",
						"value": 2
					},
					{
						"code": "Nairobi",
						"value": 1
					},
					{
						"code": "Mombasa",
						"value": 2
					},
					{
						"code": "Kiambu",
						"value": 10
					},
					{
						"code": "Kisumu",
						"value": 5
					}
				];*/

				// Initiate the chart
				$('#map').highcharts('Map', {

					title : {
						text : 'News Topic Distribution'
					},

					subtitle : {
						text : 'Source map: <a href="#">Kenya</a>'
					},

					mapNavigation: {
						enabled: true,
						buttonOptions: {
							verticalAlign: 'bottom'
						}
					},

					colorAxis: {
						min: 0
					},

					series : [{
						data : data,
						mapData: Highcharts.maps['countries/ke/ke-all'],
						joinBy: ['name','code'],
						name: 'No. of stories',
						states: {
							hover: {
								color: '#BADA55'
							}
						},
						dataLabels: {
							enabled: true,
							format: '{point.properties.name}'
						}
					}]
				});
			});
		});
	}
	
	$(function () {
		var d = new Date();
		var month = d.getMonth()+1;
		var day = d.getDate();
		var year = d.getFullYear();

		var dateToday =(('' + day).length < 2 ? '0' : '') + day + "-" + (('' + month).length < 2 ? '0' : '') + month + "-" + year;
		populateCharts(dateToday, "");
		fillMap(dateToday);
		$("#datepicker").datepicker({
			onSelect: function(dateText, inst) { 
				var dateAsString = dateText; //the first parameter of this function
				//var dateAsObject = $(this).datepicker( 'getDate' ); //the getDate method
				var strArr = dateAsString.split("/");
				var newDateString = strArr[1] + "-" + strArr[0] + "-" + strArr[2];
				//console.log(newDateString);
				populateCharts(newDateString,"");
				fillMap(newDateString);
			}
		});
	});