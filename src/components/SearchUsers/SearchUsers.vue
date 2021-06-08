<template>
  <h1>asdadasad</h1>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { User } from "@/models/user";
import { Tag } from "@/models/tag";

export default Vue.extend({
  name: "SearchUsers",

  components: {},

  props: {
    filteredUsers: Array as PropType<User[]>,
    tags: Array as PropType<Tag[]>
  }
});
</script>

<style>
.search__divider {
  border-color: #b3b3b3 !important;
}

.search__progress {
  height: 150px;
}
</style>
