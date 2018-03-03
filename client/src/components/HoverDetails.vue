<template>
  <div class="overview-details">
    <div class="staticHeadline">Game Name</div>
    <div class="changingValues">{{games.name}}</div>
    <div class="changingValues"><img v-bind:src="games.image" alt="<Image undefined>"></div>
    <div class="staticHeadline">Time of day</div>
    <!--Get timezone of user to display correct timestamp-->
    <div class="changingValues">{{games.timestamp}}</div>
    <div class="staticHeadline">Current viewers</div>
    <div class="changingValues">{{games.viewer_count}}</div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    name: 'HoverDetails',
    computed: {
      ...mapState(['games']),
    },
    mounted() {
      
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import './assets/style/global.scss';

  .overview-details{
      float: right;
      margin: 10% 5% 0 0;
  }
  .staticHeadline{
      color: white;
      font-family: Lato;
      font-weight: 300;
      font-size: 15px;
  }
  .changingValues{
      color:#E81B5F;
      font-family: Lato;
      font-weight: 400;
      margin-bottom: 5%;
      font-size: 20px;

  }
</style>
