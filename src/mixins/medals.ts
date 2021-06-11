import Vue from "vue";

export type MedalsMixin = InstanceType<typeof Mixin>;

const Mixin = Vue.extend({
  methods: {
    calculateMedals(approves: number) {
      const bronce = approves % 5;
      approves = (approves - bronce) / 5;
      const silver = approves % 5;
      const gold = (approves - silver) / 5;
      return { gold, silver, bronce };
    }
  }
});

export default Mixin;
