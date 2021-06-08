<template>
  <v-card class="mx-auto pb-5" flat>
    <v-card-text>
      <div ref="container"></div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";

import CodeHighlight from "vue-code-highlight/src/CodeHighlight.vue";
import "vue-code-highlight/themes/prism-okaidia.css";

export default Vue.extend({
  name: "CodePostVisualizer",

  /* eslint-disable vue/no-unused-components */
  components: { CodeHighlight },

  props: { code: String },

  data: () => ({
    codePost: ""
  }),

  methods: {
    routerLinkToHref(htmlText: string) {
      htmlText.split("</router-link>").forEach((potentialLink) => {
        const regex = /(?<attribute>\w+?)="(?<value>.*?)"|>(?<text>.*$)/gm;
        const htmlAnchor = document.createElement("a");
        const matches = potentialLink.matchAll(regex);
        Array.from(matches).forEach((match) => {
          const attribute = match?.groups?.attribute ?? "";
          const value = match?.groups?.value ?? "";
          const text = match?.groups?.text ?? "";

          if (attribute) {
            if (attribute === "to") {
              htmlAnchor.setAttribute("href", value);
            } else {
              htmlAnchor.setAttribute(attribute, value);
            }
          }
          if (text) {
            htmlAnchor.append(text);
          }
        });
        (this.$refs.container as HTMLDivElement).appendChild(htmlAnchor);
      });
    },
    generatePTag(string: string) {
      const tag = document.createElement("p");
      string.split("\n").forEach((text, index, total) => {
        if (text.includes("router-link")) {
          this.routerLinkToHref(text);
        } else if (text) {
          tag.append(text);
          if (total[index + 1]) {
            tag.appendChild(document.createElement("br"));
          }
        }
      });
      (this.$refs.container as HTMLDivElement).appendChild(tag);
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
