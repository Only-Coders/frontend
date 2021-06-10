<template>
  <div>
    <v-row class="py-10 px-16" align="center" no-gutters>
      <span class="pl-10 pr-6">
        <v-icon size="30"> mdi-card-account-details </v-icon>
      </span>
      <h3>{{ $i18n.t("ViewProfile.skills") }}</h3>
      <v-spacer></v-spacer>
      <v-btn class="mr-6" fab small depressed color="transparent" v-if="isLoguedUserProfile">
        <v-icon size="22" color="grey darken-1"> mdi-pencil </v-icon>
      </v-btn>
      <div class="divider-container mt-8">
        <v-divider></v-divider>
      </div>
    </v-row>

    <v-row align="center" justify="center" class="mb-10 mt-0 pt-0" v-if="skills.length > 0" no-gutters>
      <v-col cols="9">
        <v-chip v-for="(skill, index) in skills" :key="index" class="ma-2" :close="editMode" color="green" outlined>
          {{ skill.name }}</v-chip
        >
      </v-col>
    </v-row>

    <no-data v-else class="pb-8"></no-data>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { getSkillsOfUser } from "@/services/skill";
import NoData from "@/components/NoData.vue";
import { Skill } from "@/models/skills";

export default Vue.extend({
  name: "SkillProfile",

  components: { NoData },

  props: { isLoguedUserProfile: Boolean },

  data: () => ({
    skills: [] as Skill[],
    editMode: false
  }),

  async created() {
    const result = await getSkillsOfUser(this.$route.params.user, 0);
    this.skills = result.content;
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
