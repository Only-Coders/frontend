<template>
  <div>
    <v-hover v-slot="{ hover }">
      <v-row no-gutters class="px-sm-16 ml-sm-10 mb-10" align="center">
        <v-col cols="1" class="pl-12 pr-8 px-sm-12 pt-0 mt-0 d-flex justify-center"
          ><v-icon size="30" class="school-icon"> mdi-school </v-icon></v-col
        >
        <v-col cols="auto" class="date_container">
          <p class="text-caption ma-0">
            {{ formatDateMMYY(study.since) }}
          </p>
          <p class="text-caption ma-0">
            {{ study.until ? formatDateMMYY(study.until) : $i18n.t("present") }}
          </p>
        </v-col>

        <v-col cols="7" sm="auto" class="pl-2 pl-sm-9">
          <h5>{{ study.institute.name }}</h5>
          <span class="text-caption">{{ study.degree }}</span>
        </v-col>

        <transition name="fade">
          <v-col cols="auto" v-if="hover">
            <v-btn class="ml-10" fab small depressed color="transparent" @click="updateDialog = !updateDialog">
              <v-icon size="18" color="grey darken-1"> mdi-pencil </v-icon>
            </v-btn>

            <v-btn class="ml-3" fab small depressed color="transparent" @click="deleteDialog = !deleteDialog">
              <v-icon size="18" color="grey darken-1"> mdi-delete </v-icon>
            </v-btn>
          </v-col>
        </transition>
      </v-row>
    </v-hover>

    <update-experience
      v-if="updateDialog"
      v-model="updateDialog"
      :selectedExperience="studyUpdate"
      @updateExperienceData="updateExperience"
    ></update-experience>

    <delete-experience
      v-if="deleteDialog"
      v-model="deleteDialog"
      :selectedExperienceName="study.institute.name"
      @deleteExperienceData="$emit('deleteExperienceData')"
    ></delete-experience>
  </div>
</template>

<script lang="ts">
import Vue, { PropType, VueConstructor } from "vue";
import dateMixin, { DateMixin } from "@/mixins/formattedDate";
import { StudyExperience, UserStudyExperience } from "@/models/experience";
import UpdateExperience from "@/components/Onboarding/StudyExperience/UpdateExperience.vue";
import DeleteExperience from "@/components/Onboarding/StudyExperience/DeleteExperience.vue";
import { updateInstitute } from "@/services/studyExperience";

export default (Vue as VueConstructor<Vue & DateMixin>).extend({
  name: "StudyExperienceItem",

  components: { UpdateExperience, DeleteExperience },

  mixins: [dateMixin],

  props: { study: {} as PropType<UserStudyExperience> },

  data: () => ({
    updateDialog: false,
    deleteDialog: false,
    studyUpdate: {} as StudyExperience
  }),

  methods: {
    async updateExperience(experience: StudyExperience) {
      if (this.studyUpdate.id) {
        const result = await updateInstitute(this.studyUpdate.id, experience);
        this.study.institute.name = result.institute.name;
        this.study.degree = result.degree;
        this.study.since = result.since;
        this.study.until = result.until;
      }
    }
  },

  created() {
    this.studyUpdate = {
      id: this.study.id,
      name: this.study.institute.name,
      degree: this.study.degree,
      since: this.study.since,
      until: this.study.until
    } as StudyExperience;
  }
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
