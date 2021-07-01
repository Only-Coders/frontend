<template>
  <transition name="scale-transition" mode="out-in">
    <v-sheet color="grey lighten-4" v-if="isLoading">
      <v-skeleton-loader class="mx-auto" type="card"></v-skeleton-loader>
    </v-sheet>
    <v-card v-else>
      <v-card-title>{{ title }}</v-card-title>
      <v-card-text>
        <apexchart class="pa-4" height="350" type="area" :options="chartOptions" :series="series"></apexchart>
      </v-card-text>
    </v-card>
  </transition>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";

type Serie = {
  name: string;
  data: number[];
};

type ChartOptions = {
  chart: {
    height: number;
    type: string;
  };
  dataLabels: {
    enabled: boolean;
  };
  stroke: {
    curve: string;
  };
  xaxis: {
    type: string;
    categories: string[];
  };
};

export default Vue.extend({
  name: "ChartArea",

  props: {
    isLoading: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    posts: {
      type: Array as PropType<number[]>,
      required: true
    },
    reactions: {
      type: Array as PropType<number[]>,
      required: true
    },
    hours: {
      type: Array as PropType<string[]>,
      required: true
    }
  },

  data: () => ({
    series: [
      {
        name: "Posts",
        data: []
      },
      {
        name: "Reactions",
        data: []
      }
    ] as Serie[],
    chartOptions: {
      chart: {
        height: 350,
        type: "area"
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth"
      },
      xaxis: {
        type: "string",
        categories: []
      },
      colors: ["#00cdae", "#ff8635"]
    } as ChartOptions
  }),

  watch: {
    hours(value: string[]): void {
      this.chartOptions.xaxis.categories = value;
    },
    posts(value: number[]): void {
      this.series[0].data = value;
    },
    reactions(value: number[]): void {
      this.series[1].data = value;
    }
  },

  mounted() {
    this.chartOptions.xaxis.categories = this.hours;
    this.series[0].data = this.posts;
    this.series[1].data = this.reactions;
  }
});
</script>

<style scoped></style>
