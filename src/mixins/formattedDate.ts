export const dateMixin = {
  methods: {
    formatDate(date: string): string {
      if (date) {
        const splitedDate = date.split("-");
        return `${splitedDate[2]}/${splitedDate[1]}/${splitedDate[0]}`;
      } else {
        return "";
      }
    }
  }
};
