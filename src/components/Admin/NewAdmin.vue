<template>
  <v-dialog :value="value" @input="close" width="auto" max-width="650">
    <v-card class="add-admin">
      <v-card-title class="justify-center"> Agregar Admin </v-card-title>
      <v-card-text class="text-center px-16">
        <v-avatar class="my-4" size="100" color="primary" @click="selectImage">
          <v-icon v-if="!imagePreview" dark size="42">mdi-camera</v-icon>
          <v-img v-else :src="imagePreview"></v-img>
          <input type="file" ref="avatar" style="display: none" @change="previewImage" accept="image/*" lazy-src />
        </v-avatar>
        <v-btn icon class="mt-2" absolute v-if="imagePreview" @click="removeImage">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-form ref="add-admin" lazy-validation>
          <v-text-field
            v-model="admin.firstName"
            :rules="[rules.required]"
            v-bind="{ ...inputProps }"
            :label="$i18n.t('name')"
          ></v-text-field>
          <v-text-field
            v-model="admin.lastName"
            :rules="[rules.required]"
            v-bind="{ ...inputProps }"
            :label="$i18n.t('lastName')"
          ></v-text-field>
          <v-text-field
            v-model="admin.email"
            :rules="[rules.required]"
            v-bind="{ ...inputProps }"
            :label="$i18n.t('email')"
            suffix="@mail.onlycoders.tech"
          ></v-text-field>
        </v-form>
      </v-card-text>

      <v-card-actions class="mt-8 justify-end">
        <v-btn depressed text @click="close">{{ $i18n.t("cancel") }}</v-btn>
        <v-btn depressed color="primary" :loading="isLoading" @click="createAdmin">{{ $i18n.t("add") }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue, { VueConstructor } from "vue";
import { addAdmin } from "@/services/admin";
import { Admin } from "@/models/admin";
import ruleMixin, { RuleMixin } from "@/mixins/rules";
import inputPropsMixin, { InputPropsMixin } from "@/mixins/inputProps";
import Compressor from "compressorjs";
import notificationsMixin, { NotificationMixin } from "@/mixins/notifications";
import { storage } from "@/plugins/firebaseInit";
import { uuid } from "@/plugins/uuid";

export default (Vue as VueConstructor<Vue & NotificationMixin & RuleMixin & InputPropsMixin>).extend({
  name: "NewAdmin",

  mixins: [inputPropsMixin, ruleMixin, notificationsMixin],

  props: {
    value: Boolean
  },

  data: () => ({
    isLoading: false,
    admin: {
      firstName: "",
      lastName: "",
      email: "",
      imageURI: ""
    } as Admin,
    imageFile: null as File | null,
    imagePreview: ""
  }),

  methods: {
    close(): void {
      this.$emit("input");
    },

    previewImage(event: Event) {
      const target = event.target as HTMLInputElement;
      if (target.files) {
        this.imageFile = target.files[0];
        this.imagePreview = URL.createObjectURL(target.files[0]);
      }
    },

    selectImage() {
      (this.$refs.avatar as HTMLInputElement).click();
    },

    removeImage() {
      this.imageFile = null;
      this.imagePreview = "";
    },

    async uploadToFireStorage() {
      this.admin.imageURI = await new Promise<string>((resolve, reject) => {
        new Compressor(this.imageFile as File, {
          quality: 0.2,
          async success(result: File) {
            const fileName = uuid();
            const snapshot = await storage.ref(`images/${fileName}`).put(result);
            const profileImageUrl = await snapshot.ref.getDownloadURL();
            resolve(profileImageUrl);
          },
          error(err) {
            reject(err);
          }
        });
      });
    },

    async createAdmin(): Promise<void> {
      if ((this.$refs["add-admin"] as HTMLFormElement).validate()) {
        try {
          this.isLoading = true;
          if (this.imageFile) await this.uploadToFireStorage();
          const admin = { ...this.admin };
          admin.email = this.admin.email + "@mail.onlycoders.tech";
          await addAdmin(admin);
          this.success(
            this.$i18n.t("Admin.addAdmin").toString(),
            this.$i18n.t("Admin.addAdminMessage").toString(),
            3000
          );
          this.close();
        } catch (error) {
          console.log(error);
        } finally {
          this.isLoading = false;
        }
      }
    }
  }
});
</script>

<style scoped>
.add-admin {
  border-top: 4px solid var(--v-primary-base);
}
</style>
