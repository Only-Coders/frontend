<template>
  <div>
    <v-row class="py-10 px-16 mt-9" align="center" no-gutters>
      <span class="pl-10 pr-6">
        <v-icon size="30"> mdi-briefcase </v-icon>
      </span>
      <h3>EXPERIENCIA</h3>
      <div class="divider-container mt-8">
        <v-divider></v-divider>
      </div>
    </v-row>

    <v-row no-gutters class="px-16 ml-10">
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
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { getWorksOfUser } from "@/services/workExperience";
import { UserWorkExperience } from "@/models/experience";
import { dateMixin } from "@/mixins/formattedDate";

export default Vue.extend({
  name: "WorkExperienceProfile",

  mixins: [dateMixin],

  data: () => ({
    works: [] as UserWorkExperience[]
  }),

  async created() {
    const result = await getWorksOfUser(this.$route.params.user, 0);
    this.works = result.content;
    /* this.works.push(result.content[0]);
    this.works.push(result.content[0]);
    this.works.push(result.content[0]); */
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
