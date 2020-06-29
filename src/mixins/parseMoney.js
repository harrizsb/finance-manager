import Dinero from "dinero.js";

export default {
  methods: {
    parseMoney(val) {
      return (
        val &&
        Dinero({
          amount: val,
          currency: "IDR",
          precision: 0
        })
          .setLocale("id-ID")
          .toFormat("$0,0")
      );
    }
  }
};
