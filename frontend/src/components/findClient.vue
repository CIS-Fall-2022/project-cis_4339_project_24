<template>
  <main>
    <div>
      <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">Find Client</h1>
    </div>
    <div class="px-10 pt-20">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
        <h2 class="text-2xl font-bold">Search Client By</h2>
        <!-- Displays Client Name search field -->
        <div class="flex flex-col">
          <select
            class="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            v-model="searchBy"
          >
            <option value="Client Name">Client Name</option>
            <option value="Client Number">Client Number</option>
          </select>
        </div>
        <div class="flex flex-col" v-if="searchBy === 'Client Name'">
          <label class="block">
            <input
              type="text"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              v-model="firstName"
              v-on:keyup.enter="handleSubmitForm"
              placeholder="Enter first name"
            />
          </label>
        </div>
        <div class="flex flex-col" v-if="searchBy === 'Client Name'">
          <label class="block">
            <input
              type="text"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              v-model="lastName"
              v-on:keyup.enter="handleSubmitForm"
              placeholder="Enter last name"
            />
          </label>
        </div>
        <!-- Displays Client Number search field -->
        <div class="flex flex-col" v-if="searchBy === 'Client Number'">
          <input
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            type="text"
            v-model="phoneNumber"
            v-on:keyup.enter="handleSubmitForm"
            placeholder="Enter Client Phone Number"
          />
        </div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
        <div></div>
        <div></div>
        <div class="mt-5 grid-cols-2">
          <button
            class="mr-10 border border-red-700 bg-white text-red-700 rounded"
            @click="clearSearch"
            type="submit"
          >Clear Search</button>
          <button
            class="bg-red-700 text-white rounded"
            @click="handleSubmitForm"
            type="submit"
          >Search Client</button>
        </div>
      </div>
    </div>

    <hr class="mt-10 mb-10" />
    <!-- Display Found Data -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
      <div class="ml-10">
        <h2 class="text-2xl font-bold">List of Clients</h2>
        <h3 class="italic">Click table row to edit/display an entry</h3>
      </div>
      <div class="flex flex-col col-span-2">
        <table class="min-w-full shadow-md rounded">
          <thead class="bg-gray-50 text-xl">
            <tr>
              <th class="p-4 text-left">Name</th>
              <th class="p-4 text-left">Phone number</th>
              <th class="p-4 text-left">City</th>
              <th><!-- just to look nice --></th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-300">
            <tr @click="editClient(client._id)" v-for="client in queryData" :key="client._id">
              <td class="p-2 text-left">{{ client.firstName + " " + client.lastName }}</td>
              <td class="p-2 text-left">{{ client.phoneNumbers[0].primaryPhone }}</td>
              <td class="p-2 text-left">{{ client.address.city }}</td>
              <!-- Jacob Hui -->
              <!-- adding another column for delete button -->
              <!-- copied style from other buttons -->
              <td><button @click="deleteClient(client._id)" type="submit" class="bg-red-700 text-white rounded">Delete Client</button></td>
              <!-- getting error, but it works? -->
              <!-- TypeError: Cannot read properties of undefined (reading 'firstName') -->
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>
<script>
import axios from "axios";
import { useToast } from "vue-toastification"
export default {
  data() {
    return {
      queryData: [],
      //Parameter for search to occur
      searchBy: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
    };
  },
  mounted() {
    let apiURL = import.meta.env.VITE_ROOT_API + `/primarydata/`;
    axios.get(apiURL).then((resp) => {
      this.queryData = resp.data;
    })
    .catch((error) => {
      const toast = useToast()
      toast("Server error", { type: "error", position: "bottom-right" })
    });
    window.scrollTo(0, 0);
  },
  methods: {
    handleSubmitForm() {
      let apiURL = "";
      console.log(this.serachBy)
      if(!this.searchBy){
        const toast = useToast()
        toast("No search option selected", { type: "warning", position: "bottom-right" })
        return;
      }
      if (this.searchBy === "Client Name") {
        if(!this.firstName && !this.lastName){
          const toast = useToast()
          toast("No firstName or lastName entered.", { type: "warning", position: "bottom-right" })
          return;
        }
        apiURL =
          import.meta.env.VITE_ROOT_API +
          `/primarydata/search/?firstName=${this.firstName}&lastName=${this.lastName}&searchBy=name`;
      } else if (this.searchBy === "Client Number") {
        if(!this.phoneNumber){
          const toast = useToast()
          toast("No phoneNumber entered.", { type: "warning", position: "bottom-right" })
          return;
        }
        apiURL =
          import.meta.env.VITE_ROOT_API +
          `/primarydata/search/?phoneNumbers.primaryPhone=${this.phoneNumber}&searchBy=number`;
      }
      axios.get(apiURL).then((resp) => {
        this.queryData = resp.data;
      });
    },
    clearSearch() {
      //Resets all the variables
      this.searchBy = "";
      this.firstName = "";
      this.lastName = "";
      this.phoneNumber = "";

      //get all entries
      let apiURL = import.meta.env.VITE_ROOT_API + `/primarydata/`;
      axios.get(apiURL).then((resp) => {
        this.queryData = resp.data;
      });
    },
    editClient(clientID) {
      this.$router.push({ name: "updateclient", params: { id: clientID } });
    },
    deleteClient(clientId) { // Jacob Hui
      let apiURL = import.meta.env.VITE_ROOT_API + `/primarydata/` + clientId;
      axios.delete(apiURL).then(() => {
        // reopen client page 
        // found redirect at https://stackoverflow.com/questions/49601795/making-redirects-after-an-axios-post-request-with-express 
        window.location = "/findclient";
        alert("Client Deleted.");
        // getting error, but it works?
        // TypeError: Cannot read properties of undefined (reading 'firstName')
      });
    },
  },
};
</script>