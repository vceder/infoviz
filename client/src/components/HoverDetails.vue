<template>
  <div class="overview-details">
    <div class="staticHeadline">Game Name</div>
    <div class="changingValues"><!-- {{getGame().name}} --></div>
    <div class="changingValues"><!-- <img class="game-img" v-bind:src="getGame().image" alt="<Image undefined>"> --></div>
    <div class="staticHeadline">Current viewers</div>
    <div class="changingValues"><!-- {{getGame().viewer_count}} --></div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    name: 'HoverDetails',
    computed: {
      ...mapState(['current']),
    },
    methods: {
      getGame: function(){
        return this.current.games['110758']
      },
      gameColor: function(id){
        return
      },
    },
    mounted() {
      console.log(this.current.games['110758'])
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  
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
      font-weight: 400;
      font-size: 15px;
  }
  .changingValues{
      color: #E81B5F;
      font-family: Lato;
      font-weight: 300;
      margin-bottom: 5%;
      font-size: 20px;

  }
</style>
