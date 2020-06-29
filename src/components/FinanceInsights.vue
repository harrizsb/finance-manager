<template>
  <b-container class="mt-3 mb-2">
    <b-row>
      <b-col cols="12">
        <p>What's left in your pocket</p>
        <h5 class="mb-3">
          {{ moneyLeft }}
        </h5>
      </b-col>
    </b-row>
    <hr />
    <b-row>
      <b-col cols="12" class="mb-2">
        <p class="font-weight-bold">Highest Income</p>
        <FinanceData
          v-if="this.highestIncome"
          :data="highestDataParse('highestIncome')"
        />
      </b-col>
      <b-col cols="12" class="mb-2">
        <p class="font-weight-bold">Highest Expenses</p>
        <FinanceData
          v-if="this.highestExpenses"
          :data="highestDataParse('highestExpenses')"
        />
      </b-col>
    </b-row>
    <hr />
    <b-row>
      <b-col cols="6">
        <div class="text-center">
          <p>Total income</p>
          <p class="mb-0 font-weight-bold">{{ totalIncome }}</p>
        </div>
      </b-col>
      <b-col cols="6">
        <div class="text-center">
          <p>Total expenses</p>
          <p class="mb-0 font-weight-bold">{{ totalExpenses }}</p>
        </div>
      </b-col>
    </b-row>
    <hr />
  </b-container>
</template>

<script>
import { BContainer, BRow, BCol } from "bootstrap-vue";
import parseMoney from "../mixins/parseMoney";

export default {
  name: "FinanceInsights",
  mixins: [parseMoney],
  props: {
    totalIncome: {
      type: [String, Number],
      default() {
        return null;
      }
    },
    totalExpenses: {
      type: [String, Number],
      default() {
        return null;
      }
    },
    moneyLeft: {
      type: [String, Number],
      default() {
        return null;
      }
    },
    highestExpenses: {
      type: Object,
      default() {
        return null;
      }
    },
    highestIncome: {
      type: Object,
      default() {
        return null;
      }
    }
  },
  components: {
    BContainer,
    BRow,
    BCol,
    FinanceData: () => import("./FinanceData")
  },
  methods: {
    highestDataParse(key) {
      const tmp = this[key];
      return {
        ...tmp,
        parseMoney: this.parseMoney(tmp.money)
      };
    }
  }
};
</script>
