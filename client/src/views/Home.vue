<template>
  <div class="home">
    <mapView/>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    </div>
</template>


<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import mapView from "@/components/mapView.vue";

export default {
  name: "home",
  components: {
    HelloWorld,
    mapView
  }
};
</script>

