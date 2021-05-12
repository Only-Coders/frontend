<template>
  <div style="position: relative; padding-top: 45px">
    <v-row justify="center" align="center" no-gutters>
      <v-col align="center">
        <h2 class="mb-4">{{ $i18n.t("Onboarding.GeneralInformation.title") }}</h2>
      </v-col>
    </v-row>
    <v-row justify="center" align="center" no-gutters>
      <v-col align="center" cols="6">
        <p>
          {{ $i18n.t("Onboarding.GeneralInformation.text") }}
        </p>
      </v-col>
    </v-row>

    <v-row justify="center" no-gutters class="pt-16">
      <v-col cols="4" no-gutters>
        <v-form>
          <v-row no-gutters>
            <v-col cols="4" no-gutters>
              <v-btn
                v-if="!hasSelectedProfileImage"
                class="mx-2 pa-16"
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
              <v-btn v-else class="mx-2 pa-16" fab dark @click="handleShowFileSelector">
                <v-img height="130" width="130" :src="profileImageToShow" class="profile-img" />
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
            <v-col cols="8">
              <v-text-field
                v-model="name"
                :rules="[rules.required]"
                :label="$i18n.t('Onboarding.GeneralInformation.nameLabel')"
                rounded
                filled
                background-color="grey_input"
              ></v-text-field>
              <v-text-field
                v-model="lastName"
                :rules="[rules.required]"
                :label="$i18n.t('Onboarding.GeneralInformation.lastNameLabel')"
                rounded
                filled
                background-color="grey_input"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-text-field
                v-model="gitUser"
                :rules="[rules.required]"
                :label="$i18n.t('Onboarding.GeneralInformation.gitUser')"
                rounded
                filled
                background-color="grey_input"
              ></v-text-field>

              <v-menu
                v-model="showStartDatePicker"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="birthDate"
                    :label="$i18n.t('Onboarding.WorkExperience.startDateLabel')"
                    append-icon="mdi-calendar-month-outline"
                    v-bind="attrs"
                    v-on="on"
                    rounded
                    filled
                    background-color="grey_input"
                  ></v-text-field>
                </template>
                <v-date-picker no-title v-model="birthDate" @input="showStartDatePicker = false"></v-date-picker>
              </v-menu>
            </v-col>
            <v-col>
              <v-text-field
                v-model="country"
                :rules="[rules.required]"
                :label="$i18n.t('Onboarding.GeneralInformation.country')"
                rounded
                filled
                background-color="grey_input"
              ></v-text-field>
              <v-text-field
                v-model="city"
                :rules="[rules.required]"
                :label="$i18n.t('Onboarding.GeneralInformation.city')"
                rounded
                filled
                background-color="grey_input"
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
    <img src="@/assets/images/Onboarding/undraw_online_resume.svg" alt="online_resume" class="online_resume" />
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { RuleMixin } from "@/mixins/rules";
import { storage } from "@/plugins/firebaseInit";

export default Vue.extend({
  name: "GeneralInformation",

  props: {},

  mixins: [RuleMixin],

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

  data: () => ({
    profileImageData: null as File | null,
    profileImageToShow: "",
    profileImageURL: "",
    uploadValue: 0,
    name: "",
    lastName: "",
    gitUser: "",
    birthDate: "",
    country: "",
    city: "",
    description: "",
    showDatePicker: false,
    hasSelectedProfileImage: false
  })
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
