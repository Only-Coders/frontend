<template>
  <div>
    <dash-card-list :usersQuantity="usersQuantity" :isLoading="isLoading"></dash-card-list>
    <v-row no-gutters justify="center" class="my-12">
      <v-col cols="10">
        <chart-area
          :isLoading="isLoading"
          :title="$i18n.t('Admin.postsAndReactionsPerHour')"
          :posts="postsSeries"
          :reactions="reactionsSeries"
          :hours="postsAndReactionsHours"
        ></chart-area>
      </v-col>
    </v-row>
    <v-row no-gutters justify="center" class="mb-12">
      <v-col cols="5">
        <chart-heat-map
          style="width: 95%"
          :title="$i18n.t('Admin.postsPerDay')"
          :isLoading="isLoading"
          :postsPerDay="postsPerDay"
        ></chart-heat-map>
      </v-col>
      <v-col cols="5">
        <chart-pie
          style="width: 95%"
          class="ml-auto"
          :isLoading="isLoading"
          :title="$i18n.t('Admin.languageUseTitle')"
          :colors="['#3F51B5', '#00cdae']"
          :series="languageUseSeries"
          :labels="languageUseLabels"
        ></chart-pie>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import DashCardList from "@/components/Admin/DashCardList.vue";
import ChartArea from "@/components/Admin/ChartArea.vue";
import ChartPie from "@/components/Admin/ChartPie.vue";
import ChartHeatMap from "@/components/Admin/ChartHeatMap.vue";
import { getUsersQuantity, getLanguageUse, getPostsAndReactionsPerHour, getPostsPerDay } from "@/services/data-report";
import { UsersQuantity } from "@/models/usersQuantity";
import { LanguageUse } from "@/models/languageUse";
import { PostsAndReactionsPerHour } from "@/models/postsAndReactionsPerHour";
import { PostsPerDay } from "@/models/postsPerDay";

export default Vue.extend({
  name: "AdminDash",

  components: {
    DashCardList,
    ChartPie,
    ChartArea,
    ChartHeatMap
  },

  computed: {
    languageUseLabels(): string[] {
      return this.languageUse.map((language) => language.attribute);
    },
    languageUseSeries(): number[] {
      return this.languageUse.map((language) => language.value);
    },
    postsSeries(): number[] {
      return this.postsAndReactionsPerHour.map((data) => data.posts);
    },
    reactionsSeries(): number[] {
      return this.postsAndReactionsPerHour.map((data) => data.reactions);
    },
    postsAndReactionsHours(): string[] {
      return this.postsAndReactionsPerHour.map((data) => data.hour);
    }
  },

  data: () => ({
    usersQuantity: {} as UsersQuantity,
    languageUse: [] as LanguageUse[],
    postsAndReactionsPerHour: [] as PostsAndReactionsPerHour[],
    postsPerDay: [] as PostsPerDay[],
    isLoading: true
  }),

  created() {
    Promise.all([getUsersQuantity(), getLanguageUse(), getPostsAndReactionsPerHour(), getPostsPerDay()]).then(
      (values) => {
        this.usersQuantity = values[0];
        this.languageUse = values[1];
        this.postsAndReactionsPerHour = values[2];
        this.postsPerDay = values[3];
        this.isLoading = false;
      }
    );
  }
});
</script>

<style>
.apexcharts-heatmap-rect {
  stroke: #42424208;
}
</style>

<style scoped></style>
