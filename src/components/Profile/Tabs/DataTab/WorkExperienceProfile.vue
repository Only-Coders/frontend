<template>
  <div>
    <v-row class="py-10 px-sm-16 px-5 mt-9" align="center" no-gutters>
      <span class="pl-10 pr-6">
        <v-icon size="30"> mdi-briefcase </v-icon>
      </span>
      <h3>{{ $i18n.t("ViewProfile.workExperience") }}</h3>
      <v-spacer></v-spacer>
      <v-btn
        class="mr-6"
        fab
        small
        depressed
        color="transparent"
        v-if="isLoguedUserProfile"
        @click="addDialog = !addDialog"
      >
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
          :key="work.id"
          :color="index % 2 == 0 ? 'primary' : 'secondary'"
          small
          class="mx-0 px-0"
        >
          <WorkExperienceItem
            :work="work"
            @deleteExperienceData="deleteExperience(index)"
            :isLoguedUserProfile="isLoguedUserProfile"
          ></WorkExperienceItem>
        </v-timeline-item>
      </v-timeline>
    </v-row>

    <no-data v-else></no-data>

    <add-experience v-if="addDialog" v-model="addDialog" @passExperienceData="handleAddExperience"></add-experience>
  </div>
</template>

<script lang="ts">
import Vue, { VueConstructor } from "vue";
import { getWorksOfUser } from "@/services/workExperience";
import { UserWorkExperience } from "@/models/experience";
import dateMixin, { DateMixin } from "@/mixins/formattedDate";
import NoData from "@/components/NoData.vue";
import AddExperience from "@/components/Onboarding/WorkExperience/AddExperience.vue";
import { WorkExperience } from "@/models/experience";
import { postOrganization, deleteWorkExperience } from "@/services/workExperience";
import WorkExperienceItem from "@/components/Profile/Tabs/DataTab/WorkExperienceItem.vue";

export default (Vue as VueConstructor<Vue & DateMixin>).extend({
  name: "WorkExperienceProfile",

  mixins: [dateMixin],

  components: { NoData, AddExperience, WorkExperienceItem },

  props: { isLoguedUserProfile: Boolean },

  data: () => ({
    works: [] as UserWorkExperience[],
    addDialog: false
  }),

  methods: {
    async handleAddExperience(work: WorkExperience) {
      const result = await postOrganization(work);
      this.works.push(result);
      //TODO: Ver de agregar entre las fechas correspondientes.
      // Es donde el start date sea mayor a uno y menor al siguiente.
      // Y fijarse que va mas arriba el que tenga null en endDate
      // En caso de que hayan 2 o mas con endDate == null, mas arriba el de startDate mas actual
    },
    async deleteExperience(index: number) {
      if (this.works[index].id) {
        await deleteWorkExperience(this.works[index].id ?? "");
        this.works.splice(index, 1);
      }
    }
  },

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
</style>
