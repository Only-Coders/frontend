import Vue from "vue";

export type MedalsMixin = InstanceType<typeof Mixin>;

const Mixin = Vue.extend({
  methods: {
    calculateMedals(approves: number) {
      const bronce = approves % 100;
      approves = (approves - bronce) / 100;
      const silver = approves % 100;
      const gold = (approves - silver) / 100;
      return { gold, silver, bronce };
    }
  }
});

export default Mixin;
