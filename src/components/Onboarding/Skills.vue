<template>
  <div class="pa-16">
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
                <v-autocomplete
                  v-model="model"
                  :items="items"
                  :loading="isLoading"
                  :search-input.sync="search"
                  cache-items
                  hide-no-data
                  hide-details
                  item-text="Description"
                  item-value="API"
                  placeholder="Start typing to Search"
                  prepend-icon="mdi-database-search"
                  return-object
                  :label="$i18n.t('Onboarding.Skills.skill')"
                  solo
                  background-color="grey_input"
                ></v-autocomplete>
              </v-col>
              <v-col cols="1">
                <v-btn fab color="primary" @click="addExperience">
                  <v-icon> mdi-plus </v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-row>

        <v-row align="center" justify="center" class="mt-10">
          <v-col cols="6">
            <v-chip
              v-for="(skill, index) in skills"
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

    <img src="@/assets/images/Onboarding/undraw_developer_activity.svg" alt="skills" class="skill_img" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Skills",

  props: {},

  data: function () {
    return {
      search: null,
      descriptionLimit: 60,
      entries: [],
      isLoading: false,
      model: null,
      skills: []
    };
  }

  /*  methods: {
    addExperience() {
      if (this.search) {
        this.skills.push(this.search);
        this.search = "";
      }
    },
    deleteSkill(index: number) {
      console.log(index);
      this.skills.splice(index, 1);
    }
  },

  computed: {
    fields() {
      if (!this.model) return [];

      return Object.keys(this.model).map((key) => {
        return {
          key,
          value: this.model[key] || "n/a"
        };
      });
    },
    items() {
      return this.entries.map((entry) => {
        const Description =
          entry.Description.length > this.descriptionLimit
            ? entry.Description.slice(0, this.descriptionLimit) + "..."
            : entry.Description;

        return Object.assign({}, entry, { Description });
      });
    }
  },

  watch: {
    search(val) {
      // Items have already been loaded
      if (this.items.length > 0) return;

      // Items have already been requested
      if (this.isLoading) return;

      this.isLoading = true;

      // Lazily load input items
      fetch("https://api.publicapis.org/entries")
        .then((res) => res.json())
        .then((res) => {
          const { count, entries } = res;
          this.count = count;
          this.entries = entries;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => (this.isLoading = false));
    }
  } */
});
</script>

<style lang="scss" scoped>
.skill_img {
  width: 260px;
  z-index: 2;
  position: absolute;
  bottom: 250px;
  left: 100px;
}
</style>
