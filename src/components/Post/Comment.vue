<template>
  <div>
    <v-card flat>
      <v-row class="px-3 px-md-7 py-3" align="start" justify-sm="center" no-gutters>
        <v-col cols="2" md="2" lg="2" class="pt-4">
          <AvatarImagePreview
            class="pr-2 pb-0 user_name"
            @click="redirectToProfile"
            :src="imageURI"
            style="cursor: pointer"
            :imageSize="$vuetify.breakpoint.mdAndUp ? 60 : 55"
          ></AvatarImagePreview>
        </v-col>
        <v-col cols="10" md="10" lg="10" class="ma-0 pl-md-0">
          <v-row class="align-center justify-space-between" no-gutters>
            <div class="d-flex align-center">
              <v-col cols="auto" class="pa-0">
                <v-card-title class="pr-2 pb-0 pl-0 user_name" @click="redirectToProfile"
                  >{{ comment.publisher.firstName }} {{ comment.publisher.lastName }}</v-card-title
                >
              </v-col>
              <v-col cols="auto" md="12" lg="12" class="d-flex justify-start pa-0 pt-4">
                <div class="pl-0 pl-md-2 my-auto">
                  <v-img
                    alt="gold-medal"
                    :width="$vuetify.breakpoint.mdAndUp ? '18' : '15'"
                    src="@/assets/images/gold-medal.png"
                  />
                </div>

                <span class="font-weight-light pr-1 pr-md-3 pl-1 text-caption">{{ medals.gold }}</span>

                <div class="my-auto">
                  <v-img
                    alt="silver-medal"
                    :width="$vuetify.breakpoint.mdAndUp ? '18' : '15'"
                    src="@/assets/images/silver-medal.png"
                  />
                </div>
                <span class="font-weight-light pr-1 pr-md-3 pl-1 text-caption">{{ medals.silver }}</span>

                <div class="my-auto">
                  <v-img
                    alt="bronce-medal"
                    :width="$vuetify.breakpoint.mdAndUp ? '18' : '15'"
                    src="@/assets/images/bronce-medal.png"
                  />
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
                  <v-list-item v-if="isMyOwnComment">
                    <v-list-item-icon class="mr-2">
                      <v-icon class="pr-2" color="#5E5E5E"> mdi-pencil </v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>
                      <h3 class="my-auto text-capitalize" style="color: #5e5e5e">
                        {{ $i18n.t("edit") }}
                      </h3>
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item v-if="isMyOwnComment">
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
          <v-card-subtitle class="py-0 pl-0"
            >{{ comment.publisher.currentPosition ? comment.publisher.currentPosition.position : "" }}
            {{ comment.publisher.currentPosition ? $i18n.t("Feed.onPlace") : "" }}
            {{
              comment.publisher.currentPosition && comment.publisher.currentPosition.workplace
                ? comment.publisher.currentPosition.workplace.name
                : ""
            }}
          </v-card-subtitle>
          <v-card-subtitle class="py-0 pl-0">{{ formattedPostDate }}</v-card-subtitle>
        </v-col>
      </v-row>
      <!-- <v-row v-if="!commentIsCode">
        <v-col class="py-0 px-10">
          <component :is="message"></component>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col class="pt-0 pb-0 px-10">
          <CodePostVisualizer :code="comment.message"></CodePostVisualizer>
        </v-col>
      </v-row> -->
      <v-row class="align-center justify-space-between px-4 pt-8 pb-4" no-gutters>
        <div class="d-flex align-center">
          <v-btn-toggle rounded v-model="toggleApprove" color="primary">
            <v-btn
              :loading="isLoadingApprove"
              :disabled="disabledApprove"
              @click="reactToComment('APPROVE')"
              depressed
              rounded
              color="#E0E0E0"
              class="ml-2 mr-1 reaction-btn"
            >
              <v-img alt="approve" width="17" src="@/assets/images/chevron-up.png" />
              <p class="my-auto pl-2 pr-1" style="color: #00cdae">
                {{ approvedAmount }}
              </p>
            </v-btn>
          </v-btn-toggle>

          <v-btn-toggle rounded v-model="toggleReject" color="error">
            <v-btn
              :loading="isLoadingReject"
              :disabled="disabledReject"
              @click="reactToComment('REJECT')"
              depressed
              rounded
              color="#E0E0E0"
              class="ml-1 reaction-btn"
            >
              <v-img alt="reject" width="17" src="@/assets/images/chevron-down.png" />
              <p class="my-auto pl-2" style="color: #ff0f0f">
                {{ rejectedAmount }}
              </p>
            </v-btn>
          </v-btn-toggle>
        </div>
      </v-row>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue, { PropType, VueConstructor } from "vue";
import medalsMixin, { MedalsMixin } from "@/mixins/medals";
import { Medals } from "@/models/medals";
import Prism from "prismjs";
import CodePostVisualizer from "@/components/Post/CodePostVisualizer.vue";
import AvatarImagePreview from "@/components/AvatarImagePreview.vue";
import { Comment } from "@/models/comment";
import { CurrentPosition } from "@/models/currentPosition";
import { Reaction } from "@/models/reaction";
import { Publisher } from "@/models/publisher";
import { ReactionType } from "@/models/Enums/reaction";
import { formatDistance } from "date-fns";

