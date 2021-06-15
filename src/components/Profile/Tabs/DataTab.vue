<template>
  <div>
    <DataProfile :userInfo="userInfo" :isLoguedUserProfile="isLoguedUserProfile"></DataProfile>

    <WorkExperienceProfile :isLoguedUserProfile="isLoguedUserProfile"></WorkExperienceProfile>

    <StudyExperienceProfile :isLoguedUserProfile="isLoguedUserProfile"></StudyExperienceProfile>

    <SkillProfile :isLoguedUserProfile="isLoguedUserProfile"></SkillProfile>
  </div>
</template>

<script lang="ts">
import Vue, { PropType, VueConstructor } from "vue";
import { Profile } from "@/models/profile";
import dateMixin, { DateMixin } from "@/mixins/formattedDate";
import WorkExperienceProfile from "@/components/Profile/Tabs/DataTab/WorkExperienceProfile.vue";
import DataProfile from "@/components/Profile/Tabs/DataTab/DataProfile.vue";
import StudyExperienceProfile from "@/components/Profile/Tabs/DataTab/StudyExperienceProfile.vue";
import SkillProfile from "@/components/Profile/Tabs/DataTab/SkillProfile.vue";

export default (Vue as VueConstructor<Vue & DateMixin>).extend({
  name: "DataTab",

  mixins: [dateMixin],

  components: { DataProfile, WorkExperienceProfile, StudyExperienceProfile, SkillProfile },

  props: { userInfo: Object as PropType<Profile>, isLoguedUserProfile: Boolean }
});
</script>

<style scoped></style>
