<template>
  <div>
    <v-card>
      <v-row class="px-7 py-3" align="center" no-gutters>
        <v-col cols="2">
          <v-avatar size="60">
            <v-img
              alt="user"
              :src="
                $store.state.userModule.user.imageURI
                  ? $store.state.userModule.user.imageURI
                  : require('@/assets/images/default-avatar.png')
              "
            />
          </v-avatar>
        </v-col>
        <v-col cols="10" class="pr-4">
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
import Vue from "vue";
import CreatePostDialog from "./CreatePostDialog.vue";
import { GetPost } from "@/models/post";

export default Vue.extend({
  name: "CreatePost",

  components: {
    CreatePostDialog
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
</style>
