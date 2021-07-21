<template>
  <div class="tags">
    <v-row>
      <v-col align="center">
        <h2 class="mb-4">{{ $i18n.t("Onboarding.Tag.title") }}</h2>
        <p>
          {{ $i18n.t("Onboarding.Tag.text") }}
        </p>
      </v-col>
    </v-row>

    <v-row
      :style="isLaptop() ? 'max-height: 60vh' : 'max-height: 70vh'"
      class="overflow-y-auto overflow-x-hidden d-flex flex-column"
      no-gutters
    >
      <transition-group name="list" tag="div" class="row flex-column align-center justify-center">
        <v-col cols="10" md="8" lg="5" class="overflow-y-auto" v-for="(tag, index) in tags" :key="tag.canonicalName">
          <TagComponent
            v-bind="{ ...tag }"
            :isFollowed="false"
            :isSelfProfile="true"
            @remove="removeTag(index)"
          ></TagComponent>
        </v-col>
      </transition-group>
    </v-row>
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
import { getTag } from "@/services/tag";
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
    },
    isLaptop() {
      return window.innerHeight <= 800;
    }
  },

  watch: {
    async stepAction() {
      this.$emit("moveNextStep");
      this.$destroy();
    }
  },

  async created() {
    const result = await getTag("", 20);
    this.tags = result.content;
  }
});
</script>

<style scoped>
.tags {
  position: relative;
  margin-top: 75px;
  height: 765px;
}

.tags_img {
  width: 260px;
  z-index: 2;
  position: absolute;
  bottom: 100px;
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
