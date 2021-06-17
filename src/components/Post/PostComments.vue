<template>
  <div>
    <v-row>
      <!-- <v-col cols="10" md="8" lg="5" v-for="comment in comments" :key="comment.id">
        <CommentComponent v-bind="{ ...comment }"></CommentComponent>
      </v-col> -->
      <!-- <CommentComponent v-bind="{ ...comments[0] }"></CommentComponent> -->
      <CommentComponent v-bind="{ ...comment }"></CommentComponent>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { Comment } from "@/models/comment";
import CommentComponent from "@/components/Post/Comment.vue";

export default Vue.extend({
  name: "PostComments",

  props: { comments: Object as PropType<Comment[]> },

  data: () => ({
    comment: {
      createdAt: "2021-06-17T02:14:23.762+00:00",
      id: "5c9966b3-31b9-4e2f-a8d8-7bdca109dfd8",
      message: "Más un comentario",
      myReaction: null,
      publisher: {
        amountOfMedals: 2,
        canonicalName: "ramiroalves-KWYrE",
        currentPosition: {
          id: "a62818a3-5458-460c-8016-5b5d6deedaf0",
          position: "Desarrollador Frontend Vue",
          since: "2021-06-15T00:00:00.000+00:00",
          until: null,
          workplace: {
            id: "1c5f7173-99d9-477a-a617-5329898594ee",
            name: "Vairix"
          }
        },
        firstName: "Ramiro",
        fullName: "Ramiro Alves",
        imageURI:
          "https://firebasestorage.googleapis.com/v0/b/onlycoders-cc609.appspot.com/o/images%2F1a840f83-215e-40ba-938c-59a217aa4ffa?alt=media&token=c81e194e-3332-4434-a589-31f1c2104f46",
        lastName: "Alves"
      },
      reactions: [
        {
          reaction: "APPROVE",
          quantity: 0
        },
        {
          reaction: "REJECT",
          quantity: 0
        }
      ]
    }
  }),

  components: {
    CommentComponent
  },

  created() {
    //console.log("comment: " + JSON.stringify(this.comment, null, 2));
  }
});
</script>

<style scoped></style>
