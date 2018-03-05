<template>
  <div class="overview-details">
    <div class="changing-values">
      <img class="game-img" v-bind:src="getImage" alt="<N/A>">
    </div>
    <div class="changing-values">
      {{getGame()}}
    </div>
    <div class="changing-values">
      {{getNumber()}}
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
    props: [
      "gameID"
    ],
    methods: {
      getGame: function(){
        return "hej"
      },
      gameColor: function(id){
        return this.gameColor(id);
      },
      getNumber: function(){
        if(this.current.games[this.gameID] != undefined){
          return this.current.games[this.gameID].totalViewers
        }
      },
      getImage: function(){
        // Måste ha imge länk till för spelet från getGame
        return 'bilden'
      },
    },
    mounted() {
      // console.log(this.current.games['110758'])
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

  .game-img{
    max-height: 30px;
  }
  .overview-details{
    box-sizing: border-box;
    float: left;
    width: 100%;
    display: flex;
  }
  .static-headline{
    width: 33%;
    display: block;
    color: white;
    font-family: Lato;
    font-weight: 400;
    font-size: 15px;
  }
  .changing-values{
    width: 33%;
    display: block;
    color: #E81B5F;
    font-family: Lato;
    font-weight: 300;
    font-size: 20px;

  }
</style>
