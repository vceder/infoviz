<template>
  <div class="overview-details">
    <h2>{{gameData.name}}</h2>
    <!--Get timezone of user to display correct timestamp-->
    <p>Time: {{gameData.timestamp}}</p>
    <p>Viewers: {{gameData.viewer_count}}</p>
    <!-- <img :src="gameData.box_art_url.replace('{width}x{height}', '200x300')" alt=""> -->
  </div>
</template>

<script>
export default {
  name: 'HoverDetails',
  data() {
    return {
      gameData: '',
    };
  },
  mounted() {
    
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
