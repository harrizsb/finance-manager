<template>
  <div class="min-vh-100 my-3" id="app">
    <b-container>
      <Nav />
      <router-view />
    </b-container>
  </div>
</template>

<script>
import { BContainer } from "bootstrap-vue";
import Nav from "@/components/Nav";

export default {
  name: "App",
  components: {
    BContainer,
    Nav
  }
};
</script>

<style lang="stylus">
@import url('https://fonts.googleapis.com/css2?family=Muli:wght@300;400;600;700&display=swap');

#app
  font-family 'Muli', Helvetica, sans-serif

  & > .container
    max-width 500px

  .icon-route
    cursor pointer
</style>
