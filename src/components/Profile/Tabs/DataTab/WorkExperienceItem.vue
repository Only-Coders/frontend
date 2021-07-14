<template>
  <div>
    <v-hover v-slot="{ hover }">
      <v-row no-gutters>
        <v-col cols="auto" class="ma-0 pa-0">
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
      :selectedExperience="workUpdate"
      @updateExperienceData="updateExperience"
    ></update-experience>

    <delete-experience
      v-if="deleteDialog"
      v-model="deleteDialog"
      :selectedExperienceName="work.workplace.name"
      @deleteExperienceData="$emit('deleteExperienceData')"
    ></delete-experience>
  </div>
</template>

<script lang="ts">
import Vue, { PropType, VueConstructor } from "vue";
import dateMixin, { DateMixin } from "@/mixins/formattedDate";
import UpdateExperience from "@/components/Onboarding/WorkExperience/UpdateExperience.vue";
import DeleteExperience from "@/components/Onboarding/WorkExperience/DeleteExperience.vue";
import { UserWorkExperience, WorkExperience } from "@/models/experience";
import { updateWorkExperience } from "@/services/workExperience";

export default (Vue as VueConstructor<Vue & DateMixin>).extend({
  name: "WorkExperienceItem",

  components: { UpdateExperience, DeleteExperience },

  mixins: [dateMixin],

  props: { work: {} as PropType<UserWorkExperience> },

  data: () => ({
    updateDialog: false,
    deleteDialog: false,
    workUpdate: {} as WorkExperience
  }),

  methods: {
    async updateExperience(experience: WorkExperience) {
      if (this.workUpdate.id) {
        const result = await updateWorkExperience(this.workUpdate.id, experience);
        this.work.workplace.name = result.workplace.name;
        this.work.position = result.position;
        this.work.since = result.since;
        this.work.until = result.until;
      }
    }
  },

  created() {
    this.workUpdate = {
      id: this.work.id,
      name: this.work.workplace.name,
      position: this.work.position,
      since: this.work.since,
      until: this.work.until
    } as WorkExperience;
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
