<template>
  <div class="general-information">
    <v-row justify="center" align="center" no-gutters>
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
      :style="isLaptop() ? 'max-height: 55vh' : 'max-height: 65vh'"
    >
      <v-col cols="10" md="6" lg="4" no-gutters>
        <v-form ref="register-user" lazy-validation>
          <v-row no-gutters align="center">
            <v-col class="py-2 py-md-0" cols="12" md="4" lg="4" no-gutters>
              <v-btn
                v-if="!hasSelectedProfileImage"
                class="pa-12 pa-md-14 pa-lg-16"
                fab
                depressed
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
            <v-col class="py-0" cols="12" lg="6">
              <v-select
                v-model="user.gitProfile.platform"
                v-if="user.gitProfile"
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
                v-if="user.gitProfile"
                :label="$i18n.t('Onboarding.GeneralInformation.gitProfile')"
                v-bind="{ ...inputProps }"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="mt-0">
            <v-col class="py-0" cols="12" lg="6">
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
                    :value="formatDate(birthDate)"
                    :label="$i18n.t('Onboarding.GeneralInformation.birthDate')"
                    append-icon="mdi-calendar-month-outline"
                    v-bind="{ attrs, ...inputProps }"
                    v-on="on"
                    readonly
                    class="ma-0 pa-0"
                  ></v-text-field>
                </template>
                <v-date-picker no-title v-model="birthDate" @input="showDatePicker = false"></v-date-picker>
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
import Vue, { VueConstructor } from "vue";
import ruleMixin, { RuleMixin } from "@/mixins/rules";
import inputPropsMixin, { InputPropsMixin } from "@/mixins/inputProps";
import dateMixin, { DateMixin } from "@/mixins/formattedDate";
import { storage } from "@/plugins/firebaseInit";
import gitPlatforms, { GitPlatformsMixin } from "@/mixins/gitPlatforms";
import { Country } from "@/models/country";
import { RegisterUser } from "@/models/registerUser";
import { getCountries } from "@/services/countries";
import { register } from "@/services/auth";
import Compressor from "compressorjs";
import { setHeaders } from "@/plugins/axios";
import jwtDecode from "jwt-decode";
import { UserData } from "@/store/modules/user";
import { uuid } from "@/plugins/uuid";

export default (Vue as VueConstructor<Vue & InputPropsMixin & DateMixin & RuleMixin & GitPlatformsMixin>).extend({
  name: "GeneralInformation",

  props: { stepAction: Boolean },

  mixins: [ruleMixin, inputPropsMixin, dateMixin, gitPlatforms],

  data: () => ({
    selectedGitPlatform: {},
    countries: [] as Country[],
    profileImageData: null as File | null,
    profileImageToShow: "",
    profileImageURL: "",
    birthDate: "",
    user: {
      birthDate: "",
      description: "",
      gitProfile: {
        platform: "GITHUB",
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
    previewImage(event: Event) {
      const target = event.target as HTMLInputElement;
      if (target.files) {
        this.hasSelectedProfileImage = true;
        this.profileImageData = target.files[0];
        this.profileImageToShow = URL.createObjectURL(target.files[0]);
      }
    },

    async onUpload() {
      const profileImageData = this.profileImageData as File;
      const imageCompresor = new Promise<string>((resolve, reject) => {
        new Compressor(profileImageData, {
          quality: 0.2,
          async success(result: File) {
            const fileName = uuid();
            const snapshot = await storage.ref(`images/${fileName}`).put(result);
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
      if (this.profileImageToShow !== "") {
        await this.onUpload();
      }
      this.user.imageURI = this.profileImageURL;
      if (this.birthDate) this.user.birthDate = new Date(this.birthDate).toISOString();
      if (!this.user.gitProfile?.userName) delete this.user.gitProfile;
      const ocToken = await register(this.user);
      setHeaders(ocToken.token);
      const user: UserData = jwtDecode(ocToken.token);
      this.$store.commit("userModule/SET_USER", user);
    },
    isLaptop() {
      return window.innerHeight <= 597;
    }
  },

  watch: {
    async stepAction() {
      if ((this.$refs["register-user"] as HTMLFormElement).validate()) {
        this.$emit("showButtonLoader");
        try {
          await this.handleRegisterUser();
          this.$emit("showButtonLoader");
          this.$emit("moveNextStep");
          this.$destroy();
        } catch (error) {
          this.$router.push("/login");
        }
      }
      this.$emit("moveNextStep");
      this.$destroy();
    }
  },

  created() {
    this.getCountries();
  }
});
</script>

<style lang="scss" scoped>
.general-information {
  position: relative;
  margin-top: 75px;
}
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