export default (Vue as VueConstructor<Vue & MedalsMixin>).extend({
  name: "Comment",

  mounted() {
    Prism.highlightAll();
  },

  mixins: [medalsMixin],

  props: {
    commentBORRRRRR: Object as PropType<Comment>
  },

  components: { AvatarImagePreview /* CodePostVisualizer */ },

  data: () => ({
    medals: {} as Medals,
    formattedPostDate: "",
    commentIsCode: false,
    rejectedAmount: 0,
    approvedAmount: 0,
    isLoadingApprove: false,
    isLoadingReject: false,
    disabledApprove: false,
    disabledReject: false,
    toggleReject: null as number | null,
    toggleApprove: null as number | null,
    isMyOwnComment: false,
    myReaction: null as ReactionType | null,
    comment: {
      createdAt: "2021-06-17T02:14:23.762+00:00",
      id: "5c9966b3-31b9-4e2f-a8d8-7bdca109dfd8",
      message: "Más un comentario",
      myReaction: "APPROVE" as ReactionType,
      publisher: {
        amountOfMedals: 2,
        canonicalName: "ramiroalves-KWYrE",
        currentPosition: {
          id: "a62818a3-5458-460c-8016-5b5d6deedaf0",
          position: "Desarrollador Frontend Vue",
          since: "2021-06-15T00:00:00.000+00:00",
          until: "",
          workplace: {
            id: "1c5f7173-99d9-477a-a617-5329898594ee",
            name: "Vairix"
          }
        } as CurrentPosition,
        firstName: "Ramiro",
        fullName: "Ramiro Alves",
        imageURI:
          "https://firebasestorage.googleapis.com/v0/b/onlycoders-cc609.appspot.com/o/images%2F1a840f83-215e-40ba-938c-59a217aa4ffa?alt=media&token=c81e194e-3332-4434-a589-31f1c2104f46",
        lastName: "Alves"
      } as Publisher,
      reactions: [
        {
          reaction: "APPROVE",
          quantity: 0
        },
        {
          reaction: "REJECT",
          quantity: 0
        }
      ] as Reaction[]
    }
  }),

  methods: {
    async reactToComment(reaction: ReactionType | null) {
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
      //TODO: await addPostComment(this.post.id, reaction);
      this.isLoadingApprove = false;
      this.isLoadingReject = false;
      this.disabledApprove = false;
      this.disabledReject = false;
    },
    parseReactions() {
      this.approvedAmount =
        this.comment.reactions.find((reaction) => reaction.reaction === ReactionType.APPROVE)?.quantity ?? 0;

      this.rejectedAmount =
        this.comment.reactions.find((reaction) => reaction.reaction === ReactionType.REJECT)?.quantity ?? 0;
      this.myReaction = this.comment.myReaction;
      this.toggleReject = this.myReaction === ReactionType.REJECT ? 0 : null;
      this.toggleApprove = this.myReaction === ReactionType.APPROVE ? 0 : null;
    },
    redirectToProfile() {
      const redirectTo = `/profile/${this.comment.publisher.canonicalName}`;
      if (this.$router.currentRoute.path === redirectTo) {
        window.scroll({
          top: 0,
          left: 0,
          behavior: "smooth"
        });
      } else {
        this.$router.push(redirectTo);
      }
    },
    checkIfCommentIsCode() {
      const regex = /^```(?<lang>[\w\W]*?)\n(?<code>[^`][\W\w]*?)\n```$/gm;
      this.commentIsCode = !!regex.exec(this.comment.message);
    },
    formatPostDate() {
      this.formattedPostDate = formatDistance(new Date(this.comment.createdAt), new Date(), {
        addSuffix: true
      });
    }
    /* formatNewLine() {
      this.comment.message = this.comment.message.replaceAll("\n", "<br/>");
    },
    formatComment(comment: GetPost) {
      this.parseReactions();
      this.checkIfCommentIsCode();
      if (!this.commentIsCode) {
        this.formatNewLine();
      }
      this.formatPostDate();
      this.template = `<div><p class="font-weight-regular text--secondary">${comment.message}</p></div>`;
      this.isMyOwnComment = comment.publisher.canonicalName === this.$store.state.userModule.user.canonicalName;
      this.medals = this.calculateMedals(comment.publisher.amountOfMedals);
    } */
  },

  created() {
    console.log(JSON.stringify(this.comment, null, 2));
  },

  computed: {
    imageURI: {
      get(): string {
        if (this.$store.state.userModule.user.canonicalName == this.comment.publisher.canonicalName) {
          return this.$store.state.userModule.user.imageURI
            ? this.$store.state.userModule.user.imageURI
            : require("@/assets/images/default-avatar.png");
        } else {
          return this.comment.publisher.imageURI
            ? this.comment.publisher.imageURI
            : require("@/assets/images/default-avatar.png");
        }
      }
    }
  }
});
</script>

<style scoped></style>
