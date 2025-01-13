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
  props: ['buoys', 'type', 'measurements'],
  data() {
    return {
      isPageDataLoaded: false,
      sensorInfo: null,
      plugins: [
        {
          /**
           * Add a colored background to the chart to show the sensor limit values on the frontend
           * @param chart
           */
          beforeDraw: function (chart) {
            const ctx = chart.ctx
            const canvas = chart.canvas
            const chartArea = chart.chartArea

            //TODO: Create algorithm to make the background responsive to the sensor limit values
            // Chart background
            var gradientBack = canvas.getContext('2d').createLinearGradient(0, 250, 0, 0)

            // Direct
            // Red
            gradientBack.addColorStop(0, 'rgba(255, 0, 0, 0.7)')
            gradientBack.addColorStop(0.2, 'rgba(255, 0, 0, 0.7)')
            // Orange
            gradientBack.addColorStop(0.21, 'rgba(255, 165, 0, 0.7)')
            gradientBack.addColorStop(0.4, 'rgba(255, 165, 0, 0.7)')
            // Green
            gradientBack.addColorStop(0.41, 'rgba(0, 255, 0, 0.7)')
            gradientBack.addColorStop(0.6, 'rgba(0, 255, 0, 0.7)')
            // Orange
            gradientBack.addColorStop(0.61, 'rgba(255, 165, 0, 0.7)')
            gradientBack.addColorStop(0.8, 'rgba(255, 165, 0, 0.7)')
            // Red
            gradientBack.addColorStop(0.81, 'rgba(255, 0, 0, 0.7)')
            gradientBack.addColorStop(1, 'rgba(255, 0, 0, 0.7)')

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
      colorCodes: [
        '#000000', // Zwart
        '#0000FF', // Blauw
        '#800080', // Donkerpaars
        '#FFFFFF', // Wit
        '#2F4F4F', // Donkergrijs (Dark Slate Gray)
        '#8B0000', // Donkerrood (Dark Red)
        '#00008B', // Donkerblauw (Dark Blue)
        '#006400', // Donkergroen (Dark Green)
        '#4B0082', // Indigo
        '#483D8B', // Donkerleisteengrijs (Dark Slate Blue)
        '#2E2E2E', // Koolzwart (Charcoal)
        '#191970', // Middernachtblauw (Midnight Blue)
        '#5D4037', // Donkerbruin (Dark Brown)
        '#4A235A', // Donkerpaars (Dark Purple)
      ],
    }
  },
  methods: {
    getSensorTypeInfo,
    /**
     * Get all the chart data
     */
    getChartData() {
      let currentDeveui = null

      const newLabels = []
      const newDatasets = []
      let currentDataset = {
        label: 'label',
        backgroundColor: this.colorCodes[newDatasets.length],
        data: [],
        fill: false,
        borderColor: this.colorCodes[newDatasets.length],
        tension: 0.1,
      }

      this.measurements.forEach((measurement, index) => {
        // Set first buoy deveui
        if (index === 0) {
          currentDeveui = measurement.deveui

          currentDataset.label = this.buoys.find((b) => b.deveui === currentDeveui).naam
        }

        // Start new dataset if the bouy deveui changes
        if (currentDeveui != measurement.deveui) {
          // Push current dataset and change the current deveui
          newDatasets.push(currentDataset)
          currentDeveui = measurement.deveui

          // Create new current dataset
          currentDataset = {
            label: this.buoys.find((b) => b.deveui === currentDeveui).naam,
            backgroundColor: this.colorCodes[newDatasets.length],
            data: [],
            fill: false,
            borderColor: this.colorCodes[newDatasets.length],
            tension: 0.1,
          }

          // Make sure the line of the new dataset starts at the right position in the chart
          for (let i = 0; i < index; i++) {
            currentDataset.data.push(NaN)
          }
        }

        // Add data to the data and label lists
        newLabels.push(getFormattedDate(measurement.tijdstempel, true))
        currentDataset.data.push(measurement.waarde[this.type])

        // Add last measurement to newDatasets
        if (this.measurements.length === index + 1) {
          newDatasets.push(currentDataset)
        }
      })

      return {
        labels: newLabels,
        datasets: newDatasets,
      }
    },
  },
  mounted() {
    this.sensorInfo = getSensorTypeInfo(this.type)

    this.isPageDataLoaded = true
  },
  unmounted() {
    this.sensorInfo = null

    ChartJS.unregister()
  },
}
</script>
