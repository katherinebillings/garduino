let myChart = document.getElementById('myChart').getContext('2d');
// Global options
Chart.defaults.global.defaultFontFamily = 'Lato';
Chart.defaults.global.defaultFontSize = 20;
Chart.defaults.global.defaultFontColor = '#777';

// var value = 60;
let massPopChart = new Chart(myChart, {
 type:'line',
 data:{
   labels:['Monday', 'Tuesday', 'Wednesday','Thursday','Friday', 'Saturday', 'Sunday' ],
   datasets:[{
     label: ['Sunlight'],
     data: [30,40,50,60,45,40,56,50],
     backgroundColor:['#3366b7'],//we can use rbg and hex color
     hoverBorderWidth:3,
     fill: false,
     borderColor: '#f4c242',
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
    text: 'Light in pita',
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
