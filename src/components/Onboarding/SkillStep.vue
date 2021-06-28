<template>
  <div class="skills">
    <v-row>
      <v-col align="center">
        <h2 class="mb-4">{{ $i18n.t("Onboarding.Skills.title") }}</h2>
        <p>
          {{ $i18n.t("Onboarding.Skills.text") }}
        </p>

        <v-row align="center" justify="center" class="mt-16">
          <v-form>
            <v-row>
              <v-col cols="11">
                <v-combobox
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
                  @keydown.enter.prevent="addSkill"
                  @focus="doSearch"
                  append-icon=""
                  clearable
                ></v-combobox>
              </v-col>
              <v-col cols="1">
                <v-btn fab depressed color="primary" @click.prevent="addSkill">
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
              {{ skill.name }}</v-chip
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
import { getSkill, postSkill } from "@/services/skill";
import { Skill } from "@/models/skills";

export default Vue.extend({
  name: "SkillStep",

  props: { stepAction: Boolean },

  data: () => ({
    search: "",
    isLoading: false,
    skills: [] as Skill[],
    selectedSkills: [] as Skill[],
    timer: 0
  }),

  methods: {
    addSkill() {
      if (this.search) {
        const skill = this.skills.find((skill) => skill.canonicalName === this.search.toLowerCase());

        if (!skill) {
          this.selectedSkills.push({ name: this.search });
        } else {
          if (!this.selectedSkills.find((skill) => skill.canonicalName === this.search.toLowerCase())) {
            this.selectedSkills.push(skill);
          }
        }

        this.search = "";
        this.skills = [];
      }
    },

    deleteSkill(index: number) {
      this.selectedSkills.splice(index, 1);
    },

    async doSearch() {
      if (this.search == null) {
        this.skills = (await getSkill("")).content;
      }
    }
  },

  watch: {
    search() {
      if (this.search != null) {
        this.isLoading = true;
        if (this.timer != 0) {
          clearTimeout(this.timer);
        }

        this.timer = setTimeout(async () => {
          try {
            const result = await getSkill(this.search);

            this.skills = result.content;
          } catch (error) {
            clearTimeout(this.timer);
          } finally {
            this.isLoading = false;
          }
        }, 200);
      }
    },
    async stepAction() {
      this.$emit("showButtonLoader");
      await Promise.all(
        this.selectedSkills.map((skill) => {
          return postSkill(skill);
        })
      );
      this.$emit("showButtonLoader");
      this.$emit("moveNextStep");
      this.$destroy();
    }
  }
});
</script>

<style lang="scss" scoped>
.skills {
  position: relative;
  margin-top: 75px;
  height: 765px;
}

.skill_img {
  width: 260px;
  z-index: 2;
  position: absolute;
  bottom: 120px;
  left: 100px;
}
</style>
