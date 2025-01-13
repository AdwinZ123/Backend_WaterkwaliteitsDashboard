<template>
  <div v-if="isPageDataLoaded">
    <!-- Start and end date filters -->
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
              // Clear the start date and reexecute the filter
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
              // Clear the end date and reexecute the filter
              selectedEndDate = null
              filterMeasurements()
            }
          "
        ></v-date-input>
      </v-col>
    </v-row>

    <!-- Line chart for each sensor type -->
    <LocationLineChart
      v-for="type in sensorTypes"
      :key="type"
      :buoys="buoys"
      :type="type"
      :measurements="filteredMeasurements"
    />
  </div>
</template>

<script>
import { getFormattedDate } from '@/helper'
import { VDateInput } from 'vuetify/labs/VDateInput'
import LocationLineChart from '@/components/locations/LocationLineChart.vue'

export default {
  components: { LocationLineChart, VDateInput },
  props: ['buoys', 'deployments', 'measurements'],
  data() {
    return {
      selectedStartDate: null,
      selectedEndDate: null,
      isPageDataLoaded: false,
      filteredMeasurements: [],
      sensorTypes: [],
    }
  },
  methods: {
    getFormattedDate,
    /**
     * Filter all measurements by the start and end date filters
     */
    filterMeasurements() {
      this.filteredMeasurements = []
      let deploymentsMeasurements = []

      this.deployments.forEach((deployment) => {
        // Get all measurements for the deployment
        let filteredMeasurements = this.measurements.filter(
          (meting) =>
            meting.deveui === deployment.deveui &&
            new Date(meting.tijdstempel).getTime() >=
              new Date(deployment.plaatsingsdatum).getTime(),
        )

        // If the deployment is't active, then filter the measurements by the pick up date
        if (deployment.ophaaldatum !== null) {
          filteredMeasurements = filteredMeasurements.filter(
            (meting) =>
              new Date(meting.tijdstempel).getTime() <= new Date(deployment.ophaaldatum).getTime(),
          )
        }

        // Add the start date filter
        if (this.selectedStartDate !== null) {
          filteredMeasurements = filteredMeasurements.filter(
            (meting) =>
              new Date(meting.tijdstempel).getTime() >= new Date(this.selectedStartDate).getTime(),
          )
        }

        // Add the end date filter
        if (this.selectedEndDate !== null) {
          filteredMeasurements = filteredMeasurements.filter(
            (meting) =>
              new Date(meting.tijdstempel).getTime() <= new Date(this.selectedEndDate).getTime(),
          )
        }

        // Sort all measurements from old to new
        filteredMeasurements.sort(
          (a, b) => new Date(a.tijdstempel).getTime() - new Date(b.tijdstempel).getTime(),
        )

        // Add all filtered measurements to the total measurements array
        deploymentsMeasurements.push(...filteredMeasurements)
      })

      // Sort all measurements from old to new
      deploymentsMeasurements.sort(
        (a, b) => new Date(a.tijdstempel).getTime() - new Date(b.tijdstempel).getTime(),
      )

      this.filteredMeasurements.push(...deploymentsMeasurements)
    },
  },
  mounted() {
    this.sensorTypes = []

    // Collecting all used sensor types at the location
    this.deployments.forEach((deployment) => {
      deployment.configuraties.forEach((configuratie) => {
        const type = configuratie.sensor.type
        if (this.sensorTypes.find((st) => st === type) == null) {
          this.sensorTypes.push(type)
        }
      })
    })

    this.filterMeasurements()

    this.isPageDataLoaded = true
  },
  beforeUpdate() {
    // Filter all measurements when the component gets updated
    this.filterMeasurements()
  },
}
</script>
