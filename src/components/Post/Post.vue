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
          <v-row class="align-center justify-space-between" no-gutters>
            <div class="d-flex align-center">
              <v-col cols="auto" class="pa-0">
                <v-card-title class="font-weight-ligth pr-2"
                  >{{ post.publisher.firstName }} {{ post.publisher.lastName }}</v-card-title
                >
              </v-col>
              <v-col cols="3" class="d-flex justify-start pa-0">
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
            </div>
            <v-col cols="auto">
              <v-btn depressed text icon large tile> <v-icon>mdi-dots-horizontal</v-icon> </v-btn>
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
          <v-card-subtitle class="py-0">{{ formattedPostDate }}</v-card-subtitle>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="py-0 px-10 font-weight-regular text--secondary">
          <p>{{ post.message }}</p>
        </v-col>
      </v-row>
      <v-row v-if="post.type === 'IMAGE'">
        <v-col class="pt-2 pb-6 px-10">
          <v-img alt="post-image" :src="post.url" />
        </v-col>
      </v-row>
      <v-row v-if="post.type === 'LINK'">
        <v-col class="pt-2 pb-6 px-10">
          <LinkPreview :url="post.url"></LinkPreview>
        </v-col>
      </v-row>
      <v-row v-if="postIsCode">
        <v-col class="pt-2 pb-6 px-10">
          <CodePostVisualizer :code="post.message"></CodePostVisualizer>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { VueConstructor } from "vue/types/umd";
import { GetPost } from "@/models/post";
import { Medals } from "@/models/medals";
import medalsMixin, { MedalsMixin } from "@/mixins/medals";
import { formatDistance } from "date-fns";
import LinkPreview from "@/components/Post/LinkPreview.vue";
import CodePostVisualizer from "@/components/Post/CodePostVisualizer.vue";

export default (Vue as VueConstructor<Vue & MedalsMixin>).extend({
  name: "Post",

  components: { LinkPreview, CodePostVisualizer },

  mixins: [medalsMixin],

  props: { post: Object as PropType<GetPost> },

  data: () => ({
    createDialog: false,
    medals: {} as Medals,
    formattedPostDate: "",
    postIsCode: false
  }),

  methods: {
    formatPostDate() {
      this.formattedPostDate = formatDistance(new Date(this.post.createdAt), new Date(), {
        addSuffix: true
      });
    },
    checkIfPostIsCode() {
      const regex = /^```(?<lang>[\w\W]*?)\n(?<code>[^`][\W\w]*?)\n```$/gm;
      const match = regex.exec(this.post.message);
      this.postIsCode = match?.length === 0 ? false : true;
    }
  },

  created() {
    this.checkIfPostIsCode();
    this.formatPostDate();
    this.medals = this.calculateMedals(this.post.publisher.amountOfMedals);
  }
});
</script>

<style scoped></style>
