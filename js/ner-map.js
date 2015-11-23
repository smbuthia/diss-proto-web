$(function () {
    $.getJSON("js/mapdata/countries/ke/kenya-counties.json", function(jsondata) {
        // data is a JavaScript object now. Handle it as such
        Highcharts.maps["countries/ke/ke-all"] = jsondata;
		// Prepare demo data
		var data = [
			{
				"code": "Turkana",
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
			}
		];

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
				name: 'Test data',
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