<template>
  <div class="hello">
    <h2>{{gameData.name}}</h2>
    <h3>Viewers: {{gameData.viewer_count}}</h3>
    <!-- <img :src="gameData.box_art_url.replace('{width}x{height}', '200x300')" alt=""> -->
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      gameData: '',
    };
  },
  mounted() {
    // fetch('/api/games?id=32399', { method: 'get' })
    //   .then(res => {
    //     return res.json();
    //   })
    //   .then(jsonData => {
    //     this.gameData = jsonData;
    //     console.log(jsonData);
    //   })
    //   .catch(e => {
    //     console.log('error', e);
    //   });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
