<template>
  <div style="position: relative; margin-top: 85px; height: 765px">
    <v-row class="pt-sm-0 pt-16">
      <v-col align="center">
        <h2 class="mb-4">{{ $i18n.t("Onboarding.Skills.title") }}</h2>
        <p>
          {{ $i18n.t("Onboarding.Skills.text") }}
        </p>

        <v-row align="center" justify="center" class="mt-16">
          <v-form>
            <v-row>
              <v-col cols="11">
                <v-autocomplete
                  :loading="isLoading"
                  :search-input.sync="search"
                  :items="skills"
                  cache-items
                  hide-no-data
                  hide-details
                  return-object
                  :label="$i18n.t('Onboarding.Skills.skill')"
                  solo
                  background-color="grey_input"
                  @keypress.enter.prevent="addExperience"
                ></v-autocomplete>
              </v-col>
              <v-col cols="1">
                <v-btn fab color="primary" @click.prevent="addExperience">
                  <v-icon> mdi-plus </v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-row>

        <v-row align="center" justify="center" class="mt-10">
          <v-col cols="6">
            <v-chip
              v-for="(skill, index) in selectedSkills"
              :key="index"
              class="ma-2"
              close
              color="green"
              outlined
              @click:close="deleteSkill(index)"
            >
              {{ skill }}</v-chip
            >
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <img
      :style="$vuetify.breakpoint.xs ? 'display: none' : ''"
      src="@/assets/images/Onboarding/undraw_developer_activity.svg"
      alt="skills"
      class="skill_img hidden-md-and-down"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { get } from "@/services/skill";

export default Vue.extend({
  name: "Skills",

  props: { stepAction: Boolean },

  data: () => ({
    search: "",
    isLoading: false,
    model: null,
    skills: [] as string[],
    selectedSkills: [] as string[],
    timer: 0
  }),

  methods: {
    async addExperience() {
      if (this.search) {
        this.selectedSkills.push(this.search);
        //const result = await get(this.search);
        //console.log(result);
        this.search = "";
      }
    },

    deleteSkill(index: number) {
      this.skills.splice(index, 1);
    }
  },

  watch: {
    search() {
      if (this.search && this.search != "") {
        this.isLoading = true;
        clearTimeout(this.timer);

        this.timer = setTimeout(() => {
          const result = fetch("https://api.publicapis.org/entries");
          if (result) {
            this.isLoading = false;
            this.skills = ["Java", "JavaFx", "Javascript"];
          }
        }, 2500);
      }
    },
    stepAction() {
      this.$emit("moveNextStep");
      this.$destroy();
    }
  }
});
</script>

<style lang="scss" scoped>
.skill_img {
  width: 260px;
  z-index: 2;
  position: absolute;
  bottom: 120px;
  left: 100px;
}
</style>
