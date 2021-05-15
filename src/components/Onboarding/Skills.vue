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
                  item-value="canonicalName"
                  item-text="name"
                  hide-no-data
                  hide-details
                  :label="$i18n.t('Onboarding.Skills.skill')"
                  solo
                  background-color="grey_input"
                  @keydown.enter.prevent="addExperience"
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
import { get, post } from "@/services/skill";
import { Skill } from "@/models/skills";

export default Vue.extend({
  name: "Skills",

  props: { stepAction: Boolean },

  data: () => ({
    search: "",
    isLoading: false,
    skills: [] as Skill[],
    selectedSkills: [] as string[],
    timer: 0
  }),

  methods: {
    addExperience() {
      if (this.search) {
        if (this.selectedSkills.includes(this.search.toUpperCase()) === false) {
          this.selectedSkills.push(this.search.toUpperCase());
        }
        this.search = "";
        this.skills = [];
      }
    },

    deleteSkill(index: number) {
      this.selectedSkills.splice(index, 1);
    }
  },

  watch: {
    search() {
      if (this.search) {
        this.isLoading = true;
        if (this.timer != 0) {
          clearTimeout(this.timer);
          this.isLoading = false;
        }

        this.timer = setTimeout(async () => {
          try {
            const result = await get(this.search);

            this.skills = result.content;
          } catch (error) {
            clearTimeout(this.timer);
          } finally {
            this.isLoading = false;
          }
        }, 200);

        this.timer = 0;
      }
    },
    async stepAction() {
      await Promise.all(
        this.selectedSkills.map((skill) => {
          return post(skill);
        })
        //TODO: resolver asociacion usuario/skill
      );
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
