// JavaScript Document
(function(){
	"use strict";
	
	//loading screen
	var loadingAnimation = document.querySelector('#overlay');

	setTimeout(function() {
		// console.log('timeout loaded');
		loadingAnimation.classList.toggle('fade');
	}, 100);
	//1700

	if(navigator.userAgent.indexOf("Firefox") != -1 ) {
		var params = {
			container: document.querySelector('#loadingScreen'),
			renderer: 'svg',
			loop: false,
			autoplay: true,
			path: "data.json"
		};
			
		var anim;
		//Load Animation
		anim = lottie.loadAnimation(params);
		//Animation Speed
		anim.setSpeed(2.5);	
	} else {
		var load = document.querySelector("#loader");
		load.style.display = "block";
	}
	//JSON Data
	
	//main navigation
	var button = document.querySelector("#button");
	var nav = document.querySelector("#mainNav");
	var burgerMenu = document.querySelector("#burgerMenu");
    var links = document.querySelectorAll(".circle a");

    function navToggle() {
		nav.classList.toggle("closed");
        button.classList.toggle("closeToggle");
	}
	
	button.addEventListener("click", navToggle, false);

	//resize nav
	function navDesk() {
		if(window.innerWidth > 600) {
			if(nav.classList.contains("closed")) {
				nav.classList.remove("closed");
				button.classList.remove("closeToggle");
			}
		}
	};

	window.addEventListener("resize", navDesk, false);

	navDesk();

	//details nav
	if(window.innerWidth <= 600) {
		var dNav = document.querySelector("#detailsNav");
		var circles = dNav.querySelectorAll("span");
		var humidDetails = document.querySelector("#humid");
		var sunDetails = document.querySelector("#sun");
		var tempDetails = document.querySelector("#temp");
		var current;

		if(window.location.href.indexOf("temp") > -1) {
			tempDetails.classList.remove("hideDetailsRight");
			tempDetails.classList.remove("hideDetailsLeft");
			humidDetails.classList.add("hideDetailsLeft");
			circles[1].classList.add("active");
			circles[0].classList.remove("active");
			current = circles[1];
		} else if(window.location.href.indexOf("sun") > -1) {
			humidDetails.classList.add("hideDetailsLeft");
			sunDetails.classList.remove("hideDetailsRight");
			sunDetails.classList.remove("hideDetailsLeft");
			circles[2].classList.add("active");
			circles[0].classList.remove("active");
			current = circles[2];
		} else {
			current = circles[0];
		}

		for (var h = 0; h < circles.length; h++) {
			circles[h].addEventListener("click", swipeNav, false);
		};
	}
	
	
	// Global options
	Chart.defaults.global.defaultFontFamily = 'Lato';
	Chart.defaults.global.defaultFontSize = 20;
	Chart.defaults.global.defaultFontColor = '#f5f5f5';

	var humidChartBox = document.querySelector('#myHumidityChart').getContext('2d');
	let humidHistoryBox = document.querySelector('#humidChart').getContext('2d');
	let sunHistoryBox = document.querySelector('#sunChart').getContext('2d');
	let tempHistoryBox = document.querySelector('#tempChart').getContext('2d');

var value = 70;
	let historyH = new Chart(humidHistoryBox, {
		type:'line',
		data:{
			labels:['Monday', 'Tuesday', 'Wednesday','Thursday','Friday', 'Saturday', 'Sunday' ],
			datasets:[{
				label: ['Humidity'],
				data: [30,90,80,50,45,40,56,50],
				backgroundColor:['#f5f5f5'],//we can use rbg and hex color
				hoverBorderWidth:3,
				fill: false,
				borderColor: '#595980',
				lineTension:0.1,
				pointBackgroundColor: "#BEDA71",
				pointBorderWidth: 1,
			 	pointHoverRadius: 8,
				pointRadius: 5
			}]
		},
	 options:{
		 legend:{
			 display: false,
			 position: 'right'
		 },
		 layout:{
			 padding:{
				 left:0,
				 right:0,
				 bottom:0,
				 top:0
			 }
		 },
		 tooltips:{
			 enable: false
		 },
	 
		 animation: {
			 animationScale: true
		 },

		 scales: {
			xAxes: [{
				gridLines: {
					color: "rgba(189, 189, 189, 0.25)"
				}
			}],
			yAxes: [{
				gridLines: {
					color: "rgba(189, 189, 189, 0.25)"
				}   
			}]
		}
	 
	 
	 
	 }
	 
	 });

	 let historyS = new Chart(sunHistoryBox, {
		type:'line',
		data:{
			labels:['Monday', 'Tuesday', 'Wednesday','Thursday','Friday', 'Saturday', 'Sunday' ],
			datasets:[{
				label: ['Sunlight'],
				data: [30,80,50,10,45,40,56,50],
				backgroundColor:['#f5f5f5'],//we can use rbg and hex color
				hoverBorderWidth:3,
				fill: false,
				borderColor: '#595980',
				lineTension:0.1,
				pointBackgroundColor: "#BEDA71",
				pointBorderWidth: 1,
			 	pointHoverRadius: 8,
				pointRadius: 5
			}]
		},
	 options:{
		 legend:{
			 display: false,
			 position: 'right'
		 },
		 layout:{
			 padding:{
				 left:0,
				 right:0,
				 bottom:0,
				 top:0
			 }
		 },
		 tooltips:{
			 enable: false
		 },
	 
		 animation: {
			 animationScale: true
		 },

		 scales: {
			xAxes: [{
				gridLines: {
					color: "rgba(189, 189, 189, 0.25)"
				}
			}],
			yAxes: [{
				gridLines: {
					color: "rgba(189, 189, 189, 0.25)"
				}   
			}]
		}
	 
	 
	 
	 }
	 
	 });

	 let historyT = new Chart(tempHistoryBox, {
		type:'line',
		data:{
			labels:['Monday', 'Tuesday', 'Wednesday','Thursday','Friday', 'Saturday', 'Sunday' ],
			datasets:[{
				label: ['Temperature'],
				data: [30,60,50,60,45,40,56,50],
				backgroundColor:['#f5f5f5'],//we can use rbg and hex color
				hoverBorderWidth:3,
				fill: false,
				borderColor: '#595980',
				lineTension:0.1,
				pointBackgroundColor: "#BEDA71",
				pointBorderWidth: 1,
			 	pointHoverRadius: 8,
				pointRadius: 5
			}]
		},
	 options:{
		 legend:{
			 display: false,
			 position: 'right'
		 },
		 layout:{
			 padding:{
				 left:0,
				 right:0,
				 bottom:0,
				 top:0
			 }
		 },
		 tooltips:{
			 enable: false
		 },
	 
		 animation: {
			 animationScale: true
		 },

		 scales: {
			xAxes: [{
				gridLines: {
					color: "rgba(189, 189, 189, 0.25)"
				}
			}],
			yAxes: [{
				gridLines: {
					color: "rgba(189, 189, 189, 0.25)"
				}   
			}]
		}
	 
	 
	 
	 }
	 
	 });

	var humidChart = new Chart(humidChartBox, {
		type:'doughnut',
			data:{
				labels:['Humidity'],
				datasets:[{
					label: 'Humidity',
					data: [30,70],
					backgroundColor:['#00e6ff'],
					hoverBorderWidth:3,
					hoverBorderColor: '#000',
					borderWidth:[1,0]
				}]
				},
				options:{
					legend:{
						display: false
					},
					layout:{
						padding:{
							left:0,
							right:0,
							bottom:0,
							top:0
						}
					},
					tooltips:{
						enable: false
					},

					animation: {
						animationScale: false
					},

					cutoutPercentage:80
				}

			});

	function swipeNav(e) {
		e.currentTarget.classList.add("active");
		current.classList.remove("active");
		for (var i = 0; i < circles.length; i++) {
			var currentNum;
			if(current === circles[i]) {
				if(currentNum < i) {
					if(i === 1) {
						tempDetails.classList.add("hideDetailsRight");
					} else if(i === 2) {
						sunDetails.classList.add("hideDetailsRight");
					} else {
						humidDetails.classList.add("hideDetailsRight");
					} 
				} else {
					if(i === 1) {
						tempDetails.classList.add("hideDetailsLeft");
					} else if(i === 2) {
						sunDetails.classList.add("hideDetailsLeft");
					} else {
						humidDetails.classList.add("hideDetailsLeft");
					} 
				}
			} else if(e.currentTarget === circles[i]) {
				if(i === 1) {
					tempDetails.classList.remove("hideDetailsRight");
					tempDetails.classList.remove("hideDetailsLeft");
				} else if(i === 2) {
					sunDetails.classList.remove("hideDetailsRight");
					sunDetails.classList.remove("hideDetailsLeft");
				} else {
					humidDetails.classList.remove("hideDetailsRight");
					humidDetails.classList.remove("hideDetailsLeft");
				}
				currentNum = i;
			}
		}
		current = e.currentTarget;
	}


		
	//refresh
	var refresh = document.querySelector(".refresh");

	function reloadPage() {
		
	}

	refresh.addEventListener("click", reloadPage, false);
})();