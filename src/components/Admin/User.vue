<template>
  <v-card class="py-1">
    <v-row align="center" no-gutters class="mt-3 mb-2">
      <v-avatar size="70" class="ml-4">
        <v-img
          class="user__profile-image"
          alt="user"
          :src="userData.imageURI ? userData.imageURI : require('@/assets/images/default-avatar.png')"
        />
      </v-avatar>

      <v-col class="align-start mr-8 pl-4" cols="9" sm="5">
        <v-row class="align-center justify-space-between" no-gutters>
          <div class="d-flex align-start">
            <v-col cols="auto" class="pa-0">
              <div style="user__name">
                <v-card-title class="font-weight-regular pl-0 pr-2 py-0 user__name d-block text-truncate"
                  >{{ userData.firstName }} {{ userData.lastName }}</v-card-title
                >
              </div>
            </v-col>
            <v-col cols="auto" class="d-flex justify-start pa-0 pt-2">
              <div class="pl-0 pl-md-2">
                <v-img
                  alt="gold-medal"
                  :width="$vuetify.breakpoint.mdAndUp ? '20' : '15'"
                  src="@/assets/images/gold-medal.png"
                />
              </div>

              <span class="font-weight-light pr-1 pr-md-3 pl-1 text-caption">{{
                calculateMedals(userData.medalQty).gold
              }}</span>

              <div class="my-auto">
                <v-img
                  alt="silver-medal"
                  :width="$vuetify.breakpoint.mdAndUp ? '20' : '15'"
                  src="@/assets/images/silver-medal.png"
                />
              </div>
              <span class="font-weight-light pr-1 pr-md-3 pl-1 text-caption">{{
                calculateMedals(userData.medalQty).silver
              }}</span>

              <div class="my-auto">
                <v-img
                  alt="bronce-medal"
                  :width="$vuetify.breakpoint.mdAndUp ? '20' : '15'"
                  src="@/assets/images/bronce-medal.png"
                />
              </div>
              <span class="font-weight-light pl-1 text-caption">{{ calculateMedals(userData.medalQty).bronce }}</span>
            </v-col>
          </div>
          <v-card-subtitle class="pb-0 pt-1 pl-0"
            >{{ userData.currentPosition ? userData.currentPosition.position : "" }}
            {{ userData.currentPosition ? $i18n.t("Feed.onPlace") : "" }}
            {{
              userData.currentPosition && userData.currentPosition.workplace
                ? userData.currentPosition.workplace.name
                : ""
            }}
          </v-card-subtitle>
        </v-row>
      </v-col>

      <v-col
        v-if="userData.canonicalName !== this.$store.state.userModule.user.canonicalName"
        cols="3"
        sm="4"
        class="mt-sm-0 mt-4 ml-8 d-flex justify-end"
      >
        <v-btn height="35" width="65%" color="#ee5e5e" class="mx-auto" v-if="isContactConnected" depressed dark small>
          {{ $i18n.t("delete") }}
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { VueConstructor } from "vue/types/umd";
import medalsMixin, { MedalsMixin } from "@/mixins/medals";
import { Profile } from "@/models/profile";
import { Admin } from "@/models/admin";

export default (Vue as VueConstructor<Vue & MedalsMixin>).extend({
  name: "User",

  props: {
    userData: Object as PropType<Profile>,
    adminData: Object as PropType<Admin>,
    isAdmin: Boolean
  },

  components: {},

  mixins: [medalsMixin],

  data: () => ({}),

  methods: {},

  computed: {}

  // created() {}
});
</script>

<style scoped>
.v-card.v-sheet.theme--light {
  background-color: #ffffff !important;
  border-left: 5px solid var(--v-secondary-base) !important;
}

.btn_cross {
  right: 0;
  top: 0;
}

.user__name {
  cursor: pointer;
}

.user__profile-image {
  cursor: pointer;
}

.user__name {
  max-width: 180px;
}
</style>
