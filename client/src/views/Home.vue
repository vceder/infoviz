<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <HoverDetails/>
   </div>
</template>


<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import HoverDetails from '@/components/HoverDetails.vue';

export default {
  name: 'home',
  components: {
    HelloWorld,
    HoverDetails
  }
};
</script>

