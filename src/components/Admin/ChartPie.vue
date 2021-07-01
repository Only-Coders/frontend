<template>
  <transition name="scale-transition" mode="out-in">
    <v-sheet color="grey lighten-4" v-if="isLoading">
      <v-skeleton-loader class="mx-auto" type="card"></v-skeleton-loader>
    </v-sheet>
    <v-card v-else>
      <v-card-title>{{ title }}</v-card-title>
      <v-card-text>
        <apexchart type="pie" class="chart-pie" :options="chartOptions" :series="series"></apexchart>
      </v-card-text>
    </v-card>
  </transition>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";

type ChartOptions = {
  chart: {
    type: string;
  };
  colors: string[];
  fill: {
    colors: string[];
  };
  labels: string[];
};

export default Vue.extend({
  name: "ChartPie",

  props: {
    isLoading: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    labels: {
      type: Array as PropType<Array<string>>,
      required: true
    },
    colors: {
      type: Array as PropType<Array<string>>,
      required: true
    },
    series: {
      type: Array as PropType<Array<number>>,
      required: true
    }
  },

  data: () => ({
    chartOptions: {
      chart: {
        type: "pie"
      },
      colors: [],
      fill: {
        colors: []
      },
      labels: []
    } as ChartOptions
  }),

  watch: {
    labels(value: string[]): void {
      this.chartOptions.labels = value;
    }
  },

  mounted() {
    this.chartOptions.colors = this.colors;
    this.chartOptions.fill.colors = this.colors;
    this.chartOptions.labels = this.labels;
  }
});
</script>

<style scoped>
.chart-pie {
  margin: auto;
  max-width: 400px;
  width: 400px;
}
</style>
