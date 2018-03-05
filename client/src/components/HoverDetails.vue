<template>
  <div class="overview-details">
    <span class="changingValues"><img :src="gameImg"><!-- <img class="game-img" v-bind:src="getGame().image" alt="<Image undefined>"> --></span>
    <div class="categoryWrapper">
      <span class="staticHeadline">Game Name</span>
      <span class="changingValues">{{gameName}} </span>
    </div>
    <div class="categoryWrapper">
      <span class="staticHeadline">Current viewers</span>
      <span class="changingValues">{{getNumber()}}</span>
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
    };
  },
  computed: {
    ...mapState(['current', 'games']),
  },
  props: ['gameID'],
  methods: {
    getGame() {
      if (this.games[this.gameID]) {
        this.gameImg = this.games[this.gameID].box_img_url;
        this.gameName = this.games[this.gameID].name;
        return true;
      } else {
        this.$store
          .dispatch('getGameInfo', this.gameID)
          .then(res => {
            this.gameImg = res.box_img_url;
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
.game-img {
  max-width: 30px;
}
.overview-details {
  box-sizing: border-box;
  float: middle;
  width: 100%;
  height: 100px;
  margin-top: -15px;
  display: flex;
  justify-content: space-around;
  padding: 0px 10% 0px;
}
.staticHeadline {
  display: block;
  color: white;
  font-family: Lato;
  font-weight: 400;
  font-size: 15px;
}
.changingValues {
  display: block;
  color: #e81b5f;
  font-family: Lato;
  font-weight: 300;
  margin-bottom: 5%;
  font-size: 20px;
}
</style>
