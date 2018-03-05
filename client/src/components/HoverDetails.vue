<template>
  <div class="overview-details">
    <span class="changingValues"><img src="public/pt-logo.png"><!-- <img class="game-img" v-bind:src="getGame().image" alt="<Image undefined>"> --></span>
    <div class="categoryWrapper">
      <span class="staticHeadline">Game Name</span>
      <span class="changingValues">THIS IS A NAME<!-- {{getGame().name}} --></span>
    </div>
    <div class="categoryWrapper">
      <span class="staticHeadline">Current viewers</span>
      <span class="changingValues">NUMBER<!-- {{getGame().viewer_count}} --></span>
    </div>   
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import gameColor from '@/assets/js/colorsMixin.js'

  export default {
    mixins: [gameColor],
    name: 'HoverDetails',
    computed: {
      ...mapState(['current']),
    },
    methods: {
      getGame: function(){
        return this.current.games['110758']
      },
      gameColor: function(id){
        return this.gameColor(id);
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
    box-sizing: border-box;
    float: middle;
    width: 100%;
    height: 100px;
    margin-top: -15px;
    display: flex;
    justify-content: space-around;
    padding: 0px 10% 0px;
  }
  .staticHeadline{
    display: block;
    color: white;
    font-family: Lato;
    font-weight: 400;
    font-size: 15px;
  }
  .changingValues{
    display: block;
    color: #E81B5F;
    font-family: Lato;
    font-weight: 300;
    margin-bottom: 5%;
    font-size: 20px;

  }
</style>
