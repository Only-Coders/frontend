<template>
  <v-dialog v-model="show" transition="dialog-top-transition" max-width="800" height="90vh">
    <v-card class="d-flex flex-column">
      <v-toolbar color="primary" dark>
        <h2 class="ml-4">Crear publicación</h2>
        <v-spacer></v-spacer>
        <v-btn class="mr-2 mt-1" icon @click.stop="show = false">
          <v-icon size="27"> mdi-close </v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text>
        <v-textarea
          placeholder="Escribe un mensaje..."
          v-model="text"
          auto-grow
          maxlength="2048"
          class="mt-4"
          flat
          solo
          counter
        ></v-textarea>
        <div v-if="profileImageToShow">
          <v-btn class="btn_cross mr-2 mt-1" fab small absolute color="secondary" @click="deleteImage">
            <v-icon size="22" color="white"> mdi-close </v-icon>
          </v-btn>
          <v-img v-if="profileImageToShow" :src="profileImageToShow" />
        </div>
      </v-card-text>

      <v-divider></v-divider>
      <v-card-actions class="my-1">
        <input type="file" ref="imageUp" style="display: none" @change="previewImage" />
        <v-btn :disabled="!enabledButtons" icon class="mx-2" large @click="$refs.imageUp.click()">
          <v-icon size="30"> mdi-image </v-icon>
        </v-btn>

        <v-btn :disabled="!enabledButtons" icon class="mx-2" large>
          <v-icon size="30"> mdi-code-braces </v-icon>
        </v-btn>
        <v-btn :disabled="!enabledButtons" icon class="mx-2" large>
          <v-icon size="30"> mdi-file </v-icon>
        </v-btn>

        <v-divider vertical class="ml-2"></v-divider>
        <v-combobox
          v-model="selectedPrivacy"
          :items="privacyOptions"
          label="Privacy"
          rounded
          outlined
          dense
          class="privacy_combo ml-6"
          hide-details
          prepend-inner-icon="mdi-lock-outline"
        ></v-combobox>

        <v-spacer></v-spacer>
        <!-- <v-btn class="mx-10" fab dark color="primary" @click="createPost" @click.stop="show = false">
          <v-icon dark> mdi-send </v-icon>
        </v-btn> -->
        <v-btn color="primary" depressed class="mr-3" :disabled="enabledButtons && text == ''">Publicar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "CreatePostDialog",

  components: {},

  props: { visible: Boolean },

  data: () => ({
    profileImageData: null as File | null,
    profileImageToShow: "",
    enabledButtons: true,
    text: "",
    privacyOptions: ["Cualquiera", "Solo contactos"],
    selectedPrivacy: ""
  }),

  methods: {
    handleShowFileSelector() {
      (this.$refs.input1 as HTMLButtonElement).click();
    },
    previewImage(event: Event) {
      const target = event.target as HTMLInputElement;
      if (target.files && (target.files[0]["type"] === "image/jpeg" || target.files[0]["type"] === "image/png")) {
        this.profileImageData = target.files[0];
        this.profileImageToShow = URL.createObjectURL(target.files[0]);
        this.enabledButtons = false;
      }
    },
    deleteImage() {
      this.enabledButtons = true;
      this.profileImageToShow = "";
      this.profileImageData = null;
    }
  },

  computed: {
    show: {
      get() {
        return this.visible;
      },
      set(value) {
        if (!value) {
          this.$emit("close");
        }
      }
    }
  }
});
</script>

<style lang="scss" scoped>
.v-card__text {
  flex: 1 1 auto;
}
.v-toolbar {
  flex: 0;
}
.v-textarea {
  font-size: 1.2rem;
}
.btn_cross {
  color: white;
  right: 0;
}
.privacy_combo {
  border-radius: 50px !important;
  max-width: 220px;
}
</style>
