function getChartData(cr, chart_search, chart_cnt, age){
	
	if($("[name=chart_search]").val()=="나이대"){
		$(".chart_cnt").show();
		$(".age_select").show();
	}else if($("[name=chart_search]").val() == "성별"){
		$(".chart_cnt").show();
	}
	else{
		$(".chart_cnt").hide();
		$(".age_select").hide();
	}
	
/*	if($("[name=chart_search]").val() == "성별"){
		$(".chart_cnt").show();
		$(".gender").show();
	}else{
		$(".chart_cnt").hide();
		$(".gender").hide();
	}*/
	
	$.ajax({
		// 접속할 서버 쪽 url 주소 설정
		url : cr + "/order_analysis_chart.ida"
		// 전송 방법 설정
		, type : "post"
		// 서버로 보낼 파라미터명과 파라미터값을 설정
		, data : "chart_search=" + chart_search + "&chart_cnt=" + chart_cnt + "&age=" + age
		// 서버의 응답을 성공적으로 받았을 경우 실행할 익명함수 설정
		, success : function(chart_data){
			$("[id^=myChart]").remove();
			$(".card-body").append(
					'<canvas id="myChart1" width="100%" height="30"></canvas>'+
					'<canvas id="myChart2" width="100%" height="30"></canvas>'
			);
			
			if($("[name=chart_search]").val() == '성별'){
				drawBarChart(chart_data);
				drawGenderBarChart(chart_data);
			}else if($("[name=chart_search]").val() == '나이대'){
				drawPieChart(chart_data);
				drawGenderBarChart(chart_data);
			}else if($("[name=chart_search]").val() == '주'){
				drawAreaChart(chart_data);
			}else if($("[name=chart_search]").val() == '월'){
				drawAreaChart(chart_data);
			}else if($("[name=chart_search]").val() == '시간'){
				drawAreaChart(chart_data);
			}else if($("[name=chart_search]").val() == '분기'){
				drawAreaChart(chart_data);
			}
		}
		// 서버의 응답을 못받았을 경우 실행할 익명함수 설정
		,error : function(){
			alert("서버 접속 실패하였습니다. 다시 시도해주시기 바랍니다.");
		}
	});
}


function drawAreaChart(data) {
	// Set new default font family and font color to mimic Bootstrap's default
	// styling
	Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
	Chart.defaults.global.defaultFontColor = '#292b2c';
	// Area Chart Example
	var ctx = document.getElementById("myChart1");
	var myLineChart = new Chart(ctx, {
		type : 'line',
		data : {
			labels : data.label,
			datasets : [ {
				label : "Sessions",
				lineTension : 0.3,
				backgroundColor : "rgba(2,117,216,0.2)",
				borderColor : "rgba(2,117,216,1)",
				pointRadius : 5,
				pointBackgroundColor : "rgba(2,117,216,1)",
				pointBorderColor : "rgba(255,255,255,0.8)",
				pointHoverRadius : 5,
				pointHoverBackgroundColor : "rgba(2,117,216,1)",
				pointHitRadius : 50,
				pointBorderWidth : 2,
				data : data.data1,
			} ],
		},
		options : {
			scales : {
				xAxes : [ {
					time : {
						unit : 'date'
					},
					gridLines : {
						display : false
					},
					ticks : {
						maxTicksLimit : 7
					}
				} ],
				yAxes : [ {
					ticks : {
						min : 0,
						max : 600,
						maxTicksLimit : 5
					},
					gridLines : {
						color : "rgba(0, 0, 0, .125)",
					}
				} ],
			},
			legend : {
				display : false
			},
			title:{
				display : true,
				text : '시간대 별 주문 횟수'
			}
		}
	});
}

