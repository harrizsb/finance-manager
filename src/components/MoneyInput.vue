<template>
  <div>
    <b-form-input
      type="text"
      placeholder="Amount"
      class="mb-3"
      autocomplete="false"
      v-model="money"
      v-currency="moneyOptions"
      @change="onChange"
      :state="state"
    ></b-form-input>
  </div>
</template>

<script>
import { BFormInput } from "bootstrap-vue";
import { CurrencyDirective, parseCurrency } from "vue-currency-input";

export default {
  name: "MoneyInput",
  directives: {
    currency: CurrencyDirective
  },
  components: {
    BFormInput
  },
  props: {
    state: {
      default: function() {
        return null;
      },
      type: [Boolean, Object]
    },
    value: {
      type: Number
    },
    moneyOptions: {
      type: Object,
      default: function() {
        return {
          currency: "IDR",
          locale: "id",
          precision: 0,
          distractionFree: false,
          allowNegative: false
        };
      }
    }
  },
  computed: {
    parseMoney() {
      return this.money && parseCurrency(this.money, this.moneyOptions);
    }
  },
  watch: {
    value: {
      handler: function(val) {
        this.money = val;
      },
      immediate: true
    }
  },
  data() {
    return {
      money: ""
    };
  },
  methods: {
    onChange() {
      this.$emit("input", this.parseMoney);
    }
  }
};
</script>
