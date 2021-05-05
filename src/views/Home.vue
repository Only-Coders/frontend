<template>
  <div>
    <!-- <hello-world />
    <p>{{ username }}</p>
    <v-btn @click="sayHeillo">button</v-btn>
    <p ref="elemento-p"></p> -->
    <p>{{ username }}</p>
    <Item :message="'hola ramiro'"></Item>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import users from "@/store/modules/user";
import Item from "@/components/Item.vue";

type Asd = {
  hola: string;
};

export default Vue.extend({
  name: "Home",

  components: {
    Item
  },

  computed: {
    username: {
      get(): string {
        return users.username;
      }
    }
  }
});
</script>
