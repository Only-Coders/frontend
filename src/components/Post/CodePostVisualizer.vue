<template>
  <v-card class="mx-auto mt-10 pb-5" max-width="600">
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
    generatePTag(string: string) {
      string.split("\n").forEach((text) => {
        const tag = document.createElement("p");
        tag.textContent = text;
        (this.$refs.container as HTMLDivElement).appendChild(tag);
      });
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

  created() {
    this.codePost = this.code;
    this.formatCodePost();
  }
});
</script>

<style scoped></style>