function drawPieChart(data) {
	// Set new default font family and font color to mimic Bootstrap's default styling
	Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
	Chart.defaults.global.defaultFontColor = '#292b2c';

	// Pie Chart Example
	var ctx = document.getElementById("myChart1");
	var myPieChart = new Chart(ctx, {
		type : 'pie',
		data : {
			labels : data.label,
			datasets : [ {
				data : data.data1,
				backgroundColor : [ '#007bff', '#dc3545', '#ffc107', '#28a745','#6919EC' ],
			} ],
		},
		options:{
			title:{
				display : true,
				text : '나이대 별 주문 횟수'
			}
		}
	});
	
	
}function drawGenderPieChart(data) {
	// Set new default font family and font color to mimic Bootstrap's default styling
	Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
	Chart.defaults.global.defaultFontColor = '#292b2c';

	// Pie Chart Example
	var ctx = document.getElementById("myChart1");
	var myPieChart = new Chart(ctx, {
		type : 'pie',
		data : {
			labels : data.label,
			datasets : [ {
				data : data.data1,
				backgroundColor : [ '#007bff', '#dc3545', '#ffc107', '#28a745','#6919EC' ],
			} ],
		},
		options:{
			title:{
				display : true,
				text : '나이대 별 주문 횟수'
			}
		}
	});
}

function drawBarChart(data){
	//Set new default font family and font color to mimic Bootstrap's default styling
	Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
	Chart.defaults.global.defaultFontColor = '#292b2c';

	//Bar Chart Example
	var ctx = document.getElementById("myChart1");
	var myLineChart = new Chart(ctx, {
		type : 'bar',
		data : {
			labels : data.label,
			datasets : [ {
				label : data.dataset[0],
				backgroundColor : [
 					"rgba(2,117,216,1)",
					'rgba(255, 99, 132, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)' ],
				borderColor : "rgba(2,117,216,1)",
				data : data.data1
			} ],
		},
		options : {
			scales : {
				xAxes : [ {
					time : {
						unit : 'month'
					},
					gridLines : {
						display : false
					},
					ticks : {
						maxTicksLimit : 15
					}
				} ],
				yAxes : [ {
					ticks : {
						min : 0,
						max : 100,
						maxTicksLimit : 10
					},
					gridLines : {
						display : true
					}
				} ],
			},
			legend : {
				display : false
			},			
			title:{
				display : true,
				text : '남자 주문 메뉴 순위'
			}
		}
	});
	
}
function drawGenderBarChart(data){
	//Set new default font family and font color to mimic Bootstrap's default styling
	Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
	Chart.defaults.global.defaultFontColor = '#292b2c';

	//Bar Chart Example
	var ctx = document.getElementById("myChart2");
	var myLineChart = new Chart(ctx, {
		type : 'bar',
		data : {
			labels : data.label2,
			datasets : [ {
				label : data.dataset[0],
				backgroundColor :[
 					"rgba(2,117,216,1)",
					'rgba(255, 99, 132, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)' ],
				borderColor : "rgba(2,117,216,1)",
				data : data.data2
			} ],
		},
		options : {
			scales : {
				xAxes : [ {
					time : {
						unit : 'month'
					},
					gridLines : {
						display : false
					},
					ticks : {
						maxTicksLimit : 15
					}
				} ],
				yAxes : [ {
					ticks : {
						min : 0,
						max : 100,
						maxTicksLimit : 10
					},
					gridLines : {
						display : true
					}
				} ],
			},
			legend : {
				display : false
			},			
			title:{
				display : true,
				text : '주문 메뉴 순위'
			}
		}
	});
	
}


function drawdoubleBarChart(data){
//Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

//Bar Chart Example
var ctx = document.getElementById("myChart2");
var myLineChart = new Chart(ctx, {
	type : 'bar',
	data : {
		labels : data.label,
		datasets : [ {
			label : data.dataset,
			backgroundColor : "rgba(2,117,216,1)",
			borderColor : "rgba(2,117,216,1)",
			data : data.data1
		} , {
			label : data.dataset,
			backgroundColor : "rgba(100,350,216,1)",
			borderColor : "rgba(2,117,216,1)",
			data : data.data2
		}],
	},
	options : {
		scales : {
			xAxes : [ {
				time : {
					unit : 'month'
				},
				gridLines : {
					display : false
				},
				ticks : {
					maxTicksLimit : 15
				}
			} ],
			yAxes : [ {
				ticks : {
					min : 0,
					max : 30,
					maxTicksLimit : 10
				},
				gridLines : {
					display : true
				}
			} ],
		},
		legend : {
			display : false
		},			
		title:{
			display : true,
			text : '메뉴 별 주문 횟수'
		}
	}
});

	

}
