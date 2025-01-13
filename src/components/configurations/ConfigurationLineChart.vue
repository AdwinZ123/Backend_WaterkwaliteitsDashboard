<template>
  <div v-if="isPageDataLoaded">
    <h3><v-icon :icon="sensorInfo.icon" /> {{ sensorInfo.displayName }}</h3>
    <LineChartJS
      :options="chartOptions"
      :data="getChartData()"
      :plugins="plugins"
      style="max-height: 250px"
    />
    <br />
  </div>
</template>

<script>
import { getFormattedDate, getSensorTypeInfo } from '@/helper'
import { Line as LineChartJS } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export default {
  components: { LineChartJS },
  props: ['buoy', 'configuration', 'measurements'],
  data() {
    return {
      isPageDataLoaded: false,
      sensorInfo: null,
      plugins: [
        {
          beforeDraw: function (chart) {
            const ctx = chart.ctx
            const canvas = chart.canvas
            const chartArea = chart.chartArea

            // Chart background
            var gradientBack = canvas.getContext('2d').createLinearGradient(0, 250, 0, 0)
            // // Overgang
            // // Red
            // gradientBack.addColorStop(0, 'rgba(255, 0, 0,1)')
            // // Orange
            // gradientBack.addColorStop(0.3, 'rgba(255, 165, 0,1)')
            // // Green
            // gradientBack.addColorStop(0.5, 'rgba(0, 255, 0,1)')
            // // Orange
            // gradientBack.addColorStop(0.7, 'rgba(255, 165, 0,1)')
            // // Red
            // gradientBack.addColorStop(1, 'rgba(255, 0, 0,1)')

            // Direcht
            // Red
            gradientBack.addColorStop(0, 'rgba(255, 0, 0,1)')
            gradientBack.addColorStop(0.2, 'rgba(255, 0, 0,1)')
            // Orange
            gradientBack.addColorStop(0.21, 'rgba(255, 165, 0,1)')
            gradientBack.addColorStop(0.4, 'rgba(255, 165, 0,1)')
            // Green
            gradientBack.addColorStop(0.41, 'rgba(0, 255, 0,1)')
            gradientBack.addColorStop(0.6, 'rgba(0, 255, 0,1)')
            // Orange
            gradientBack.addColorStop(0.61, 'rgba(255, 165, 0,1)')
            gradientBack.addColorStop(0.8, 'rgba(255, 165, 0,1)')
            // RED
            gradientBack.addColorStop(0.81, 'rgba(255, 0, 0,1)')
            gradientBack.addColorStop(1, 'rgba(255, 0, 0,1)')

            ctx.fillStyle = gradientBack
            ctx.fillRect(
              chartArea.left,
              chartArea.bottom,
              chartArea.right - chartArea.left,
              chartArea.top - chartArea.bottom,
            )
          },
        },
      ],
      chartOptions: {
        responsive: true,
      },
    }
  },
  methods: {
    getSensorTypeInfo,
    getChartData() {
      const newLabels = []
      const newData = []

      this.measurements.forEach((measurement) => {
        newLabels.push(getFormattedDate(measurement.tijdstempel, true))
        newData.push(measurement.waarde[this.configuration.sensor.type])
      })

      return {
        labels: newLabels,
        datasets: [
          {
            label: this.buoy.naam,
            backgroundColor: '#000000',
            data: newData,
            fill: false,
            borderColor: '#000000',
            tension: 0.1,
          },
        ],
      }
    },
  },
  mounted() {
    this.sensorInfo = getSensorTypeInfo(this.configuration.sensor.type)

    this.isPageDataLoaded = true
  },
  unmounted() {
    this.sensorInfo = null

    ChartJS.unregister()
  },
}
</script>
