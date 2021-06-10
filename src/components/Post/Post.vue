<template>
  <div>
    <v-card>
      <v-row class="px-7 py-3" align="start" no-gutters>
        <v-col cols="1" md="2" lg="1" class="pt-4">
          <v-avatar :size="$vuetify.breakpoint.mdAndUp ? '60' : '45'">
            <v-img
              alt="user"
              class="font-weight-ligth pr-2 pb-0 user_name"
              @click="redirectToProfile"
              :src="post.publisher.imageURI ? post.publisher.imageURI : require('@/assets/images/default-avatar.png')"
              style="cursor: pointer"
            />
          </v-avatar>
        </v-col>
        <v-col cols="11" md="10" lg="11" class="ma-0 pl-4 pl-md-0">
          <v-row class="align-center justify-space-between" no-gutters>
            <div class="d-flex align-center">
              <v-col cols="auto" class="pa-0">
                <v-card-title class="font-weight-ligth pr-2 pb-0 user_name" @click="redirectToProfile"
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
                  <v-list-item @click="savePostAsFavorite">
                    <v-list-item-icon class="mr-2">
                      <v-icon class="pr-2" color="#5E5E5E">
                        {{ isPostFavorite ? "mdi-bookmark-plus" : "mdi-bookmark-plus-outline" }}
                      </v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>
                      <h3 class="my-auto text-capitalize" style="color: #5e5e5e">
                        {{ isPostFavorite ? $i18n.t("Feed.unsave") : $i18n.t("Feed.save") }}
                      </h3>
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item v-if="isMyOwnPost" @click="toggleDeletePostDialog">
                    <v-list-item-icon class="mr-2">
                      <v-icon class="pr-2" color="#5E5E5E"> mdi-delete </v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>
                      <h3 class="my-auto text-capitalize" style="color: #5e5e5e">
                        {{ $i18n.t("Feed.deletePost") }}
                      </h3>
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item @click.prevent>
                    <v-list-item-icon class="mr-2">
                      <v-icon class="pr-2" color="#5E5E5E"> mdi-alert-octagon </v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>
                      <h3 class="my-auto text-capitalize" style="color: #5e5e5e">{{ $i18n.t("Feed.report") }}</h3>
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
        <v-col class="pt-0 pb-0 px-10">
          <CodePostVisualizer :code="post.message"></CodePostVisualizer>
        </v-col>
      </v-row>
      <v-row v-if="post.type === 'IMAGE'">
        <v-col class="pt-0 pb-6 px-10 d-flex justify-center">
          <v-img alt="post-image" max-width="30vw" max-height="60vh" :src="post.url" />
        </v-col>
      </v-row>
      <v-row v-if="post.type === 'LINK'">
        <v-col class="pt-0 pb-6 px-10">
          <LinkPreview :url="post.url"></LinkPreview>
        </v-col>
      </v-row>
      <v-row v-if="post.type === 'FILE'">
        <v-col class="pt-0 pb-6 px-10">
          <a :href="post.url" download>
            <FileType :isVisualizingPost="true" :name="fileName"></FileType>
          </a>
        </v-col>
      </v-row>
      <v-row class="align-center justify-space-between px-4 pt-8 pb-4" no-gutters>
        <div class="d-flex align-center">
          <v-btn-toggle rounded v-model="toggleApprove" color="primary">
            <v-btn
              :loading="isLoadingApprove"
              :disabled="disabledApprove"
              @click="reactToPost('APPROVE')"
              depressed
              rounded
              color="#E0E0E0"
              class="ml-2 mr-1 reaction-btn"
            >
              <v-img alt="approve" width="20" src="@/assets/images/chevron-up.png" />
              <p class="my-auto pl-2 pr-1" style="color: #00cdae">
                {{ approvedAmount }}
              </p>
            </v-btn>
          </v-btn-toggle>

          <v-btn-toggle rounded v-model="toggleReject" color="error">
            <v-btn
              :loading="isLoadingReject"
              :disabled="disabledReject"
              @click="reactToPost('REJECT')"
              depressed
              rounded
              color="#E0E0E0"
              class="ml-1 reaction-btn"
            >
              <v-img alt="reject" width="20" src="@/assets/images/chevron-down.png" />
              <p class="my-auto pl-2" style="color: #ff0f0f">
                {{ rejectedAmount }}
              </p>
            </v-btn>
          </v-btn-toggle>
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
    <DeletePostDialog
      v-model="showDeletePostDialog"
      :value="showDeletePostDialog"
      @deletePost="toggleDeletePostDialog"
      :postId="this.post.id"
    ></DeletePostDialog>
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
import FileType from "@/components/Post/FileType.vue";
import CodePostVisualizer from "@/components/Post/CodePostVisualizer.vue";
import { postSavePostAsFavorite, deletePostFromFavorite } from "@/services/user";
import { addPostReaction } from "@/services/post";
import notificationsMixin, { NotificationMixin } from "@/mixins/notifications";
import DeletePostDialog from "@/components/Post/DeletePostDialog.vue";
import { ReactionType } from "@/models/Enums/reaction";

