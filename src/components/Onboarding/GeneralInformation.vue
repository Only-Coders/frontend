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
        <v-form ref="register-user" lazy-validation>
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
                v-model="user.firstName"
                :rules="[rules.required]"
                :label="$i18n.t('Onboarding.GeneralInformation.nameLabel')"
                v-bind="{ ...inputProps }"
              ></v-text-field>
              <v-text-field
                v-model="user.lastName"
                :rules="[rules.required]"
                :label="$i18n.t('Onboarding.GeneralInformation.lastNameLabel')"
                v-bind="{ ...inputProps }"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row class="mt-0">
            <v-col class="pt-0" cols="12" lg="6">
              <v-select
                v-model="user.gitProfile.platform"
                :items="gitPlatforms"
                :label="$i18n.t('Onboarding.GeneralInformation.gitPlatformLabel')"
                v-bind="{ ...inputProps }"
                item-value="platformName"
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
                v-model="user.gitProfile.userName"
                :label="$i18n.t('Onboarding.GeneralInformation.gitProfile')"
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
                    :value="formatDate(user.birthDate)"
                    :label="$i18n.t('Onboarding.GeneralInformation.birthDate')"
                    append-icon="mdi-calendar-month-outline"
                    v-bind="(attrs, { ...inputProps })"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker no-title v-model="user.birthDate" @input="showDatePicker = false"></v-date-picker>
              </v-menu>
            </v-col>
            <v-col class="pt-0" cols="12" lg="6">
              <v-select
                v-model="user.country.code"
                :rules="[rules.required]"
                :label="$i18n.t('Onboarding.GeneralInformation.country')"
                v-bind="{ ...inputProps }"
                :items="countries"
                item-text="name"
                item-value="code"
              ></v-select>
            </v-col>
          </v-row>
          <v-textarea
            v-model="user.description"
            rounded
            filled
            :label="$i18n.t('Onboarding.GeneralInformation.description')"
            background-color="grey_input"
            rows="3"
            row-height="30"
            counter
            no-resize
            maxlength="256"
          ></v-textarea>
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
import { dateMixin } from "@/mixins/formattedDate";
import { storage } from "@/plugins/firebaseInit";
import { GitPlatform } from "@/models/gitPlatforms";
import { Country } from "@/models/country";
import { RegisterUser } from "@/models/registerUser";
import { getCountries } from "@/services/countries";
import { register } from "@/services/auth";
import Compressor from "compressorjs";

export default Vue.extend({
  name: "GeneralInformation",

  props: { stepAction: Boolean },

  mixins: [RuleMixin, inputMixin, dateMixin],

  data: () => ({
    selectedGitPlatform: {},
    gitPlatforms: GitPlatform.gitPlatforms,
    countries: [] as Country[],
    profileImageData: null as File | null,
    profileImageToShow: "",
    profileImageURL: "",
    user: {
      birthDate: "",
      description: "",
      gitProfile: {
        platform: "",
        userName: ""
      },
      firstName: "",
      lastName: "",
      imageURI: "",
      country: {
        code: ""
      }
    } as RegisterUser,
    showDatePicker: false,
    hasSelectedProfileImage: false
  }),

  methods: {
    async getCountries() {
      this.countries = await getCountries();
    },
    handleShowFileSelector() {
      (this.$refs.input1 as HTMLButtonElement).click();
    },
    previewImage(event: any) {
      this.hasSelectedProfileImage = true;
      this.profileImageData = event.target.files[0];
      this.profileImageToShow = URL.createObjectURL(event.target.files[0]);
    },

    async onUpload() {
      const profileImageData = this.profileImageData as File;
      const imageCompresor = new Promise<string>((resolve, reject) => {
        new Compressor(profileImageData, {
          quality: 0.2,
          async success(result: File) {
            const snapshot = await storage.ref(`images/${result.name}`).put(result);
            const profileImageUrl = await snapshot.ref.getDownloadURL();
            resolve(profileImageUrl);
          },
          error(err) {
            reject(err);
          }
        });
      });
      this.profileImageURL = await imageCompresor;
    },

    async handleRegisterUser() {
      if ((this.$refs["register-user"] as HTMLFormElement).validate()) {
        if (this.profileImageURL !== "") {
          await this.onUpload();
        }
        this.user.imageURI = this.profileImageURL;
        this.user.birthDate = new Date(this.user.birthDate).toISOString();
        console.log(this.user);
        await register(this.user);
      }
    }
  },

  watch: {
    async stepAction() {
      this.$emit("showButtonLoader", true);
      try {
        await this.handleRegisterUser();
        this.$emit("moveNextStep");
        this.$destroy();
      } catch (error) {
        console.log(error);
        this.$router.push("/login");
      } finally {
        this.$emit("showButtonLoader", false);
      }
    }
  },

  created() {
    this.getCountries();
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
