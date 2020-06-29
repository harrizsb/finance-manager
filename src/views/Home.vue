<template>
  <div>
    <template v-if="emptyData">
      <h5 class="m-4">Empty data, please add your data to see your insights</h5>
    </template>
    <template v-else>
      <b-container>
        <b-row>
          <b-col cols="12">
            <FinanceInsights
              :totalIncome="totalIncome"
              :totalExpenses="totalExpenses"
              :moneyLeft="moneyLeft"
              :highestExpenses="highestExpenses"
              :highestIncome="highestIncome"
            />
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12">
            <RecentData :data="recentData" />
          </b-col>
        </b-row>
      </b-container>
    </template>
  </div>
</template>

<script>
import { BContainer, BRow, BCol } from "bootstrap-vue";
import { mapGetters } from "vuex";
import parseMoney from "../mixins/parseMoney";

export default {
  name: "Home",
  mixins: [parseMoney],
  components: {
    BContainer,
    BRow,
    BCol,
    // FinanceChart: () => import("@/components/FinanceChart"),
    RecentData: () => import("@/components/RecentData"),
    FinanceInsights: () => import("@/components/FinanceInsights")
  },
  computed: {
    ...mapGetters([
      "recentData",
      "totalFinanceData",
      "highestFinanceData",
      "emptyData"
    ]),
    rawTotalIncome() {
      return this.totalFinanceData("income");
    },
    totalIncome() {
      return this.parseMoney(this.rawTotalIncome);
    },
    rawTotalExpenses() {
      return this.totalFinanceData("expenses");
    },
    totalExpenses() {
      return this.parseMoney(this.rawTotalExpenses);
    },
    moneyLeft() {
      const total = this.rawTotalIncome - this.rawTotalExpenses;

      return this.parseMoney(total);
    },
    highestIncome() {
      return this.highestFinanceData("income")[0] || null;
    },
    highestExpenses() {
      return this.highestFinanceData("expenses")[0] || null;
    }
  }
};
</script>
