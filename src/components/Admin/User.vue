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
          </div>
        </v-row>
      </v-col>
      <v-col
        v-if="data.canonicalName !== this.$store.state.userModule.user.canonicalName && data.role.name !== 'ADMIN'"
        cols="3"
        sm="4"
        class="mt-sm-0 mt-4 ml-8 d-flex justify-end"
      >
        <v-btn v-if="!isUserBlocked" height="35" width="35%" color="#ee5e5e" depressed dark small> Block </v-btn>

        <v-btn v-else color="#ee5e5e" height="35" width="35%" depressed dark small> Unblock </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { VueConstructor } from "vue/types/umd";
import { MedalsMixin } from "@/mixins/medals";
import { GetAdminUser } from "@/models/admin";
import { updateUserBlockStatus } from "@/services/user";

export default (Vue as VueConstructor<Vue & MedalsMixin>).extend({
  name: "User",

  props: {
    data: Object as PropType<GetAdminUser>
  },

  data: () => ({
    isUserBlocked: false
  }),

  methods: {
    async toggleUserBlockStatus() {
      this.isUserBlocked = !this.isUserBlocked;
      await updateUserBlockStatus(this.data.canonicalName, this.isUserBlocked);
    }
  },

  created() {
    this.isUserBlocked = this.data.blocked;
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
