<template>
<div class="streamer-details-wrapper">
  <div class="streamer-details">
    <h1>
      Häär är Streamerdetials
    </h1>
    
  </div>
</div>
</template>


<script>
import { mapState } from 'vuex';
import * as d3 from 'd3';
import gameColor from '../assets/js/colorsMixin.js';

export default {
  mixins: [gameColor],
  name: 'StreamerDetails',
  data() {
    return {
      gameName: '',
    };
  },
  mounted() {
  },
  computed: {
    ...mapState(['current', 'games']),
  },
  components: {
  },
  props: ['steamerID'],
  methods: {
  },
};
</script>
<style scoped lang="scss">
  .streamer-details-wrapper{
    width: 100vw;
    height: 100vh;
    position: fixed;
    left: 0px;
    top: 5%;
    z-index: 10;
  }
  .streamer-details{
    opacity: 0.8;
    display: inline-block;
    margin: auto;
    border-radius: 20px;
    background-color: white;
    height: 80%;
    width: 60%;

  }

</style>
