<template>
  <v-card class="py-1">
    <v-row align="center" no-gutters class="mt-3 mb-2">
      <v-avatar size="70" class="ml-4">
        <v-img
          alt="user"
          :src="contactData.imageURI ? contactData.imageURI : require('@/assets/images/default-avatar.png')"
        />
      </v-avatar>

      <v-col class="align-start mr-10 pl-4" cols="9" sm="5">
        <v-row class="align-center justify-space-between" no-gutters>
          <div class="d-flex align-start">
            <v-col cols="auto" class="pa-0">
              <v-card-title class="font-weight-regular pl-0 pr-2 py-0"
                >{{ contactData.firstName }} {{ contactData.lastName }}</v-card-title
              >
            </v-col>
            <v-col cols="auto" class="d-flex justify-start pa-0 pt-2">
              <div class="pl-0 pl-md-2">
                <v-img
                  alt="gold-medal"
                  :width="$vuetify.breakpoint.mdAndUp ? '20' : '15'"
                  src="@/assets/images/gold-medal.png"
                />
              </div>

              <span class="font-weight-light pr-1 pr-md-3 pl-1 text-caption">{{ medals.gold }}</span>

              <div class="my-auto">
                <v-img
                  alt="silver-medal"
                  :width="$vuetify.breakpoint.mdAndUp ? '20' : '15'"
                  src="@/assets/images/silver-medal.png"
                />
              </div>
              <span class="font-weight-light pr-1 pr-md-3 pl-1 text-caption">{{ medals.silver }}</span>

              <div class="my-auto">
                <v-img
                  alt="bronce-medal"
                  :width="$vuetify.breakpoint.mdAndUp ? '20' : '15'"
                  src="@/assets/images/bronce-medal.png"
                />
              </div>
              <span class="font-weight-light pl-1 text-caption">{{ medals.bronce }}</span>
            </v-col>
          </div>
          <v-card-subtitle class="pb-0 pt-1 pl-0"
            >{{ contactData.currentPosition ? contactData.currentPosition.position : "" }}
            {{ contactData.currentPosition ? $i18n.t("Feed.onPlace") : "" }}
            {{
              contactData.currentPosition && contactData.currentPosition.workplace
                ? contactData.currentPosition.workplace.name
                : ""
            }}
          </v-card-subtitle>
        </v-row>
      </v-col>

      <v-col cols="3" sm="4" class="mt-sm-0 mt-4 d-flex justify-end">
        <v-btn v-if="!followed" color="primary" width="35%" class="mx-3" small @click="followUser" outlined>
          {{ $i18n.t("Onboarding.SuggestedContacts.follow") }}
        </v-btn>
        <v-btn v-else color="primary" width="35%" class="mx-3" small @click="followUser" outlined>
          {{ $i18n.t("Onboarding.SuggestedContacts.unfollow") }}
        </v-btn>

        <v-btn
          v-if="!contactRequestSended"
          color="primary"
          width="35%"
          class="mx-3"
          small
          depressed
          @click="sendContactRequest"
        >
          {{ $i18n.t("Onboarding.SuggestedContacts.add") }}
        </v-btn>

        <v-btn v-else color="primary" width="35%" class="mx-3" small depressed @click="sendContactRequest">
          {{ $i18n.t("Onboarding.SuggestedContacts.cancelAdd") }}
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { VueConstructor } from "vue/types/umd";
import { postContactRequest, deleteContactRequest } from "@/services/contact";
import { postFollow, deleteFollow } from "@/services/follow";
import { User } from "@/models/user";
import medalsMixin, { MedalsMixin } from "@/mixins/medals";
import { Medals } from "@/models/medals";

export default (Vue as VueConstructor<Vue & MedalsMixin>).extend({
  name: "Contact",

  props: {
    contactData: Object as PropType<User>
  },

  mixins: [medalsMixin],

  data: () => ({
    contactRequestSended: false,
    followed: false,
    medals: {} as Medals
  }),

  methods: {
    followUser() {
      if (this.followed) {
        deleteFollow(this.contactData.canonicalName);
      } else {
        postFollow(this.contactData.canonicalName);
      }
      this.followed = !this.followed;
    },
    sendContactRequest() {
      if (this.contactRequestSended) {
        deleteContactRequest(this.contactData.canonicalName);
      } else {
        postContactRequest({ canonicalName: this.contactData.canonicalName });
      }
      this.contactRequestSended = !this.contactRequestSended;
    },
    closeSuggestedContact() {
      this.$emit("remove");
    }
  },

  created() {
    this.medals = this.calculateMedals(this.contactData.amountOfMedals);
  }
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
</style>
