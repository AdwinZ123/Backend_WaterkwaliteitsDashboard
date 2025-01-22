<template>
  <div v-if="isPageDataLoaded">
    <h3><v-icon :icon="sensorInfo.icon" /> {{ sensorInfo.displayName }}</h3>
    <LineChartJS
      :options="chartOptions"
      :data="getChartData()"
      :plugins="getPlugins()"
      style="max-height: 250px"
    />
    <br />
  </div>
</template>

<script>
import { getFormattedDate, getSensorTypeInfo, getSensorTypeMinMaxValues } from '@/helper'
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
      minValue: 0.0,
      maxValue: 0.0,
      isPageDataLoaded: false,
      sensorInfo: null,
      chartOptions: null,
    }
  },
  methods: {
    getPlugins() {
      return [
        {
          beforeDraw: (chart) => {
            const { canvas, ctx, chartArea } = chart

            // Controleer of data beschikbaar is
            if (
              !this.configuration ||
              !this.configuration.grenswaarden ||
              this.minValue === undefined ||
              this.maxValue === undefined
            ) {
              return
            }

            const slechtonder = this.configuration.grenswaarden.slechtonder
            const goedonder = this.configuration.grenswaarden.goedonder
            const goedboven = this.configuration.grenswaarden.goedboven
            const slechtboven = this.configuration.grenswaarden.slechtboven

            const min = this.minValue
            const max = this.maxValue

            // Helper functie om een waarde naar een ratio te converteren en binnen [0, 1] te begrenzen
            const calculateRatio = (value) => {
              const ratio = (value - min) / (max - min)
              return Math.max(0, Math.min(1, ratio)) // Begrens de waarde tussen 0 en 1
            }

            const slechtonderRatio = calculateRatio(slechtonder)
            const goedonderRatio = calculateRatio(goedonder)
            const goedbovenRatio = calculateRatio(goedboven)
            const slechtbovenRatio = calculateRatio(slechtboven)

            const gradientBack = canvas.getContext('2d').createLinearGradient(0, 250, 0, 0)

            gradientBack.addColorStop(0, 'rgba(255, 0, 0, 1)')
            gradientBack.addColorStop(slechtonderRatio, 'rgba(255, 0, 0, 1)')
            gradientBack.addColorStop(slechtonderRatio, 'rgba(255, 165, 0, 1)')
            gradientBack.addColorStop(goedonderRatio, 'rgba(255, 165, 0, 1)')
            gradientBack.addColorStop(goedonderRatio, 'rgba(0, 255, 0, 1)')
            gradientBack.addColorStop(goedbovenRatio, 'rgba(0, 255, 0, 1)')
            gradientBack.addColorStop(goedbovenRatio, 'rgba(255, 165, 0, 1)')
            gradientBack.addColorStop(slechtbovenRatio, 'rgba(255, 165, 0, 1)')
            gradientBack.addColorStop(slechtbovenRatio, 'rgba(255, 0, 0, 1)')
            gradientBack.addColorStop(1, 'rgba(255, 0, 0, 1)')

            ctx.fillStyle = gradientBack
            ctx.fillRect(
              chartArea.left,
              chartArea.bottom,
              chartArea.right - chartArea.left,
              chartArea.top - chartArea.bottom,
            )
          },
        },
      ]
    },
    getSensorTypeMinMaxValues,
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
    const minMaxValues = getSensorTypeMinMaxValues(this.configuration.sensor.type)
    this.minValue = minMaxValues.minValue
    this.maxValue = minMaxValues.maxValue

    this.chartOptions = {
      responsive: true,
      scales: {
        y: {
          min: this.minValue,
          max: this.maxValue,
        },
      },
    }

    this.sensorInfo = getSensorTypeInfo(this.configuration.sensor.type)

    this.isPageDataLoaded = true
  },
  unmounted() {
    this.sensorInfo = null

    ChartJS.unregister()
  },
}
</script>
