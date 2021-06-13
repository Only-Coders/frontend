<template>
  <div>
    <v-card :flat="isFlat">
      <v-row class="px-4 px-md-7 py-3" align="center" no-gutters>
        <v-col cols="2">
          <v-avatar size="60">
            <v-skeleton-loader :loading="true" type="avatar" class="skeleton"> </v-skeleton-loader>
            <v-img
              alt="user"
              class="profile_image"
              :src="
                isSelfProfile
                  ? $store.state.userModule.user && $store.state.userModule.user.imageURI
                    ? $store.state.userModule.user.imageURI
                    : require('@/assets/images/default-avatar.png')
                  : userData && userData.imageURI
                  ? userData.imageURI
                  : require('@/assets/images/default-avatar.png')
              "
            />
          </v-avatar>
        </v-col>
        <v-col cols="10" class="px-2 px-md-0 pr-4">
          <v-text-field
            class="create_post_input"
            :placeholder="$i18n.t('CreatePost.createPost')"
            autocomplete="off"
            @click.stop="createDialog = true"
            readonly
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card>

    <CreatePostDialog
      v-if="createDialog"
      v-model="createDialog"
      @passPostToCreatePost="passPostToPostContainer"
    ></CreatePostDialog>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import CreatePostDialog from "./CreatePostDialog.vue";
import { GetPost } from "@/models/post";
import { Profile } from "@/models/profile";

export default Vue.extend({
  name: "CreatePost",

  components: {
    CreatePostDialog
  },

  props: {
    userData: Object as PropType<Profile>,
    isSelfProfile: Boolean,
    isFlat: Boolean
  },

  data: () => ({
    createDialog: false
  }),

  methods: {
    passPostToPostContainer(post: GetPost) {
      this.$emit("passPostToPostContainer", post);
    }
  }
});
</script>

<style scoped>
.btn_create {
  justify-content: left;
}
.btn_create_text {
  text-transform: none;
  font-size: 1.3em;
}
.create_post_input {
  font-size: 1.3em;
}
.skeleton {
  position: absolute;
}
</style>

<style>
.skeleton .v-skeleton-loader__avatar {
  width: 60px !important;
  height: 60px !important;
  background: rgb(223, 223, 223) !important;
}
.profile_image {
  z-index: 9999 !important;
}
</style>
