<template>
  <div class="overview-details">
    <div class="changing-values">
      <span class="static-headline">Game Name</span>
      {{getGame()}}
    </div>
    <div class="changing-values">
      <span class="static-headline">Current viewers</span>
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
    flex-direction: column;
  }
  .static-headline{
    width: 100%;
    display: block;
    color: white;
    font-family: Lato;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-size: 0.8vw;
  }
  .changing-values{
    width: 100%;
    display: block;
    color: #E81B5F;
    font-family: Lato;
    font-weight: 300;
    text-transform: uppercase;
    font-size: 1.3vw;
    margin-bottom: 4%;

  }
</style>
