<template>
<div>
  <div id="loading">

  </div>
</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Loading',
  computed: {
    ...mapState(['isLoading']),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#loading {
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  background-color: rgba($color: #999, $alpha: 0.7)
}
</style>
