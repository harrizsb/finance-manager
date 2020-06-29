<template>
  <div class="my-3">
    <div class="mx-3">
      <h5 class="text-capitalize font-weight-bold">{{ formType }}</h5>
      <hr />
    </div>
    <FinanceForm
      ref="finance-form"
      @save="processSave"
      :editData="financeDataEdit"
    />
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import financeData from "../mixins/financeData";

export default {
  name: "Finance",
  mixins: [financeData],
  props: ["id", "type"],
  components: {
    FinanceForm: () => import("@/components/FinanceForm")
  },
  computed: {
    formType() {
      if (this.id && !this.editDataDone) {
        return "edit data";
      } else {
        return "new data";
      }
    },
    financeDataEdit() {
      const { id, type } = this;
      return (
        id &&
        type && {
          ...this.getFinanceDataFromStore(type, id),
          selected: type.charAt(0).toUpperCase() + type.slice(1)
        }
      );
    }
  },
  data() {
    return {
      editDataDone: false
    };
  },
  methods: {
    ...mapMutations(["addData", "updateData"]),
    processSave(val) {
      if (this.id && !this.editDataDone) {
        const { data, key } = val;
        this.updateData({
          key,
          data: {
            ...data,
            id: this.id
          }
        });
        this.editDataDone = true;
      } else {
        this.addData(val);
      }
    }
  }
};
</script>
