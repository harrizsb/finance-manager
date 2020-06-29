<template>
  <div class="m-4">
    <div>
      <h5 class="text-capitalize font-weight-bold mb-3">history</h5>
      <b-row>
        <b-col cols="5"
          ><b-form-select
            v-model="selected"
            :options="selectOptions"
          ></b-form-select
        ></b-col>
        <b-col cols="7">
          <b-form-input v-model="searchValue" placeholder="Search" />
        </b-col>
      </b-row>

      <hr />
    </div>
    <div v-for="data in fetchFinanceData" :key="data.id">
      <FinanceData :data="data">
        <template #extra>
          <b-button-group class="w-100 mt-2 mb-3">
            <b-button variant="info" @click="editData(data.id)">Edit</b-button>
            <b-button variant="warning" @click="deleteData(data.id)"
              >Delete</b-button
            >
          </b-button-group>
        </template>
      </FinanceData>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import {
  BRow,
  BCol,
  BFormSelect,
  BFormInput,
  BButtonGroup,
  BButton
} from "bootstrap-vue";
import financeData from "../mixins/financeData";

export default {
  mixins: [financeData],
  name: "History",
  components: {
    BRow,
    BCol,
    BFormSelect,
    BFormInput,
    BButtonGroup,
    BButton,
    FinanceData: () => import("@/components/FinanceData")
  },
  data() {
    return {
      selected: null,
      searchValue: null
    };
  },
  computed: {
    selectOptions() {
      return ["Expenses", "Income"].map(val => ({
        value: val,
        text: val
      }));
    },
    selectedData() {
      return this.selected.toLowerCase();
    },
    fetchFinanceData() {
      return this.financeData(this.selectedData, this.searchValue);
    }
  },
  methods: {
    ...mapMutations(["removeData"]),
    editData(id) {
      this.$router.push({
        name: "Finance",
        params: {
          type: this.selectedData,
          id
        }
      });
    },
    deleteData(id) {
      this.removeData({ key: this.selectedData, id });
    }
  },
  created() {
    this.selected = this.selectOptions[0].value;
  }
};
</script>
