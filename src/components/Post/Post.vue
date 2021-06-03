<template>
  <div>
    <v-card>
      <v-row class="px-7 py-3" align="start" no-gutters>
        <v-col cols="1" md="2" lg="1" class="pt-4">
          <v-avatar :size="$vuetify.breakpoint.mdAndUp ? '60' : '45'">
            <v-img
              alt="user"
              :src="post.publisher.imageURI ? post.publisher.imageURI : require('@/assets/images/default-avatar.png')"
            />
          </v-avatar>
        </v-col>
        <v-col cols="11" md="10" lg="11" class="ma-0 pl-4 pl-md-0">
          <v-row class="align-center justify-space-between" no-gutters>
            <div class="d-flex align-center">
              <v-col cols="auto" class="pa-0">
                <v-card-title class="font-weight-ligth pr-2 pb-0"
                  >{{ post.publisher.firstName }} {{ post.publisher.lastName }}</v-card-title
                >
              </v-col>
              <v-col cols="auto" class="d-flex justify-start pa-0 pt-4">
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
              <v-menu bottom left offset-x transition="slide-y-transition">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn dark icon v-bind="attrs" v-on="on">
                    <v-icon color="#5E5E5E" size="30">mdi-dots-horizontal</v-icon>
                  </v-btn>
                </template>

                <v-list>
                  <v-list-item>
                    <v-list-item-title
                      ><v-btn depressed class="pa-0" @click="savePostAsFavorite">
                        <v-icon class="pr-2" color="#5E5E5E">{{
                          isPostFavorite ? "mdi-bookmark-plus" : "mdi-bookmark-plus-outline"
                        }}</v-icon>
                        <h3 class="my-auto text-capitalize" style="color: #5e5e5e">
                          {{ isPostFavorite ? $i18n.t("Feed.unsave") : $i18n.t("Feed.save") }}
                        </h3>
                      </v-btn>
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title
                      ><v-btn depressed class="pa-0">
                        <v-icon class="pr-2" color="#5E5E5E">mdi-alert-octagon</v-icon>
                        <h3 class="my-auto text-capitalize" style="color: #5e5e5e">{{ $i18n.t("Feed.report") }}</h3>
                      </v-btn>
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-col>
          </v-row>
          <v-card-subtitle class="py-0"
            >{{ post.publisher.currentPosition ? post.publisher.currentPosition.position : "" }}
            {{ post.publisher.currentPosition ? $i18n.t("Feed.onPlace") : "" }}
            {{
              post.publisher.currentPosition && post.publisher.currentPosition.workplace
                ? post.publisher.currentPosition.workplace.name
                : ""
            }}
          </v-card-subtitle>
          <v-card-subtitle class="py-0">{{ formattedPostDate }}</v-card-subtitle>
        </v-col>
      </v-row>
      <v-row v-if="!postIsCode">
        <v-col class="py-0 px-10">
          <component :is="message"></component>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col class="pt-2 pb-0 px-10">
          <CodePostVisualizer :code="post.message"></CodePostVisualizer>
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
      <v-row class="align-center justify-space-between px-4 pt-8 pb-4" no-gutters>
        <div class="d-flex align-center">
          <v-col cols="auto" class="pa-0">
            <v-btn depressed rounded outlined color="#E0E0E0">
              <v-img alt="approve" width="25" src="@/assets/images/chevron-up.png" />
              <p class="my-auto" style="color: #00cdae">
                {{ post.reactions ? post.reactions[0].quantity : 0 }}
              </p>
            </v-btn>
          </v-col>
          <v-col cols="auto" class="pa-0">
            <v-btn depressed rounded outlined color="#E0E0E0">
              <v-img alt="reject" width="25" src="@/assets/images/chevron-down.png" />
              <p class="my-auto" style="color: #ff0f0f">
                {{ post.reactions ? post.reactions[1].quantity : 0 }}
              </p>
            </v-btn>
          </v-col>
        </div>
        <v-col cols="auto">
          <v-btn depressed rounded outlined color="#E0E0E0"
            ><p class="font-weight-regular text--secondary text-capitalize my-auto">
              {{ post.commentQuantity ? post.commentQuantity : 0 }} {{ $i18n.t("Feed.comments") }}
            </p></v-btn
          >
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
import { postSavePostAsFavorite, deletePostFromFavorite } from "@/services/user";
import notificationsMixin, { NotificationMixin } from "@/mixins/notifications";

export default (Vue as VueConstructor<Vue & MedalsMixin & NotificationMixin>).extend({
  name: "Post",

  components: { LinkPreview, CodePostVisualizer },

  mixins: [medalsMixin, notificationsMixin],

  props: { post: Object as PropType<GetPost> },

  data: () => ({
    createDialog: false,
    medals: {} as Medals,
    formattedPostDate: "",
    postIsCode: false,
    isPostFavorite: false,
    template: ""
  }),

  computed: {
    message: {
      get(): { template: string } {
        return { template: this.template };
      }
    }
  },

  methods: {
    formatPostDate() {
      this.formattedPostDate = formatDistance(new Date(this.post.createdAt), new Date(), {
        addSuffix: true
      });
    },
    checkIfPostIsCode() {
      const regex = /^```(?<lang>[\w\W]*?)\n(?<code>[^`][\W\w]*?)\n```$/gm;
      this.postIsCode = !!regex.exec(this.post.message);
    },
    async savePostAsFavorite() {
      if (this.isPostFavorite) {
        await deletePostFromFavorite(this.post.id);
        this.isPostFavorite = !this.isPostFavorite;
        this.success("", this.$i18n.t("Onboarding.Feed.savedFavorite").toString(), 2000);
      } else {
        await postSavePostAsFavorite(this.post.id);
        this.isPostFavorite = !this.isPostFavorite;
        this.error("Error", this.$i18n.t("Onboarding.Feed.errorFavorite").toString());
      }
    },
    formatTagsAndMentions() {
      if (this.post.tags.length !== 0) {
        this.post.tags.forEach((tag) => {
          const regex = new RegExp(`(?<!\\S)#${tag.canonicalName}(\\s|$)`, "g");
          this.post.message = this.post.message.replace(
            regex,
            `<router-link to="/tag/${tag.canonicalName}" style="text-decoration: none!important">#${tag.displayName}</router-link>`
          );
        });
      }
      if (this.post.mentions.length !== 0) {
        this.post.mentions.forEach((mention) => {
          const regex = new RegExp(`@${mention.canonicalName}`, "g");
          this.post.message = this.post.message.replace(
            regex,
            `<router-link to="/profile/${mention.canonicalName}" style="text-decoration: none!important">@${mention.firstName} ${mention.lastName}</router-link>`
          );
        });
      }
    }
  },

  created() {
    this.checkIfPostIsCode();
    this.formatPostDate();
    this.formatTagsAndMentions();
    this.template = `<div><p class="font-weight-regular text--secondary">${this.post.message}</p></div>`;
    this.medals = this.calculateMedals(this.post.publisher.amountOfMedals);
    this.isPostFavorite = this.post.isFavorite;
  }
});
</script>

<style scoped></style>
