<template>
  <div>
    <v-row align="center" justify="center" no-gutters class="mb-15">
      <v-col cols="8">
        <v-form>
          <v-combobox
            :loading="isLoading"
            :search-input.sync="search"
            item-value="canonicalName"
            item-text="name"
            hide-no-data
            hide-details
            prepend-inner-icon="mdi-magnify"
            :label="$i18n.t('filterTags')"
            solo
            background-color="grey_input"
            flat
            clearable
            append-icon=""
          ></v-combobox>
        </v-form>
      </v-col>
    </v-row>

    <v-row class="flex-column align-center justify-center">
      <v-col
        cols="10"
        md="10"
        lg="9"
        class="overflow-y-auto"
        :style="$vuetify.breakpoint.xs ? 'max-height: 350px' : 'max-height: 600px'"
        v-for="tag in tagsPagination.content"
        :key="tag.canonicalName"
      >
        <TagComponent
          v-bind="{ ...tag }"
          :isFollowed="true"
          :isSelfProfile="isSelfProfile"
          @unfollowTag="unfollowTag(tag.canonicalName)"
        ></TagComponent>
      </v-col>
    </v-row>
    <v-row v-if="tagsPagination.content.length == 0" class="pb-md-8 pb-lg-12 pb-8" justify="center" no-gutters>
      <v-col>
        <no-data></no-data>
      </v-col>
    </v-row>

    <v-pagination
      class="my-10"
      v-if="tagsPagination && tagsPagination.content.length != 0"
      v-model="currentPage"
      :length="tagsPagination.totalPages"
      :total-visible="7"
      @input="nextPage"
    ></v-pagination>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { getTagsOfUser, unfollowTag } from "@/services/tag";
import { Tag } from "@/models/tag";
import TagComponent from "@/components/Tag.vue";
import NoData from "@/components/NoData.vue";
import { Pagination } from "@/models/Pagination/pagination";

export default Vue.extend({
  name: "TagsTab",

  props: { isSelfProfile: Boolean },

  components: { TagComponent, NoData },

  data: () => ({
    search: "",
    isLoading: false,
    tagsPagination: {} as Pagination<Tag>,
    timer: 0,
    currentPage: 1
  }),

  methods: {
    async nextPage() {
      await this.getTags(this.currentPage - 1);
    },

    async getTags(page: number) {
      this.tagsPagination = await getTagsOfUser(this.$route.params.user, page, 1, this.search);
      this.currentPage = this.tagsPagination.currentPage + 1;
    },

    async unfollowTag(canonicalName: string) {
      await unfollowTag(canonicalName);
      await this.getTags(0);
    }
  },

  async created() {
    await this.getTags(0);
  },

  watch: {
    search() {
      this.search = this.search ?? "";
      this.isLoading = true;
      if (this.timer != 0) {
        clearTimeout(this.timer);
      }

      this.timer = setTimeout(async () => {
        try {
          await this.getTags(0);
        } catch (error) {
          clearTimeout(this.timer);
        } finally {
          this.isLoading = false;
        }
      }, 200);
    }
  }
});
</script>

<style scoped></style>
