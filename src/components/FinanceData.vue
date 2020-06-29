<template>
  <b-row class="mb-2">
    <b-col cols="5">
      <span>{{ data.date }}</span>
    </b-col>
    <b-col cols="7">
      <div class="d-flex justify-content-between">
        <span class="text-capitalize">{{ data.type }}</span>
        <span>{{ data.parseMoney }}</span>
      </div>
    </b-col>
    <b-col cols="12">
      <strong>{{ data.name }}</strong>
    </b-col>
    <b-col cols="12">
      <em>{{ data.description }}</em>
    </b-col>
    <slot name="extra"></slot>
  </b-row>
</template>

<script>
import { BCol, BRow } from "bootstrap-vue";

export default {
  name: "FinanceData",
  components: {
    BCol,
    BRow
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  }
};
</script>
