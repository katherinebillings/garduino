let myChart = document.getElementById('myChart').getContext('2d');
// Global options
Chart.defaults.global.defaultFontFamily = 'Lato';
Chart.defaults.global.defaultFontSize = 20;
Chart.defaults.global.defaultFontColor = '#777';

var value = 70;
let massPopChart = new Chart(myChart, {
 type:'doughnut',
 data:{
   labels:['Humidity'],
   datasets:[{
     label: 'Humidity',
     data: [value,100- value],
     backgroundColor:['#00e6ff','rgb(255,255,255, 0)'],//we can use rbg and hex color
     hoverBorderWidth:3,
     hoverBorderColor: '#000',
     borderWidth:[1,0]


   }]
 },
options:{
  title: {
    display: true,
    text: 'Humidity in pita',
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
  },

  cutoutPercentage:80


}

});
