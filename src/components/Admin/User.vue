<template>
  <v-card class="py-1">
    <v-row align="center" no-gutters class="mt-3 mb-2">
      <v-avatar size="70" class="ml-4">
        <v-img
          class="user__profile-image"
          alt="user"
          :src="data.imageURI ? data.imageURI : require('@/assets/images/default-avatar.png')"
        />
      </v-avatar>

      <v-col class="align-start mr-8 pl-4" cols="9" sm="5">
        <v-row class="align-center justify-space-between" no-gutters>
          <div class="d-flex align-start">
            <v-col cols="auto" class="pa-0">
              <div style="user__name">
                <v-card-title class="font-weight-regular pl-0 pr-2 py-0 user__name d-block text-truncate"
                  >{{ data.firstName }} {{ data.lastName }}</v-card-title
                >
              </div>
            </v-col>
            <!-- <v-col cols="auto" class="d-flex justify-start pa-0 pt-2">
              <div class="pl-0 pl-md-2">
                <v-img
                  alt="gold-medal"
                  :width="$vuetify.breakpoint.mdAndUp ? '20' : '15'"
                  src="@/assets/images/gold-medal.png"
                />
              </div>

              <span class="font-weight-light pr-1 pr-md-3 pl-1 text-caption">{{
                calculateMedals(data.medalQty).gold
              }}</span>

              <div class="my-auto">
                <v-img
                  alt="silver-medal"
                  :width="$vuetify.breakpoint.mdAndUp ? '20' : '15'"
                  src="@/assets/images/silver-medal.png"
                />
              </div>
              <span class="font-weight-light pr-1 pr-md-3 pl-1 text-caption">{{
                calculateMedals(data.medalQty).silver
              }}</span>

              <div class="my-auto">
                <v-img
                  alt="bronce-medal"
                  :width="$vuetify.breakpoint.mdAndUp ? '20' : '15'"
                  src="@/assets/images/bronce-medal.png"
                />
              </div>
              <span class="font-weight-light pl-1 text-caption">{{ calculateMedals(data.medalQty).bronce }}</span>
            </v-col> -->
          </div>
          <v-card-subtitle class="pb-0 pt-1 pl-0"
            >{{ data.currentPosition ? data.currentPosition.position : "" }}
            {{ data.currentPosition ? $i18n.t("Feed.onPlace") : "" }}
            {{ data.currentPosition && data.currentPosition.workplace ? data.currentPosition.workplace.name : "" }}
          </v-card-subtitle>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { VueConstructor } from "vue/types/umd";
import medalsMixin, { MedalsMixin } from "@/mixins/medals";
import { GetAdminUser } from "@/models/admin";

export default (Vue as VueConstructor<Vue & MedalsMixin>).extend({
  name: "User",

  props: {
    data: Object as PropType<GetAdminUser>
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
