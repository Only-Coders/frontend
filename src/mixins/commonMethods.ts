import Vue from "vue";

export type CommonMethodsMixin = InstanceType<typeof Mixin>;

const Mixin = Vue.extend({
  methods: {
    validURL(str: string): boolean {
      const pattern = new RegExp(/(?:http(?:s)?)\S+$/g);
      return !!pattern.test(str);
    }
  }
});

export default Mixin;
