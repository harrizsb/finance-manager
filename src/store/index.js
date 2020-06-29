import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
});

export default new Vuex.Store({
  state: {
    expensesId: 0,
    incomeId: 0,
    expenses: [],
    income: []
  },
  getters: {
    recentData(state) {
      const latestExpenses = state.expenses.find(
        val => val.id === state.expensesId
      );
      const latestIncome = state.income.find(val => val.id === state.incomeId);
      return [
        { ...latestExpenses, type: "expenses" },
        { ...latestIncome, type: "income" }
      ].map(val => val);
    },
    getFinanceData: state => (key, id) => {
      if (id) {
        return state[key].find(val => val.id === id);
      } else {
        return state[key];
      }
    },
    totalFinanceData: state => key => {
      return state[key].reduce((acc, val) => acc + val.money, 0);
    },
    highestFinanceData: state => key => {
      return state[key].sort((a, b) => a.money - b.money).reverse();
    },
    emptyData(state) {
      return state.expenses.length === 0 && state.income.length === 0;
    }
  },
  mutations: {
    addData(state, { key, data }) {
      const id = `${key}Id`;
      state[key].push({
        ...data,
        id: ++state[id]
      });
    },
    updateData(state, { key, data }) {
      const tmp = state[key];
      const index = tmp.findIndex(val => val.id === data.id);
      tmp[index] = data;
      state[key] = tmp;
    },
    removeData(state, { key, id }) {
      state[key] = state[key].filter(val => val.id !== id);
    }
  },
  actions: {},
  modules: {},
  plugins: [vuexLocal.plugin]
});
