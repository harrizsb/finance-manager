<template>
  <div class="nav-app p-4">
    <div class="d-flex align-items-center">
      <template v-if="!atHome">
        <b-icon-chevron-left class="mr-3 icon-route" @click="goHome" />
      </template>
      <h5 class="text-capitalize mb-0">finance manager</h5>
    </div>

    <template v-if="atHome">
      <b-button :to="{ name: 'Finance' }" variant="primary text-capitalize my-2"
        >new data</b-button
      >
    </template>
  </div>
</template>

<script>
import { BButton, BIconChevronLeft } from "bootstrap-vue";

export default {
  name: "Nav",
  components: {
    BButton,
    BIconChevronLeft
  },
  computed: {
    atHome() {
      return this.$route.name === "Home";
    }
  },
  methods: {
    goHome() {
      this.$router.push({ name: "Home" });
    }
  }
};
</script>

<style lang="stylus">
.nav-app
  background-color #324FCB
  color #F3FAFB
  border-top-left-radius 10px
  border-top-right-radius 10px
</style>
