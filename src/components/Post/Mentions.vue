<template>
  <div>
    <Mentionable
      :keys="['#', '@']"
      :items="items"
      offset="6"
      filtering-disabled
      @open="atOpen"
      @search="loadItems($event)"
      @apply="addMention"
    >
      <v-textarea
        :placeholder="$i18n.t('typeMessage')"
        v-model="post.message"
        auto-grow
        maxlength="2048"
        class="mt-4"
        flat
        solo
        counter
        no-resize
        @paste="onPaste"
      ></v-textarea>

      <template #no-result>
        <div class="dim">{{ loading ? $i18n.t("CreatePost.loading") : $i18n.t("CreatePost.noResults") }}</div>
      </template>

      <template #item-#="{ item }">
        <div class="issue">
          <span class="dim">
            {{ item.label }}
          </span>
        </div>
        <v-divider></v-divider>
      </template>

      <template #item-@="{ item }">
        <div class="issue">
          <v-row align="center" justify="center">
            <v-col cols="2" class="d-flex justify-center">
              <v-avatar size="30">
                <v-img
                  alt="user"
                  :lazy-src="require('@/assets/images/default-avatar.png')"
                  :src="item.imageURI ? item.imageURI : require('@/assets/images/default-avatar.png')"
                >
                </v-img>
              </v-avatar>
            </v-col>
            <v-spacer />
            <v-col cols="9" class="user-name ml-10">
              <p class="dim">
                {{ item.label }}
              </p>
            </v-col>
          </v-row>
        </div>
        <v-divider></v-divider>
      </template>
    </Mentionable>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Mentionable } from "vue-mention";
import { getUser } from "@/services/user";
import { getTag } from "@/services/tag";
import { Post } from "@/models/post";

type Item = {
  value: string;
  label: string;
  imageURI: string;
};

export default Vue.extend({
  components: {
    Mentionable
  },

  props: {
    post: Object as PropType<Post>
  },

  data: () => ({
    items: [] as Item[],
    users: [] as Item[],
    tags: [] as Item[],
    loading: false,
    selectedKey: ""
  }),

  methods: {
    async loadItems(searchText = "") {
      this.loading = true;
      if (this.selectedKey == "@") {
        this.items = (await getUser({ partialName: searchText, page: 0, size: 5 })).content.map((user) => {
          return { value: user.canonicalName, label: user.fullName, imageURI: user.imageURI };
        });
      } else {
        this.items = (await getTag(searchText, 5)).content.map((tag) => {
          return {
            value: tag.name ? tag.name : tag.canonicalName,
            label: tag.name ? tag.name : tag.canonicalName,
            imageURI: ""
          };
        });
      }
      this.loading = false;
    },
    addMention(item: Item) {
      if (this.selectedKey == "@") {
        this.users.push(item);
        this.post.mentionCanonicalNames.push(item.value);
        this.post.mentionsDictionary[item.value] = item.label;
        this.post.message = this.post.message.replace("@" + item.value, "@" + item.label);
      }
    },
    async atOpen(key: string) {
      this.selectedKey = key;
      await this.loadItems();
    },
    onPaste(evt: ClipboardEvent) {
      if (evt.clipboardData) {
        const items = evt.clipboardData.items;
        let contentIsImage = false;
        for (let i = 0; i < items.length; i++) {
          if (items[i].type.indexOf("image") == -1) continue; //skipif not imge
          const blob = items[i].getAsFile();
          contentIsImage = true;
          this.$emit("addPicture", blob);
        }
        if (!contentIsImage) {
          this.$emit("addLink", evt.clipboardData.getData("text"), evt);
        }
      }
    }
  }
});
</script>

<style scoped>
.user-name {
  display: flex !important;
  align-items: center !important;
  flex-direction: row !important;
}

.issue {
  padding: 10px 16px;
  cursor: pointer;
}

.mention-selected .issue {
  background: #bebebe70;
  color: white !important;
  font-family: sans-serif !important;
  border-radius: 2px;
}

.issue {
  font-family: sans-serif;
  font-weight: 700;
}

.dim {
  color: rgb(27, 27, 27);
}
</style>

<style>
.tooltip {
  background: white !important;
  z-index: 99999 !important;
  border-radius: 4px !important;
  display: visible !important;
  width: fit-content !important;
}
</style>
