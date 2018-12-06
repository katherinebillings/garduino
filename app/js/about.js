(function() {
    "use strict";

    //circle menu

    var button = document.querySelector("#click");
    var nav = document.querySelector("#nav");
    var links = document.querySelectorAll(".circle a");

    function navToggle() {
        nav.classList.toggle("closed");
        button.classList.toggle("closeToggle");
    }

    links.forEach(function(element, index) {
        element.addEventListener("click", navToggle, false);
    });
    

    //removal of circle menu
    var checkMob;

    function simpleNav() {
        if(window.innerWidth >= 768) {
            checkMob = false;
		} else if(button.classList.contains("closeToggle") && checkMob == false) {
            button.classList.remove("closeToggle");
            nav.classList.add("closed");
            checkMob = true;
        }
    }

	//Run on scroll and resize
    window.onresize = function() {simpleNav()};
    
    simpleNav();

})();