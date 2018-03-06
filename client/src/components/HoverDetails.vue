<template>
  <div class="overview-details">
    <div class="changingValues"><img :src="gameImg"></div>
    <div class="changingValues">
      {{gameName}}
    </div>
    <div class="static-headline">Current Viewers</div>
    <div class="changing-values">
      {{getNumber()}}
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import gameColor from '@/assets/js/colorsMixin.js';

export default {
  mixins: [gameColor],
  name: 'HoverDetails',
  data() {
    return {
      gameImg: '',
      gameName: '',
      imgWidth: '150',
      imgHeight: '200',
    };
  },
  computed: {
    ...mapState(['current', 'games']),
  },
  props: ['gameID'],
  methods: {
    getGame() {
      if (this.games[this.gameID]) {
        this.gameImg = this.games[this.gameID].box_art_url.replace(
          '{width}x{height}',
           this.imgWidth + 'x' + this.imgHeight
        );
        this.gameName = this.games[this.gameID].name;
        return true;
      } else {
        this.$store
          .dispatch('getGameInfo', this.gameID)
          .then(res => {
            this.gameImg = res.box_art_url.replace(
              '{width}x{height}',
              this.imgWidth + 'x' + this.imgHeight
            );
            this.gameName = res.name;
            return true;
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    gameColor(id) {
      return this.gameColor(id);
    },
    getNumber() {
      if (this.current.games[this.gameID] !== undefined) {
        return this.current.games[this.gameID].totalViewers;
      }
    },
  },
  mounted() {
    this.getGame();
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
