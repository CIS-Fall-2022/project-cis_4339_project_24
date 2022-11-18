<!--OScar Lopez-->
<style>
table,
      th,
      td {
        padding: 10px;
        border: 1px solid black;
        border-collapse: collapse;
      }
</style>

<template>
  <main>
    <div>
      <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">Welcome</h1>
      <div>
        <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10"> Events </h1>
<!--Bar chart Oscar Lopez-->
        <AttendeesBar
              v-if="!loading && !error"
              :label="labels"
              :chart-data="attendee"
              style="margin-left: 75px; margin-right: 75px; margin-bottom: 75px;"
            ></AttendeesBar>
      </div>
<!--Table under the bar chart Oscar Lopez-->
      <table style="margin-left: auto; margin-right: auto;">
        <tr>
          <th> Event Name </th>
          <th> # to Attend </th>
        </tr>
        <tr v-for="event in tableData"><!--Not sure why it has red lines but code runs-->
          <td> {{event.eventName}} </td><!--Shows the event name on the table-->
          <td> {{event.attendee}} </td><!--Shows the # of attendees in table-->
        </tr>
      </table> 
    </div>
  </main>
</template>
  
  <script>
  import axios from "axios";
  import AttendeesBar from "@/components/BarChartComponent.vue";//From SRC Components
  
  export default {
    components: {
      AttendeesBar
    },
    data() {
      return {
        labels: [],//event arrays 
        attendee: [],//primary arrays
        loading: false,
        error: null,
        orgName: [],//Table event name
        tableData: [],//Table attendee #
      };
    },
    methods: {
      async fetchData() {
        try {
          this.error = null;
          this.loading = true;
          const url = `http://localhost:3000/eventData/report`; //Get data from backend 
          const response = await axios.get(url);
        //"re-organizing" - mapping json from the response
        this.labels = response.data.map((item) => item.eventName);//For the bar chart
        this.attendee = response.data.map((item) => item.attendee);//For the bar chart
        this.tableData = response.data; //For the table
      
        } catch (err) {
          if (err.response) {
            // client received an error response (5xx, 4xx)
            this.error = {
              title: "Server Response",
              message: err.message,
            };
          } else if (err.request) {
            // client never received a response, or request never left
            this.error = {
              title: "Unable to Reach Server",
              message: err.message,
            };
          } else {
            // There's probably an error in your code
            this.error = {
              title: "Application Error",
              message: err.message,
            };
          }
        }
        this.loading = false;
      },
    },
    mounted() {
      this.fetchData();
    },
  };

  
  </script>



<!--Code was provided by Professor. Lindner durning class-->
