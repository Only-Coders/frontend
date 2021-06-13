<template>
  <div>
    <v-row class="pt-10 pb-4 px-sm-16 px-5" align="center" no-gutters>
      <span class="pl-10 pr-6">
        <v-icon size="30"> mdi-card-account-details </v-icon>
      </span>
      <h3>{{ $i18n.t("ViewProfile.skills") }}</h3>
      <v-spacer></v-spacer>
      <v-btn
        class="mr-6"
        fab
        small
        depressed
        color="transparent"
        v-if="isLoguedUserProfile && !editMode"
        @click="editMode = true"
      >
        <v-icon size="22" color="grey darken-1"> mdi-pencil </v-icon>
      </v-btn>

      <v-btn
        class="mr-6"
        fab
        small
        dark
        depressed
        color="error"
        outlined
        v-if="isLoguedUserProfile && editMode"
        @click="editMode = true"
      >
        <v-icon dark size="22" color="error"> mdi-close </v-icon>
      </v-btn>

      <v-btn
        class="mr-6"
        fab
        small
        depressed
        color="primary"
        outlined
        v-if="isLoguedUserProfile && editMode"
        @click="editMode = true"
      >
        <v-icon size="22" color="primary"> mdi-check-bold </v-icon>
      </v-btn>
      <div class="divider-container mt-8">
        <v-divider></v-divider>
      </div>
    </v-row>

    <v-row align="center" justify="center" class="mb-10" v-if="editMode">
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
            <v-btn fab depressed color="primary" class="add_btn" @click.prevent="addSkill">
              <v-icon> mdi-plus </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-row>

    <v-row align="center" justify="center" class="mb-10 mt-0 pt-0" v-if="selfSkills.length > 0" no-gutters>
      <v-col cols="9">
        <v-chip v-for="(skill, index) in selfSkills" :key="index" class="ma-2" :close="editMode" color="green" outlined>
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
import { getSkill, postSkill } from "@/services/skill";

export default Vue.extend({
  name: "SkillProfile",

  components: { NoData },

  props: { isLoguedUserProfile: Boolean },

  data: () => ({
    skills: [] as Skill[],
    editMode: false,
    search: "",
    isLoading: false,
    selfSkills: [] as Skill[],
    timer: 0,
    loadingPostSkills: false
  }),

  methods: {
    addSkill() {
      if (this.search) {
        const skill = this.skills.find((skill) => skill.canonicalName === this.search.toLowerCase());

        if (!skill) {
          this.selfSkills.push({ name: this.search });
        } else {
          if (!this.selfSkills.find((skill) => skill.canonicalName === this.search.toLowerCase())) {
            this.selfSkills.push(skill);
          }
        }

        this.search = "";
        this.skills = [];
      }
    },

    deleteSkill(index: number) {
      this.selfSkills.splice(index, 1);
    },

    async doSearch() {
      if (this.search == null) {
        this.skills = (await getSkill("")).content;
      }
    },

    async confirmAddSkills() {
      await Promise.all(
        this.selfSkills.map((skill) => {
          return postSkill(skill);
        })
      );
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
    }
  },

  async created() {
    const result = await getSkillsOfUser(this.$route.params.user, 0);
    this.selfSkills = result.content;
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
.add_btn {
  width: 50px;
  height: 50px;
}
</style>
