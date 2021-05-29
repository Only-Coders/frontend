<template>
  <div>
    <v-card>
      <v-row class="px-7 py-3" align="start" no-gutters>
        <v-col cols="1" class="pt-4">
          <v-avatar size="60">
            <v-img
              alt="user"
              :src="post.publisher.imageURI ? post.publisher.imageURI : require('@/assets/images/default-avatar.png')"
            />
          </v-avatar>
        </v-col>
        <v-col cols="11" class="ma-0 pl-4">
          <v-row class="align-center">
            <v-col cols="auto" class="pr-0">
              <v-card-title class="font-weight-ligth pr-2"
                >{{ post.publisher.firstName }} {{ post.publisher.lastName }}</v-card-title
              >
            </v-col>
            <v-col class="d-flex justify-start pa-0">
              <div class="pl-2">
                <v-img alt="gold-medal" width="20" src="@/assets/images/gold-medal.png" />
              </div>

              <span class="font-weight-light pr-3 pl-1 text-caption">{{ 0 }}</span>

              <div>
                <v-img alt="silver-medal" width="20" src="@/assets/images/silver-medal.png" />
              </div>
              <span class="font-weight-light pr-3 pl-1 text-caption">{{ 2 }}</span>

              <div>
                <v-img alt="bronce-medal" width="20" src="@/assets/images/bronce-medal.png" />
              </div>
              <span class="font-weight-light pl-1 text-caption">{{ 10 }}</span>
            </v-col>
          </v-row>
          <v-card-subtitle class="py-0"
            >{{ post.publisher.currentPosition ? post.publisher.currentPosition.position : "" }}

            {{
              post.publisher.currentPosition && post.publisher.currentPosition.position
                ? post.publisher.currentPosition.position.workPlace
                : ""
            }}
          </v-card-subtitle>
          <v-card-subtitle class="py-0">{{ formatPostDate(post.createdAt) }}</v-card-subtitle>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { GetPost } from "@/models/post";

export default Vue.extend({
  name: "ViewPost",

  props: { post: Object as PropType<GetPost> },

  data: () => ({
    createDialog: false
  }),

  methods: {
    formatPostDate(date: string) {
      let seconds = Math.floor((new Date().getDate() - new Date(date).getDate()) / 1000);

      let interval = seconds / 31536000;

      if (interval > 1) {
        return Math.floor(interval) + " years ago";
      }
      interval = seconds / 2592000;
      if (interval > 1) {
        return Math.floor(interval) + " months ago";
      }
      interval = seconds / 86400;
      if (interval > 1) {
        return Math.floor(interval) + " days ago";
      }
      interval = seconds / 3600;
      if (interval > 1) {
        return Math.floor(interval) + " hours ago";
      }
      interval = seconds / 60;
      if (interval > 1) {
        return Math.floor(interval) + " minutes ago";
      }
      return Math.floor(seconds) + " seconds ago";
    }
  }
});
</script>

<style scoped></style>
