<template>
  <main class="flex flex-row">
    <div id="_container" class="h-screen">
      <header class="w-full">
        <section class="text-center">
          <img class="m-auto" src="@\assets\DanPersona.svg" />
        </section>
        <nav class="mt-10">
          <ul class="flex flex-col gap-4">
                <li class="nav-item">
                  <router-link to="/chart"> <!--OscarLopez-->
                      <span style="position: relative; top: 8px" class="material-icons"
                      >people</span>
                      Event Chart
                  </router-link
                  >
                </li>
            <li>
              <router-link to="/intakeform">
                <span style="position: relative; top: 6px" class="material-icons">people</span>
                Client Intake Form
              </router-link>
            </li>
            <li>
              <router-link to="/eventform">
                <span style="position: relative; top: 6px" class="material-icons">event</span>
                Create Event
              </router-link>
            </li>
            <li>
              <router-link to="/findclient">
                <span style="position: relative; top: 6px" class="material-icons">search</span>
                Find Client
              </router-link>
            </li>
            <li>
              <router-link to="/findEvents">
                <span style="position: relative; top: 6px" class="material-icons">search</span>
                Find Event
              </router-link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
    <div class="grow w-4/5">
      <section
        class="justify-end items-center h-24 flex"
        style="
          background: linear-gradient(250deg, #C8102E 70%, #efecec 50.6%);
        "
      >
        <h1 class="mr-20 text-3xl text-white">{{ name }}</h1> <!--jislam2-->
      </section>
      <div>
        <router-view></router-view>
      </div>
    </div>
  </main>
</template>

<script>
import axios from "axios";
export default {
  name:"App",
  data() {
    return {
      name :""
    };
  },
  beforeMount() {
    axios
      .get(
        import.meta.env.VITE_ROOT_API + `/organizationData/`
      )
      .then((data) => {
        console.log(data.data[0].name)
        this.name = data.data[0].name
      });
  },
  methods: {
    routePush(routeName) {
      this.$router.push({ name: routeName });
    },
  },
};
</script>


<style>
#_container {
  background-color: #c8102e;
  color: white;
  padding: 18px;
}
</style>

