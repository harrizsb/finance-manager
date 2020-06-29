<template>
  <div class="px-3">
    <b-form-radio-group
      v-model="selected"
      :options="options"
      class="mb-3 d-flex justify-content-center"
      :state="validationState.selected"
      :disabled="disableFinanceType"
    ></b-form-radio-group>
    <b-form-datepicker
      menu-class="w-100"
      calendar-width="100%"
      class="mb-3"
      placeholder="Date"
      v-model="date"
      :state="validationState.date"
      :date-disabled-fn="disableFutureDate"
    />
    <b-form-input
      type="text"
      placeholder="Name"
      class="mb-3"
      autocomplete="false"
      v-model="name"
      :state="validationState.name"
    ></b-form-input>
    <money-input v-model="money" :state="validationState.money" name="money" />
    <b-form-textarea
      placeholder="Description"
      rows="3"
      max-rows="6"
      v-model="description"
      name="description"
      :state="validationState.description"
    ></b-form-textarea>
    <b-button
      class="mt-3 text-uppercase"
      variant="primary"
      block
      @click="submitForm"
      >save</b-button
    >
  </div>
</template>

<script>
import {
  BFormRadioGroup,
  BFormInput,
  BFormTextarea,
  BButton,
  BFormDatepicker
} from "bootstrap-vue";
import { CurrencyDirective, parseCurrency } from "vue-currency-input";
import moment from "moment";

export default {
  name: "FinanceForm",
  directives: {
    currency: CurrencyDirective
  },
  components: {
    BFormInput,
    BFormRadioGroup,
    BFormTextarea,
    BButton,
    BFormDatepicker,
    MoneyInput: () => import("./MoneyInput")
  },
  props: ["editData"],
  data() {
    return {
      selected: null,
      money: null,
      description: null,
      name: null,
      date: null,
      formSubmitted: false
    };
  },
  computed: {
    disableFinanceType() {
      return this.editData ? true : false;
    },
    validationState() {
      const validate = val => {
        if (val) {
          if (typeof val === "string" && val.trim() !== "") {
            return true;
          } else if (typeof val === "number" && val >= 0) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      };
      const tmp = this.objForm().reduce((acc, val) => {
        const x = this[val];
        acc[val] = !this.formSubmitted ? null : validate(x);
        return acc;
      }, {});

      return tmp;
    },
    options() {
      return ["Expenses", "Income"].map(val => ({ text: val, value: val }));
    },
    moneyOptions() {
      return {
        currency: "IDR",
        locale: "id",
        precision: 0,
        distractionFree: false,
        allowNegative: false
      };
    },
    parseMoney() {
      return this.money && parseCurrency(this.money, this.moneyOptions);
    }
  },
  watch: {
    editData: {
      handler: function(val) {
        if (val) {
          this.assignEditData();
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    disableFutureDate(ymd) {
      const now = moment().format("YYYY-MM-DD");
      return moment(ymd).isAfter(now);
    },
    assignEditData() {
      const data = this.editData;
      const tmp = Object.keys(data).filter(val => val !== "id");
      tmp.map(val => {
        this[val] = data[val];
      });
    },
    objForm(reset = false) {
      const formFlag = "formSubmitted";
      const arr = [
        "selected",
        "money",
        "description",
        "name",
        "date",
        formFlag
      ].filter(val => (!reset ? val !== formFlag : val));
      return Object.keys(this).filter(val => arr.includes(val));
    },
    resetForm() {
      const tmp = this.objForm(true);

      tmp.map(val => {
        this[val] = val === "formSubmitted" ? false : null;
      });
    },
    confirmationAlert() {
      this.$swal({
        icon: "success",
        title: "Data saved!",
        text: "Do you want to add more data?",
        showCancelButton: true,
        confirmButtonText: "Yes, please",
        cancelButtonText: "No, thanks"
      }).then(({ value }) => {
        if (!value) {
          this.$router.push({ name: "Home" });
        } else {
          this.resetForm();
        }
      });
    },
    submitForm() {
      this.formSubmitted = true;
      const {
        validationState,
        selected,
        money,
        description,
        name,
        date
      } = this;
      const validation = Object.keys(validationState).every(
        val => validationState[val]
      );
      if (validation) {
        try {
          this.$emit("save", {
            key: selected.toLowerCase(),
            data: {
              money,
              description,
              name,
              date
            }
          });
        } catch (err) {
          console.log(err);
        }
        this.$nextTick(this.confirmationAlert);
      }
    }
  }
};
</script>
