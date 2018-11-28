let myChart = document.getElementById('myChart').getContext('2d');
// Global options
Chart.defaults.global.defaultFontFamily = 'Lato';
Chart.defaults.global.defaultFontSize = 20;
Chart.defaults.global.defaultFontColor = '#777';

// var value = 10;
let massPopChart = new Chart(myChart, {
 type:'line',
 data:{
   labels:['Monday', 'Tuesday', 'Wednesday','Thursday','Friday', 'Saturday', 'Sunday' ],
   datasets:[{
     label: ['Temperature °C'],
     data: [10,20,30,40,50,30,40],
     backgroundColor:['#3366b7'],//we can use rbg and hex color
     hoverBorderWidth:3,
     fill: false,
     borderColor: '#000',
     lineTension:0.1,
     pointBackgroundColor: "black",
     pointBorderWidth: 1,
     pointHoverRadius: 8,
     pointRadius: 4
   }]
 },
options:{
  title: {
    display: true,
    text: 'Temperature in pita',
    fontSize: 25

  },
  legend:{
    display: false,
    position: 'right'
  },
  layout:{
    padding:{
      left:0,
      right:0,
      bottom:0,
      top:50
    }
  },
  tooltips:{
    enable: false
  },

  animation: {
    animationScale: true
  }



}

});
