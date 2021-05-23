<template>
  <div>
    <v-card>
      <v-row class="px-6 py-3" align="center">
        <v-col cols="2">
          <v-avatar size="70">
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
        <v-col cols="10" class="pr-14">
          <!-- <v-btn
            class="pa-2 pl-5 btn_create"
            block
            outlined
            height="60"
            color="#888888"
            x-large
            @click.stop="createDialog = true"
          >
            <span class="btn_create_text">Crear publicación</span>
          </v-btn> -->
          <v-text-field
            class="create_post_input"
            placeholder="Crear publicación"
            autocomplete="off"
            @click.stop="createDialog = true"
            readonly
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card>

    <CreatePostDialog :visible="createDialog" @close="createDialog = false"></CreatePostDialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import CreatePostDialog from "./CreatePostDialog.vue";

export default Vue.extend({
  name: "CreatePost",

  components: { CreatePostDialog },

  data: () => ({
    createDialog: false
  }),

  methods: {}
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
