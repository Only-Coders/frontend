<template>
  <div>
    <v-row class="py-10 px-16 mt-9" align="center" no-gutters>
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

    <v-row no-gutters class="px-16 ml-10" v-if="works.length > 0">
      <v-timeline align-top dense>
        <v-timeline-item
          v-for="(work, index) in works"
          :key="index"
          :color="index % 2 == 0 ? 'primary' : 'secondary'"
          small
        >
          <v-row no-gutters class="timeline-container">
            <v-col cols="3" class="pr-0">
              <p class="text-caption ma-0">
                {{ formatDateMMYY(work.since) }}
              </p>
              <p class="text-caption">
                {{ work.until ? formatDateMMYY(work.until) : "Actualidad" }}
              </p>
            </v-col>

            <v-col cols="9" class="pl-4">
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
import Vue from "vue";
import { getWorksOfUser } from "@/services/workExperience";
import { UserWorkExperience } from "@/models/experience";
import { dateMixin } from "@/mixins/formattedDate";
import NoData from "@/components/NoData.vue";

export default Vue.extend({
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
  min-width: 300px;
}
</style>
