<template>
  <v-card class="mx-auto pb-5" flat>
    <v-card-text>
      <div ref="container"></div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import router from "@/router";
import CodeHighlight from "vue-code-highlight/src/CodeHighlight.vue";
import "vue-code-highlight/themes/prism-okaidia.css";
import { GetPostTag } from "@/models/tag";
import { Publisher } from "@/models/post";

const FormattedMentionTags = Vue.component("FormattedMentionsTags", {
  router,

  props: {
    url: String,
    display: String
  },

  template: `
    <router-link :to="url" style="text-decoration: none!important">
      {{display}}
    </router-link>
 `
});

export default Vue.extend({
  name: "CodePostVisualizer",

  /* eslint-disable vue/no-unused-components */
  components: { CodeHighlight },

  props: {
    code: String,
    tags: Array as PropType<GetPostTag[]>,
    mentions: Array as PropType<Publisher[]>
  },

  data: () => ({
    codePost: ""
  }),

  methods: {
    generatePTag(string: string) {
      console.log(string);
      if (string.length <= 1) {
        this.formatTagsAndMentions(string);
      }
    },

    formatTagsAndMentions(string: string) {
      if (this.tags.length !== 0) {
        this.tags.forEach((tag) => {
          const regex = new RegExp(`(?<!\\S)#(?<tag>${tag.canonicalName})(\\s|$)`, "g");
          let currentPosition = 0;
          do {
            const match = regex.exec(string);
            if (match) {
              const tag = document.createElement("span");
              tag.textContent = string.substring(currentPosition, match.index);
              (this.$refs.container as HTMLDivElement).appendChild(tag);
              const instance = new FormattedMentionTags({
                propsData: { display: `#${match.groups?.tag}`, url: `/tag/${match.groups?.tag}` }
              });
              instance.$mount();
              (this.$refs.container as HTMLDivElement).appendChild(instance.$el);
              currentPosition = match.index + match[0].length;
            } else {
              const tag = document.createElement("span");
              tag.textContent = string.substring(currentPosition, string.length);
              (this.$refs.container as HTMLDivElement).appendChild(tag);
              currentPosition = this.codePost.length;
            }
          } while (currentPosition < this.codePost.length);
        });
      }
      if (this.mentions.length !== 0) {
        this.mentions.forEach((mention) => {
          const regex = new RegExp(`((?<!\\S)(?<mention>@${mention.canonicalName}\\w+-\\w{5})(\\s|$))`, "g");

          let currentPosition = 0;
          do {
            const match = regex.exec(string);
            if (match) {
              const tag = document.createElement("span");
              tag.textContent = string.substring(currentPosition, match.index);
              (this.$refs.container as HTMLDivElement).appendChild(tag);

              const instance = new FormattedMentionTags({
                propsData: {
                  display: `${match.groups?.mention}`,
                  url: `/profile/${match.groups?.mention.substring(1, match.groups?.mention.length)}`
                }
              });

              instance.$mount();
              (this.$refs.container as HTMLDivElement).appendChild(instance.$el);
              currentPosition = match.index + match[0].length;
            } else {
              const tag = document.createElement("span");
              tag.textContent = string.substring(currentPosition, string.length);
              (this.$refs.container as HTMLDivElement).appendChild(tag);
              currentPosition = this.codePost.length;
            }
          } while (currentPosition < this.codePost.length);

          var instance = new FormattedMentionTags({
            propsData: {
              display: `@${mention.firstName} ${mention.lastName}`,
              url: `/profile/${mention.canonicalName}`
            }
          });
          instance.$mount();
          (this.$refs.container as HTMLDivElement).appendChild(instance.$el);
        });
      }
    },

    generateCodeTag(code: string, language: string) {
      var ComponentClass = Vue.extend(CodeHighlight);
      var instance = new ComponentClass({
        propsData: { language: language }
      });
      const node = this.$createElement("pre", code);
      instance.$slots.default = [node];
      instance.$mount();
      (this.$refs.container as HTMLDivElement).appendChild(instance.$el);
    },

    formatCodePost() {
      let currentPosition = 0;
      const regex = /^```(?<lang>[\w\W]*?)\n(?<code>[^`][\W\w]*?)\n```$/gm;
      do {
        const match = regex.exec(this.codePost);
        if (match) {
          // console.log(this.codePost, match.index);
          this.generatePTag(this.codePost.substring(currentPosition, match.index));
          this.generateCodeTag(match.groups?.code ?? "", match.groups?.lang ?? "");
          currentPosition = match.index + match[0].length;
        } else {
          this.generatePTag(this.codePost.substring(currentPosition, this.codePost.length));
          currentPosition = this.codePost.length;
        }
      } while (currentPosition < this.codePost.length);
    }
  },

  mounted() {
    this.codePost = this.code;
    this.formatCodePost();
  }
});
</script>

<style scoped></style>