export default (Vue as VueConstructor<Vue & MedalsMixin & NotificationMixin>).extend({
  name: "Post",

  components: { LinkPreview, CodePostVisualizer, FileType, DeletePostDialog },

  mixins: [medalsMixin, notificationsMixin],

  props: { post: Object as PropType<GetPost>, isInFavoritesTab: Boolean },

  data: () => ({
    createDialog: false,
    medals: {} as Medals,
    formattedPostDate: "",
    postIsCode: false,
    isPostFavorite: false,
    template: "",
    fileName: "",
    isMyOwnPost: false,
    showDeletePostDialog: false,
    myReaction: null as ReactionType | null,
    rejectedAmount: 0,
    approvedAmount: 0,
    isLoadingApprove: false,
    isLoadingReject: false,
    disabledApprove: false,
    disabledReject: false,
    toggleReject: null as number | null,
    toggleApprove: null as number | null
  }),

  computed: {
    message: {
      get(): { template: string } {
        return { template: this.template };
      }
    }
  },

  methods: {
    toggleDeletePostDialog(postId: string) {
      this.showDeletePostDialog = true;
      this.$emit("deletePost", postId);
    },
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
        this.success("", this.$i18n.t("Feed.unsavedFavorite").toString());
        if (this.isInFavoritesTab) {
          this.$emit("passDeletedPostAsFavorite", this.post.id);
        }
      } else {
        await postSavePostAsFavorite(this.post.id);
        this.isPostFavorite = !this.isPostFavorite;
        this.success("", this.$i18n.t("Feed.savedFavorite").toString(), 2000);
      }
    },
    escapeRegex(string: string) {
      return string.replace(/[+-/\\^$*+?.()|[\]{}]/g, "\\$&");
    },
    formatTagsAndMentions() {
      if (this.post.tags.length !== 0) {
        this.post.tags.forEach((tag) => {
          const regex = new RegExp(`#${this.escapeRegex(tag.displayName)}`, "g");
          this.post.message = this.post.message.replace(
            regex,
            `<router-link to="/tag/${tag.canonicalName}" class="post__mention-tag">#${tag.displayName} </router-link>`
          );
        });
      }
      if (this.post.mentions.length !== 0) {
        this.post.mentions.forEach((mention) => {
          const regex = new RegExp(`@${mention.canonicalName}`, "g");
          this.post.message = this.post.message.replace(
            regex,
            `<router-link to="/profile/${mention.canonicalName}" class="post__mention-tag">@${mention.firstName} ${mention.lastName} </router-link>`
          );
        });
      }
    },
    getFileName() {
      this.fileName = decodeURIComponent(
        this.post.url.match(/files%2F(?<fileName>\S+)\?alt=/)?.groups?.fileName ?? "File"
      );
    },
    formatNewLine() {
      this.post.message = this.post.message.replaceAll("\n", "<br/>");
    },
    parseReactions() {
      this.approvedAmount =
        this.post.reactions.find((reaction) => reaction.reaction === ReactionType.APPROVE)?.quantity ?? 0;

      this.rejectedAmount =
        this.post.reactions.find((reaction) => reaction.reaction === ReactionType.REJECT)?.quantity ?? 0;
      this.myReaction = this.post.myReaction;
      this.toggleReject = this.myReaction === ReactionType.REJECT ? 0 : null;
      this.toggleApprove = this.myReaction === ReactionType.APPROVE ? 0 : null;
    },
    async reactToPost(reaction: ReactionType | null) {
      this.isLoadingApprove = reaction === ReactionType.APPROVE;
      this.isLoadingReject = !this.isLoadingApprove;

      this.disabledApprove = this.isLoadingReject;
      this.disabledReject = this.isLoadingApprove;

      if (reaction === this.myReaction) {
        if (reaction === ReactionType.APPROVE) {
          this.approvedAmount--;
        } else {
          this.rejectedAmount--;
        }
        reaction = null;
      } else {
        if (reaction === ReactionType.APPROVE) {
          this.approvedAmount++;
          if (this.myReaction) {
            this.rejectedAmount--;
          }
        } else {
          this.rejectedAmount++;
          if (this.myReaction) {
            this.approvedAmount--;
          }
        }
      }
      this.myReaction = reaction;
      this.toggleReject = this.myReaction === ReactionType.REJECT ? 0 : null;
      this.toggleApprove = this.myReaction === ReactionType.APPROVE ? 0 : null;
      await addPostReaction(this.post.id, reaction);
      this.isLoadingApprove = false;
      this.isLoadingReject = false;
      this.disabledApprove = false;
      this.disabledReject = false;
    },
    redirectToProfile() {
      const redirectTo = `/profile/${this.post.publisher.canonicalName}`;
      if (this.$router.currentRoute.path === redirectTo) {
        window.scroll({
          top: 0,
          left: 0,
          behavior: "smooth"
        });
      } else {
        this.$router.push(redirectTo);
      }
    }
  },

  created() {
    this.parseReactions();
    this.checkIfPostIsCode();
    if (!this.postIsCode) {
      this.formatNewLine();
    }
    this.formatPostDate();
    this.formatTagsAndMentions();
    this.template = `<div><p class="font-weight-regular text--secondary">${this.post.message}</p></div>`;
    this.isMyOwnPost = this.post.publisher.canonicalName === this.$store.state.userModule.user.canonicalName;
    this.medals = this.calculateMedals(this.post.publisher.amountOfMedals);
    this.isPostFavorite = this.post.isFavorite;
    if (this.post.type === "FILE") {
      this.getFileName();
    }
  }
});
</script>

<style>
.post__mention-tag {
  text-decoration: none !important;
  color: #2780c4 !important;
}
.user_name {
  cursor: pointer;
}
.reaction-btn {
  height: 36px !important;
  background: transparent !important;
}
.theme--light.v-btn.v-btn--disabled:not(.v-btn--flat):not(.v-btn--text):not(.v-btn-outlined) {
  background: transparent !important;
}
</style>
