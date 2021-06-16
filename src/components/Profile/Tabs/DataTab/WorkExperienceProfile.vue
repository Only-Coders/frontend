<template>
  <div>
    <v-row class="py-10 px-sm-16 px-5 mt-9" align="center" no-gutters>
      <span class="pl-10 pr-6">
        <v-icon size="30"> mdi-briefcase </v-icon>
      </span>
      <h3>{{ $i18n.t("ViewProfile.workExperience") }}</h3>
      <v-spacer></v-spacer>
      <v-btn class="mr-6" fab small depressed color="transparent" v-if="isLoguedUserProfile">
        <v-icon size="28" color="grey darken-1"> mdi-plus </v-icon>
      </v-btn>
      <div class="divider-container mt-8">
        <v-divider></v-divider>
      </div>
    </v-row>

    <v-row no-gutters class="px-sm-16 ml-sm-10" v-if="works.length > 0">
      <v-timeline align-top dense>
        <v-timeline-item
          v-for="(work, index) in works"
          :key="index"
          :color="index % 2 == 0 ? 'primary' : 'secondary'"
          small
          class="mx-0 px-0"
        >
          <v-row no-gutters class="timeline-container">
            <v-col cols="auto" class="ma-0 pa-0 date_container">
              <p class="text-caption ma-0">
                {{ formatDateMMYY(work.since) }}
              </p>
              <p class="text-caption">
                {{ work.until ? formatDateMMYY(work.until) : $i18n.t("present") }}
              </p>
            </v-col>

            <v-col cols="7" sm="auto" class="pl-2 pl-sm-9">
              <h5>{{ work.workplace.name }}</h5>
              <p class="text-caption">{{ work.position }}</p>
            </v-col>
          </v-row>
        </v-timeline-item>
      </v-timeline>
    </v-row>

    <no-data v-else></no-data>
  </div>
</template>

<script lang="ts">
import Vue, { VueConstructor } from "vue";
import { getWorksOfUser } from "@/services/workExperience";
import { UserWorkExperience } from "@/models/experience";
import dateMixin, { DateMixin } from "@/mixins/formattedDate";
import NoData from "@/components/NoData.vue";

export default (Vue as VueConstructor<Vue & DateMixin>).extend({
  name: "WorkExperienceProfile",

  mixins: [dateMixin],

  components: { NoData },

  props: { isLoguedUserProfile: Boolean },

  data: () => ({
    works: [] as UserWorkExperience[]
  }),

  async created() {
    const result = await getWorksOfUser(this.$route.params.user, 0);
    this.works = result.content;
  }
});
</script>

<style scoped>
.theme--light.v-divider {
  border-color: var(--v-secondary-base) !important;
}
.divider-container {
  width: 100%;
}
.timeline-container {
  min-width: 400px;
}
.date_container {
  min-width: 62px;
}
</style>
