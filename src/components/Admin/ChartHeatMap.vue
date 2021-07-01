<template>
  <transition name="scale-transition" mode="out-in">
    <v-sheet color="grey lighten-4" v-if="isLoading">
      <v-skeleton-loader class="mx-auto" type="card"></v-skeleton-loader>
    </v-sheet>
    <v-card v-else>
      <v-card-title>{{ title }}</v-card-title>
      <v-card-text>
        <apexchart type="heatmap" class="pa-4" height="318" :options="chartOptions" :series="series"></apexchart>
      </v-card-text>
    </v-card>
  </transition>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { PostsPerDay } from "@/models/postsPerDay";

type Data = {
  y: number;
  x: string;
};

type Serie = {
  name?: string;
  data: Data[];
};

export default Vue.extend({
  name: "ChartHeatMap",

  props: {
    isLoading: {
      type: Boolean,
      required: true
    },
    postsPerDay: {
      type: Array as PropType<PostsPerDay[]>,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },

  data: () => ({
    series: [] as Serie[],
    chartOptions: {
      chart: {
        height: 350,
        type: "heatmap"
      },
      dataLabels: {
        enabled: false
      },
      colors: ["#00cdae"]
    }
  }),

  methods: {
    generateHeatMap() {
      const days = [];
      const now = new Date();
      const startDate = new Date(`${now.getUTCFullYear()}/${now.getMonth() - 2}/${now.getDate()}`);
      for (let date = startDate; date <= now; date.setDate(date.getDate() + 1)) {
        days.push(new Date(date));
      }
      let data: Data[] = [];

      for (let i = 0; i < 7; i++) {
        for (let j = i; j < days.length; j = j + 7) {
          data.push({ y: 0, x: days[j].toISOString().substring(0, 10) });
        }
        const day = new Date(data[0].x).toLocaleString("default", { weekday: "long" });
        this.series.unshift({ name: day, data: data });
        data = [];
      }
    }
  },

  watch: {
    postsPerDay(value: PostsPerDay[]): void {
      value.forEach((post) => {
        const day = new Date(post.attribute).toLocaleString("default", { weekday: "long" });
        const serieIndex = this.series.findIndex((serie) => serie.name == day);
        if (serieIndex >= 0) {
          const dataIndex = this.series[serieIndex].data.findIndex((data) => data.x == post.attribute);
          if (dataIndex >= 0) this.series[serieIndex].data[dataIndex].y = post.value;
        }
      });
    }
  },

  mounted() {
    this.generateHeatMap();
  }
});
</script>

<style scoped></style>
