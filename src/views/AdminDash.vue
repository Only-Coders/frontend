<template>
  <div>
    <v-row no-gutters class="my-12" justify="center">
      <v-col cols="3">
        <v-card :style="'border-top: 4px solid #3F51B5'">
          <v-card-title>Bloqueos en el ultimo mes</v-card-title>
          <v-card-text class="d-flex">
            <v-icon size="52" color="#3F51B5">mdi-account-cancel</v-icon>
            <p class="text-h3 mb-0 pl-5">420</p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="3 offset-1">
        <v-card :style="'border-top: 4px solid #009688'">
          <v-card-title>Bloqueos en el ultimo mes</v-card-title>
          <v-card-text class="d-flex">
            <v-icon size="52" color="#009688">mdi-account-cancel</v-icon>
            <p class="text-h3 mb-0 pl-5">420</p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="3 offset-1">
        <v-card :style="'border-top: 4px solid #5E35B1'">
          <v-card-title>Bloqueos en el ultimo mes</v-card-title>
          <v-card-text class="d-flex">
            <v-icon size="52" color="#5E35B1">mdi-account-cancel</v-icon>
            <p class="text-h3 mb-0 pl-5">420</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row no-gutters justify="space-around">
      <v-col cols="5">
        <v-card>
          <v-card-title>English vs Spanish</v-card-title>
          <v-card-text>
            <apexchart
              type="pie"
              class="mx-auto"
              style="max-width: 400px"
              width="400"
              :options="chartOptions"
              :series="series"
            ></apexchart>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="5">
        <v-card>
          <v-card-title>DarkMode vs LightMode</v-card-title>
          <v-card-text>
            <apexchart
              type="pie"
              class="mx-auto"
              style="max-width: 400px"
              width="400"
              :options="chartOptions1"
              :series="series1"
            ></apexchart>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row no-gutters justify="center" class="my-12">
      <v-col cols="5">
        <v-card>
          <apexchart type="heatmap" class="pa-10" height="350" :options="chartOptions2" :series="series2"></apexchart>
        </v-card>
      </v-col>
      <v-col cols="5 offset-1">
        <v-card>
          <apexchart type="area" class="pa-10" height="350" :options="chartOptions3" :series="series3"></apexchart>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "AdminDash",
  data() {
    return {
      series3: [
        {
          name: "series1",
          data: [31, 40, 28, 51, 42, 109, 100]
        },
        {
          name: "series2",
          data: [11, 32, 45, 32, 34, 52, 41]
        }
      ],
      chartOptions3: {
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
          type: "datetime",
          categories: [
            "2018-09-19T00:00:00.000Z",
            "2018-09-19T01:30:00.000Z",
            "2018-09-19T02:30:00.000Z",
            "2018-09-19T03:30:00.000Z",
            "2018-09-19T04:30:00.000Z",
            "2018-09-19T05:30:00.000Z",
            "2018-09-19T06:30:00.000Z"
          ]
        },
        tooltip: {
          x: {
            format: "dd/MM/yy HH:mm"
          }
        }
      },
      series: [44, 55],
      chartOptions: {
        chart: {
          type: "pie"
        },
        colors: ["#00BCD4", "#FF9800"],
        fill: {
          colors: ["#00BCD4", "#FF9800"]
        },
        labels: ["English", "Spanish"]
      },
      series1: [74, 35],
      chartOptions1: {
        chart: {
          type: "pie"
        },
        colors: ["#34374B", "#00cdae"],
        fill: {
          colors: ["#34374B", "#00cdae"]
        },
        labels: ["Dark", "Light"]
      },
      series2: [
        {
          name: "Lunes",
          data: [
            {
              x: "Mayo",
              y: 2
            },
            {
              x: "Mayo",
              y: 23
            },
            {
              x: "Mayo",
              y: 12
            },
            {
              x: "Mayo",
              y: 7
            },
            {
              x: "Junio",
              y: 0
            },
            {
              x: "Junio",
              y: 22
            },
            {
              x: "Junio",
              y: 12
            },
            {
              x: "Junio",
              y: 22
            }
          ]
        },
        {
          name: "Martes",
          data: [
            {
              x: "Mayo",
              y: 23
            },
            {
              x: "Mayo",
              y: 2
            },
            {
              x: "Mayo",
              y: 7
            },
            {
              x: "Junio",
              y: 22
            },
            {
              x: "Mayo",
              y: 12
            },
            {
              x: "Junio",
              y: 0
            },
            {
              x: "Junio",
              y: 22
            },
            {
              x: "Junio",
              y: 12
            }
          ]
        },
        {
          name: "Miercoles",
          data: [
            {
              x: "Mayo",
              y: 7
            },
            {
              x: "Mayo",
              y: 2
            },
            {
              x: "Junio",
              y: 0
            },
            {
              x: "Mayo",
              y: 23
            },
            {
              x: "Mayo",
              y: 12
            },
            {
              x: "Junio",
              y: 22
            },
            {
              x: "Junio",
              y: 22
            },
            {
              x: "Junio",
              y: 12
            }
          ]
        },
        {
          name: "Jueves",
          data: [
            {
              x: "Mayo",
              y: 23
            },
            {
              x: "Mayo",
              y: 2
            },
            {
              x: "Mayo",
              y: 7
            },
            {
              x: "Junio",
              y: 22
            },
            {
              x: "Mayo",
              y: 12
            },
            {
              x: "Junio",
              y: 0
            },
            {
              x: "Junio",
              y: 22
            },
            {
              x: "Junio",
              y: 12
            }
          ]
        },
        {
          name: "Viernes",
          data: [
            {
              x: "Mayo",
              y: 2
            },
            {
              x: "Mayo",
              y: 23
            },
            {
              x: "Mayo",
              y: 12
            },
            {
              x: "Mayo",
              y: 7
            },
            {
              x: "Junio",
              y: 0
            },
            {
              x: "Junio",
              y: 22
            },
            {
              x: "Junio",
              y: 12
            },
            {
              x: "Junio",
              y: 22
            }
          ]
        },
        {
          name: "Sabado",
          data: [
            {
              x: "Mayo",
              y: 7
            },
            {
              x: "Mayo",
              y: 2
            },
            {
              x: "Junio",
              y: 0
            },
            {
              x: "Mayo",
              y: 23
            },
            {
              x: "Mayo",
              y: 12
            },
            {
              x: "Junio",
              y: 22
            },
            {
              x: "Junio",
              y: 22
            },
            {
              x: "Junio",
              y: 12
            }
          ]
        },
        {
          name: "Domingo",
          data: [
            {
              x: "Mayo",
              y: 7
            },
            {
              x: "Mayo",
              y: 2
            },
            {
              x: "Junio",
              y: 0
            },
            {
              x: "Mayo",
              y: 23
            },
            {
              x: "Mayo",
              y: 12
            },
            {
              x: "Junio",
              y: 22
            },
            {
              x: "Junio",
              y: 22
            },
            {
              x: "Junio",
              y: 12
            }
          ]
        }
      ],
      chartOptions2: {
        chart: {
          height: 350,
          type: "heatmap"
        },
        dataLabels: {
          enabled: false
        },
        colors: ["#3F51B5"],
        title: {
          text: "Posts heatmap"
        }
      }
    };
  }
});
</script>

<style scoped></style>
