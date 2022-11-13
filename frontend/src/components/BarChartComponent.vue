<template>
    <canvas ref="myChart"></canvas>
  </template>
  
  <script>
  import { Chart, registerables } from 'chart.js'
  
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
      console.log("theses are the labels" + this.label)
      new Chart(this.$refs.myChart, {
        type: "bar",
        data: {
          labels: this.label,
          datasets: [
            {
              label: "Attendees",
              backgroundColor: "rgba(244,6,0,1 )", //Change color of bar chart to cougar red
              data: this.chartData,
            },
          ],
        },
        options: {
          scales: {
              y: {
                  max: 10
              }
          }
        }
      });
    },
  };
  </script>
