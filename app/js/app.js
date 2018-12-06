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