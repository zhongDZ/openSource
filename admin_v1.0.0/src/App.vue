<template>
  <div id="app">
    <display></display>
    <increment></increment>
  </div>
</template>

<script>
import display from "./display.vue";
import increment from "./increment.vue";

export default {
  name: 'app',
  data () {
    return{
      
    }
  },
  components : {
    display,
    increment
  }
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
