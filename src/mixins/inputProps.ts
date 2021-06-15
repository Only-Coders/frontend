import Vue from "vue";

export type InputPropsMixin = InstanceType<typeof inputPropsMixin>;

const inputPropsMixin = Vue.extend({
  data: () => ({
    inputProps: { filled: true, flat: true, rounded: true, dense: true, backgroundColor: "grey_input" }
  })
});

export default inputPropsMixin;
