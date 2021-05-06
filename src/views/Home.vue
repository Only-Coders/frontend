<template>
  <div>
    <!-- <hello-world />
    <p>{{ username }}</p>
    <v-btn @click="sayHeillo">button</v-btn>
    <p ref="elemento-p"></p> -->
    <p>{{ username }}</p>
    <Item :message="'hola ramiro'">
      <p slot="text">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias, odit molestiae ex exercitationem eos laborum
        laboriosam similique totam illum illo itaque aliquam maxime optio obcaecati, nemo ut suscipit id voluptate!
      </p>
    </Item>
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
