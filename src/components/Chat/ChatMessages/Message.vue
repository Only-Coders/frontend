<template functional>
  <div class="chat-message" :class="props.isMine ? 'mine' : 'his'">
    {{ props.message.text }}
    <span class="chat-message__date">{{ props.date }}</span>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { Message } from "@/store/modules/chat";

export default Vue.extend({
  name: "Message",
  props: {
    message: Object as PropType<Message>,
    isMine: Boolean,
    date: String
  }
});
</script>

<style scoped lang="scss">
.chat-message {
  background-image: linear-gradient(
    var(--v-primary-lighten1) 0%,
    var(--v-primary-base) 20%,
    var(--v-primary-darken3) 100%
  );
  background-attachment: fixed;
  position: relative;
  padding: 0.7em 1em 1em;
  color: white;
  width: fit-content;
  max-width: 40ch;

  .chat-message__date {
    font-size: 11px;
    position: absolute;
    bottom: 0px;
    right: 4px;
    color: #f5f5f5;
  }
}

.mine {
  margin-left: auto;
  border-radius: 0.5em 0.5em 0 0.5em;
  margin-bottom: 0.5em;
  & + .his {
    margin-top: 0.5em;
  }
}

.his {
  margin-right: auto;
  border-radius: 0.5em 0.5em 0.5em 0;
  margin-bottom: 0.5em;
  & + .mine {
    margin-top: 0.5em;
  }
}
</style>
