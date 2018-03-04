<template>
  <div class="overview-details">
    <div class="staticHeadline">Game Name</div>
    <div class="changingValues">HÄR ÄR NAMNET{{games.name}}</div>
    <div class="changingValues"><img class="game-img" v-bind:src="games.image" alt="<Image undefined>"></div>
    <div class="staticHeadline">Current viewers</div>
    <div class="changingValues">{{games.viewer_count}}</div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    name: 'HoverDetails',
    computed: {
      ...mapState(['current']),
    },
    mounted() {
      console.log(this.games)
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../assets/style/global.scss';
  
  .game-img{
    max-width: 30px;
  }
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
