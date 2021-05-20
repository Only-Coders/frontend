import Vue from "vue";
import { AxiosError } from "axios";

export type NotificationMixin = InstanceType<typeof Mixin>;

const Mixin = Vue.extend({
  methods: {
    success(title: string, text: string, time = 3000) {
      Vue.notify({
        group: "feedback",
        duration: time,
        title: title,
        text: text,
        type: "success"
      });
    },
    error(title: string, text: string, time = 3000) {
      Vue.notify({
        group: "feedback",
        duration: time,
        title: title,
        text: text,
        type: "error"
      });
    },
    errorHandling(error: AxiosError, message: string) {
      if (error.isAxiosError && error.response) {
        if (error.response.status === 500) {
          // this.$router.push({ name: "Server Error" });
          this.error("Error", message);
        } else if (error.response.status === 404) {
          // this.$router.push({ name: "404", params: { "0": "" } });
          this.error("Error", error.response.data.message);
        } else {
          this.error("Error", error.response.data.message);
        }
      } else {
        //   this.$router.push({ name: "404", params: { "0": "" } });
        this.error("Error", message);
      }
    }
  }
});

export default Mixin;
