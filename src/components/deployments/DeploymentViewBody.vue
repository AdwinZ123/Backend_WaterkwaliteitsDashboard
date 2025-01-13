<template>
  <details v-if="isPageDataLoaded">
    <summary>
      <strong
        >{{ buoy.naam }} | {{ getFormattedDate(deployment.plaatsingsdatum) }} t/m
        {{ getFormattedDate(deployment.ophaaldatum) }} | {{ deployment.locatie }}</strong
      >
    </summary>

    <br />

    <v-row dense>
      <v-col md="2" sm="3">
        <v-date-input
          v-model="selectedStartDate"
          v-on:update:model-value="filterMeasurements"
          density="compact"
          label="Begindatum"
          prepend-icon=""
          append-inner-icon="$calendar"
          variant="solo"
          clearable
          @click:clear="
            () => {
              selectedStartDate = null
              filterMeasurements()
            }
          "
        ></v-date-input>
      </v-col>

      <v-col md="2" sm="3">
        <v-date-input
          v-model="selectedEndDate"
          v-on:update:model-value="filterMeasurements"
          density="compact"
          label="Einddatum"
          prepend-icon=""
          append-inner-icon="$calendar"
          variant="solo"
          clearable
          @click:clear="
            () => {
              selectedEndDate = null
              filterMeasurements()
            }
          "
        ></v-date-input>
      </v-col>
    </v-row>

    <ConfigurationLineChart
      v-for="configuration in deployment.configuraties"
      :key="configuration.id"
      :buoy="buoy"
      :configuration="configuration"
      :measurements="filteredMeasurements"
    />
  </details>
</template>

<script>
import { getFormattedDate } from '@/helper'
import { VDateInput } from 'vuetify/labs/VDateInput'
import ConfigurationLineChart from '@/components/configurations/ConfigurationLineChart.vue'

export default {
  components: { ConfigurationLineChart, VDateInput },
  props: ['buoy', 'deployment', 'measurements'],
  data() {
    return {
      selectedStartDate: null,
      selectedEndDate: null,
      isPageDataLoaded: false,
      filteredMeasurements: [],
    }
  },
  methods: {
    getFormattedDate,
    filterMeasurements() {
      let deploymentMeasurements = this.measurements.filter(
        (measurement) =>
          measurement.deveui === this.deployment.deveui &&
          new Date(measurement.tijdstempel).getTime() >=
            new Date(this.deployment.plaatsingsdatum).getTime(),
      )

      if (this.deployment.ophaaldatum !== null) {
        deploymentMeasurements = deploymentMeasurements.filter(
          (measurement) =>
            new Date(measurement.tijdstempel).getTime() <=
            new Date(this.deployment.ophaaldatum).getTime(),
        )
      }

      if (this.selectedStartDate !== null) {
        deploymentMeasurements = deploymentMeasurements.filter(
          (measurement) =>
            new Date(measurement.tijdstempel).getTime() >=
            new Date(this.selectedStartDate).getTime(),
        )
      }

      if (this.selectedEndDate !== null) {
        deploymentMeasurements = deploymentMeasurements.filter(
          (measurement) =>
            new Date(measurement.tijdstempel).getTime() <= new Date(this.selectedEndDate).getTime(),
        )
      }

      deploymentMeasurements.sort(
        (a, b) => new Date(a.tijdstempel).getTime() - new Date(b.tijdstempel).getTime(),
      )

      this.filteredMeasurements = deploymentMeasurements
    },
  },
  mounted() {
    this.filterMeasurements()

    this.isPageDataLoaded = true
  },
  beforeUpdate() {
    this.filterMeasurements()
  },
}
</script>
