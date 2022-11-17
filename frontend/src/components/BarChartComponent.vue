<template>
    <canvas ref="myChart"></canvas> <!--Bar Chart-->
</template>
  
  <script>

  import { Chart, registerables } from 'chart.js'//Npm istall chart.js
  
  Chart.register(...registerables);
  export default {
    props: {
      label: {
        type: Array,
      },
      chartData: {
        type: Array,
      },
    },
    async mounted() {
      console.log(this.chartData);
      console.log("The labels" + this.label)//Label are from the eventName inside the mongoDB
      new Chart(this.$refs.myChart, {
        type: "bar",//type of chart that is going to render
        data: {
          labels: this.label,
          datasets: [
            {
              label: "Attendee",
              borderColor: 'rgb(210, 43, 43)',
              backgroundColor: "rgba(244,6,0,1 )",//Change color to cougar red
              data: this.chartData,
            },
          ],
        },
        options: {
          scales: {
              y: {
                  max: 10//Max number in y-axis
              }
          }
        }
      });
    },
  };




  </script>

<!--Code was provided by Professor. Linder durning class-->