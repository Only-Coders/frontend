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

    <transition-group name="list" tag="div" class="row flex-column align-center justify-center">
      <v-col
        cols="10"
        md="8"
        lg="5"
        class="overflow-y-auto"
        :style="$vuetify.breakpoint.xs ? 'max-height: 350px' : 'max-height: 600px'"
        v-for="(tag, index) in tags.slice(0, 4)"
        :key="tag.canonicalName"
      >
        <TagComponent v-bind="{ ...tag }" @remove="removeTag(index)"></TagComponent>
      </v-col>
    </transition-group>
    <v-row v-if="tags.length == 0" class="pb-md-8 pb-lg-12 pb-8" justify="center" no-gutters>
      <v-col>
        <no-data></no-data>
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
import NoData from "@/components/NoData.vue";

export default Vue.extend({
  name: "Tag",

  components: { TagComponent, NoData },

  props: { stepAction: Boolean },

  data: () => ({
    tags: [] as Tag[]
  }),

  methods: {
    removeTag(index: number) {
      this.tags.splice(index, 1);
    }
  },

  watch: {
    async stepAction() {
      this.$emit("showButtonLoader");
      this.$emit("moveNextStep");
      this.$destroy();
    }
  },

  async created() {
    const result = await get("", 10);
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

.list-enter-active,
.list-leave-active {
  transition: all 0.4s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: scale(0);
}
</style>
