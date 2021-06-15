import Vue from "vue";

export type DateMixin = InstanceType<typeof dateMixin>;

const dateMixin = Vue.extend({
  methods: {
    formatDate(date: string): string {
      if (date) {
        const splitedDate = date.split("-");
        return `${splitedDate[2]}/${splitedDate[1]}/${splitedDate[0]}`;
      } else {
        return "";
      }
    },
    formatDateMMYY(date: string): string {
      if (date) {
        const splitedDate = date.split("-");
        return `${splitedDate[1]}/${splitedDate[0]}`;
      } else {
        return "";
      }
    }
  }
});

export default dateMixin;
