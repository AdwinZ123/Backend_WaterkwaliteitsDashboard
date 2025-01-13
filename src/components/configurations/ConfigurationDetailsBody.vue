<template>
  <div v-if="pageDataIsLoaded">
    <v-row>
      <h3>
        <v-icon :icon="sensorInfo.icon" /> {{ sensorInfo.displayName }} | {{ configuration.id }}
      </h3>
      &nbsp;&nbsp;&nbsp;
      <UpdateLimitValuesDialog
        :standardLimitValue="configuration.grenswaarden"
        :updateLimitValue="updateLimitValue"
        :sensorInfo="sensorInfo"
        buttonText="Grenzen bewerken"
        cardTitle="Sensorgrenzen bewerken"
        :id="configuration.id"
      />
    </v-row>
    <v-container>
      <p>Bovengrens 2: {{ configuration.grenswaarden.slechtboven }}</p>
      <p>Bovengrens 1: {{ configuration.grenswaarden.goedboven }}</p>
      <p>Ondergrens 1: {{ configuration.grenswaarden.goedonder }}</p>
      <p>Ondergrens 2: {{ configuration.grenswaarden.slechtonder }}</p>
    </v-container>
  </div>
</template>

<script>
import { getSensorTypeInfo } from '@/helper'
import UpdateLimitValuesDialog from '@/components/dialogs/UpdateLimitValuesDialog.vue'

export default {
  components: { UpdateLimitValuesDialog },
  props: ['configuration', 'updateLimitValue'],
  data() {
    return {
      pageDataIsLoaded: false,
      sensorInfo: null,
    }
  },
  methods: {
    getSensorTypeInfo,
  },
  mounted() {
    this.sensorInfo = getSensorTypeInfo(this.configuration.sensor.type)

    this.pageDataIsLoaded = true
  },
}
</script>
