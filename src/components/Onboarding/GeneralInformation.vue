<template>
  <div style="position: relative; padding-top: 85px">
    <v-row justify="center" align="center" class="pt-sm-0 pt-16" no-gutters>
      <v-col align="center">
        <h2 class="mb-4">{{ $i18n.t("Onboarding.GeneralInformation.title") }}</h2>
      </v-col>
    </v-row>
    <v-row justify="center" align="center" no-gutters>
      <v-col align="center" cols="10" md="8" lg="6">
        <p>
          {{ $i18n.t("Onboarding.GeneralInformation.text") }}
        </p>
      </v-col>
    </v-row>

    <v-row
      justify="center"
      no-gutters
      class="overflow-y-auto"
      :style="$vuetify.breakpoint.xs ? 'max-height: 365px' : 'max-height: 550px'"
    >
      <v-col cols="10" md="6" lg="4" no-gutters>
        <v-form>
          <v-row no-gutters align="center">
            <v-col class="py-2 py-sm-6 py-md-0" cols="12" md="4" lg="4" no-gutters>
              <v-btn
                v-if="!hasSelectedProfileImage"
                class="pa-12 pa-md-14 pa-lg-16"
                fab
                dark
                color="primary"
                @click="handleShowFileSelector"
              >
                <v-icon dark large> mdi-camera </v-icon>
                <input
                  type="file"
                  ref="input1"
                  style="display: none"
                  @change="previewImage"
                  accept="image/*"
                  lazy-src
                />
              </v-btn>
              <v-btn v-else class="pa-12 pa-md-14 pa-lg-16" fab dark @click="handleShowFileSelector">
                <v-img
                  :height="$vuetify.breakpoint.xs ? '100' : '130'"
                  :width="$vuetify.breakpoint.xs ? '100' : '130'"
                  :src="profileImageToShow"
                  class="profile-img"
                />
                <input
                  type="file"
                  ref="input1"
                  style="display: none"
                  @change="previewImage"
                  accept="image/*"
                  lazy-src
                />
              </v-btn>
            </v-col>
            <v-col cols="12" md="8" lg="8">
              <v-text-field
                v-model="name"
                :rules="[rules.required]"
                :label="$i18n.t('Onboarding.GeneralInformation.nameLabel')"
                v-bind="{ ...inputProps }"
              ></v-text-field>
              <v-text-field
                v-model="lastName"
                :rules="[rules.required]"
                :label="$i18n.t('Onboarding.GeneralInformation.lastNameLabel')"
                v-bind="{ ...inputProps }"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row class="mt-0">
            <v-col class="pt-0" cols="12" lg="6">
              <v-select
                v-model="selectedGitPlatform"
                :items="gitPlatforms"
                :label="$i18n.t('Onboarding.GeneralInformation.gitPlatformLabel')"
                v-bind="{ ...inputProps }"
              >
                <template v-slot:selection="{ item }">
                  <img width="15" style="margin-right: 10px" :src="item.platformImage" />{{ item.platformName }}
                </template>
                <template v-slot:item="{ item }">
                  <img width="25" style="margin-right: 10px" :src="item.platformImage" />{{ item.platformName }}
                </template>
              </v-select>
            </v-col>
            <v-col class="pt-0" cols="12" lg="6">
              <v-text-field
                v-model="gitUser"
                :rules="[rules.required]"
                :label="$i18n.t('Onboarding.GeneralInformation.gitUser')"
                v-bind="{ ...inputProps }"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="mt-0">
            <v-col class="pt-0" cols="12" lg="6">
              <v-menu
                v-model="showDatePicker"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
                left
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="birthDate"
                    :label="$i18n.t('Onboarding.GeneralInformation.birthDate')"
                    append-icon="mdi-calendar-month-outline"
                    v-bind="(attrs, { ...inputProps })"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker no-title v-model="birthDate" @input="showDatePicker = false"></v-date-picker>
              </v-menu>
            </v-col>
            <v-col class="pt-0" cols="12" lg="6">
              <v-text-field
                v-model="country"
                :rules="[rules.required]"
                :label="$i18n.t('Onboarding.GeneralInformation.country')"
                v-bind="{ ...inputProps }"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-textarea
            v-model="description"
            rounded
            filled
            :label="$i18n.t('Onboarding.GeneralInformation.description')"
            background-color="grey_input"
            rows="3"
            row-height="30"
            counter
            no-resize
          ></v-textarea>
          <v-btn @click="onUpload">upload image</v-btn>
        </v-form>
      </v-col>
    </v-row>
    <img
      class="online_resume hidden-md-and-down"
      src="@/assets/images/Onboarding/undraw_online_resume.svg"
      alt="online_resume"
    />
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { RuleMixin } from "@/mixins/rules";
import { inputMixin } from "@/mixins/inputProps";
import { storage } from "@/plugins/firebaseInit";

export default Vue.extend({
  name: "GeneralInformation",

  props: { stepAction: Number },

  mixins: [RuleMixin, inputMixin],

  data: () => ({
    selectedGitPlatform: {},
    gitPlatforms: [
      { platformName: "Github", platformImage: require("@/assets/images/Onboarding/github-icon-1.svg") },
      { platformName: "GitLab", platformImage: require("@/assets/images/Onboarding/gitlab.svg") },
      { platformName: "GitBucket", platformImage: require("@/assets/images/Onboarding/bitbucket-icon.svg") }
    ],
    profileImageData: null as File | null,
    profileImageToShow: "",
    profileImageURL: "",
    uploadValue: 0,
    name: "",
    lastName: "",
    gitPlatform: "",
    gitUser: "",
    birthDate: "",
    country: "",
    description: "",
    showDatePicker: false,
    hasSelectedProfileImage: false
  }),

  methods: {
    handleShowFileSelector() {
      (this.$refs.input1 as HTMLButtonElement).click();
    },
    previewImage(event: any) {
      this.hasSelectedProfileImage = true;
      this.profileImageData = event.target.files[0];
      this.profileImageToShow = URL.createObjectURL(event.target.files[0]);
    },
    async onUpload() {
      if (this.profileImageData) {
        const storageRef = await storage
          .ref(`images/${this.profileImageData.name}`)
          .put(this.profileImageData)
          .then(
            async (snapshot) => {
              this.profileImageURL = await snapshot.ref.getDownloadURL();
            },
            (error) => {
              console.log(error.message);
            }
          );
      }
    }
  },

  watch: {
    stepAction() {
      this.$emit("moveNextStep");
      this.$destroy();
    }
  }
});
</script>

<style lang="scss" scoped>
.profile-img {
  border-radius: 50%;
}

.online_resume {
  width: 260px;
  z-index: 2;
  position: absolute;
  bottom: 0;
  left: 100px;
}
</style>
