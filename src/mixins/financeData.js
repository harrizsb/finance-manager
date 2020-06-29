import { mapGetters } from "vuex";
import parseMoney from "./parseMoney";

export default {
  mixins: [parseMoney],
  computed: {
    ...mapGetters(["getFinanceData"])
  },
  methods: {
    getFinanceDataFromStore(opt, id = null) {
      return this.getFinanceData(opt, id);
    },
    getFinanceDataParse(opt) {
      return this.getFinanceDataFromStore(opt).map(val => ({
        ...val,
        parseMoney: this.parseMoney(val.money)
      }));
    },
    filterFinanceData(data, searchValue) {
      if (searchValue) {
        return data.filter(val => {
          const validation = x => {
            return String(x).includes(searchValue);
          };

          return (
            validation(val.money) ||
            validation(val.description) ||
            validation(val.name) ||
            validation(val.date) ||
            validation(val.parseMoney)
          );
        });
      } else {
        return data;
      }
    },
    financeData(target, searchValue) {
      if (target === "expenses" || target === "income") {
        const res = this.getFinanceDataParse(target);
        return searchValue ? this.filterFinanceData(res, searchValue) : res;
      } else {
        return [];
      }
    }
  }
};
