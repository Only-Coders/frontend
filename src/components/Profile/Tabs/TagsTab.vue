<template>
  <div>
    <v-row align="center" justify="center" no-gutters class="mb-15">
      <v-col cols="10">
        <v-form>
          <v-autocomplete
            :loading="isLoading"
            :search-input.sync="search"
            :items="tags"
            item-value="canonicalName"
            item-text="name"
            hide-no-data
            hide-details
            prepend-inner-icon="mdi-magnify"
            label="Filtrar tags..."
            solo
            background-color="grey_input"
          ></v-autocomplete>
        </v-form>
      </v-col>
    </v-row>

    <transition-group name="list" tag="div" class="row flex-column align-center justify-center">
      <v-col
        cols="10"
        md="10"
        lg="9"
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

    <v-pagination class="my-10" v-model="page" :length="15" :total-visible="7"></v-pagination>
  </div>
</template>

<!-- :label="$i18n.t('Onboarding.Skills.skill')" -->

<script lang="ts">
import Vue from "vue";
import { getTag } from "@/services/tag";
import { Tag } from "@/models/tag";
import TagComponent from "@/components/Tag.vue";
import NoData from "@/components/NoData.vue";

export default Vue.extend({
  name: "TagsTab",

  components: { TagComponent, NoData },

  data: () => ({
    page: 1,
    tags: [] as Tag[]
  }),

  methods: {
    removeTag(index: number) {
      this.tags.splice(index, 1);
    }
  },

  async created() {
    const result = await getTag("", 10);
    this.tags = result.content;
    console.log(this.tags.length);
  }
});
</script>

<style scoped>
.tags {
  position: relative;
  margin-top: 85px;
  height: 765px;
}

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
