<template>
  <div style="position: relative; margin-top: 85px; height: 765px">
    <v-row class="pt-sm-0 pt-16">
      <v-col align="center">
        <h2 class="mb-4">{{ $i18n.t("Onboarding.SuggestedContacts.title") }}</h2>
        <p>
          {{ $i18n.t("Onboarding.SuggestedContacts.text") }}
        </p>

        <!--  <v-row align="center" justify="center" class="mt-16">
          <v-form>
            <v-row>
              <v-col cols="12">
                <v-btn fab color="primary" @click.prevent="addTags">
                  <v-icon> mdi-plus </v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-row> -->
      </v-col>
    </v-row>

    <v-row align="center" justify="center">
      <v-col sm="9" md="6" lg="12" v-for="(suggestedContact, index) in suggestedContacts" :key="index">
        <Contact :contactName="suggestedContact.firstName" :contactLastName="suggestedContact.lastName"></Contact>
      </v-col>
    </v-row>

    <img
      :style="$vuetify.breakpoint.xs ? 'display: none' : ''"
      src="@/assets/images/Onboarding/undraw_social_friends.svg"
      alt="social_network"
      class="tags_img hidden-md-and-down"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Contact from "@/components/Contact.vue";
import { get } from "@/services/suggestedContact";
import { SuggestedContact } from "@/models/suggestedContact";

export default Vue.extend({
  name: "SuggestedContactsStep",

  components: { Contact },

  props: { stepAction: Boolean },

  data: () => ({
    suggestedContacts: [] as SuggestedContact[]
  }),

  methods: {
    /* async addTags() {
      const algo = ["Javascript", "Java", "Vue", "React", "Angular", "Node"];
      await Promise.all(
        algo.map((tag) => {
          return post(tag);
        })
      );
    } */
  },

  watch: {
    async stepAction() {
      this.$emit("moveNextStep");
      this.$destroy();
    }
  },

  async created() {
    const result = await get(10);
    this.suggestedContacts = result;
    console.log(this.suggestedContacts);
  }
});
</script>

<style scoped>
.tags_img {
  width: 260px;
  z-index: 2;
  position: absolute;
  bottom: 120px;
  left: 100px;
}
</style>
