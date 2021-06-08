<template>
  <div>
    <v-card max-width="250" class="mx-auto">
      <v-row align="center" no-gutters class="mb-3 mt-2 pt-3">
        <v-col cols="12" class="text-center mt-2">
          <v-avatar size="100" class="user_name contact_avatar" @click="$router.push(canonicalName)">
            <v-img alt="user" :src="imageURI ? imageURI : require('@/assets/images/default-avatar.png')" />
          </v-avatar>
        </v-col>

        <v-col cols="12" class="mt-3 px-3 photo-name-position">
          <v-card-title class="pa-0 justify-center user_name user_data"
            ><h4 @click="$router.push(canonicalName)">{{ firstName }} {{ lastName }}</h4></v-card-title
          >
          <v-card-text class="pa-0 text-center user_data current_position">
            {{ currentPosition ? currentPosition.position + $i18n.t("at") : "" }}
            {{ currentPosition ? currentPosition.workplace.name : "" }}
          </v-card-text>
        </v-col>
      </v-row>

      <v-row justify="center" class="mt-1 mb-7" no-gutters>
        <v-col class="d-flex justify-center">
          <div class="pl-2">
            <v-img alt="gold-medal" width="20" src="@/assets/images/gold-medal.png" />
          </div>

          <span class="font-weight-light pr-3 pl-1 text-caption">{{ medals.gold }}</span>

          <div>
            <v-img alt="silver-medal" width="20" src="@/assets/images/silver-medal.png" />
          </div>
          <span class="font-weight-light pr-3 pl-1 text-caption">{{ medals.silver }}</span>

          <div>
            <v-img alt="bronce-medal" width="20" src="@/assets/images/bronce-medal.png" />
          </div>
          <span class="font-weight-light pl-1 text-caption">{{ medals.bronce }}</span>
        </v-col>
      </v-row>

      <v-row no-gutters class="card-actions">
        <v-col cols="12 text-center" class="mb-6">
          <v-btn
            height="35"
            width="80%"
            color="primary"
            depressed
            dark
            small
            outlined
            v-if="isFollow"
            @click.stop="createDialog = true"
          >
            {{ $i18n.t("unfollow") }}
          </v-btn>

          <v-btn height="35" width="80%" color="#ee5e5e" depressed dark small v-else @click.stop="createDialog = true">
            {{ $i18n.t("delete") }}
          </v-btn>
        </v-col>
      </v-row>
    </v-card>

    <DeleteContactDialog
      :firstName="firstName"
      :lastName="lastName"
      v-if="createDialog"
      v-model="createDialog"
      @deleteFromNetwork="deleteFromNetwork"
      :isFollow="isFollow"
    ></DeleteContactDialog>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { CurrentPosition } from "@/models/currentPosition";
import DeleteContactDialog from "@/components/Profile/DeleteContactDialog.vue";
import { Medals } from "@/models/medals";

export default Vue.extend({
  name: "PersonalContact",

  components: { DeleteContactDialog },

  props: {
    firstName: String,
    lastName: String,
    imageURI: String,
    canonicalName: String,
    currentPosition: Object as PropType<CurrentPosition>,
    amountOfMedals: Number,
    isFollow: Boolean
  },

  data: () => ({
    createDialog: false,
    isContact: Boolean,
    medals: {} as Medals
  }),

  methods: {
    deleteFromNetwork() {
      this.$emit("deleteFromNetwork");
    },
    calculateMedals(approves: number): Medals {
      const bronce = approves % 100;
      approves = (approves - bronce) / 100;
      const silver = approves % 100;
      const gold = (approves - silver) / 100;
      return { gold, silver, bronce };
    }
  },

  created() {
    this.medals = this.calculateMedals(this.amountOfMedals);
  }
});
</script>

<style scoped>
.btn_delete {
  background-image: #f57070;
}
.user_data {
  white-space: pre-wrap;
  word-break: break-word;
  -webkit-line-clamp: 2;
  overflow: hidden;
  display: -webkit-box;

  -webkit-box-orient: vertical;
}
.user_name {
  cursor: pointer;
  font-size: 1.2rem;
  line-height: 130%;
}
.user_name:hover {
  text-decoration: underline;
}
.contact_avatar:hover {
  transform: scale(1.1);
}
.photo-name-position {
  height: 100px;
}
.current_position {
  font-size: 0.86rem;
}
</style>
