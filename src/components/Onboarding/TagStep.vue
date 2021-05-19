<template>
  <div style="position: relative; margin-top: 85px; height: 765px">
    <v-row class="pt-sm-0 pt-16">
      <v-col align="center">
        <h2 class="mb-4">{{ $i18n.t("Onboarding.Tag.title") }}</h2>
        <p>
          {{ $i18n.t("Onboarding.Tag.text") }}
        </p>
      </v-col>
    </v-row>

    <v-row align="center" justify="center">
      <v-col sm="9" md="6" lg="5">
        <div v-for="(tag, index) in tags" :key="index">
          <TagComponent :canonicalName="tag.canonicalName"></TagComponent>
        </div>
      </v-col>
    </v-row>

    <img
      :style="$vuetify.breakpoint.xs ? 'display: none' : ''"
      src="@/assets/images/Onboarding/undraw_trends.svg"
      alt="tags"
      class="tags_img hidden-md-and-down"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { get } from "@/services/tag";
import { Tag } from "@/models/tag";
import TagComponent from "@/components/Tag.vue";

export default Vue.extend({
  name: "Tag",

  components: { TagComponent },

  props: { stepAction: Boolean },

  data: () => ({
    tags: [] as Tag[]
  }),

  methods: {},

  watch: {
    async stepAction() {
      this.$emit("moveNextStep");
      this.$destroy();
    }
  },

  async created() {
    const result = await get("a", 8);
    this.tags = result.content;
  }
});
</script>

<style scoped>
.tags_img {
  width: 260px;
  z-index: 2;
  position: absolute;
  bottom: 120px;
  left: 100px;
}
</style>
