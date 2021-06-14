<template>
  <v-dialog :value="value" @input="close" width="auto" transition="dialog-top-transition" max-width="650">
    <v-toolbar color="primary" dark>
      <h2 class="ml-4">{{ $i18n.t("editDataModalTitle") }}</h2>
      <v-spacer></v-spacer>
      <v-btn class="mr-2 mt-1" icon @click="close">
        <v-icon size="27"> mdi-close </v-icon>
      </v-btn>
    </v-toolbar>

    <v-card class="pt-8">
      <v-card-text>
        <v-row justify="center" no-gutters class="overflow-y-auto">
          <v-col cols="10">
            <v-form ref="register-user" lazy-validation>
              <v-row no-gutters align="center">
                <v-col cols="12">
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
                        :value="formattedDate"
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
                    v-model="user.countryCode"
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
      </v-card-text>

      <v-card-actions class="mt-8 pb-3 mr-4">
        <v-spacer></v-spacer>

        <v-btn color="error" text @click="close"> {{ $i18n.t("cancel") }} </v-btn>

        <v-btn color="primary" :loading="loading" text class="ml-6" @click="confirmEdition">
          {{ $i18n.t("accept") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Profile } from "@/models/profile";
import Vue, { PropType } from "vue";
import { Country } from "@/models/country";
import { getCountries } from "@/services/countries";
import GitPlatform from "@/mixins/gitPlatforms";
import RuleMixin from "@/mixins/rules";
import { inputMixin } from "@/mixins/inputProps";
import { dateMixin } from "@/mixins/formattedDate";
import { editProfile } from "@/services/user";
import { EditProfile } from "@/models/profile";

export default Vue.extend({
  name: "EditDataDialog",

  props: { userData: Object as PropType<Profile> },

  mixins: [RuleMixin, inputMixin, dateMixin, GitPlatform],

  data: () => ({
    value: Boolean,
    selectedGitPlatform: {},
    countries: [] as Country[],
    showDatePicker: false,
    user: {
      firstName: "",
      lastName: "",
      description: "",
      imageURI: "",
      birthDate: "",
      gitProfile: {
        platform: "",
        userName: ""
      },
      countryCode: ""
    } as EditProfile,
    loading: false
  }),

  methods: {
    close() {
      this.$emit("input");
    },
    async confirmEdition() {
      this.loading = true;
      this.user.birthDate = new Date(this.user.birthDate).toISOString();
      const result = await editProfile(this.user);
      this.loading = false;
      if (result) {
        this.$emit("updateData", result);
        this.$store.commit("userModule/SET_USER_FULLNAME", result.fullName);
      }
      //editar datos del store
      this.close();
    }
  },

  async created() {
    this.countries = await getCountries();
    this.user = {
      firstName: this.userData.firstName,
      lastName: this.userData.lastName,
      description: this.userData.description,
      imageURI: this.userData.imageURI,
      birthDate: this.userData.birthDate,
      gitProfile: {
        platform: this.userData.gitProfile.platform,
        userName: this.userData.gitProfile.userName
      },
      countryCode: this.userData.country.code
    };
  },

  computed: {
    formattedDate: {
      get(): string {
        if (this.user.birthDate) {
          return this.formatDate(new Date(this.user.birthDate).toISOString().substring(0, 10));
        } else {
          return "";
        }
      }
    }
  }
});
</script>

<style scoped></style>
