<template>
  <div class="my-3 px-3 py-2 border">
    <p class="text-uppercase font-weight-bold">
      your recent data
      <b-icon-chevron-right class="icon-route" @click="goToHistory" />
    </p>
    <b-row>
      <b-col cols="12">
        <div v-for="(val, key) in recentData" :key="key">
          <FinanceData :data="val" />
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { BCol, BRow, BIconChevronRight } from "bootstrap-vue";
import parseMoney from "../mixins/parseMoney";

export default {
  name: "RecentData",
  mixins: [parseMoney],
  props: {
    data: {
      required: true,
      type: Array
    }
  },
  components: {
    BCol,
    BRow,
    BIconChevronRight,
    FinanceData: () => import("./FinanceData")
  },
  computed: {
    recentData() {
      return this.data
        .filter(val => val.id)
        .map(val => ({
          ...val,
          parseMoney: this.parseMoney(val.money)
        }));
    }
  },
  methods: {
    goToHistory() {
      this.$router.push({ name: "History" });
    }
  }
};
</script>
