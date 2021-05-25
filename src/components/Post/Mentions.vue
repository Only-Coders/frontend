<template>
  <div class="demo">
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
        placeholder="Escribe un mensaje..."
        v-model="post.message"
        auto-grow
        maxlength="2048"
        class="mt-4"
        flat
        solo
        counter
        @paste="onPaste"
      ></v-textarea>

      <template #no-result>
        <div class="dim">
          {{ loading ? "Loading..." : "No result" }}
        </div>
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
            <v-col cols="4">
              <v-avatar size="30">
                <v-img
                  alt="user"
                  :src="item.imageURI ? item.imageURI : require('@/assets/images/default-avatar.png')"
                />
              </v-avatar>
            </v-col>

            <v-col cols="6" class="user-name">
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
        this.items = (await getUser(searchText, 0, 5)).content.map((user) => {
          return { value: user.canonicalName, label: user.firstName, imageURI: user.imageURI };
        });
      } else {
        this.items = (await getTag(searchText, 5)).content.map((tag) => {
          return { value: tag.canonicalName, label: tag.canonicalName, imageURI: "" };
        });
      }
      this.loading = false;
    },
    addMention(item: Item, key: string) {
      key == "#" ? this.tags.push(item) : this.users.push(item);
      key == "#" ? this.post.tagNames.push(item.value) : this.post.mentionCanonicalNames.push(item.value);
    },
    async atOpen(key: string) {
      this.selectedKey = key;
      await this.loadItems();
    },
    onPaste(evt: ClipboardEvent) {
      if (evt.clipboardData) {
        console.log("En mentions: " + this.post.message);
        this.$emit("addLink", evt.clipboardData.getData("text"), evt);
      }
    }
  }
});
</script>

<style scoped>
.demo {
  margin: 24px 0;
}

.user-name {
  display: flex !important;
  align-items: center !important;
}

.issue {
  padding: 10px 16px;
  cursor: pointer;
}

.mention-selected .issue {
  background: var(--v-secondary-base);
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
}
</style>
